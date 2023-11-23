require("dotenv").config()
const express = require('express');
const app = express();
const Server = require('./models/serverModel');
const bodyParser = require('body-parser')
const server = new Server();

/*
app.use(
  bodyParser.json({
    limit: '20bm'
  })
)*/
/*
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  })
)*/
app.use(express.json())

server.listen();

