const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose

const purchase = new Schema({
    customer: {
        type: ObjectId,
        ref: 'User'
    },
    event: {
        type: ObjectId,
        ref: 'Event'
    },
    numberOfTickets: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = purchase