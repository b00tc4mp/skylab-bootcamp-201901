const { user, note } = require('./schemas')
const { model } = require('mongoose')

const User = model('User', user)
const Note = model('Note', note)

module.exports = {
    User,
    Note
}