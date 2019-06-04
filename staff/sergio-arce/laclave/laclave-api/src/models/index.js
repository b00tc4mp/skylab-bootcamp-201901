const mongoose = require('mongoose')

const { User, Congress } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Congress: mongoose.model('Congress', Congress)

}

