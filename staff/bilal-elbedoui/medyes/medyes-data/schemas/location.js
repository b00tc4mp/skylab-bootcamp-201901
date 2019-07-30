const mongoose = require('mongoose')
const { Schema } = mongoose

const location = new Schema({
    country: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true
    },
    address: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true
    }
})

module.exports = location