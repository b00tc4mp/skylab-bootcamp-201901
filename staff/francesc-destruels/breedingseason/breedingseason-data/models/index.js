const user = require('./User')
const gameRecord = require('./GameRecord')
const result = require('./Results')
const missionDeck = require('./MissionDeck')
const gameDeck = require('./GameDeck')
const mongoose = require('mongoose')

const model = mongoose.model.bind(mongoose)

module.exports = { 
    User: model('User', user),
    GameRecord: model('Note', gameRecord),
    MissionDeck: model('MissionDeck', missionDeck),
    GameDeck: model('GameDeck', gameDeck),
    Result: model('Result', result)
}