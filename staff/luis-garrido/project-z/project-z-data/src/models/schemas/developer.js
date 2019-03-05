const { Schema } = require('mongoose')

const Developer = new Schema({
    
    id: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    }

})

module.exports = Developer