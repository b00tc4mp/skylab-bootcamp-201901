const mongoose = require('mongoose')
const User = require('./schemas/user')

module.exports = {
    User: mongoose.model('User', User),
}