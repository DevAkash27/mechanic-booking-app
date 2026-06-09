const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Maintenance', 'Repair', 'Inspection', 'Accessories'],
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    description: 'Duration in minutes',
  },
  image: String,
  packages: [{
    name: String,
    description: String,
    price: Number,
    includes: [String],
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Service', serviceSchema);
