const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const Journey = new Schema({
    title: {
        type: String,
        required: true
    },
    seaId: {
        type: String,
        required: true
    },

    route: {
        type: [Object],
        required: true
    },

    dates: {
        type: [Object],
        required: true,
    },

    description: {
        type: String
    },

    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    boat: {
        type: Object,
        required: true
    },

    lookingFor: {
        type: Object,
        required: true
    }

})

module.exports = Journey