const mongoose = require('mongoose')
const { User, Book, BookTemplate } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Book: mongoose.model('Book', Book),
    BookTemplate: mongoose.model('BookTemplate', BookTemplate)
}