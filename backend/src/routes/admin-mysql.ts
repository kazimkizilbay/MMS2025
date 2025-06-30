import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../config/mysql';

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
    const [rows] = await pool.execute(
      'SELECT * FROM admin_users WHERE username = ?',
      [username]
    );
    const admins = rows as any[];

    if (admins.length === 0) {
      return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
    }

    const admin = admins[0];

    // Şifreyi kontrol et
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
    }

    // JWT token oluştur
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Giriş başarılı',
      token,
      admin: {
        id: admin.id,
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
    const [existing] = await pool.execute(
      'SELECT id FROM admin_users LIMIT 1'
    );

    if ((existing as any[]).length > 0) {
      return res.status(400).json({ error: 'Admin zaten mevcut' });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni admin oluştur
    await pool.execute(
      'INSERT INTO admin_users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

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
    // Aktif aboneler
    const [activeResult] = await pool.execute(
      'SELECT COUNT(*) as count FROM newsletter_subscribers WHERE is_active = 1'
    );
    const totalSubscribers = (activeResult as any[])[0].count;

    // Pasif aboneler
    const [inactiveResult] = await pool.execute(
      'SELECT COUNT(*) as count FROM newsletter_subscribers WHERE is_active = 0'
    );
    const totalUnsubscribed = (inactiveResult as any[])[0].count;
    
    // Son 30 günün kayıtları
    const [recentResult] = await pool.execute(
      'SELECT COUNT(*) as count FROM newsletter_subscribers WHERE is_active = 1 AND subscribed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)'
    );
    const recentSubscribers = (recentResult as any[])[0].count;

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