const { Schema, ObjectId } = require('mongoose')


const movieSessions = new Schema({
  movie: { type: ObjectId, ref: 'Movie', required: true },
  sessions: {
    type: [Date],
    required: true
  }
})

module.exports = movieSessions
