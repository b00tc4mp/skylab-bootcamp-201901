const { Schema, Schema: { ObjectId } } = require('mongoose')


const Product = new Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
})

module.exports = Product