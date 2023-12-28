const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')



const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try{
        const {id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await User.findOne({id});

        //Verifica que el usuario logeado venga información.
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - El usuario no existe en BD'
            });
        }

        //Verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado false'
            });
        }


        req.usuario = usuario;
        next();
    } catch(error){
        console.log(error)
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}