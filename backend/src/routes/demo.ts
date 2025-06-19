import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

const router = Router();

// Demo request submission
router.post(
  '/request',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('company').trim().isLength({ min: 2 }).withMessage('Company name must be at least 2 characters'),
    body('phone').optional().isMobilePhone('any').withMessage('Please provide a valid phone number'),
    body('message').optional().trim().isLength({ max: 500 }).withMessage('Message must be less than 500 characters'),
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

      const { name, email, company, phone, message, interestedSoftware } = req.body;

      // Create transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'localhost',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Email to company
      const companyMailOptions = {
        from: process.env.FROM_EMAIL || 'noreply@mms.com',
        to: process.env.DEMO_EMAIL || 'demo@mms.com',
        subject: `New Demo Request from ${company}`,
        html: `
          <h2>New Demo Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${interestedSoftware ? `<p><strong>Interested Software:</strong> ${interestedSoftware}</p>` : ''}
          ${message ? `<p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>` : ''}
          <hr>
          <p><em>Please contact this prospect as soon as possible.</em></p>
        `,
      };

      // Confirmation email to user
      const userMailOptions = {
        from: process.env.FROM_EMAIL || 'noreply@mms.com',
        to: email,
        subject: 'Demo Request Received - Marine Management System',
        html: `
          <h2>Thank you for your interest in MMS!</h2>
          <p>Dear ${name},</p>
          <p>We have received your demo request for Marine Management System. Our team will contact you within 24 hours to schedule your personalized demo.</p>
          <p><strong>Your Request Details:</strong></p>
          <ul>
            <li>Company: ${company}</li>
            ${phone ? `<li>Phone: ${phone}</li>` : ''}
            ${interestedSoftware ? `<li>Interested Software: ${interestedSoftware}</li>` : ''}
          </ul>
          <p>In the meantime, feel free to explore our website to learn more about our solutions.</p>
          <p>Best regards,<br>MMS Team</p>
        `,
      };

      // Send both emails
      await Promise.all([
        transporter.sendMail(companyMailOptions),
        transporter.sendMail(userMailOptions),
      ]);

      res.status(200).json({
        success: true,
        message: 'Demo request submitted successfully! We will contact you soon.',
      });
    } catch (error) {
      console.error('Demo request error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit demo request. Please try again later.',
      });
    }
  }
);

export default router; 