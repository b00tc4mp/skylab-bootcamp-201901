const mongoose = require('mongoose')
const { User, Book, BookTemplate } = require('./src/models/schemas/index')

module.exports = {
    mongoose,
    User: mongoose.model('User', User),
    Book: mongoose.model('Book', Book),
    BookTemplate: mongoose.model('BookTemplate', BookTemplate)
}