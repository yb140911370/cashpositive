var mongoose = require('mongoose');
var config = require('../config');
var Event = require('./Event');

mongoose.connect(config.mongodb);

var Schema = mongoose.Schema;

var commentSchema = new Schema({
  username: String,
  title: String,
  date: Date,
  comment: String
});


var Comment = mongoose.model('Comment', commentSchema);


module.exports = Comment;
