const schemas = require('./schemas')
const mongoose = require('mongoose')

const {user} = schemas

module.exports = {
    UserData: mongoose.model('User', user)
}