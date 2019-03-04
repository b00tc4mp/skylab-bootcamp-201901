const { Schema } = require('mongoose')

const Exercise = new Schema({
    title: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    test: {
        type: String,
        required: true
    },

    order: {
        type: Number,
        default: 0
    }

})

module.exports = Exercise