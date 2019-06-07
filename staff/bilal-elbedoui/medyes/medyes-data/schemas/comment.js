const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose

const comment = new Schema({
    event: { // TODO remove event from here. comments are already embed in an event.
        type: ObjectId,
        ref: 'Event',
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    roleAuthor: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    text: {
        type: String,
        min: 0,
        max: 1000,
        required: true
    }
})

module.exports = comment