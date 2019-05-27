require('dotenv').config()

const { mongoose } = require('freendies_data')
const express = require('express')
const bodyParser = require('body-parser')
const tokenHelper = require('./token-helper')
const {tokenVerifierMiddleware} = tokenHelper
const package = require('../package.json')
const cors = require('cors')

const {
    registerUser,
    authenticateUser,
    retrieveUser,
    uploadGame
} = require('./routes')

const { env: { DB_URL, PORT, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process

const app = express()

const jsonBodyParser = bodyParser.json()

const router = express.Router()

app.use(cors())

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        tokenHelper.jwtSecret = JWT_SECRET

        router.post('/user', jsonBodyParser, registerUser)
        router.get('/user', jsonBodyParser, retrieveUser)
        router.post('/user/auth', jsonBodyParser, authenticateUser)
        router.post('/user/game', tokenVerifierMiddleware, jsonBodyParser, uploadGame)
        

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