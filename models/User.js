var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.mongodb);

var Schema = mongoose.Schema;

//This model contains User document in which it has name,username,type comment attributes  
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: Number,  
  created_at: Date  
});


var User = mongoose.model('User', userSchema);


module.exports = User;
