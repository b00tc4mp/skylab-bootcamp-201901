const mongoose = require ('mongoose')

const { Schema } = mongoose

const inputSchema = new Schema({
    type: {
        type: String,
        enum:['digital', 'analog'],
        required: true
    },
    direction: {
        type: Number,
        default:1
    },
    values: [{
        value: {type: Number},
        date: {type: Date}
    }]
})

const outputSchema = new Schema({
    type: {
        type: String,
        enum:['digital', 'servo', 'motor'],
        required: true
    },
    value: {
        type: Number,
        default: 0
    },
    direction:{
        type: Number,
        enum: [1,2,3],
        required: true
    }
})

const deviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    port: {
        type: Number,
        required: true
    },
    inputs:[inputSchema],
    outputs: [outputSchema]

})

module.exports = { deviceSchema, inputSchema, outputSchema }