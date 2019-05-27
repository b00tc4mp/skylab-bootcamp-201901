const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const results = require('./Results')

const gameRecord = new Schema({
    players: [ObjectId],
    gameHistory: [results]
})

module.exports = gameRecord