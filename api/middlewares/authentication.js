'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret_pass = 'secret_password_mean_simple_crud';

exports.auth = function(req, res, next){
   if(!req.headers.authorization) return res.status(403).send({error: 'La petición no tiene cabecera de autenticación'});

   var token = req.headers.authorization.replace(/['"]+/g, '');

   try{
      var payload = jwt.decode(token, secret_pass);
      if(payload.exp <= moment().unix()) return res.status(401).send({error: 'El token ha expirado'});
   }catch(ex){
      return res.status(404).send({error: 'Token no válido'});
   }

   req.user = payload;

   next();
}
