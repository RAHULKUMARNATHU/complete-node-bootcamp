const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'A user must have password'],
  },
});

module.exports = mongoose.model('USer', userSchema);
