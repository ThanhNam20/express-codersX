var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  isAdmin: Boolean,
  password: String,
  avatarUrl: String,
  wrongLoginCount: Number
});

var User = mongoose.model('User', userSchema, 'users');
module.exports = User;