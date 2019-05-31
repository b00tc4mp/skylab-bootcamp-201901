const { Schema, ObjectId } = require('mongoose')
const movieSessions = require('./movie-sessions')

const cinema = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  location: {
    type: [Number],
    required: true
  },
  movieSessions: {
    type:[movieSessions],
    required: true
  },
  city: { type: ObjectId, ref: 'City', required: true }
})

cinema.index({ location: "2dsphere" });

module.exports = cinema
