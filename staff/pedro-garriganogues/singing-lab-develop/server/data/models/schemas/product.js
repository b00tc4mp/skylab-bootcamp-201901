const { Schema, Schema: { ObjectId } } = require('mongoose')


module.exports = new Schema({
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: false
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