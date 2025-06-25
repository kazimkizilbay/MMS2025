# CPanel Otomatik Deployment Rehberi

Bu rehber, GitHub Actions kullanarak projenizi otomatik olarak CPanel'e deploy etmenizi sağlar.

## 🚀 Otomatik Deployment Kurulumu

### 1. GitHub Secrets Ayarlama

GitHub repository'nizde Settings > Secrets and Variables > Actions bölümüne gidin ve şu secrets'ları ekleyin:

```
CPANEL_FTP_HOST=kayizer.com
CPANEL_FTP_USER=marinema
CPANEL_FTP_PASSWORD=your-cpanel-password
```

### 2. CPanel FTP Bilgileri

**FTP Host**: `kayizer.com`
**FTP Port**: `21` (varsayılan)
**Username**: CPanel kullanıcı adınız
**Password**: CPanel şifreniz

### 3. Deployment Yapısı

```
CPanel Dizin Yapısı:
├── public_html/          # Frontend (React app)
│   ├── index.html
│   ├── assets/
│   └── .htaccess
├── api/                  # Backend (Node.js API)
│   ├── app.js
│   ├── package.json
│   └── routes/
└── logs/                 # Log dosyaları
```

## 🔄 Otomatik Deployment Süreci

### Tetikleyiciler
- `main` branch'e push
- `main` branch'e pull request

### Adımlar
1. **Code Checkout**: Repository kodunu indir
2. **Node.js Setup**: Node.js 18 kurulumu
3. **Dependencies**: Frontend ve backend bağımlılıklarını yükle
4. **Build**: Frontend ve backend'i build et
5. **Deploy Frontend**: `frontend/dist/` → `/public_html/`
6. **Deploy Backend**: `backend/dist/` → `/api/`

## 📁 Dosya Yapısı

### Frontend Deployment
- **Kaynak**: `./frontend/dist/`
- **Hedef**: `/public_html/`
- **İçerik**: React build dosyaları, .htaccess

### Backend Deployment
- **Kaynak**: `./backend/dist/`
- **Hedef**: `/api/`
- **İçerik**: Compiled JavaScript files, package.json

## 🔧 CPanel Node.js App Ayarları

### 1. Node.js App Oluşturma
1. CPanel > Node.js Apps
2. "Create Application" tıklayın
3. **Node.js Version**: 18.x
4. **Application Root**: `api`
5. **Application URL**: `yourdomain.com/api`
6. **Application Startup File**: `app.js`

### 2. Environment Variables
```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@yourdomain.com
CONTACT_EMAIL=info@yourdomain.com
DEMO_EMAIL=demo@yourdomain.com
```

### 3. Package.json Dependencies
```json
{
  "name": "mms-backend",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "nodemailer": "^6.9.7",
    "express-rate-limit": "^7.1.5"
  }
}
```

## 🌍 Domain Ayarları

### 1. Frontend URL
- **Ana Domain**: `https://yourdomain.com`
- **Test URL**: `https://yourdomain.com/index.html`

### 2. Backend API URL
- **API Base**: `https://yourdomain.com/api`
- **Health Check**: `https://yourdomain.com/api/health`

### 3. SSL Sertifikası
CPanel > SSL/TLS > Let's Encrypt ile ücretsiz SSL aktif edin.

## 🔍 Deployment Kontrolü

### 1. Frontend Kontrolü
```bash
curl -I https://yourdomain.com
# HTTP/1.1 200 OK olmalı
```

### 2. Backend Kontrolü
```bash
curl https://yourdomain.com/api/health
# {"status": "OK", "timestamp": "..."} dönmeli
```

### 3. Log Kontrolü
CPanel > Error Logs bölümünden hata loglarını kontrol edin.

## 🚨 Sorun Giderme

### 1. Build Hataları
- GitHub Actions logs kontrol edin
- Package.json dependencies güncel mi?
- Node.js version uyumlu mu?

### 2. FTP Hataları
- FTP credentials doğru mu?
- FTP host erişilebilir mi?
- Dosya izinleri uygun mu?

### 3. Runtime Hataları
- CPanel error logs kontrol edin
- Environment variables set edildi mi?
- Node.js app restart yapın

## 📊 Monitoring

### 1. GitHub Actions
- Repository > Actions tab
- Build ve deploy durumunu izleyin
- Hata loglarını inceleyin

### 2. CPanel Monitoring
- Node.js Apps > Application status
- Error Logs > Real-time monitoring
- Metrics > Resource usage

## 🔄 Manual Deployment (Yedek Yöntem)

### Frontend
```bash
cd frontend
npm run build
# dist/ klasörünü public_html/'e yükle
```

### Backend
```bash
cd backend
npm run build
# dist/ ve package.json'u api/ klasörüne yükle
```

## 📞 Destek

Deployment sorunları için:
1. GitHub Actions logs kontrol edin
2. CPanel error logs inceleyin
3. FTP connection test yapın
4. Node.js app restart deneyin

---

**Not**: İlk deployment'tan sonra GitHub'a her push'ta otomatik olarak site güncellenecektir. 