import { Schema, ObjectId } from 'mongoose'
import point from './point'

const cinema = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    type: point,
    required: true
  },
  movieSessions: [{
    type: ObjectId,
    ref: 'movieSessions',
    required: true
  }],
  city: { type: ObjectId, ref: 'City' },
})

cinema.index({ location: '2dsphere' })

export default cinema
