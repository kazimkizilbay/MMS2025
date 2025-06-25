# Marine Management System (MMS) 🚢

**🚀 Otomatik Deployment Aktif - GitHub Actions ile CPanel'e otomatik deploy edilir**
**🔍 DEBUGGING: Files not appearing - Investigating FTP deployment issue**

Modern, çok dilli ve tema destekli gemi inşa sektörü ERP çözümü. TypeScript, React, Node.js ve MySQL ile geliştirilmiştir.

## 🌟 Özellikler

- **Modern UI/UX**: Linear ve Framer tarzında modern tasarım
- **Çok Dil Desteği**: Türkçe, İngilizce, Almanca (genişletilebilir)
- **Tema Desteği**: Açık, koyu ve sistem teması
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **TypeScript**: Tip güvenliği ve geliştirici deneyimi
- **Modern Stack**: React 18, Vite, Tailwind CSS, Node.js, Express

## 🏗️ Proje Yapısı

```
MMS2025/
├── frontend/                 # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/      # UI bileşenleri
│   │   │   ├── layout/     # Layout bileşenleri
│   │   │   ├── sections/   # Sayfa bölümleri
│   │   │   ├── ui/         # Temel UI bileşenleri
│   │   │   └── providers/  # Context sağlayıcıları
│   │   ├── lib/            # Yardımcı kütüphaneler
│   │   ├── styles/         # CSS dosyaları
│   │   └── pages/          # Sayfa bileşenleri
│   ├── public/
│   │   └── locales/        # Çeviri dosyaları
│   └── package.json
├── backend/                 # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── routes/         # API rotaları
│   │   ├── middleware/     # Express middleware'leri
│   │   ├── controllers/    # İş mantığı
│   │   └── utils/          # Yardımcı fonksiyonlar
│   └── package.json
└── README.md
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- Node.js 18+ 
- npm veya yarn
- MySQL (CPanel üzerinde)

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/yourusername/MMS2025.git
cd MMS2025
```

### 2. Frontend Kurulumu

```bash
cd frontend
npm install
npm run dev
```

Frontend http://localhost:5173 adresinde çalışacaktır.

### 3. Backend Kurulumu

```bash
cd backend
npm install

# Environment dosyasını oluşturun
cp env.example .env
# .env dosyasını düzenleyin

npm run dev
```

Backend http://localhost:3001 adresinde çalışacaktır.

## 🌐 Çok Dil Desteği

Proje i18next kullanarak çok dil desteği sağlar:

- **Türkçe** (tr) - Varsayılan
- **İngilizce** (en)
- **Almanca** (de)

### Yeni Dil Ekleme

1. `frontend/public/locales/` klasörüne yeni dil klasörü oluşturun
2. `common.json` dosyasını kopyalayıp çevirin
3. `LanguageSelector.tsx` bileşenine yeni dili ekleyin

## 🎨 Tema Sistemi

Proje açık, koyu ve sistem teması destekler:

- **Açık Tema**: Beyaz arka plan, koyu metin
- **Koyu Tema**: Koyu arka plan, açık metin  
- **Sistem Teması**: İşletim sistemi tercihini takip eder

Tema tercihi localStorage'da saklanır.

## 📱 Responsive Tasarım

Tailwind CSS kullanılarak responsive tasarım:

- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 🔧 Geliştirme

### Frontend Komutları

```bash
npm run dev          # Geliştirme sunucusu
npm run build        # Üretim build'i
npm run preview      # Build önizlemesi
npm run lint         # ESLint kontrolü
npm run lint:fix     # ESLint otomatik düzeltme
```

### Backend Komutları

```bash
npm run dev          # Geliştirme sunucusu (nodemon)
npm run build        # TypeScript build
npm run start        # Üretim sunucusu
npm run lint         # ESLint kontrolü
npm run lint:fix     # ESLint otomatik düzeltme
```

## 🚀 CPanel'e Deploy

### Frontend Deploy

1. Build oluşturun:
```bash
cd frontend
npm run build
```

2. `dist/` klasörünü CPanel'deki `public_html/` klasörüne yükleyin

3. `.htaccess` dosyası oluşturun:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Backend Deploy

1. Build oluşturun:
```bash
cd backend
npm run build
```

2. Dosyaları CPanel'e yükleyin
3. CPanel Node.js App Manager'dan uygulamayı yapılandırın
4. Environment değişkenlerini ayarlayın

## 🔐 Environment Değişkenleri

### Backend (.env)

```env
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

## 📊 Özellikler

### Mevcut Özellikler

- ✅ Modern, responsive tasarım
- ✅ Çok dil desteği (TR, EN, DE)
- ✅ Tema desteği (açık/koyu/sistem)
- ✅ İletişim formu
- ✅ Demo talep formu
- ✅ Email bildirimleri
- ✅ TypeScript desteği
- ✅ ESLint + Prettier

### Gelecek Özellikler

- 🔄 Kullanıcı yönetimi
- 🔄 Veritabanı entegrasyonu
- 🔄 Admin paneli
- 🔄 Blog sistemi
- 🔄 SEO optimizasyonu
- 🔄 PWA desteği
- 🔄 Unit testler

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 👥 Ekip

- **Gemi Mühendisi** - Sektör uzmanlığı
- **Bilgisayar Mühendisi** - Backend geliştirme
- **Elektrik-Elektronik Mühendisi** - Frontend geliştirme

## 📞 İletişim

- **Website**: https://yourdomain.com
- **Email**: info@yourdomain.com
- **Demo**: demo@yourdomain.com

---

**Marine Management System** - Gemi inşa sektörünün dijital dönüşümü için geliştirilmiştir. 🚢 