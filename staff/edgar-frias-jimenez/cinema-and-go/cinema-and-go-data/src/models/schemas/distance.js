const { Schema, ObjectId } = require('mongoose')

const distance = new Schema({
    distance: String,
    duration: String,
    cinema: { type: ObjectId, ref: 'Cinema' },
})

module.exports = distance
