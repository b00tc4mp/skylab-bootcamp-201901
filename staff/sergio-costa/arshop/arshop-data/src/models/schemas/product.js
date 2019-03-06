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

    zone: {
        type: String,
        required: true
    },

    owner: {
        type: ObjectId,
        ref: 'User'
    },

    imageUrl: {
        type: String
    },
    
    Model3D: {
        type: String
    } 
})

module.exports = Product