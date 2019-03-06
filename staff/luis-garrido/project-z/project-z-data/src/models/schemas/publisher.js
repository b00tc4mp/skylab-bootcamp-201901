const { Schema } = require('mongoose')

const Publisher = new Schema({
    
    id: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    }

})

module.exports = Publisher