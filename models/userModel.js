const {Schema, model} = require('mongoose');
const bcryptjs = require('bcryptjs');

const userShema = Schema({
    id: {type: String, require: true},
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    rol: { type: String, required: true, emun: ['ADMIN_ROLE', 'USER_ROLE']},
    estado: {type: Boolean, default: true},
    token: {type: String},
    confirmado: {type: Boolean, default: false}
});

userShema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

userShema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcryptjs.compare(passwordFormulario, this.password)
}

userShema.methods.toJSON = function() {
    const {__v, password, _id, ...user} = this.toObject();
    user.id = _id;
    return user
}

module.exports = model('Usuario', userShema);