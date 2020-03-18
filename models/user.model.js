const mongoose = require('mongoose')
const crypto = require('crypto')
const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
    required: 'FirstName is required'
  },
  last_name: {
    type: String,
    trim: true,
    required: 'LastName is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  reasons: [{ type: String, trim: true }],
  admin_emails: [{ type: String, trim: true }],
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('User', UserSchema)
