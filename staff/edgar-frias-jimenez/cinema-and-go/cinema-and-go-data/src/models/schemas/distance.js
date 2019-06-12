const { Schema, ObjectId } = require('mongoose')

const distance = new Schema({
    distance: Number,
    duration: Number,
    cinema: { type: ObjectId, ref: 'Cinema' },
    user : { type: ObjectId, ref: 'User' }
})

module.exports = distance
