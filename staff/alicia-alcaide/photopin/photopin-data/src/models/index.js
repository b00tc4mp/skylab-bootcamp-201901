const mongoose = require('mongoose')
const { User, PMap, Pin } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Map: mongoose.model('PMap', PMap),
    Pin: mongoose.model('Pin', Pin)
}

