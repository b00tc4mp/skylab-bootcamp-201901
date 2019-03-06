require('dotenv').config()

require('isomorphic-fetch')

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const spotifyApi = require('./spotify-api')
const logic = require('./logic')

const { registerUser, authenticateUser, retrieveUser, searchArtists, addCommentToArtist, listCommentsFromArtist, notFound } = require('./routes')

const { env: { DB_URL, PORT, SPOTIFY_API_TOKEN, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        spotifyApi.token = SPOTIFY_API_TOKEN
        logic.jwtSecret = JWT_SECRET

        const app = express()

        const jsonBodyParser = bodyParser.json()

        const router = express.Router()

        function cors(req, res, next) {
            // res.set('access-control-allow-credentials', true)
            res.set('access-control-allow-headers', 'Accept, Authorization, Origin, Content-Type, Retry-After')
            // res.set('access-control-allow-methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
            res.set('access-control-allow-origin', '*')
            // res.set('access-control-max-age', 604800)

            next()
        }

        router.use(cors)

        router.post('/user', jsonBodyParser, registerUser)

        router.post('/user/auth', jsonBodyParser, authenticateUser)

        router.get('/user', retrieveUser)

        router.get('/artists', searchArtists)

        router.post('/artist/:artistId/comment', jsonBodyParser, addCommentToArtist)

        router.get('/artist/:artistId/comment', listCommentsFromArtist)

        // router.get('/artist/:id', retrieveArtist)

        // router.get('/album/:id', retrieveAlbum)

        // router.get('/track/:id', retrieveTrack)

        // app.get('*', notFound)

        app.use('/api', router)

        app.listen(port, () => console.log(`server running on port ${port}`))
    })
    .catch(console.error)

process.on('SIGINT', () => {
    mongoose.disconnect()
        .then(() => {
            console.log('\nserver stopped')
            
            process.exit(0)
        })
})
