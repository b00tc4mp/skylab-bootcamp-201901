const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose
const location = require('./location')
const comment = require('./comment')

const event = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
        uppercase: true
    },
    description: {
        type: String,
        required: true,
        minlength: 200,
    },
    representant: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    medicalField: {
        type: ObjectId,
        ref: 'MedicalField',
        required: true
    },
    eventType: {
        type: ObjectId,
        ref: 'EventType',
        required: true
    },
    location: {
        type: location,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    numberTicketsAvailable: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000
    },
    comments: [comment],
    image:{
        type:String
    }
})

module.exports = event