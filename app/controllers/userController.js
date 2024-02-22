const { v1: uuidv4 } = require('uuid');
const {response, request} = require('express');
const User = require('../../models/userModel');
const {generarId} = require('../../helpers/generarID')
const {emailRegistro} = require('../../helpers/emails')




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

    usuario.token = generarId();


    // Guardar el objeto en la BD
    try{
        await usuario.save();
        emailRegistro({
            userName: usuario.userName,
            email: usuario.email,
            token: usuario.token
        })
    }catch(error){
        console.log(error)
    }
    
        res.json({
            msg: 'Usuario creado correctamente, revisa tu email para confirmar tu cuenta',
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

const confirmar = async(req = request, res = response) => {
    const {token} = req.params;

    const usuarioToken = await User.findOne({token});

    if(!usuarioToken){
        const error = new Error('El token no es valido');
        return res.status(403).json({ msg: error.message});
    }

    try{
        usuarioToken.confirmado = true,
        usuarioToken.token = ''
        await usuarioToken.save();
        res.json({msg: 'Usuario confirmado correctamente'});
    }catch (error){
        console.log(error)
    }
}

const olvidePassword = async(req, res) => {
    const {email} = req.body;

    //Validar si el usuario existe
    const usuarioExiste = await User.findOne({email});

    if(!usuarioExiste){
        const error = new Error('El usuario no esta registrado');
        return res.status(404).json({msg: error.message});
    }

    try{
        usuarioExiste.token = generarId();
        await usuarioExiste.save();
        res.json({msg: 'Hemos enviado un correo a tu bajeda para confirmar tu cuenta'});
    }catch(error){
        console.log(error)
    }
}

const comprobarToken = async(req, res) => {
    const {token} = req.params;

    const tokenValido = await User.findOne({token});

    if(tokenValido){
        res.json({msg: 'Token Valido'})
    }else{
        const error = new Error('El token no es valido');
        return res.status({msg: error.message})
    }
}

const nuevoPassword = async(req, res) => {
    const {token} = req.params;
    const {password} = req.body;

    const usuarioToken = await User.findOne({token});

    if(usuarioToken){
        usuarioToken.password = password;
        usuarioToken.token = '';
        try{
            await usuarioToken.save()
        }catch(error){
            console.log(error);
        }
        res.json({msg: 'El password se cambio con exito'});
    }else {
        const error = new Error('El token no es valido');
        return res.status(404).json({msg: error.message})
    }

}

module.exports = {
    getData,
    inserData,
    updateData,
    delteData,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}