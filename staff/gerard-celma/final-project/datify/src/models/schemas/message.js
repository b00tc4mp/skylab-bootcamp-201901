const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const Message = new Schema({
    userIdFrom: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    userIdTo: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    launchDate: {
        type: Date,
        default: Date.now
    },

    position: [{
        type: Number,
        required: true
    }],

    text: {
        type: String,
        required: true
    }
})

module.exports = Message