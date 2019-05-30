const { Schema, ObjectId } = require('mongoose')


const movieSessions = new Schema({
  movie: { type: ObjectId, ref: 'Movie', required: true },
  sessions: {
    type: [String],
    required: true
  }
})

module.exports = movieSessions
