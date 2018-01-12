'use strict'

var express = require('express');
var api = express.Router();

var UserController = require('../controllers/user');
var user_auth = require('../middlewares/authentication');

// rutas
api.get('/prueba', UserController.test);
api.post('/login', UserController.login);
api.get('/user/:id', user_auth.auth, UserController.getUser);
api.get('/users', user_auth.auth, UserController.getUsers);
api.post('/register', UserController.register);
api.delete('/user/:id', user_auth.auth, UserController.deleteUser);





module.exports = api;
