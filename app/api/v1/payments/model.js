const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Please provide type'],
      minlength: 3,
      maxlength: 50,
    },
    imageUrl: {
      type: String,
      required: [true, 'Please provide imageUrl'],
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);
