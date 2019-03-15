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
    },

    theme: {
        type: Number,
        required: true,
        default: 0,
        validate: {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    }

})

module.exports = Exercise