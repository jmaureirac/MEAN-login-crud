'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CatergorySchema = Schema({
   name: String,
   description: String
});

module.exports = mongoose.model('Category', CatergorySchema);
