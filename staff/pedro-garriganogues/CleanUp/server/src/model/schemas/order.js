const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['unpaid', 'rejected', 'processing', 'paid'],
        default: 'unpaid'
    },
    products: [{
        type: ObjectId,
        ref: 'Product',
        required: true
    }],
    orderAdress: {
        type: String,
        // required: true
    },
    submitDate: {
        type: String,
        // required: true
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
})