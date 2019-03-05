const mongoose = require('mongoose')
const { User, Trip } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Trip: mongoose.model('Trip', Trip)
}