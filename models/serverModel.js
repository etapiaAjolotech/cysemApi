const express = require('express');
const {conectar} = require('../config/db')
const cors = require('cors');
const fileUpload = require('express-fileupload');


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        

        this.paths = {
            usuarios : '/api/usuarios',
            buscar: '/api/buscar',
            productos: '/api/productos',
            auth:       '/api/auth',
            uploads:       '/api/uploads'
        }
        
        this.middlewares();
        this.routes();
        this.conectarDB();
    }

    middlewares() {
        // CORS
        this.app.use( cors())

        //Lectura y parseo del body
        this.app.use( express.json());

        //Directorio Publico
        this.app.use( express.static('public'));

        //FileUpload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use( this.paths.auth, require('../app/routes/auth'));
        this.app.use( this.paths.buscar, require('../app/routes/buscar'));
        this.app.use( this.paths.usuarios, require('../app/routes/users'));
        this.app.use( this.paths.productos, require('../app/routes/productos'));
        this.app.use( this.paths.uploads, require('../app/routes/uploads'));
    }
    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor listo en el puerto', this.port);
        });
    }
    async conectarDB() {
        await conectar();
    }

}

module.exports = Server;