const mongoose = require('mongoose')
const { User} = require('./schemas')
const { Pet} = require('./schemas')
const { Appointment } = require ('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Pet: mongoose.model('Pet', Pet),
    Appointment: mongoose.model('Appointment', Appointment)
}