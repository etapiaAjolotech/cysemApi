require("dotenv").config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
//const DB_URI = process.env.DB_URI;

const uri = `mongodb+srv://edgartapia:CysemDemo140687@cysemdemo.0gs6x0c.mongodb.net/`;
//const DB_URL = `mongodb+srv://edgartapia:CysemDemo140687@cysemdemo.0gs6x0c.mongodb.net/`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const conectar = async () => {
    console.log('Usando la función de conectar desde app')
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = {
    conectar
}



/*
const connect = () => {
        mongoose.connect(
            DB_URL,
            {
                keepAlive: true,
                useNewUrlParse: true,
                useUnifiedTopology: true
            },
            (err) => {
                if(err){
                    console.log('DB: Error', err)
                }else{
                    console.log('Conexion correcta!!')
                }
            }
        )
    }

module.exports = connect */

/*
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const conectar = async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
conectar().catch(console.dir);

module.exports = conectar
*/


//module.exports = () => mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})


