const mongoose = require('mongoose')
const { Users, Events, Chats, Messages } = require('./schemas')

module.exports = {
    Users: mongoose.model('Users', Users),
    Events: mongoose.model('Events', Events),
    Chats: mongoose.model('Chats', Chats),
    Messages: mongoose.model('Messages', Messages)
}