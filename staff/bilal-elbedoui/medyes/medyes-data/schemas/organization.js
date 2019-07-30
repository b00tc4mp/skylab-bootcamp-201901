const mongoose = require('mongoose')
const { SchemaTypes: { ObjectId }, Schema } = mongoose

const organization = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 20,
        trim: true
    },
    address: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255,
        lowercase: true
    },
    mail: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255,
        trim: true
    },
    representants: [{
        type: ObjectId,
        ref: 'User'
    }],
    events: [{
        type: ObjectId,
        ref: 'Event'
    }]
})

module.exports = organization