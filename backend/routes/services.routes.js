const express = require('express');
const router = express.Router();

// Get all services
router.get('/', (req, res) => {
  res.json({ message: 'Get all services' });
});

// Get single service
router.get('/:id', (req, res) => {
  res.json({ message: 'Get single service' });
});

// Create service (admin)
router.post('/', (req, res) => {
  res.json({ message: 'Create service' });
});

// Update service (admin)
router.put('/:id', (req, res) => {
  res.json({ message: 'Update service' });
});

// Delete service (admin)
router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete service' });
});

module.exports = router;
