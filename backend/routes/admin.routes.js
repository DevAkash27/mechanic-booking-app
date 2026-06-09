const express = require('express');
const router = express.Router();

// Dashboard stats
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Dashboard stats' });
});

// Get all bookings
router.get('/bookings', (req, res) => {
  res.json({ message: 'Get all bookings' });
});

// Get all customers
router.get('/customers', (req, res) => {
  res.json({ message: 'Get all customers' });
});

// Revenue reports
router.get('/revenue', (req, res) => {
  res.json({ message: 'Revenue reports' });
});

module.exports = router;
