const { Schema } = require('mongoose')
const { isEmail } =  require('validator')


const item = new Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
})

const user = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: isEmail
    },
    password: { type: String, required: true },
    age: Number,
    tickets:[]
})


module.exports = { user, item }