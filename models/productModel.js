const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    productCode: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: String, required: true },
});

const Product = mongoose.model('Product', productsSchema);

module.export = Product;