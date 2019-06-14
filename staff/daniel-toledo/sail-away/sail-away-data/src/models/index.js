const mongoose = require('mongoose')
const { User, Journey } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Journey: mongoose.model('Journey', Journey)
}