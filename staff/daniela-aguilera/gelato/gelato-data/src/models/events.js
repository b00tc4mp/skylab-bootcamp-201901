const { Schema } = require('mongoose')

const Event = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String }
})

module.exports = Event
