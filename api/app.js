'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var user_routes = require('./routes/user');
var category_routes = require('./routes/category');
var product_routes = require('./routes/product');


// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});


// rutas
app.use('/api', user_routes);
app.use('/api', category_routes);
app.use('/api', product_routes);


// exportar modulo app
module.exports = app;
