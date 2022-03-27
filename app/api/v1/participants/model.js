const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const ParticipantSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide firstName'],
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide lastName'],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

ParticipantSchema.path('email').validate(
  function (value) {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} harus merupakan email yang valid!`
);

ParticipantSchema.path('email').validate(
  async function (value) {
    try {
      const count = await this.model('Participant').countDocuments({
        email: value,
      });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

ParticipantSchema.pre('save', async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

ParticipantSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('Participant', ParticipantSchema);
