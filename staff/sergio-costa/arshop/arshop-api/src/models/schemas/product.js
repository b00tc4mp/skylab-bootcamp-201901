const { SchemaTypes: { ObjectId }, Schema } = require('mongoose')

const Product = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    owner: [{
        type: ObjectId,
        ref: 'User'
    }]
})

module.exports = Product