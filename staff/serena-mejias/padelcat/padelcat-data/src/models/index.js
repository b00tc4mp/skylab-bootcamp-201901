const mongoose = require('mongoose')
const { Player, Match } = require('./schemas')

module.exports = {
    Player: mongoose.model('Player', Player),
    Match: mongoose.model('Match', Match),
}