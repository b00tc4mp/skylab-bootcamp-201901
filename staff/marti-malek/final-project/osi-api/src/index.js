require('dotenv').config()

require('isomorphic-fetch')

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logic = require('./logic')

const { registerUser, authenticateUser, retrieveUser, updateUser, removeUser, createDir, createFile } = require('./routes')

const { env: { DB_URL, PORT, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {

        logic.jwtSecret = JWT_SECRET

        const app = express()

        app.use(cors())

        const jsonBodyParser = bodyParser.json()

        const router = express.Router()

        router.post('/user', jsonBodyParser, registerUser)

        router.post('/user/auth', jsonBodyParser, authenticateUser)

        router.get('/user', retrieveUser)

        router.post('/user/profile', jsonBodyParser, updateUser)

        router.delete('/user', removeUser)

        router.post('/create/dir', jsonBodyParser, createDir)

        router.post('/create/file', jsonBodyParser, createFile)

        // router.get('*', notFound)

        app.use('/api', router)

        app.listen(port, () => console.log(`server running on port ${port}`))
    })
    .catch(console.error)
process.on('SIGINT', () => {
    mongoose.disconnect()
        .then(() => {
            console.log('\nosi-api stopped running')

            process.exit(0)
        })
})