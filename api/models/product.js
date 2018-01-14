'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
   name: String,
   description: String,
   image: String,
   prize: Number,
   stock: Number,
   category: { type: Schema.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Product', ProductSchema);
