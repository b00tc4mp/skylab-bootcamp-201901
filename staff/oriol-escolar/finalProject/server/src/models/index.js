const mongoose = require('mongoose')
const { User,House } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    House: mongoose.model('House', House),
}