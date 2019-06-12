const { Schema, ObjectId } = require('mongoose')

const user = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, required: true },
  distance: { type: ObjectId, ref: 'Distance' }
})

module.exports = user
