const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 3},
  location: {type: String, required: true},
  language: {type: String, required: true},
  comment: {type: String, required: true},
  stampdate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);
