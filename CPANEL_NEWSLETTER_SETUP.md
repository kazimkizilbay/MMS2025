# cPanel Newsletter Sistemi Kurulum Kılavuzu

## 📋 Gereksinimler

- cPanel erişimi
- MySQL veritabanı desteği
- Node.js App desteği (cPanel'de)
- GitHub repository

## 🗄️ 1. MySQL Veritabanı Kurulumu

### cPanel'de Veritabanı Oluşturma:

1. **cPanel → MySQL Databases**
2. **Create New Database:**
   - Database name: `mms_newsletter`
3. **Create New User:**
   - Username: `mms_user`
   - Password: Güçlü bir şifre belirleyin
4. **Add User to Database:**
   - User'ı database'e ekleyin
   - Tüm yetkileri (ALL PRIVILEGES) verin

### Tabloları Oluşturma:

1. **cPanel → phpMyAdmin**
2. `mms_newsletter` veritabanını seçin
3. **SQL** sekmesine tıklayın
4. Aşağıdaki SQL'i çalıştırın:

```sql
-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    INDEX idx_email (email),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## 🔐 2. İlk Admin Kullanıcısı Oluşturma

### Şifre Hash'leme:
1. [Bcrypt Generator](https://bcrypt-generator.com/) sitesine gidin
2. Şifrenizi girin (örn: `admin123`)
3. Rounds: 10 seçin
4. Hash'lenmiş şifreyi kopyalayın

### Admin Ekleme:
phpMyAdmin'de şu SQL'i çalıştırın:

```sql
INSERT INTO admin_users (username, password) 
VALUES ('admin', '$2a$10$YourHashedPasswordHere');
```

## 🚀 3. Backend Konfigürasyonu

### Environment Variables:
cPanel → Node.js App → Environment Variables:

```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com

# MySQL
MYSQL_HOST=localhost
MYSQL_USER=cpanelusername_mms_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=cpanelusername_mms_newsletter

# JWT
JWT_SECRET=generate-a-random-secret-key-here

# Email (mevcut ayarlarınız)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 📝 4. Backend Dosya Değişiklikleri

### app.ts Güncelleme:

`backend/src/app.ts` dosyasında:

```typescript
// MongoDB import'larını kaldırın veya yorum satırı yapın
// import mongoose from 'mongoose';

// MySQL kontrolü ekleyin
import { testConnection } from './config/mysql';

// MongoDB bağlantısını kaldırın
// mongoose.connect(MONGODB_URI)...

// MySQL bağlantı testi ekleyin
testConnection();

// Route'ları güncelleyin
// import newsletterRoutes from './routes/newsletter';
// import adminRoutes from './routes/admin';
import newsletterRoutes from './routes/newsletter-mysql';
import adminRoutes from './routes/admin-mysql';
```

## 🌐 5. Frontend API URL Güncelleme

### Production için API URL:

`frontend/src/components/layout/Footer.tsx`:

```typescript
// Development
// const API_URL = 'http://localhost:3003';

// Production
const API_URL = 'https://yourdomain.com/api';

// Newsletter submit fonksiyonunda:
const response = await fetch(`${API_URL}/newsletter/subscribe`, {
  // ...
});
```

`frontend/src/pages/AdminLogin.tsx` ve `AdminDashboard.tsx` için de aynı güncelleme.

## 📤 6. GitHub Actions Deployment

### GitHub Secrets Ekleyin:
Repository → Settings → Secrets:

- `CPANEL_FTP_HOST`: kayizer.com
- `CPANEL_FTP_USER`: marinema
- `CPANEL_FTP_PASSWORD`: cPanel şifreniz

### Deployment Tetikleme:
```bash
git add .
git commit -m "Add newsletter system with MySQL"
git push origin main
```

## ✅ 7. Deployment Sonrası Kontroller

### 1. API Health Check:
```bash
curl https://yourdomain.com/api/health
```

### 2. Newsletter Test:
- Ana sayfaya gidin
- Footer'da email adresinizi girin
- "Abone Ol" butonuna tıklayın

### 3. Admin Panel Test:
- https://yourdomain.com/admin
- Kullanıcı adı ve şifre ile giriş yapın

### 4. phpMyAdmin Kontrol:
- `newsletter_subscribers` tablosunda kayıtları kontrol edin

## 🛠️ Sorun Giderme

### "MySQL bağlantı hatası"
- Database credentials'ları kontrol edin
- cPanel username prefix'ini kontrol edin (genelde `cpanelusername_`)

### "Newsletter kaydı başarısız"
- API URL'in doğru olduğundan emin olun
- CORS ayarlarını kontrol edin
- Browser console'da hataları kontrol edin

### "Admin girişi çalışmıyor"
- Password hash'inin doğru olduğundan emin olun
- JWT_SECRET'in set edildiğini kontrol edin

## 🔒 Güvenlik Önerileri

1. **Güçlü Şifreler**: Admin ve MySQL için güçlü şifreler kullanın
2. **JWT Secret**: Rastgele ve uzun bir JWT secret oluşturun
3. **HTTPS**: SSL sertifikası aktif olduğundan emin olun
4. **Backup**: Düzenli veritabanı yedekleri alın

## 📊 Bakım ve Yönetim

### Email Listesi Yedekleme:
phpMyAdmin → Export → newsletter_subscribers tablosu

### Admin Şifre Değiştirme:
1. Yeni şifreyi hash'leyin
2. phpMyAdmin'de update query çalıştırın:
```sql
UPDATE admin_users SET password = '$2a$10$NewHashedPassword' WHERE username = 'admin';
```

---

**Not**: Production ortamında güvenlik önlemlerini artırın ve düzenli backup alın. 