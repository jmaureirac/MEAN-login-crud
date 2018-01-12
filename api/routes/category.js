'use strict'

var express = require('express');
var api = express.Router();

var CategoryController = require('../controllers/category');
var user_auth = require('../middlewares/authentication');


api.get('/prueba-cat', CategoryController.test);
api.post('/category', user_auth.auth, CategoryController.addCategory);





module.exports = api;
