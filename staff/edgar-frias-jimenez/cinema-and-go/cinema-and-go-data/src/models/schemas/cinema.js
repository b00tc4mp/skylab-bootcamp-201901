const { Schema, ObjectId } = require('mongoose')
// const movieSessions = require('./movie-sessions')

const cinema = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    type: [Number],
    required: true
  },
  movieSessions: [{
    type: ObjectId,
    ref: 'movieSessions',
    required: true
  }],
  city: { type: ObjectId, ref: 'City' }
})

cinema.index({ location: "2dsphere" });

module.exports = cinema
