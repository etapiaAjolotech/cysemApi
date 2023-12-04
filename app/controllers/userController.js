const { v1: uuidv1 } = require('uuid');
const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../../models/userModel');




// Obtener Datos de usuarios GET method
const getData = (req, res) => {

    
    try {
        const arrayUser = User.find()
        res.json(arrayUser);
    }catch (error) {
        console.log(error)
    }
}

// Insertar Datos de usuarios POST method
// req - require
// res - responsive

const inserData = async (req, res = response) => {

    const {id, userName, email, password, rol, estado, phone} = req.body;
    const usuario = new User({id, userName, email, password, rol, estado, phone});

    //Se agrega ID con UUID
    usuario.id = uuidv1();
    

    //Encriptar la constraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    // Guardar el objeto en la BD
    await usuario.save();
    
        res.json({
            usuario
        })
}

module.exports = {
    inserData,
    getData
}