const { Schema } = require('mongoose')

const Work = new Schema({

    company: {
        type: String,
        required: true
    },

    position: {
        type: String,
        required: true
    },

    startDate: {
        type: String,
        required: true
    },

    endDate: { type: String },

    current: { type: Boolean, required: true }

})

module.exports = Work