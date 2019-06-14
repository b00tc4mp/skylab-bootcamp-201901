const { Schema } = require('mongoose')

module.exports = new Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    image: { type: String, required: true }
})