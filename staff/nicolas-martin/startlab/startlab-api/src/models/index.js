const mongoose = require('mongoose')
const { User, Exercise } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Exercise: mongoose.model('Exercise', Exercise)
}