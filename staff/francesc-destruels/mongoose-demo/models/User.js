const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: {type:String, trim:true, default:''},
    surname: {type:String, trim:true, default:''},
    age: {type:Number, default:0},
    email: {type: String, trim:true, default:''}
})

module.exports = mongoose.model('User', User)