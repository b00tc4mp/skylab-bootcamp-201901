const { Schema } = require('mongoose')
const gameRecord = require('./GameRecord')

const user = new Schema({
    nickname: { type: String, trim: true, required: true },
    age: { type: Number, min: 6, required: true},
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: { type: String, required: true },
    gameHistory: [gameRecord]
})

module.exports = user