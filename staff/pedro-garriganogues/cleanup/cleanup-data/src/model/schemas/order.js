const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['transaction pending', 'rejected', 'processing', 'paid'],
        default: 'transaction pending'
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

