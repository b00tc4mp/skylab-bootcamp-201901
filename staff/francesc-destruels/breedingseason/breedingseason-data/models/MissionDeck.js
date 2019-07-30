const { Schema } = require('mongoose')

const missionDeck = new Schema({
    1: { type: String, trim: true, required: true },
    2: { type: String, trim: true, required: true },
    3: { type: String, trim: true },
    first: { type: Number, required: true },
    second: { type: Number, required: true },
})

module.exports = missionDeck