const  { Schema } = require('mongoose')
const { isURL } = require('validator')

const product = new Schema({
    name: { type: String, required: true, unique: true },
    imageUrlMain: {type: String ,  required: true, validate: isURL},
    imagesUrl: [{type: String ,  required: true, validate: isURL}],
    description: { type: String, required: true },
    size: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    tag: []
})

module.exports = product