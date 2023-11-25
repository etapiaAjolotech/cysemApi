const {Schema, model} = require('mongoose');


const userShema = Schema({
    id: {type: String, require: true},
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    rol: { type: String, required: true, emun: ['ADMIN_ROLE', 'USER_ROLE']},
    estado: {type: Boolean, default: true}
});

userShema.methods.toJSON = function() {
    const {__v, password, ...user} = this.toObject();
    return user
}

module.exports = model('Usuario', userShema);