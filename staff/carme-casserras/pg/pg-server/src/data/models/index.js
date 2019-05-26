const schemas = require('./schemas')
const mongoose = require('mongoose')

const {user, stuff} = schemas

module.exports = {
    UserData: mongoose.model('User', user),
    Stuff: mongoose.model('Stuff', stuff)
}