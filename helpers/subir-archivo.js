const path = require('path')
const { v4 : uuidv4} = require('uuid')

const subirArchivo = (files, extensiones = ['xlsx','xls'], carpeta = '') => {
    return new Promise((resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length -1];
    

    //Extensiones permitidas
    if(!extensiones.includes(extensionArchivo)){
        return reject(`La extensiòn ${extensionArchivo} del archivo no es permitida, solo se pueden subir archivos ${extensiones}`)
    }

    const nombTemArch = uuidv4() + '.' + extensionArchivo;
    const uploadPath = path.join(__dirname, '../uploads/', carpeta , nombTemArch);
    

    archivo.mv(uploadPath, (err) => {
        if(err){
            reject(err);
        }
        resolve(uploadPath);
    });
    })
}

module.exports = {
    subirArchivo
}