const mongoose = require('mongoose')
const schemas = require('./schemas')

const { issue , user }= schemas

module.exports= { 
    Issue : mongoose.model('Issue', issue),
    User : mongoose.model('User', user)
}