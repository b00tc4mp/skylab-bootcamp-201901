const  { Schema } = require('mongoose')
const { isURL } = require('validator')

const product = new Schema({
    name: { type: String, required: true },
    imagesUrl: [{type: String ,  required: true, validate: isURL}],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    tag: []
})

module.exports = product