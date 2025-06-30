const app = require('./dist/app-mysql.js');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 MMS Newsletter API Server running on port ${PORT}`);
  console.log(`📧 Newsletter API: http://localhost:${PORT}/api/newsletter`);
  console.log(`👨‍💼 Admin API: http://localhost:${PORT}/api/admin`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app; 