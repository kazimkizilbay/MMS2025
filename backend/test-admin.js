require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function testAdmin() {
  let connection;
  
  try {
    // MySQL bağlantısı
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'mms_database'
    });
    
    console.log('✅ MySQL bağlantısı başarılı');
    console.log(`📊 Veritabanı: ${process.env.MYSQL_DATABASE}`);
    
    // Admin kullanıcılarını listele
    const [admins] = await connection.execute('SELECT id, username, created_at FROM admin_users');
    console.log('\n👥 Mevcut admin kullanıcıları:');
    admins.forEach(admin => {
      console.log(`  - ID: ${admin.id}, Kullanıcı: ${admin.username}, Oluşturulma: ${admin.created_at}`);
    });
    
    // Test için admin şifresini kontrol et
    if (admins.length > 0) {
      const testPassword = 'admin123';
      const [adminWithPassword] = await connection.execute(
        'SELECT * FROM admin_users WHERE username = ?',
        ['admin']
      );
      
      if (adminWithPassword.length > 0) {
        const isValid = await bcrypt.compare(testPassword, adminWithPassword[0].password);
        console.log(`\n🔐 Admin şifre testi (admin123): ${isValid ? '✅ BAŞARILI' : '❌ BAŞARISIZ'}`);
      }
    }
    
    // Eğer admin yoksa oluştur
    if (admins.length === 0) {
      console.log('\n⚠️  Admin kullanıcısı bulunamadı. Oluşturuluyor...');
      
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await connection.execute(
        'INSERT INTO admin_users (username, password) VALUES (?, ?)',
        ['admin', hashedPassword]
      );
      
      console.log('✅ Admin kullanıcısı oluşturuldu (kullanıcı: admin, şifre: admin123)');
    }
    
  } catch (error) {
    console.error('\n❌ Hata:', error.message);
    console.error('Detaylı hata:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Bağlantı kapatıldı');
    }
  }
}

// Test scriptini çalıştır
testAdmin(); 