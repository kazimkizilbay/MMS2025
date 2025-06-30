import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin';
import { Newsletter } from '../models/Newsletter';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Kullanıcı adı ve şifre gereklidir' });
    }

    // Admin'i bul
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
    }

    // Şifreyi kontrol et
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
    }

    // JWT token oluştur
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Giriş başarılı',
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Giriş yapılamadı' });
  }
});

// Admin oluştur (ilk kurulum için)
router.post('/setup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Zaten admin var mı kontrol et
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin zaten mevcut' });
    }

    // Yeni admin oluştur
    const admin = new Admin({ username, password });
    await admin.save();

    res.status(201).json({ message: 'Admin başarıyla oluşturuldu' });
  } catch (error) {
    console.error('Admin setup error:', error);
    res.status(500).json({ error: 'Admin oluşturulamadı' });
  }
});

// Middleware: Token doğrulama
export const authenticateAdmin = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Yetkilendirme gerekli' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Geçersiz token' });
  }
};

// Newsletter istatistikleri (korumalı route)
router.get('/newsletter/stats', authenticateAdmin, async (req, res) => {
  try {
    const totalSubscribers = await Newsletter.countDocuments({ isActive: true });
    const totalUnsubscribed = await Newsletter.countDocuments({ isActive: false });
    
    // Son 30 günün kayıtları
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentSubscribers = await Newsletter.countDocuments({
      isActive: true,
      subscribedAt: { $gte: thirtyDaysAgo }
    });

    res.json({
      totalSubscribers,
      totalUnsubscribed,
      recentSubscribers,
      total: totalSubscribers + totalUnsubscribed
    });
  } catch (error) {
    console.error('Newsletter stats error:', error);
    res.status(500).json({ error: 'İstatistikler alınamadı' });
  }
});

export default router; 