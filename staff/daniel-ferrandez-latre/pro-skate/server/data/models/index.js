const mongoose = require('mongoose')
const schemas = require('./schemas')

const { user, note } = schemas

mongoose.set('useCreateIndex', true);
const User = mongoose.model('User', user)
const Note = mongoose.model('Note', note)

module.exports = { 
    User: User,
    Note: Note
}