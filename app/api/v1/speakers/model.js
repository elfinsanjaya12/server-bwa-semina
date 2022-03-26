const mongoose = require('mongoose');

const SpeakerSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 50,
    },

    avatar: {
      type: String,
      required: true,
      default: 'default.png',
    },

    role: {
      type: String,
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

module.exports = mongoose.model('Speaker', SpeakerSchema);
