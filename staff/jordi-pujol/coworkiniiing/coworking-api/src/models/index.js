const mongoose = require('mongoose')
const { User, Workspace, Need, Comment } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Workspace: mongoose.model('Workspace', Workspace),
    Need: mongoose.model('Need', Need),
    Comment: mongoose.model('Comment', Comment)
}