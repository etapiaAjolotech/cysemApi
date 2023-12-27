const {response} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../../models/userModel');
const {generarJWT} = require('../../helpers/generar-jwt')

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar si el Email existe
        const usuario = await User.findOne({email});

        if(!usuario){
            
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            });
        }
        

        //Si el usuario esta activo
        if(!usuario.estado){
            
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado: false '
            });
        }

        // Verificar la contraseña

        const validPassword = bcryptjs.compareSync(password, usuario.password );
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password: false '
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            msg: "Login Ok",
            usuario,
            token
        })

    } catch (error){
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }
    
}

module.exports = {
    login
};