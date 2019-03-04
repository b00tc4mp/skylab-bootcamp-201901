const { Schema } = require('mongoose')

const Education = new Schema({

    college: {
        type: String,
        required: true,
        default: ''
    },

    degree: {
        type: String,
        required: true,
        default: ''
    }
})

module.exports = Education