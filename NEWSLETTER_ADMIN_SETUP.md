# Newsletter ve Admin Panel Kurulum Kılavuzu

## 🚀 Hızlı Başlangıç

### 1. MongoDB Kurulumu

Newsletter sisteminin çalışması için MongoDB gereklidir.

**Windows:**
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) sayfasından indirin
- Kurulum sırasında "Install MongoDB as a Service" seçeneğini işaretleyin
- MongoDB otomatik olarak başlayacaktır

**Mac/Linux:**
```bash
# Mac (Homebrew)
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 2. Backend'i Başlatın

```bash
cd backend
npm install  # Eğer henüz yapmadıysanız
npm run dev
```

Backend http://localhost:3003 adresinde çalışacaktır.

### 3. Admin Kullanıcısı Oluşturma

İlk admin kullanıcısını oluşturmak için:

```bash
cd backend
npx ts-node src/scripts/createAdmin.ts
```

Varsayılan giriş bilgileri:
- **Kullanıcı adı:** admin
- **Şifre:** admin123

⚠️ **GÜVENLİK UYARISI:** İlk girişten sonra şifreyi mutlaka değiştirin!

### 4. Frontend'i Başlatın

```bash
cd frontend
npm run dev
```

Frontend http://localhost:5173 adresinde çalışacaktır.

## 📧 Newsletter Sistemi

### Kullanıcı Tarafı
- Ana sayfanın footer bölümünde newsletter kayıt formu bulunur
- Kullanıcılar email adreslerini girerek abone olabilirler
- Sistem otomatik olarak duplicate kontrolü yapar

### Admin Panel
- http://localhost:5173/admin adresinden giriş yapın
- Dashboard'da görüntüleyebilirsiniz:
  - Toplam abone sayısı
  - Aktif aboneler
  - Son 30 günün kayıtları
  - Email listesi
- CSV olarak dışa aktarma özelliği

## 🔧 Yapılandırma

### Environment Variables

Backend `.env` dosyasına ekleyin:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/mms-database

# JWT Secret (değiştirin!)
JWT_SECRET=your-super-secret-jwt-key-change-this
```

## 📊 Admin Panel Özellikleri

1. **İstatistikler**
   - Aktif abone sayısı
   - Toplam kayıt sayısı
   - Son 30 günün yeni aboneleri
   - İptal eden kullanıcılar

2. **Email Listesi**
   - Tüm aboneleri görüntüleme
   - Kayıt tarihlerine göre sıralama
   - CSV formatında dışa aktarma
   - Gerçek zamanlı yenileme

3. **Güvenlik**
   - JWT tabanlı authentication
   - 24 saatlik token süresi
   - Otomatik logout

## 🛠️ Sorun Giderme

### MongoDB Bağlantı Hatası
```
❌ MongoDB bağlantı hatası: ...
```
**Çözüm:** MongoDB servisinin çalıştığından emin olun.

### Admin Girişi Çalışmıyor
**Çözüm:** Admin kullanıcısının oluşturulduğundan emin olun (Adım 3).

### Newsletter Kaydı Başarısız
**Çözüm:** 
1. Backend'in çalıştığını kontrol edin
2. MongoDB bağlantısını kontrol edin
3. CORS ayarlarının doğru olduğundan emin olun

## 🔐 Güvenlik Önerileri

1. **Production için:**
   - JWT_SECRET'i güçlü ve rastgele bir değerle değiştirin
   - Admin şifresini hemen değiştirin
   - HTTPS kullanın
   - Rate limiting ekleyin

2. **Veritabanı Güvenliği:**
   - MongoDB'ye authentication ekleyin
   - Firewall kuralları oluşturun
   - Düzenli backup alın

## 📝 API Endpoints

### Newsletter
- `POST /api/newsletter/subscribe` - Email kaydı
- `GET /api/newsletter/list` - Aboneleri listele
- `PUT /api/newsletter/unsubscribe` - Abonelikten çık

### Admin
- `POST /api/admin/login` - Admin girişi
- `POST /api/admin/setup` - İlk admin oluşturma
- `GET /api/admin/newsletter/stats` - İstatistikler (korumalı)

## 🎯 Gelecek Özellikler

- [ ] Email doğrulama
- [ ] Otomatik hoşgeldin emaili
- [ ] Toplu email gönderimi
- [ ] A/B testing
- [ ] Detaylı analitik
- [ ] Export formatları (Excel, PDF)
- [ ] Multi-admin desteği

---

**Not:** Bu basit bir newsletter sistemidir. Production kullanımı için ek güvenlik önlemleri ve email servisi entegrasyonu önerilir. 