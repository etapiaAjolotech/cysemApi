const model = require('../../models/productModel');

exports.getData = (req, res) => {

    try {
        const arrayProducts = model.find()
        console.log(arrayProducts)
    } catch (error) {
        console.log(error)
    }
}
    // {
    //     // model.find({}, (err, docs) => {
    //     //     res.send({
    //     //         docs
    //     //     })
    //     // })
    // }

exports.insertData = (req, res) => {
    const data = req.body
    res.send({data})
}