const mongoose = require('mongoose')

const { User, Congress, Artist } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Congress: mongoose.model('Congress', Congress),
    Artist: mongoose.model('Artist', Artist)
}