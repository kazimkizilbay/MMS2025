console.log('=== NODE.JS TEST START ===');
console.log('Node Version:', process.version);
console.log('Current Directory:', __dirname);
console.log('Environment Variables:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('- MYSQL_DATABASE:', process.env.MYSQL_DATABASE);
console.log('- MYSQL_USER:', process.env.MYSQL_USER);
console.log('- PORT:', process.env.PORT);
console.log('=== NODE.JS TEST END ===');

// Simple HTTP server
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'OK',
    message: 'Simple Node.js test server is working!',
    node_version: process.version,
    timestamp: new Date().toISOString()
  }));
});

server.listen(port, () => {
  console.log(`Test server running on port ${port}`);
}); 