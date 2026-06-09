const express = require('express');
const router = express.Router();

// Get available slots for a date
router.get('/:date', (req, res) => {
  res.json({ message: 'Get available slots' });
});

// Create slots (admin)
router.post('/', (req, res) => {
  res.json({ message: 'Create slots' });
});

module.exports = router;
