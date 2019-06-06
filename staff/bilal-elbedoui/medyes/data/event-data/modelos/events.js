const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const { fieldsSchema } = require('./medical-fields')
const { eventTypeSchema } = require('./eventType')
const { usersSchema } = require('./users')
const { organizationSchema } = require('./organization')
const { QueAns } = require('./questionsAnswers')

const eventSchema = new mongoose.Schema({

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
        type: usersSchema,
        required: true
    },
    field: {
        type: fieldsSchema,
        required: true
    },
    eventType: {
        type: eventTypeSchema,
        required: true
    },
    location: {
        type: new mongoose.Schema({
            country: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 255,
                trim: true
            },
            city: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 255,
                trim: true
            },
            address: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 255,
                trim: true
            }
        })
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
    questionsAndAnswers: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'QueAns'
    }
})


function validateEvent({sub,subOrga}, event) {
    const schema = {
        sub: Joi.objectId().required(),
        subOrga: Joi.objectId().required()
    }
    const schema1 = {
        title: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(200).required(),
        field: Joi.objectId().required(),
        eventType: Joi.objectId().required(),
        location: Joi.object().min(1).required(),
        date: Joi.date().required(),
        numberTicketsAvailable: Joi.number().required(),
        price: Joi.required()
    }
    const result = Joi.validate({sub,subOrga}, schema) && Joi.validate(event, schema1)
    return result
}


exports.Event = mongoose.model('Event', eventSchema);
exports.validateEvent = validateEvent;