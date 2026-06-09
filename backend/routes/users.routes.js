const express = require('express');
const router = express.Router();

// Get user profile
router.get('/profile', (req, res) => {
  res.json({ message: 'Get user profile' });
});

// Update profile
router.put('/profile', (req, res) => {
  res.json({ message: 'Update profile' });
});

// Add vehicle
router.post('/vehicles', (req, res) => {
  res.json({ message: 'Add vehicle' });
});

// Get user vehicles
router.get('/vehicles', (req, res) => {
  res.json({ message: 'Get user vehicles' });
});

// Update vehicle
router.put('/vehicles/:id', (req, res) => {
  res.json({ message: 'Update vehicle' });
});

// Delete vehicle
router.delete('/vehicles/:id', (req, res) => {
  res.json({ message: 'Delete vehicle' });
});

module.exports = router;
