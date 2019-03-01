require('dotenv').config()

require('isomorphic-fetch')

const mongoose = require('mongoose')
const express = require('express')
const spotifyApi = require('./spotify-api')
const tokenHelper = require('./token-helper')
const package = require('../package.json')
const router = require('./routes')

const { env: { DB_URL, PORT, SPOTIFY_API_TOKEN, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        tokenHelper.jwtSecret = JWT_SECRET
        spotifyApi.token = SPOTIFY_API_TOKEN

        const app = express()

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
