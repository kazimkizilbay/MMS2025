import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';
import mongoose from 'mongoose';

import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

// Routes
import authRoutes from './routes/auth';
import contactRoutes from './routes/contact';
import demoRoutes from './routes/demo';
import newsletterRoutes from './routes/newsletter';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3003;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mms-database';

// MongoDB bağlantısı
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB bağlantısı başarılı'))
  .catch((err) => console.error('❌ MongoDB bağlantı hatası:', err));

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174', 
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177',
    'http://localhost:5178',
    process.env.FRONTEND_URL || 'http://localhost:5173'
  ],
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from public_html root (parent of api directory)
// This handles requests like /logo.png, /vite.svg, /locales/tr/common.json
app.use(express.static(path.join(__dirname, '..')));

// API Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    frontend_url: process.env.FRONTEND_URL || 'http://localhost:5173'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/demo', demoRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Port availability checker
const isPortAvailable = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = require('net').createServer();
    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });
    server.on('error', () => resolve(false));
  });
};

// Find available port starting from preferred port
const findAvailablePort = async (startPort: number, maxAttempts: number = 10): Promise<number> => {
  for (let i = 0; i < maxAttempts; i++) {
    const port = startPort + i;
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found in range ${startPort}-${startPort + maxAttempts - 1}`);
};

// Start server with automatic port detection
const startServer = async () => {
  try {
    const availablePort = await findAvailablePort(PORT);
    
    console.log(`🔍 Scanning for available ports starting from ${PORT}...`);
    console.log(`✅ Found available port: ${availablePort}`);
    console.log(`🚀 Starting MMS Backend Server on port ${availablePort}...`);
    
    const server = app.listen(availablePort, () => {
      console.log(`\n🎉 MMS Backend Server Successfully Started!`);
      console.log(`📡 Server URL: http://localhost:${availablePort}`);
      console.log(`🏥 Health Check: http://localhost:${availablePort}/api/health`);
    console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 CORS Origin: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
      console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
      console.log(`\n📋 Available API Endpoints:`);
      console.log(`   GET  /api/health - Health check`);
      console.log(`   POST /api/auth/* - Authentication routes`);
      console.log(`   POST /api/contact/* - Contact routes`);
      console.log(`   POST /api/demo/* - Demo routes`);
      console.log(`   POST /api/newsletter/subscribe - Newsletter subscription`);
      console.log(`   GET  /api/newsletter/list - List subscribers`);
      console.log(`   POST /api/admin/login - Admin login`);
      console.log(`   POST /api/admin/setup - Admin setup (first time)`);
      console.log(`   GET  /api/admin/newsletter/stats - Newsletter statistics`);
      console.log(`\n🔄 Server is ready to accept connections...\n`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('\n🛑 SIGTERM received, shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('\n🛑 SIGINT received, shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
};

startServer(); 