const mongoose = require('mongoose');
const { Game, User } = require('./schemas')

module.exports = {
    mongoose,
    Game: mongoose.model('Game', Game),
    User: mongoose.model('User', User)
}