const { Schema } = require('mongoose')

const Education = new Schema({

    college: {
        type: String,
        required: true
    },

    degree: {
        type: String,
        required: true
    }
})

module.exports = Education