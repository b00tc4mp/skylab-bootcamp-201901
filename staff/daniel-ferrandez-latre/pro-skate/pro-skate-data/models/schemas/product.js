const  { Schema } = require('mongoose')
const { isURL } = require('validator')

const product = new Schema({
    name: { type: String, required: true, unique: true },
    imageUrlMain: {type: String ,  required: true, validate: isURL},
    imagesUrl: [{type: String , validate: isURL}],
    description: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    tag: [],
    brand: {type: String}
})

module.exports = product