const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema
const Comment = require('./comments')

const Service = new Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    submitedUsers: [{
        type: ObjectId,
        required: false,
        ref: 'User'
    }],

    comments: [Comment],

    maxUsers: {
        type: Number,
        required: false
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    place: {
        type: String,
        required: false,
        default: "Not specified"
    },

    active:{
        type: Boolean,
        default: true,
        required: false,
    },

    closed:{
        type: Boolean,
        default: false,
        required: false,
    },

    time: {
        type: Number,
        required: true,
    }
})

module.exports = Service