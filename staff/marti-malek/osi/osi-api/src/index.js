require('dotenv').config()

require('isomorphic-fetch')

const { mongoose } = require('osi-data')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logic = require('./logic')

const { registerUser, authenticateUser, retrieveUser, updateUser, removeUser, createRootDir, createFile, retrieveFile, retrieveDir, createDir, updatePosition, removeDir, rename, retrieveLevel, removeFile, moveFile, moveDir, updateFile } = require('./routes')

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

        router.post('/create/root', jsonBodyParser, createRootDir)

        router.post('/create/file', jsonBodyParser, createFile)

        router.post('/create/dir', jsonBodyParser, createDir)

        router.get('/file', retrieveFile)

        router.get('/dir', retrieveDir)
        
        router.put('/file', jsonBodyParser, updateFile)

        router.put('/positions', jsonBodyParser, updatePosition)

        router.delete('/dir', removeDir)

        router.delete('/file', removeFile)
        
        router.put('/rename', rename)
        
        router.get('/level', retrieveLevel)

        router.put('/move/file', moveFile)

        router.put('/move/dir', moveDir)

        // router.get('*', notFound)

        app.use('/api', router)

        app.listen(port, () => console.log(`osi-api running on port ${port}`))
    })
    .catch(err => {if (err) throw err})
process.on('SIGINT', () => {
    mongoose.disconnect()
        .then(() => {
            console.log('\nosi-api stopped running')

            process.exit(0)
        })
})