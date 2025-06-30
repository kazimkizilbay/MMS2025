import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Basit test endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Node.js is working!',
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      MYSQL_HOST: process.env.MYSQL_HOST,
      MYSQL_DATABASE: process.env.MYSQL_DATABASE,
      MYSQL_USER: process.env.MYSQL_USER
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Test server is running' });
});

// Error test
app.get('/error', (req, res) => {
  throw new Error('Test error - this is intentional');
});

// Start server
app.listen(PORT, () => {
  console.log(`Test server started on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`MySQL Host: ${process.env.MYSQL_HOST}`);
}); 