'use strict'

const mongoose = require('mongoose')
const { User, Flight, Drone } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Drone: mongoose.model('Drone', Drone),
    Flight: mongoose.model('Flight', Flight)
}