const mongosee = require ('mongoose');

const userSchema = new mongosee.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
            
        },
        phone: {
            type: Number,
            require: true,
        },
        company: {
            type: String,
            require: true
        }

    }
)

module.exports = mongosee.model('user', userSchema)