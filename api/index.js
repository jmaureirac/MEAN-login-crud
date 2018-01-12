'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

// conectar db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mean_simple_crud', { useMongoClient: true })
    .then( () => {
      console.log('Conexión exitosa');

      app.listen(port, () => {
        console.log('Servidor corriendo en http://localhost:3800');
      });
    })
    .catch( err => console.log(err));
