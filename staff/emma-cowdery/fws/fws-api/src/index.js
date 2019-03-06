'use strict'

require('dotenv').config()

require('isomorphic-fetch')

const { mongoose } = require('fws-data')
const express = require('express')
const bodyParser = require('body-parser')
const tokenHelper = require('./token-helper')
const { tokenVerifierMiddleware } = tokenHelper
var cors = require('cors')
var corsOptions = {
    origin: 'http://localhost:3000'
}

//cloud

const { parseImageUpload } = require('./cloudinary/middleware')

//nocloud

const { registerUser, authenticateUser, retrieveUser, createEvent, joinEvent, userEvents, createChat, joinChat, userChats, addMessageToChat, uploadImage, notFound } = require('./routes')

const { env: { DB_URL, PORT, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        tokenHelper.jwtSecret = JWT_SECRET

        const app = express()

        const jsonBodyParser = bodyParser.json()

        const router = express.Router()

        app.use(cors())

        router.post('/user', jsonBodyParser, registerUser)

        router.post('/user/auth', jsonBodyParser, authenticateUser)

        router.get('/user', [tokenVerifierMiddleware], retrieveUser )

        router.post('/event/:restaurantId', [jsonBodyParser, tokenVerifierMiddleware], createEvent)

        router.put('/event/:eventId', [jsonBodyParser, tokenVerifierMiddleware], joinEvent)

        router.get('/events', [tokenVerifierMiddleware], userEvents)

        router.post('/chat/:eventId', [jsonBodyParser, tokenVerifierMiddleware], createChat)

        router.put('/chat/:chatId', [jsonBodyParser, tokenVerifierMiddleware], joinChat)

        router.get('/chats', [tokenVerifierMiddleware], userChats)

        router.post('/message/:chatId', [tokenVerifierMiddleware, jsonBodyParser], addMessageToChat)

        //router.post('/upload', [parseImageUpload, tokenVerifierMiddleware], uploadImage)

        router.get('*', notFound)

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