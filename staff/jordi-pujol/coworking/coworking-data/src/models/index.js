const mongoose = require('mongoose')
const { User, Workspace, Service, Comment } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Workspace: mongoose.model('Workspace', Workspace),
    Service: mongoose.model('Service', Service),
    Comment: mongoose.model('Comment', Comment)
}