const { Schema } = require('mongoose')
// const { isEmail } = require('validator')

module.exports = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true }
})