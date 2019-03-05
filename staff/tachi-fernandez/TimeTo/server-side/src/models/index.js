const mongoose = require('mongoose')
const { User,Events } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Events: mongoose.model('Events', Events)

}