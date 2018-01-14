'use strict'

var express = require('express');
var api = express.Router();

var CategoryController = require('../controllers/category');
var user_auth = require('../middlewares/authentication');


api.get('/prueba-cat', CategoryController.test);
api.post('/category', user_auth.auth, CategoryController.addCategory);
api.get('/categories', user_auth.auth, CategoryController.getCategories);




module.exports = api;
