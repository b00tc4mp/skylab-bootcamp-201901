const mongoose = require('mongoose')
const { User,House } = require('./schemas')

module.exports = {
    mongoose,
    User: mongoose.model('User', User),
    House: mongoose.model('House', House),
}