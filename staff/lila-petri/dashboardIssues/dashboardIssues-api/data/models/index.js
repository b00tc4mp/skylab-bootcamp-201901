const mongoose = require('mongoose')
const schemas = require('./schemas')

const { issues }= schemas

module.exports= { 
    Issues : mongoose.model('Issues', issues)
}