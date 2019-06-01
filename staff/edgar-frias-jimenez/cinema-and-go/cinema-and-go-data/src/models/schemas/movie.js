const { Schema } = require('mongoose')

const movie = new Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    info: [String],
    cast: String
})

module.exports = movie
