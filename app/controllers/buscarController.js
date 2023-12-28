const { response, request } = require("express");
const { validate: uuidValidate } = require('uuid');
const User = require('../../models/userModel');
const Producto = require('../../models/productModel');
const { ObjectId } = require("mongodb");


const coleccionesPermitidas = [
    'usuarios',
    'productos',
    'roles'
];

const buscarUsuario = async(termino = '', res = response) => {
    const esIdValido = uuidValidate(termino); // respuesra true o false

    if ( esIdValido ){
        const usuario = await User.findOne({ id : termino});
        res.json({
            results : (usuario) ? [usuario] : []
        });
    }

    //Expresion regular
    const regex = new RegExp( termino, 'i');

    const usuarios = await User.find({
        $or: [{userName: regex}, {email: regex}],
        $and: [{ estado : true}]
    });

    res.json({
        results: usuarios
    })
}

const bucarProducto = async(termino = '', res = response) => {
    const esMongoID = ObjectId.isValid( termino ); // respuesta true o false
    
    if( esMongoID ){
        const producto = await Producto.findById(termino)
        res.json({
            results: (producto) ? [producto] : []
        })
    }

    //Expresion regular
    const regex = new RegExp( termino, 'i');

    const productos = await Producto.find({
        $or: [{codigoProducto: regex }, {marca: regex}],
        $and: [{estado: true}]
    });

    res.json({
        results: productos
    })
}


const buscador = (req = request, res = response) => {
    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: 'No existe la coleccion solicitada'
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res)
            break;
        case 'productos':
            bucarProducto(termino, res)
            break;
    
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }
}


module.exports = {
    buscador
}