const mongoose = require('mongoose');

const uri = 'mongodb+srv://edgartapia:CysemDemo140687@cysemdemo.0gs6x0c.mongodb.net/';

mongoose.connect(uri, {
    useNewUrlParsen: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexion'));
db.once('open', () => {
    console.log('Conexion exitosa a la base de datos');
});

module.exports = db;