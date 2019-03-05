'use strict'

const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const Flight = new Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    droneId: {
        type: ObjectId,
        required: true,
        ref: 'Drone'
    },

    start: {
        type: Date,
        required: true,
        default: Date.now
    },

    end: {
        type: Date,
        default: null
    },


}, { timestamps: true })

module.exports = Flight