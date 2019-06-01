const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const gameRecord = require('./GameRecord')

const user = new Schema({
    nickname: { type: String, trim: true, required: true, unique: true },
    age: { type: Number, min: 13, required: true },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: { type: String, required: true },
    avatar: { type: String, trim: true, required: true },
    gameHistory: [{ type: ObjectId, ref: 'GameRecord'}]
})

module.exports = user