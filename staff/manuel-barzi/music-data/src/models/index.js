const mongoose = require('mongoose')
const { User, Comment } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Comment: mongoose.model('Comment', Comment)
}