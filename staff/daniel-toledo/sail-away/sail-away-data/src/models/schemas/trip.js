const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const Trip = new Schema({
    positions: {
        type: [Object],
        required: true
    },

    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    time: {
        type: Date,
        required: true,
        default: Date.now
    },

    boat: {
        type: Object,
        required: true
    },

    crew: [String || ObjectId]
})

module.exports = Trip