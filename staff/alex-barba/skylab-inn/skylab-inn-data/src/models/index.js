const mongoose = require('mongoose')
const { User, Admin, Work } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Admin: mongoose.model('Admin', Admin),
    Work: mongoose.model('Work', Work)
}