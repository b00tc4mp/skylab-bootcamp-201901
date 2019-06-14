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
        type: Date,
        required: true
    },

    endDate: { type: Date },

    current: { type: Boolean }

})

module.exports = Work