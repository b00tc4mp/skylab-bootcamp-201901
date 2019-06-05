require('dotenv').config()

const { mongoose } = require('freendies_data')
const express = require('express')
const bodyParser = require('body-parser')
const tokenHelper = require('./token-helper')
const { tokenVerifierMiddleware } = tokenHelper
const package = require('../package.json')
const cors = require('cors')
const fileParser = require('./file-parser/index')

const {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    uploadGame,
    retrieveGameByQuery,
    retrieveGameByGenre,
    retrieveGameById,
    toggleFavs,
    retrieveFavs
} = require('./routes')

const logic = require('./logic/index')
const { env: { DB_URL, PORT, JWT_SECRET, FB_API_KEY, FB_AUTH_DOMAIN, FB_DATABASE_URL, FB_STORAGE_BUCKET }, argv: [, , port = PORT || 8080] } = process

logic.apiKey = FB_API_KEY
logic.authDomain = FB_AUTH_DOMAIN
logic.databaseURL = FB_DATABASE_URL
logic.storageBucket = FB_STORAGE_BUCKET

const app = express()

const jsonBodyParser = bodyParser.json()

const router = express.Router()

app.use(cors())

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        tokenHelper.jwtSecret = JWT_SECRET

        router.post('/user', jsonBodyParser, registerUser)
        router.get('/user', tokenVerifierMiddleware, retrieveUser)
        router.post('/user/auth', jsonBodyParser, authenticateUser)
        router.put('/user/update', [tokenVerifierMiddleware, jsonBodyParser], updateUser)
        router.post('/user/game', [tokenVerifierMiddleware, fileParser], uploadGame)
        router.post('/user/toggleFavs', tokenVerifierMiddleware, jsonBodyParser, toggleFavs)

        router.get('/genre/:genre', jsonBodyParser, retrieveGameByGenre)
        router.get('/search/:genre/:query', jsonBodyParser, retrieveGameByQuery)
        router.get('/game/:id', jsonBodyParser, retrieveGameById)
        router.get('/user/retrieveFavs', tokenVerifierMiddleware, jsonBodyParser,retrieveFavs)

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