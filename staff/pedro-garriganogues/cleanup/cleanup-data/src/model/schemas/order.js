const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [paid],
        default: 'paid'
    },
    products: [{
        type: ObjectId,
        ref: 'Product',
        required: true
    }],

    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
})

