const { request, response } = require("express");



const validarRol = (req = request, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        });
    }

    const {rol, userName} = req.usuario

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${userName} no tiene los permisos de administrador`
        });
    }

    next();
}


module.exports = {
    validarRol
}