const model = require('../models/userModel')


// Obtener Datos de usuarios GET method
exports.getData = (req, res) => {
    try {
        const arrayUser = model.find()
        console.log(arrayUser)
    }catch (error) {
        console.log(error)
    }

    /*
    model.find({}, (err, docs) => {
        res.send({
            docs
        })
    })*/
}

// Insertar Datos de usuarios POST method
// req - require
// res - responsive

exports.inserData = (req, res) => {
    const data = req.body
    res.send({data})
}