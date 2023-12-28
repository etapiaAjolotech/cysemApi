const { v1: uuidv4 } = require('uuid');
const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../../models/userModel');




// Obtener Datos de usuarios GET method
const getData = async(req, res) => {
    //*Argumentos opcionales mandados desde la URL
    const {limite = 5, desde = 0} = req.query;
    //Query para limitar la candidad de registros y el poder ver solo los usuarios en true
    const query = {estado: true}

    // Promesas para ejecutar ambas de manera simultanea
    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(desde)).limit(Number(limite))
    ]);
    // El CountDocuments nos devuelve la cantidad de registros que tenemos en la BD

    res.json({
        total,
        usuarios
    });
}

// Insertar Datos de usuarios POST method
// req - require
// res - responsive

const inserData = async (req, res = response) => {

    const {id, userName, email, password, rol, estado, phone} = req.body;
    const usuario = new User({id, userName, email, password, rol, estado, phone});
    
    //Se agrega ID con UUID
    usuario.id = uuidv4();
    

    //Encriptar la constraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    // Guardar el objeto en la BD
    await usuario.save();
    
        res.json({
            usuario
        })
}

const updateData = async(req, res) => {
    const {id} = req.params;
    const {password, email, ...resto} = req.body;

    //Validar el password para actualizar
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await User.findOneAndUpdate({ id: id}, {$set: resto});

    res.json({
        usuario
    })
}

const delteData = async(req, res) => {
    const {id} = req.params;

    //Borrado logico de la base de datos
    await User.findOneAndUpdate({ id }, {$set: { estado : false}})
    const usuario = await User.find({id})
    
    res.json({usuario})
}

module.exports = {
    getData,
    inserData,
    updateData,
    delteData
}