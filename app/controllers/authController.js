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

        //Comprobar si el usuario esta confirmado
        if(!usuario.confirmado){
            const error = new Error('El usuario no esta confirmado');
            return res.status(404).json({msg: error.message})
        }

        // Verificar la contraseña

        if(await usuario.comprobarPassword(password)){
            const token = await generarJWT(usuario.id)
            res.json({
                msg: 'Login Ok',
                _id: usuario._id,
                id: usuario.id,
                userName: usuario.userName,
                email: usuario.email,
                token: token
            })
        }else{
            const error = new Error('El password no es correcto');
            return res.status(403).json({msg: error.message})
        }

        /*const validPassword = bcryptjs.compareSync(password, usuario.password );
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password: false '
            });
        }*/

        //Generar el JWT
       /* const token = await generarJWT(usuario.id)

        res.json({
            msg: "Login Ok",
            usuario,
            token
        })*/

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