const mongoose = require('mongoose')
const { User, Admin, Work, Education } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Admin: mongoose.model('Admin', Admin),
    Work: mongoose.model('Work', Work),
    Education: mongoose.model('Education', Education)
}