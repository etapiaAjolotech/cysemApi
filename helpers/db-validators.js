const User = require('../models/userModel');
const Role = require('../models/roleModel');
const Producto = require('../models/productModel');

const rolValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
      throw new Error(`El rol ${rol} no existe`);
    }
  }

const emailExiste = async (email) => {
    const exiteEmail = await User.findOne({email});
    if(exiteEmail){
        throw new Error(`El correo ${email} ya esta registrado`);
    }
}

const usuarioExisteID = async (id) => {
    const existeUsuario = await User.findOne({id});
    
    if(!existeUsuario){
        throw new Error(`El usuario con ID ${id} no esta registrado`);
    }
}

const productoExisteID = async(id) => {
    const productoExiste = await Producto.findById(id);

    if(!productoExiste){
        throw new Error(`El prodicto con ID ${id} no esta registrado`);
    }
}

module.exports = {
    rolValido,
    emailExiste,
    usuarioExisteID,
    productoExisteID
}