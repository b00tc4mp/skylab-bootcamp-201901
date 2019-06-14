const mongoose = require('mongoose')
const { User,Events,Comments,Categories } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Events: mongoose.model('Events', Events),
    Comments: mongoose.model('Comments', Comments),
    Categories: mongoose.model('Categories', Categories),
}