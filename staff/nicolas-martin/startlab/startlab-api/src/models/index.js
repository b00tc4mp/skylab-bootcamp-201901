const mongoose = require('mongoose')
const { User, Exercise, Invitation } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Exercise: mongoose.model('Exercise', Exercise),
    Invitation: mongoose.model('Invitation', Invitation)
}