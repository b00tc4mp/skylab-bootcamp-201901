require('dotenv').config()

require('isomorphic-fetch')

const { MongoClient } = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')
const spotifyApi = require('./spotify-api')
const users = require('./data/users')
const logic = require('./logic')
const cors = require('cors')
const { registerUser, authenticateUser, retrieveUser, retrievesingletrack, searchArtists, retrieveTracks, retrieveAlbum, retrievesingleArtist, retrieveArtist, addCommentToArtist, listCommentsFromArtist, notFound } = require('./routes')

const { env: { DB_URL, PORT, SPOTIFY_API_TOKEN, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process


MongoClient.connect(DB_URL, { useNewUrlParser: true })
    .then(client => {
        const db = client.db()
        users.collection = db.collection('users')

        spotifyApi.token = SPOTIFY_API_TOKEN
        logic.jwtSecret = JWT_SECRET

        const app = express()
        app.use(cors())
        const jsonBodyParser = bodyParser.json()

        const router = express.Router()

        

        router.post('/user', jsonBodyParser, registerUser)

        router.post('/user/auth', jsonBodyParser, authenticateUser)

        router.get('/user/:id', retrieveUser)

        router.get('/artists', searchArtists)
        
        router.get('/artists/:artistId', retrievesingleArtist)

        router.post('/artist/:artistId/comment', jsonBodyParser, addCommentToArtist)

        router.get('/artist/:artistId/comment', listCommentsFromArtist)

        router.get('/artist/:artistId/albums', retrieveArtist)

        router.get('/albums/:albumId', retrieveAlbum)
        
        router.get('/albums/:albumId/tracks', retrieveTracks)

        router.get('/tracks/:trackId', retrievesingletrack)

        // app.get('*', notFound)

        app.use('/api', router)

        app.listen(port, () => console.log(`server running on port ${port}`))
    })
    .catch(console.error)
