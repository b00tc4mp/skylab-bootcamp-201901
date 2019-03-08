const mongoose = require('mongoose')
const { User, Work, Education, Language, Technology, EmailWhitelist } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Work: mongoose.model('Work', Work),
    Education: mongoose.model('Education', Education),
    Language: mongoose.model('Language', Language),
    Technology: mongoose.model('Technology', Technology),
    EmailWhitelist: mongoose.model('EmailWhitelist', EmailWhitelist)
}