const User = require('../models/userModel');
const Role = require('../models/roleModel');

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

module.exports = {
    rolValido,
    emailExiste
}