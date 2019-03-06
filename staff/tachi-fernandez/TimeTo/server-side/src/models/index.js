const mongoose = require('mongoose')
const { User,Events,Comments } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Events: mongoose.model('Events', Events),
    Comments: mongoose.model('Comments', Comments)

}