const { Schema } = require('mongoose')

const Work = new Schema({

    company: {
        type: String,
        required: true,
        default: ''
    },

    position: {
        type: String,
        required: true,
        default: ''
    },

    startDate: {
        type: String,
        required: true,
        default: ''
    },

    endDate: { 
        type: String,
        default: '' 
    },

    current: { type: Boolean, 
        required: true, 
        default: '' }

})

module.exports = Work