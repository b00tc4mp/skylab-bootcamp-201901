require('dotenv').config()

require('isomorphic-fetch')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const logic = require('./logic')
// const tokenHelper = require('./token-helper')
// const { tokenVerifierMiddleware } = tokenHelper

const { addJourney, notFound } = require('./routes')


const { env: { DB_URL, PORT, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process


mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {

        // tokenHelper.jwtSecret = JWT_SECRET

        const jsonBodyParser = bodyParser.json()

        const app = express()
        const router = express.Router()

        app.use(cors())
        app.use('/api', router)

        // router.post('/user', jsonBodyParser, registerUser)
        // router.post('/user/auth', jsonBodyParser, authenticateUser)
        // router.get('/user',  tokenVerifierMiddleware, retrieveUser)

        console.log(addJourney)

        router.post('/journey', jsonBodyParser, addJourney)

        router.get('*', notFound)

        app.listen(port, () => console.log(`server running on port ${port}`))

    })
    .catch(error => console.error(error))