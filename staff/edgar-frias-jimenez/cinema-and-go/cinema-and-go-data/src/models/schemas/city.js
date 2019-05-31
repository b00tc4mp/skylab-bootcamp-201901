const { Schema, ObjectId } = require('mongoose')

const city = new Schema({
    name: { type: String, required: true },
    link: { type: String, required: true },
    cinemas: [{ type: ObjectId, ref: 'cinema'}]
})

module.exports = city
