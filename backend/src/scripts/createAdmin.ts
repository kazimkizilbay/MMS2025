import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Admin } from '../models/Admin';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mms-database';

async function createAdmin() {
  try {
    // MongoDB'ye bağlan
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı');

    // Zaten admin var mı kontrol et
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      console.log('❌ Admin kullanıcısı zaten mevcut!');
      process.exit(0);
    }

    // Yeni admin oluştur
    const admin = new Admin({
      username: 'admin',
      password: 'admin123' // Güvenlik için bunu değiştirin!
    });

    await admin.save();
    console.log('✅ Admin kullanıcısı başarıyla oluşturuldu!');
    console.log('📝 Kullanıcı adı: admin');
    console.log('🔑 Şifre: admin123');
    console.log('⚠️  GÜVENLİK UYARISI: Lütfen şifreyi hemen değiştirin!');

  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin(); 