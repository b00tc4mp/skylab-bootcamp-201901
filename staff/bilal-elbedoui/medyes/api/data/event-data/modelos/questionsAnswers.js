const mongoose = require('mongoose')
const { User } = require('./users')
const { Event } = require('./events')


const queAnsSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    roleAuthor:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now,
        required:true
    },
    text: {
        type: String,
        min: 0,
        max: 1000,
        required: true
    }
})

exports.QueAns = mongoose.model('QueAns', queAnsSchema)
exports.queAnsSchema = queAnsSchema