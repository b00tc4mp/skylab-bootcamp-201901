require('dotenv').config()

require('isomorphic-fetch')

const express = require('express')
const bodyParser = require('body-parser')
const spotifyApi = require('./spotify-api')

const { registerUser, authenticateUser, retrieveUser, searchArtists, addCommentToArtist, listCommentsFromArtist, notFound } = require('./routes')

const { env: { PORT, SPOTIFY_API_TOKEN }, argv: [, , port = PORT || 8080] } = process

spotifyApi.token = SPOTIFY_API_TOKEN

const app = express()

const jsonBodyParser = bodyParser.json()

const router = express.Router()

router.post('/user', jsonBodyParser, registerUser)

router.post('/user/auth', jsonBodyParser, authenticateUser)

router.get('/user/:id', retrieveUser)

router.get('/artists', searchArtists)

router.post('/artist/:artistId/comment', jsonBodyParser, addCommentToArtist)

router.get('/artist/:artistId/comment', listCommentsFromArtist)

// router.get('/artist/:id', retrieveArtist)

// router.get('/album/:id', retrieveAlbum)

// router.get('/track/:id', retrieveTrack)

// app.get('*', notFound)

app.use('/api', router)

app.listen(port, () => console.log(`server running on port ${port}`))