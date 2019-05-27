const user = require('./User')
const gameRecord = require('./GameRecord')
const mongoose = require('mongoose')

const model = mongoose.model.bind(mongoose)

module.exports = { 
    User: model('User', user),
    GameRecord: model('Note', gameRecord)
}