const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const DB_URI = process.env.DB_URI;


const conectar = async () => {
  try {
    console.log("Base de datos lista");
    mongoose.connect(DB_URI, {
    });
    
  } catch(error) {
    throw new Error('Error al conectar la base');
  }
}

module.exports = {
    conectar
}