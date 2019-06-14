const { Schema } = require('mongoose')

const Messages = new Schema({
    userId: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    }
})

module.exports = Messages