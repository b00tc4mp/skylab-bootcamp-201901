const { Schema } = require('mongoose')

const movie = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    info: { type: String, required: true },
    cast: { type: String, required: true }
})

module.exports = movie
