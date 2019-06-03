const schemas = require('./schemas')
const mongoose = require('mongoose')

const {user, thing, location} = schemas

module.exports = {
    UserData: mongoose.model('User', user),
    Thing: mongoose.model('Thing', thing),
    Location : mongoose.model('Location', location)
}