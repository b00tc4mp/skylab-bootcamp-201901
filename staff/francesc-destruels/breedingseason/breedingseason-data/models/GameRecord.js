const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const results = require('./Results')

const gameRecord = new Schema({
    gameId: {type: String, required: true},
    players: [ObjectId],
    gameHistory: [results],
    date: { type: Date, default: Date.now } 
})

module.exports = gameRecord