const mongoose = require('mongoose')
const schemas = require('./schemas')

const { issue , bufferissue, user }= schemas

module.exports= { 
    Issue : mongoose.model('Issue', issue),
    Bufferissue : mongoose.model('Bufferissue', bufferissue),
    User : mongoose.model('User', user)
}