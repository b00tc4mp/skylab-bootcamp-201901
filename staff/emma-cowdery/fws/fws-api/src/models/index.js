const mongoose = require('mongoose')
const { Users, Events } = require('./schemas')

module.exports = {
    Users: mongoose.model('Users', Users),
    Events: mongoose.model('Events', Events)
}