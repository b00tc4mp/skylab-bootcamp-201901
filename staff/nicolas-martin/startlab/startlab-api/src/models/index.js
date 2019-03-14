const mongoose = require('mongoose')
const { User, Exercise, Invitation, Historical } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Exercise: mongoose.model('Exercise', Exercise),
    Invitation: mongoose.model('Invitation', Invitation),
    Historical: mongoose.model('Historical', Historical)
}