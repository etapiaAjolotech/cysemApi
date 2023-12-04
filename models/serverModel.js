const express = require('express');
const {conectar} = require('../config/db')


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.productosPath = '/api/productos';

        this.middlewares();

        this.routes();

        this.conectarDB();
    }

    middlewares() {
        this.app.use( express.json());
    }

    routes(){
        this.app.use( this.usuariosPath, require('../app/routes/users'));
        this.app.use( this.productosPath, require('../app/routes/productos'));
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