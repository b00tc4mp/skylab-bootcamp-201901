const { Schema } = require('mongoose')

const Event = new Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  images: [{}]
})

module.exports = Event
