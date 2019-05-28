const { Schema } = require('mongoose')

const user = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false, required: true },
})

module.exports = user
