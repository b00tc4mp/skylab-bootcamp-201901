const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const Journey = new Schema({
    title: {
        type: String,
        required: true
    },
    sea: {
        type: Object,
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

    captain: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    boatId: {
        type: String,
        required: true
    },

    lookingFor: {
        type: Object,
        required: true
    }

})

module.exports = Journey