const User = require('../../models/userModel')


// Obtener Datos de usuarios GET method
exports.getData = (req, res) => {

    
    try {
        const arrayUser = User.find()
        console.log(arrayUser)
        //console.log(req);
        //console.log(res);
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

    try{
        const data = req.body
        model.create(data)
    }catch{

    }
    /*const data = req.body
    model.create(data, (err, docs) => {
        res.send({data:docs})
    })*/
}