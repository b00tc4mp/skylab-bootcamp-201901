'use strict'

const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const Drone = new Schema({
    owner: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    identifier: {
        type: String,
        required: true,
        unique: true
    },

    brand: {
        type: String,
        required: true
    },

    model: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = Drone