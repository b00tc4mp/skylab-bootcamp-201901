import { Schema, ObjectId } from 'mongoose'

const movieSessions = new Schema({
  movie: { type: ObjectId, ref: 'Movie', required: true },
  sessions: {
    type: [String],
    required: true
  }
})

export default movieSessions
