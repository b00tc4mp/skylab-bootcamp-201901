'use strict'

const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const Drone = new Schema({
    owner: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    brand: {
        type: String,
        required: true
    },

    model: {
        type: String,
        required: true
    },

    host: {
        type: String,
        required: true
    },

    port: {
        type: Number,
        required: true
    }

}, { timestamps: true })

module.exports = Drone