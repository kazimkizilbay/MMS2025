# CPanel Deploy Rehberi 🚀

Bu rehber, Marine Management System projesini CPanel üzerinde nasıl deploy edeceğinizi adım adım açıklar.

## 📋 Gereksinimler

- CPanel erişimi
- Node.js desteği (CPanel'de Node.js App Manager)
- MySQL veritabanı
- FTP/File Manager erişimi
- Domain/subdomain

## 🎯 Frontend Deploy (React App)

### 1. Build Oluşturma

```bash
cd frontend
npm install
npm run build
```

### 2. CPanel'e Upload

1. **File Manager** açın
2. `public_html/` klasörüne gidin (veya subdomain klasörüne)
3. `dist/` klasöründeki tüm dosyaları upload edin
4. Dosya yapısı şöyle olmalı:
   ```
   public_html/
   ├── index.html
   ├── assets/
   ├── locales/
   └── diğer dosyalar...
   ```

### 3. .htaccess Dosyası

`public_html/` klasöründe `.htaccess` dosyası oluşturun:

```apache
# React Router için SPA routing
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# GZIP Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache Control
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>
```

## 🔧 Backend Deploy (Node.js API)

### 1. Build Oluşturma

```bash
cd backend
npm install
npm run build
```

### 2. CPanel Node.js App Setup

1. **CPanel** → **Node.js App** açın
2. **Create Application** tıklayın
3. Ayarları yapın:
   - **Node.js Version**: 18.x veya üzeri
   - **Application Mode**: Production
   - **Application Root**: `api/` (veya istediğiniz klasör)
   - **Application URL**: `yourdomain.com/api`
   - **Application Startup File**: `dist/app.js`

### 3. Dosyaları Upload

1. **File Manager** ile backend klasörüne gidin
2. Şu dosyaları upload edin:
   ```
   api/
   ├── dist/           # Build çıktıları
   ├── node_modules/   # Dependencies (npm install ile)
   ├── package.json
   └── .env           # Environment variables
   ```

### 4. Environment Variables

CPanel Node.js App Manager'da Environment Variables bölümüne ekleyin:

```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com

# Email Settings
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-email-password
FROM_EMAIL=noreply@yourdomain.com
CONTACT_EMAIL=info@yourdomain.com
DEMO_EMAIL=demo@yourdomain.com

# Database (eğer kullanacaksanız)
DATABASE_URL=mysql://username:password@localhost:3306/database_name
```

### 5. Dependencies Yükleme

CPanel Terminal veya SSH ile:

```bash
cd ~/api  # Backend klasörünüze gidin
npm install --production
```

### 6. Uygulamayı Başlatma

Node.js App Manager'da **Start** butonuna tıklayın.

## 🗄️ MySQL Veritabanı (Opsiyonel)

### 1. Veritabanı Oluşturma

1. **CPanel** → **MySQL Databases**
2. Yeni veritabanı oluşturun: `yourusername_mms`
3. Kullanıcı oluşturun ve veritabanına assign edin

### 2. Connection String

```
DATABASE_URL="mysql://username:password@localhost:3306/yourusername_mms"
```

## 🔍 Test ve Doğrulama

### Frontend Test

1. `https://yourdomain.com` adresini ziyaret edin
2. Tüm sayfaların yüklendiğini kontrol edin
3. Dil değiştirme çalışıyor mu?
4. Tema değiştirme çalışıyor mu?

### Backend Test

1. `https://yourdomain.com/api/health` adresini test edin
2. Yanıt: `{"status":"OK","timestamp":"...","uptime":...}`

### API Endpoints Test

```bash
# Health check
curl https://yourdomain.com/api/health

# Contact form test (POST)
curl -X POST https://yourdomain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test message"}'
```

## 🐛 Sorun Giderme

### Frontend Sorunları

**Problem**: Sayfa yenilendiğinde 404 hatası
**Çözüm**: `.htaccess` dosyasının doğru yapılandırıldığından emin olun

**Problem**: Statik dosyalar yüklenmiyor
**Çözüm**: Dosya yollarını ve izinleri kontrol edin

### Backend Sorunları

**Problem**: Node.js uygulaması başlamıyor
**Çözüm**: 
- Environment variables doğru mu?
- `package.json` ve `dist/app.js` var mı?
- CPanel error loglarını kontrol edin

**Problem**: Email gönderilmiyor
**Çözüm**: SMTP ayarlarını ve CPanel email konfigürasyonunu kontrol edin

### Genel Sorunlar

**Problem**: CORS hatası
**Çözüm**: Backend'de `FRONTEND_URL` environment variable'ını doğru ayarlayın

**Problem**: SSL sertifikası
**Çözüm**: CPanel'de Let's Encrypt SSL'i aktifleştirin

## 📊 Performans Optimizasyonu

### Frontend

1. **Gzip compression** aktif
2. **Cache headers** ayarlandı
3. **Asset optimization** yapıldı

### Backend

1. **Production mode** aktif
2. **Rate limiting** yapılandırıldı
3. **Security headers** eklendi

## 🔄 Güncelleme Süreci

### Frontend Güncelleme

```bash
# Yerel geliştirme
cd frontend
npm run build

# CPanel'e upload
# dist/ klasörünü public_html/'ye kopyalayın
```

### Backend Güncelleme

```bash
# Yerel geliştirme
cd backend
npm run build

# CPanel'e upload ve restart
# Node.js App Manager'da "Restart" tıklayın
```

## 📞 Destek

Sorun yaşadığınızda:

1. CPanel error loglarını kontrol edin
2. Browser developer console'u kontrol edin
3. Network tabında API çağrılarını kontrol edin
4. Hosting sağlayıcınızdan destek alın

---

**Not**: Bu rehber genel CPanel konfigürasyonu içindir. Hosting sağlayıcınızın özel ayarları olabilir. 