require("dotenv").config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dbConnect = require('./config/db')
const userRouter = require('./app/routes/users');
const productRouter = require('./app/routes/productos');


app.use(userRouter)
app.use(productRouter)

app.listen(port, () =>{
  console.log('la aplicación esta lista')
})

dbConnect.conectar().catch(console.dir)
