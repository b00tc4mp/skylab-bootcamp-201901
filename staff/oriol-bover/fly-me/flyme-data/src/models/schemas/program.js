'use strict'

const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const Program = new Schema({
    name: {
        type: String,
        default: 'Drone Program'
    },

    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    orders: {
        type: [Object],
        required: true
    },

    seconds: {
        type: Number,
        default: null
    }


}, { timestamps: true })

module.exports = Program