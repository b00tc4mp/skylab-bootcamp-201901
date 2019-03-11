const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const Vessel = new Schema({

    user: {
        type: ObjectId,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    model: Number,

    lenght: Number,

    berth: Number,

    description: {
        type: String,
        required: true
    }
})

module.exports = Vessel