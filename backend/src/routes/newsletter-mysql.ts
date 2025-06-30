import { Router } from 'express';
import pool from '../config/mysql';

const router = Router();

// Newsletter kaydı
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email adresi gereklidir' });
    }

    // Email'in zaten kayıtlı olup olmadığını kontrol et
    const [existing] = await pool.execute(
      'SELECT id FROM newsletter_subscribers WHERE email = ?',
      [email]
    );

    if ((existing as any[]).length > 0) {
      return res.status(400).json({ error: 'Bu email adresi zaten kayıtlı' });
    }

    // Yeni kayıt oluştur
    await pool.execute(
      'INSERT INTO newsletter_subscribers (email) VALUES (?)',
      [email]
    );

    res.status(201).json({ 
      message: 'Newsletter kaydınız başarıyla alındı!',
      email: email 
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Bir hata oluştu, lütfen tekrar deneyin' });
  }
});

// Tüm email'leri listele (Admin için)
router.get('/list', async (req, res) => {
  try {
    const [subscribers] = await pool.execute(
      'SELECT id, email, subscribed_at FROM newsletter_subscribers WHERE is_active = 1 ORDER BY subscribed_at DESC'
    );
    
    res.json({
      total: (subscribers as any[]).length,
      subscribers
    });
  } catch (error) {
    console.error('Newsletter list error:', error);
    res.status(500).json({ error: 'Email listesi alınamadı' });
  }
});

// Email'i pasif yap (unsubscribe)
router.put('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    const [result] = await pool.execute(
      'UPDATE newsletter_subscribers SET is_active = 0 WHERE email = ?',
      [email]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Email bulunamadı' });
    }

    res.json({ message: 'Email listeden çıkarıldı' });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({ error: 'İşlem başarısız' });
  }
});

export default router; 