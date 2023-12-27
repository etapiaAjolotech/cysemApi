const { request, response } = require('express');
const Producto = require('../../models/productModel');


const obtenerProductos = async (req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}

    //Promesas para ejectuar de manera simultanea
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).skip(Number(desde)).limit(Number(limite))
    ]);


    res.json({
        total,
        productos
    });
}

const obtenerProducto = async (req = request, res = response) => {

    const {id} = req.params;

    const producto = await Producto.findById(id);

    res.json({
        msg: 'Producto - id',
        producto
    });
}

const crearProducto = async (req = request, res = response) => {

    const {codigoProducto, descripcion, marca, precio, disponibilidad, estado} = req.body;
    const producto = new Producto({codigoProducto, descripcion, marca, precio, disponibilidad, estado});

    await producto.save();

    res.json({
        msg: 'Creando producto',
        producto
    })
}

const actualizarProducto = async (req = request, res = response) => {
    const {id} = req.params;
    const producto = req.body;

    await Producto.findByIdAndUpdate(id, producto);

    const productoUpdate = await Producto.findById(id)

    res.json({
        msg: 'Actualizar',
        productoUpdate
    })
}

const eliminarProducto = async (req = request, res= response) => {
    const {id} = req.params;

    //Borrado logico de la BD
    await Producto.findByIdAndUpdate(id, {estado: false})
    const producto = await Producto.findById(id)

    res.json({
        msg: 'Producto eliminado'
    })
}


module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}