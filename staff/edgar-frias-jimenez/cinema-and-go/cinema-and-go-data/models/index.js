const mongoose =  require('mongoose')
const schemas =  require('./schemas')

const {
  city,
  cinema,
  movie,
  movieSessions,
  user
} = schemas

module.exports = {
  City: mongoose.model('city', city),
  Cinema: mongoose.model('cinema', cinema),
  Movie: mongoose.model('movie', movie),
  MovieSessions: mongoose.model('movieSessions', movieSessions),
  User: mongoose.model('user', user)
}
