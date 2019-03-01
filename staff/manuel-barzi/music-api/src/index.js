require('dotenv').config()

require('isomorphic-fetch')

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const spotifyApi = require('./spotify-api')
const tokenHelper = require('./token-helper')
const { tokenVerifierMiddleware } = tokenHelper
const package = require('../package.json')
const cors = require('./cors')

const { registerUser, authenticateUser, retrieveUser, searchArtists, addCommentToArtist, listCommentsFromArtist, notFound } = require('./routes')

const { env: { DB_URL, PORT, SPOTIFY_API_TOKEN, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        tokenHelper.jwtSecret = JWT_SECRET
        spotifyApi.token = SPOTIFY_API_TOKEN

        const app = express()

        const jsonBodyParser = bodyParser.json()

        const router = express.Router()

        router.use(cors)

        router.post('/user', jsonBodyParser, registerUser)

        router.post('/user/auth', jsonBodyParser, authenticateUser)

        router.get('/user', tokenVerifierMiddleware, retrieveUser)

        router.get('/artists', searchArtists)

        router.post('/artist/:artistId/comment', [jsonBodyParser, tokenVerifierMiddleware], addCommentToArtist)

        router.get('/artist/:artistId/comment', tokenVerifierMiddleware, listCommentsFromArtist)

        // router.get('/artist/:id', retrieveArtist)

        // router.get('/album/:id', retrieveAlbum)

        // router.get('/track/:id', retrieveTrack)

        // app.get('*', notFound)

        app.use('/api', router)

        app.listen(port, () => console.log(`${package.name} ${package.version} running on port ${port}`))
    })
    .catch(console.error)

process.on('SIGINT', () => {
    mongoose.disconnect()
        .then(() => {
            console.log(`\n ${package.name} stopped`)
            
            process.exit(0)
        })
})
