var mongoose = require('mongoose');
var config = require('../config');
var Comment = require('./Comment');
mongoose.connect(config.mongodb);

var Schema = mongoose.Schema;

var eventSchema = new Schema({
  title: { type: String, required: true, unique: true },
  date: Date,
  location: String,
  organiser: String,
  description: String,
  price: Number    
});


var Event = mongoose.model('Event', eventSchema);


module.exports = Event;
