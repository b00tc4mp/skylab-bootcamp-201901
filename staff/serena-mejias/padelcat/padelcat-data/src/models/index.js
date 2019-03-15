const mongoose = require('mongoose')
const { Player, Match, Team } = require('./schemas')

module.exports = {
    Player: mongoose.model('Player', Player),
    Match: mongoose.model('Match', Match),
    Team: mongoose.model('Team', Team)
}