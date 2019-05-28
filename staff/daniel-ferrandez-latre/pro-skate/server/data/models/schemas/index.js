const  { Schema } = require('mongoose')
const  { isEmail } = require('validator')


const note = new Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
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
    date: { type: Date, default: Date.now },
    notes: [note]
})


module.exports = { user, note }