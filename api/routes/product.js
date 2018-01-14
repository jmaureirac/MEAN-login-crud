'use strict'

var express = require('express');
var api = express.Router();

var ProductController = require('../controllers/product');
var user_auth = require('../middlewares/authentication');


api.get('/prueba-prod', ProductController.prueba);
api.post('/product', user_auth.auth, ProductController.addProduct);
api.get('/product/:id', user_auth.auth, ProductController.getProduct);
api.get('/products', user_auth.auth, ProductController.getAllProducts);
api.get('/products-cat/:id', user_auth.auth, ProductController.getProductsByCat);
api.delete('/product/:id', user_auth.auth, ProductController.deleteProduct);



module.exports = api;
