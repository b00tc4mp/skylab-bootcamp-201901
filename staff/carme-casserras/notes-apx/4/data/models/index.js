// import mongoose from 'mongoose'
// import schemas from './schemas'
const schemas = require('./schemas')
const mongoose = require('mongoose')

const { user, note } = schemas

// const model = mongoose.model.bind(mongoose)


module.exports = { 
    UserData: mongoose.model('User', user),
    Note: mongoose.model('Note', note)
}