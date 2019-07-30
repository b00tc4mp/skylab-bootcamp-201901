const { Schema } = require('mongoose')

const note = new Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true }
})

const user = new Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    notes: [note]
})

module.exports = {
    user,
    note
}