const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi);
const { User } = require('./users')
const { Event } = require('./events')

const purchaseSchema = new mongoose.Schema({

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    numberOfticketsBoughts: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true,
        default: Date.now
    }

})

function validatePurchase(purchase) {
    const schema = {
        eventId: Joi.objectId().required(),
        customerId: Joi.objectId().required()
    };

    return Joi.validate(purchase, schema)
}

exports.Purchase = mongoose.model('Purchase', purchaseSchema)
exports.validatePurchase = validatePurchase