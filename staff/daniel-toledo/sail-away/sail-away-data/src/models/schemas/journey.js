const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const Journey = new Schema({
    sea: {
        type: Object,
        required: true
    },

    route: {
        type: [Object],
        required: true
    },

    dates: {
        type: [String],
        required: true,
    },
    
    description: {
        type: String
    }

    // user: {
    //     type: ObjectId,
    //     required: true,
    //     ref: 'User'
    // },

    // crew: [String || ObjectId]

})

module.exports = Journey