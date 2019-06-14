const mongoose = require('mongoose')
const { Schema } = mongoose

const medicalField = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 40,
        trim: true
    }
})

module.exports = medicalField