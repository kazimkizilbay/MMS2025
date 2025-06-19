import { Router } from 'express';

const router = Router();

// Simple auth endpoints for future use
router.get('/status', (req, res) => {
  res.json({
    success: true,
    message: 'Auth service is running',
  });
});

export default router; 