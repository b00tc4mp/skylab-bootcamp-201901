const { Schema } = require('mongoose')

const point = new Schema({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
})

module.exports = point
