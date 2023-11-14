const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userShema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    phone: { type: Number, required: true },
    company: { type: String, required: true},
});

const User = mongoose.model('User', userShema);

module.exports = User;