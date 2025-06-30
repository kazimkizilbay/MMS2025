const app = require('./app-mysql.js');

// cPanel automatically assigns port - don't hardcode it
const PORT = process.env.PORT || 3000;

// Only start server if app is not already running
if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`🚀 MMS Newsletter API Server running on port ${PORT}`);
    console.log(`📧 Newsletter API: http://localhost:${PORT}/api/newsletter`);
    console.log(`👨‍💼 Admin API: http://localhost:${PORT}/api/admin`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

module.exports = app; 