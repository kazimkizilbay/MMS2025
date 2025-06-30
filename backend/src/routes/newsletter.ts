import { Router } from 'express';
import { Newsletter } from '../models/Newsletter';

const router = Router();

// Newsletter kaydı
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email adresi gereklidir' });
    }

    // Email'in zaten kayıtlı olup olmadığını kontrol et
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Bu email adresi zaten kayıtlı' });
    }

    // Yeni kayıt oluştur
    const newsletter = new Newsletter({ email });
    await newsletter.save();

    res.status(201).json({ 
      message: 'Newsletter kaydınız başarıyla alındı!',
      email: newsletter.email 
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Bir hata oluştu, lütfen tekrar deneyin' });
  }
});

// Tüm email'leri listele (Admin için)
router.get('/list', async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ isActive: true })
      .sort({ subscribedAt: -1 })
      .select('email subscribedAt');
    
    res.json({
      total: subscribers.length,
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

    const newsletter = await Newsletter.findOneAndUpdate(
      { email },
      { isActive: false },
      { new: true }
    );

    if (!newsletter) {
      return res.status(404).json({ error: 'Email bulunamadı' });
    }

    res.json({ message: 'Email listeden çıkarıldı' });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({ error: 'İşlem başarısız' });
  }
});

export default router; 