const mongoose = require('mongoose')
const { User, Product, Chat, Message } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Product: mongoose.model('Product', Product),
    Chat: mongoose.model('Chat', Chat),
    Message: mongoose.model('Message', Message)
}