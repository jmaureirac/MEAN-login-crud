'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SupplierSchema = Schema({
   name: String,
   address: String,
   contactName: String,
   contactNumber: String,
   email: String,
   city: String,
   region: String,
   country: String,
   homePage: String
});

module.exports = mongoose.model('Supplier', SupplierSchema);
