'use strict'

var Category = require('../models/category');

function test(req, res){
   return res.status(200).send({message: 'test page'});
}

function addCategory(req, res){
   var params = req.body;
   var category = new Category();
   if(params.name && params.description){
      category.name = params.name;
      category.description = params.description;

      Category.find({name: category.name}).exec((err, categories) => {
         if(err) return res.status(500).send({error: 'Error en la petición'});

         if(categories && categories.length >= 1){
            return res.status(404).send({error: 'Categoría ya ingresada'});
         }

         category.save((err, added) => {
            if(err) return res.status(500).send({error: 'Error en la petición'});

            if(!added) return res.status(404).send({error: 'No se pudo guardar categoría'});

            return res.status(200).send({added});
         });
      });
   }else{
      return res.status(200).send({error: 'Faltan campos por llenar'});
   }
}


function getCategories(req, res){
   Category.find().exec((err, categories) => {
      if(err) return res.status(500).send({error: 'Error en la petición'});

      if(!categories) return res.status(404).send({error: 'No se encontraron categorías'});

      return res.status(200).send({categories});
   });
}


module.exports = {
   test,
   addCategory,
   getCategories
}
