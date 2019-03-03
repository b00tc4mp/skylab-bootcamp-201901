const mongoose = require('mongoose')
const { User, Book } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Book: mongoose.model('Book', Book)
}