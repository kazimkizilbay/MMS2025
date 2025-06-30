# GitHub Secrets Kurulum Kılavuzu

GitHub Actions ile otomatik deployment için aşağıdaki secrets'ları GitHub repository'nize eklemeniz gerekiyor.

## 🔧 GitHub Secrets'ları Ekleme

### 1. GitHub Repository'ye Gidin
- Repository sayfasında **Settings** > **Secrets and variables** > **Actions** bölümüne gidin

### 2. Mevcut Secrets'ları Güncelleyin/Ekleyin

#### **FTP Deployment Secrets (Mevcut)**
```
CPANEL_FTP_HOST = marinemanagementsystem.com
CPANEL_FTP_USER = marinema@marinemanagementsystem.com
CPANEL_FTP_PASSWORD = [cPanel FTP şifreniz]
```

#### **cPanel API Secrets (YENİ - Node.js App Restart İçin)**
```
CPANEL_USERNAME = marinema
CPANEL_API_TOKEN = [cPanel API token'ınız]
CPANEL_API_URL = https://marinemanagementsystem.com:2083
```

## 🔑 cPanel API Token Oluşturma

### 1. cPanel'e Giriş Yapın
- https://marinemanagementsystem.com:2083 adresine gidin

### 2. API Token Oluşturun
1. **Security** bölümünde **Manage API Tokens** linkine tıklayın
2. **Create Token** butonuna tıklayın
3. Token adı: `github-actions-deployment`
4. İzinler: **Full Access** (veya en azından Node.js App yönetimi)
5. **Create** butonuna tıklayın
6. Oluşturulan token'ı kopyalayın (bu token bir daha gösterilmez!)

### 3. GitHub'a Token'ı Ekleyin
- GitHub > Settings > Secrets > New repository secret
- Name: `CPANEL_API_TOKEN`
- Value: [kopyaladığınız token]

## 🚀 Deployment Tetikleme

Artık GitHub'a kod push'ladığınızda otomatik olarak:

1. ✅ **Frontend build edilir** (React/Vite)
2. ✅ **Backend build edilir** (TypeScript → JavaScript)
3. ✅ **Dosyalar cPanel'e yüklenir** (FTP ile)
4. ✅ **Node.js app yeniden başlatılır** (API ile)
5. ✅ **Deployment test edilir** (HTTP istekleri ile)

## 📋 Test Checklist

Deployment sonrası şunları kontrol edin:

- [ ] **Website**: https://marinemanagementsystem.com
- [ ] **API Health**: https://marinemanagementsystem.com/api/health
- [ ] **Admin Login**: https://marinemanagementsystem.com/admin
  - Username: `admin`
  - Password: `admin123`
- [ ] **GitHub Actions**: Repository > Actions tab'ında build başarılı mı?

## 🛠️ Troubleshooting

### Eğer API 500 hatası devam ederse:

1. **GitHub Actions loglarını kontrol edin**
2. **cPanel Error Logs'u kontrol edin**
3. **Manuel restart yapın**:
   - cPanel > Setup Node.js App
   - STOP APP → START APP
   - Run NPM Install

### Eğer Node.js app restart çalışmazsa:

- cPanel API token'ınızın doğru olduğundan emin olun
- Token'ın gerekli izinlere sahip olduğundan emin olun
- Manuel restart yapın

## 📊 Beklenen Sonuç

Deployment başarılı olduğunda:
- ✅ Website açılır
- ✅ API health endpoint çalışır
- ✅ Admin login 500 hatası vermez (401 veya başarılı login)
- ✅ Newsletter kayıt çalışır 