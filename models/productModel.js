const {Schema, model} = require('mongoose');

const productsSchema = Schema({
    codigoProducto: { type: String, required: true },
    description: { type: String },
    marca: { type: String, required: true },
    precio: { type: Number, default: 0 },
    disponibilidad: { type: Number, default: 0 },
    estado: { type: Boolean, require: true, default: true}
});

productsSchema.methods.toJSON = function() {
    const { __v, estado, ...producto} = this.toObject();
    return producto
}

module.exports = model('Producto', productsSchema);