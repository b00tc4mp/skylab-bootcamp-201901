const mongoose = require('mongoose')
const { User, Message } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Message: mongoose.model('Message', Message)
}