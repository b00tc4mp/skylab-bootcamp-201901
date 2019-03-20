const { SchemaTypes: { ObjectId }, Schema } = require('mongoose')

const Product = new Schema({
    tittle: {
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

    category: {
        type: String,
        enum: ['vehicle','living place','electronic'],
    },

    city: {
        type: String,
        enum: ['Barcelona', 'Madrid'],
    },

    owner: {
        type: ObjectId,
        ref: 'User'
    },

    sold: {
        type: Boolean,
        default: false,
        required: true
    },

    imageUrl: {
        type: String
    }, 
})

module.exports = Product