import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

const router = Router();

// Demo form submission
router.post(
  '/demo',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Ad en az 2 karakter olmalıdır'),
    body('surname').trim().isLength({ min: 2 }).withMessage('Soyad en az 2 karakter olmalıdır'),
    body('email').isEmail().withMessage('Geçerli bir e-posta adresi giriniz'),
    body('phone').trim().isLength({ min: 10 }).withMessage('Geçerli bir telefon numarası giriniz'),
    body('message').trim().isLength({ min: 10 }).withMessage('Mesaj en az 10 karakter olmalıdır'),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { name, surname, email, phone, company, message } = req.body;

      // Create transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Email content for demo request
      const mailOptions = {
        from: process.env.FROM_EMAIL || 'noreply@marinemanagementsystem.com',
        to: process.env.CONTACT_EMAIL || 'info@marinemanagementsystem.com',
        subject: `MMS Demo Talebi - ${name} ${surname}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
              🚢 Yeni Demo Talebi
            </h2>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">Kişi Bilgileri</h3>
              <p><strong>Ad Soyad:</strong> ${name} ${surname}</p>
              <p><strong>E-posta:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></p>
              ${company ? `<p><strong>Şirket:</strong> ${company}</p>` : ''}
            </div>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">Mesaj</h3>
              <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #059669;">
                <strong>🎯 Aksiyon:</strong> Bu müşteri adayı ile en kısa sürede iletişime geçin ve demo randevusu planlayın.
              </p>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280; text-align: center;">
              Bu e-posta Marine Management System (MMS) demo talep formundan gönderilmiştir.<br>
              <a href="http://www.marinemanagementsystem.com">www.marinemanagementsystem.com</a>
            </p>
          </div>
        `,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      res.status(200).json({
        success: true,
        message: 'Demo talebiniz başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.',
      });
    } catch (error) {
      console.error('Demo form error:', error);
      res.status(500).json({
        success: false,
        message: 'Demo talebi gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.',
      });
    }
  }
);

// Contact form submission
router.post(
  '/',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('subject').trim().isLength({ min: 5 }).withMessage('Subject must be at least 5 characters'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { name, email, subject, message, phone } = req.body;

      // Create transporter (configure with your email service)
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'localhost',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Email content
      const mailOptions = {
        from: process.env.FROM_EMAIL || 'noreply@mms.com',
        to: process.env.CONTACT_EMAIL || 'info@mms.com',
        subject: `MMS Contact Form: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully!',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.',
      });
    }
  }
);

export default router; 