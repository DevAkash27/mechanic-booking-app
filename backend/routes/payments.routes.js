const express = require('express');
const router = express.Router();

// Create Razorpay order
router.post('/create-order', (req, res) => {
  res.json({ message: 'Create Razorpay order' });
});

// Verify payment
router.post('/verify', (req, res) => {
  res.json({ message: 'Verify payment' });
});

// Get payment history
router.get('/history', (req, res) => {
  res.json({ message: 'Get payment history' });
});

module.exports = router;
