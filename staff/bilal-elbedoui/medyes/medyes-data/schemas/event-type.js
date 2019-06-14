const mongoose = require('mongoose')
const { Schema } = mongoose

const eventType = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 40,
        trim: true
    }
})

module.exports = eventType
