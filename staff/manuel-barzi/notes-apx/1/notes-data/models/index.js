const mongoose = require('mongoose')
const schemas =  require('./schemas')

const { user, note } = schemas

const model = mongoose.model.bind(mongoose)

module.exports = { 
    User: model('User', user),
    Note: model('Note', note)
}