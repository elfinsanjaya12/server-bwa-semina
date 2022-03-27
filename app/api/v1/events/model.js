const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide title'],
      minlength: 3,
      maxlength: 50,
    },
    price: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      required: [true, 'Please provide date'],
    },
    cover: {
      type: String,
      required: [true, 'Please provide cover'],
    },
    about: {
      type: String,
      required: [true, 'Please provide about'],
    },
    venueName: {
      type: String,
      required: [true, 'Please provide venue name'],
    },
    tagline: {
      type: String,
      required: [true, 'Please provide tagline'],
    },
    keyPoint: {
      type: [String],
      // required: [true, 'Please provide key point'],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    speaker: {
      type: mongoose.Types.ObjectId,
      ref: 'Speaker',
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);
