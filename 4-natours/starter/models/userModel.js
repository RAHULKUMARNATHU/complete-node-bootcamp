const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please Provide password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      /*This only works on CREATE and  SAVE!!! */
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same! ',
    },
  },
});

userSchema.pre('save', async function (next) {
  /*Only run this  function if password was actually modified */
  if (!this.isModified('password')) return next();

  /*Hash the password with cost of 12 */
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

module.exports = mongoose.model('User', userSchema);
