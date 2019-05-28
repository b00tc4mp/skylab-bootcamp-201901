const schemas = require('./schemas')
const mongoose = require('mongoose')

const {user, thing} = schemas

module.exports = {
    UserData: mongoose.model('User', user),
    Thing: mongoose.model('Thing', thing)
}