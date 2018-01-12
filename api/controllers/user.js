'use strict'

var bcrypt = require('bcrypt-nodejs');
//var mongoosePagination = require('../libraries/pagination');

//var fs = require('fs');
//var path = require('path');

var User = require('../models/user');
var jwt = require('../services/token');

function test(req, res){
   return res.status(200).send({message: 'test page'});
}


function register(req, res){
   var params = req.body;
   var user = new User();
   if(params.name && params.surname && params.email && params.password){
      user.name = params.name;
      user.surname = params.surname;
      user.email = params.email;
      user.role = 'ROLE_USER'
      user.image = null;

      User.find({ $or: [
                     {email: user.email.toLowerCase()}
                     ]
         }).exec((err, users) => {
         if(err) return res.status(500).send({error: 'Error en la petición'});

         if(users && users.length > 0) return res.status(200).send({error: 'Usuario existente'});

         bcrypt.hash(params.password, null, null, (err, hash) => {
            user.password = hash;

            user.save((err, userStored) => {
               if(err) return res.status(500).send({error: 'Error en la petición'});

               if(!userStored) return res.status(404).send({error: 'Error al guardar el usuario'});

               return res.status(200).send({user: userStored});
            });
         });
      });
   }else{
      return res.status(200).send({error: 'Hay campos sin llenar'});
   }
}


function login(req, res){
   var params = req.body;

   if(params.email && params.password){
      var email = params.email;
      var password = params.password;

      User.findOne({email: email}, (err, user) => {
         if(err) return res.status(500).send({error: 'Error en la petición'})

         if(user){
            bcrypt.compare(password, user.password, (err, check) => {
               if(err) return res.status(404).send({error: 'Contraseña incorrecta'});

               if(check){
                  if(params.gettoken){
                     return res.status(200).send({
                        token: jwt.createToken(user)
                     });
                  }else{
                     user.password = undefined;
                     return res.status(200).send({user});
                  }
               }else{
                  return res.status(500).send({error: 'Contraseña incorrecta'});
               }
            });
         }else{
            return res.status(404).send({error: 'Usuario inexistente'});
         }
      });

   }else{
      return res.status(200).send({error: 'Hay campos sin llenar'});
   }

}


function getUser(req, res){
   var user_id = req.params.id;

   User.findById(user_id, (err, user) => {
      if(err) return res.status(500).send({error: 'Error en la petición'});

      if(!user) return res.status(404).send({error: 'Usuario inexistente'});

      user.password = undefined;
      return res.status(200).send({user});
   });
}


function getUsers(req, res){
   User.find().sort('_id').exec((err, users) => {
      if(err) return res.status(500).send({error: 'Error en la petición'});

      if(!users) return res.status(404).send({error: 'Error al cargar usuarios'});

      return res.status(200).send({users});
   });
}


function deleteUser(req, res){
   var user_id = req.params.id;
   if(req.user.role == "ROLE_ADMIN"){
      User.findById(user_id).remove((err) => {
      if(err) return res.status(500).send({error: 'Error en la petición'});

      return res.status(200).send({ message: 'Usuario eliminado'});
      });
   }else{
      return res.status(200).send({error: 'No tienes permisos para eliminar al usuario'});
   }
}


/* TODO: update self // any user
function updateUser(req, res){
   var user_id = req.params.id;

   if(req.user.role == "ROLE_ADMIN"){
      User.findByIdAndUpdate(user_id).exec((err, userUpdated) => {
         if(err) return res.status(500).send({error: 'Error en la petición'});

         if(!userUpdated) return res.status(404).send({error: 'Error al actualizar el usuario'});


      });
   }
}
*/





module.exports = {
   test,
   register,
   login,
   getUser,
   getUsers,
   deleteUser
}
