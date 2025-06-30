# 🚀 cPanel Deployment Kılavuzu

Bu kılavuz, MMS projesini cPanel üzerinde nasıl deploy edeceğinizi adım adım açıklar.

## 📋 Gereksinimler

- cPanel erişimi
- MySQL veritabanı desteği  
- Node.js App desteği (cPanel'de)
- GitHub repository erişimi
- FTP erişimi

## 🔧 1. MySQL Veritabanı Kurulumu

### cPanel'de Veritabanı Oluşturma:

1. **cPanel → MySQL Databases**
2. **Create New Database:**
   - Database name: `mms_newsletter`
3. **Create New User:**
   - Username: `mms_user`
   - Password: Güçlü bir şifre belirleyin (not alın!)
4. **Add User to Database:**
   - User'ı database'e ekleyin
   - Tüm yetkileri (ALL PRIVILEGES) verin

### Tabloları Oluşturma:

1. **cPanel → phpMyAdmin**
2. `mms_newsletter` veritabanını seçin
3. **SQL** sekmesine tıklayın
4. `backend/database/mysql-schema.sql` dosyasındaki SQL'i çalıştırın

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

## ⚙️ 3. Environment Variables

### cPanel Node.js App Settings:

1. **cPanel → Setup Node.js App**
2. **Create Application**
3. **Environment Variables** bölümüne şunları ekleyin:

```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com

# MySQL (cPanel prefix'i ekleyin!)
MYSQL_HOST=localhost
MYSQL_USER=cpanelusername_mms_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=cpanelusername_mms_newsletter

# JWT (güvenli bir key oluşturun)
JWT_SECRET=generate-a-random-secret-key-here

# Email (opsiyonel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 🌐 4. Frontend Konfigürasyonu

`frontend/src/lib/config.ts` dosyasında domain'inizi güncelleyin:

```typescript
// Production'da sitenizin domain'ini yazın
const PRODUCTION_DOMAIN = 'https://yourdomain.com';
```

## 📦 5. GitHub Actions Kurulumu

### GitHub Secrets Ekleyin:
Repository → Settings → Secrets → Actions:

- `CPANEL_FTP_HOST`: ftp.yourdomain.com
- `CPANEL_FTP_USER`: cpanel_username
- `CPANEL_FTP_PASSWORD`: cpanel_password

## 🚀 6. Deployment İşlemi

### Otomatik Deployment:
```bash
# Değişiklikleri commit edin
git add .
git commit -m "Update for production"

# Main branch'e push edin (otomatik deploy başlar)
git push origin main
```

### GitHub Actions Kontrol:
- Repository → Actions sekmesinden deployment durumunu izleyin
- Yeşil tick ✅ görünce deployment tamamdır

## ✅ 7. Deployment Sonrası Kontroller

### 1. API Health Check:
```
https://yourdomain.com/api/health
```

### 2. Frontend Kontrol:
- Ana sayfayı açın: https://yourdomain.com
- Newsletter formunu test edin

### 3. Admin Panel Test:
- https://yourdomain.com/admin
- Kullanıcı adı ve şifre ile giriş yapın

### 4. Database Kontrol:
- phpMyAdmin'den newsletter_subscribers tablosunu kontrol edin

## 🛠️ Sorun Giderme

### "Database connection failed"
- MySQL credentials'ları kontrol edin
- cPanel username prefix'ini kontrol edin
- Database user permissions'ları kontrol edin

### "404 Not Found" Hatası
- .htaccess dosyasının oluştuğunu kontrol edin
- Node.js app'in çalıştığını kontrol edin

### "CORS Error"
- FRONTEND_URL environment variable'ını kontrol edin
- https:// prefix'ini eklemeyi unutmayın

## 📁 Dosya Yapısı (cPanel'de)

```
public_html/
├── index.html          (Frontend)
├── assets/            (Frontend assets)
├── .htaccess          (SPA routing)
└── api/               (Backend)
    ├── app.js         (MySQL version)
    ├── config/
    ├── routes/
    └── node_modules/
```

## 🔄 Güncelleme Yapmak

1. Lokal'de değişiklikleri yapın
2. Test edin
3. Git commit & push
4. GitHub Actions otomatik deploy edecek

## 💡 İpuçları

- Her zaman lokal'de test edin
- Database backup'larını düzenli alın
- JWT_SECRET'i güvenli saklayın
- Production loglarını kontrol edin

## 📞 Destek

Sorun yaşarsanız:
1. GitHub Actions loglarını kontrol edin
2. cPanel error loglarını inceleyin
3. Browser console'da hataları kontrol edin 