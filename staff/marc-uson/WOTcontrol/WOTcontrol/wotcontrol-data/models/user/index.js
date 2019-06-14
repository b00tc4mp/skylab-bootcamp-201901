const { Schema } = require ('mongoose')
const { isEmail } = require ('validator')
const { deviceSchema } = require('../device')


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: isEmail
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    devices: [deviceSchema]
})

module.exports = userSchema