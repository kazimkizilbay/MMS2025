# cPanel Deployment Sorun Çözüm Kılavuzu

## 🔴 Mevcut Sorun
- Admin login'de 500 Internal Server Error alınıyor
- API endpoint'leri düzgün çalışmıyor
- TypeScript derlenmiş dosyalar (dist klasörü) cPanel'de eksik

## ✅ Çözüm Adımları

### 1. Backend Klasörünü Hazırlama

Backend klasöründe aşağıdaki komutu çalıştırın:
```bash
cd backend
node prepare-deployment.js
```

Bu komut:
- TypeScript dosyalarını derler
- `deploy/` klasörü oluşturur
- Gerekli dosyaları kopyalar

### 2. cPanel'e Dosya Yükleme

1. cPanel Dosya Yöneticisi'ni açın
2. `public_html/api` klasörüne gidin
3. Mevcut dosyaları yedekleyin
4. `backend/deploy/` klasöründeki TÜM dosya ve klasörleri yükleyin:
   - `app.js`
   - `package.json`
   - `package-lock.json`
   - `dist/` klasörü (TÜM İÇERİĞİYLE)
   - `database/` klasörü
   - `.htaccess` (varsa)

### 3. cPanel Node.js Uygulamasını Yeniden Başlatma

1. cPanel > Setup Node.js App bölümüne gidin
2. "STOP APP" butonuna tıklayın
3. Birkaç saniye bekleyin
4. "START APP" butonuna tıklayın

### 4. NPM Paketlerini Yükleme (Gerekirse)

cPanel terminal veya SSH üzerinden:
```bash
cd ~/public_html/api
npm install --production
```

### 5. Environment Değişkenlerini Kontrol Etme

cPanel Node.js App ayarlarında şu değişkenlerin doğru olduğundan emin olun:
- `NODE_ENV`: production
- `MYSQL_HOST`: localhost
- `MYSQL_USER`: marinema_superadmin
- `MYSQL_PASSWORD`: kk197.xj.
- `MYSQL_DATABASE`: marinema_admin
- `JWT_SECRET`: mms-jwt-secret-key-2025
- `FRONTEND_URL`: https://marinemanagementsystem.com

### 6. Test Etme

1. Önce health endpoint'ini test edin:
   ```
   https://marinemanagementsystem.com/api/health
   ```

2. Admin login'i test edin:
   - Kullanıcı adı: `admin`
   - Şifre: `admin123`

## 🛠️ Hata Ayıklama

### Eğer hala 500 hatası alıyorsanız:

1. **Log dosyalarını kontrol edin:**
   - cPanel > Errors bölümünden hataları inceleyin
   - Node.js app loglarını kontrol edin

2. **Dosya izinlerini kontrol edin:**
   ```bash
   chmod 755 app.js
   chmod -R 755 dist/
   ```

3. **MySQL bağlantısını test edin:**
   - phpMyAdmin'den `marinema_admin` veritabanına bağlanın
   - `admin_users` tablosunun var olduğunu kontrol edin

## 📝 Önemli Notlar

- TypeScript dosyaları (`*.ts`) production'da ÇALIŞMAZ
- Sadece derlenmiş JavaScript dosyaları (`dist/*.js`) çalışır
- `app.js` dosyası `dist/app-mysql.js` dosyasını çağırmalı
- Environment değişkenleri doğru tanımlanmalı

## 🚀 Başarılı Deployment Kontrolü

Aşağıdaki endpoint'ler çalışmalı:
- GET `/api/health` - Sistem durumu
- POST `/api/admin/login` - Admin girişi
- POST `/api/newsletter/subscribe` - Newsletter kayıt
- GET `/api/admin/newsletter/stats` - İstatistikler (token gerekli) 