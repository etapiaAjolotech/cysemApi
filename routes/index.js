var express = require('express');
var router = express.Router();

const productos = [
  {
    condigoProducto: '1209-K-TVH-C3',
    descripcion: 'Morbi at turpis ac turpis pulvinar vehicula. Etiam sit amet justo nulla. Integer',
    marca: 'FAG',
    precio: 400,
    disponibilidad: 22
  },
  {
    condigoProducto: '1209-K-TVH-C3',
    descripcion: 'Morbi at turpis ac turpis pulvinar vehicula. Etiam sit amet justo nulla. Integer',
    marca: 'FAG',
    precio: 400,
    disponibilidad: 22
  },
  {
    condigoProducto: '1209-K-TVH-C3',
    descripcion: 'Morbi at turpis ac turpis pulvinar vehicula. Etiam sit amet justo nulla. Integer',
    marca: 'FAG',
    precio: 400,
    disponibilidad: 22
  },
  {
    condigoProducto: '1209-K-TVH-C3',
    descripcion: 'Morbi at turpis ac turpis pulvinar vehicula. Etiam sit amet justo nulla. Integer',
    marca: 'FAG',
    precio: 400,
    disponibilidad: 22
  }
]
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(productos)
  //res.json({saludos: "hola"})
});

module.exports = router;
