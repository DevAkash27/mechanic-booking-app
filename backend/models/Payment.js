const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  paymentMethod: {
    type: String,
    enum: ['UPI', 'Card', 'NetBanking', 'Wallet'],
  },
  status: {
    type: String,
    enum: ['Pending', 'Success', 'Failed'],
    default: 'Pending',
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
  failureReason: String,
});

module.exports = mongoose.model('Payment', paymentSchema);
