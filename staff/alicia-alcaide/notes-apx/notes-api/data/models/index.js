const mongoose = require ('mongoose')
const { user, note } = require ('./schemas')

module.exports= { 
    UserData: mongoose.model('User', user),
    Note: mongoose.model('Note', note)
}