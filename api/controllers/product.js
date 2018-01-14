'use strict'

var Product = require('../models/product');
var Category = require('../models/category');

//var fs = require('fs');
//var path = require('path');

function prueba(req, res){
   return res.status(200).send({message: 'Test Page'});
}

//TODO: add image
function addProduct(req, res){
   var product = new Product();
   var params = req.body;

   if(params.name && params.description && params.prize && params.stock && params.category){
      product.name = params.name;
      product.description = params.description;
      product.prize = params.prize;
      product.stock = params.stock;
      product.category = params.category;

      Product.find({name: product.name}, (err, producto) => {
         if(err) return res.status(200).send({error: 'Error en la petición'});

         if(producto && producto.length > 0) return res.status(404).send({error: 'El producto ya está ingresado'});

         product.image = null;
         product.save((err, productStored) => {
            if(err) return res.status(500).send({error: 'Error en la petición'});

            if(!productStored) return res.status(404).send({error: 'No se pudo ingresar producto'});

            return res.status(200).send({productStored});
         });

      });
   }else{
      return res.status(200).send({error: 'Faltan campos por llenar'});
   }
}

function getProduct(req, res){
   var product_id = req.params.id;

   Product.findById(product_id).populate('category', 'name').exec((err, product) => {
      if(err) return res.status(500).send({error: 'Error en la petición'});

      if(!product) return res.status(404).send({error: 'No existe el producto'});

      return res.status(200).send({product});
   });
}


function getAllProducts(req, res){
   Product.find().populate('category', 'name').sort([['prize', 'asc']]).exec((err, products) => {
      if(err) return res.status(500).send({error: 'Error en la petición'});

      if(!products) return res.status(404).send({error: 'No se encontraron productos'});

      return res.status(200).send({products});
   });
}


function getProductsByCat(req, res){
   var cat = req.params.id;

   Product.find({category: cat}).populate('category', 'name').sort([['prize', 'asc']]).exec((err, products) => {
      if(err) return res.status(500).send({error: 'Error en la petición'});

      if(!products) return res.status(404).send({error: 'No se encontraron productos'});

      return res.status(200).send({products});
   });
}


function deleteProduct(req, res){
   var product_id = req.params.id;

   Product.findById(product_id).remove((err) => {
      if(err) return res.status(500).send({error: 'Error en la petición'});

      return res.status(200).send({message: 'Producto eliminado correctamente'});
   });
}

/**
 *
 */

module.exports = {
   prueba,
   addProduct,
   getProduct,
   getAllProducts,
   getProductsByCat,
   deleteProduct
}
