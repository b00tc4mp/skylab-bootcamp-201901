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
        required: true
    },

    city: {
        type: String,
        enum: ['Barcelona', 'Madrid'],
        required: true
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
    
    Model3D: {
        type: String
    } 
})

module.exports = Product