const { Schema } = require('mongoose')

const Genre = new Schema({
    
    id: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    }

})

module.exports = Genre