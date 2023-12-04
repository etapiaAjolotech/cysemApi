require("dotenv").config()
const express = require('express');
const app = express();
const Server = require('./models/serverModel');
const bodyParser = require('body-parser')
const server = new Server();

app.use(express.json())

server.listen();

