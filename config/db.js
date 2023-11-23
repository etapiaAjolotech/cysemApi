const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const DB_URI = process.env.DB_URI;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
/*
const client = new MongoClient(DB_URI , {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});*/

const conectar = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();
    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    console.log("Base de datos lista");
    mongoose.connect(DB_URI, {
      //serverSelectionTimeoutMS: 5000
    });
    
  } catch(error) {
    throw new Error('Error al conectar la base');
  }
}

module.exports = {
    conectar
}