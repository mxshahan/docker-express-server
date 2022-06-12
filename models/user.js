const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'Fullname is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, "Username already exists"],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

exports.UserModel = mongoose.model('user', UserSchema);
