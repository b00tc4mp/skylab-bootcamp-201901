const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const Journey = new Schema({
    positions: {
        type: [Object],
        required: true
    },

    dates: {
        type: Date,
        required: true,
        default: Date.now
    },
    
    description: [String],

    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    crew: [String || ObjectId]

})

module.exports = Journey