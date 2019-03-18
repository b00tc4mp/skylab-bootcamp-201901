const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const Vessel = new Schema({

    pictures: [String],

    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    model: String,

    lenght: String,

    berth: String,

    description: {
        type: String,
        required: true
    }
})

module.exports = Vessel