import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'mms_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL bağlantısı başarılı');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ MySQL bağlantı hatası:', error);
    return false;
  }
}

export default pool; 