require('dotenv').config()

require('isomorphic-fetch')

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const tokenHelper = require('./token-helper')
const { tokenVerifierMiddleware } = tokenHelper
const package = require('../package.json')
const cors = require('./cors')

const { registerUser, authenticateUser, retrieveUser, updateUser, notFound } = require('./routes')

const { env: { DB_URL, PORT, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        tokenHelper.jwtSecret = JWT_SECRET
        // spotifyApi.token = SPOTIFY_API_TOKEN

        const app = express()

        const jsonBodyParser = bodyParser.json()

        const router = express.Router()

        router.use(cors)

        router.post('/user', jsonBodyParser, registerUser)

        router.post('/user/auth', jsonBodyParser, authenticateUser)

        router.get('/user', tokenVerifierMiddleware, retrieveUser)

        router.put('/user/update', tokenVerifierMiddleware, jsonBodyParser, updateUser)

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
