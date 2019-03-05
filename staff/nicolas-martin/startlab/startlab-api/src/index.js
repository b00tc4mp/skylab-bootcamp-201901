require('dotenv').config()
require('isomorphic-fetch')

// const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const users = require('./data/users')
const exercises = require('./data/exercises')
const logic = require('./logic')
const cors = require('./cors')
const tokenHelper = require('./token-helper')
const { tokenVerifierMiddleware } = tokenHelper

const {
    // User API
    registerUser,
    authenticateUser,
    retrieveUser,
    checkCode,
    isAdmin,

    // CRUD Exercise
    createExercise,
    retrieveExercise,
    updateExercise,
    deleteExercise,
    listExercises,

    // Others
    notFound
} = require('./routes')

const { env: { DB_URL, PORT, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {

        tokenHelper.jwtSecret = JWT_SECRET

        const app = express()
        const router = express.Router()
        const jsonBodyParser = bodyParser.json()

        router.use(cors)

        // User API
        router.post('/user', jsonBodyParser, registerUser)
        router.post('/user/auth', jsonBodyParser, authenticateUser)
        router.get('/user', tokenVerifierMiddleware, retrieveUser)
        router.get('/isadmin', tokenVerifierMiddleware, isAdmin)

        // CRUD Exercise
        router.post('/admin/exercise/create', [jsonBodyParser, tokenVerifierMiddleware], createExercise)
        router.get('/admin/exercise/list', [tokenVerifierMiddleware], listExercises)
        router.get('/admin/exercise/:exerciseId', [jsonBodyParser, tokenVerifierMiddleware], retrieveExercise)
        router.post('/admin/exercise/update', [jsonBodyParser, tokenVerifierMiddleware], updateExercise)
        router.delete('/admin/exercise/delete/:exerciseId', [jsonBodyParser, tokenVerifierMiddleware], deleteExercise)

        // Code sanity
        router.post('/testing', [jsonBodyParser, tokenVerifierMiddleware], checkCode)

        app.use('/api', router)

        router.get('*', notFound)

        app.listen(port, () => console.log(`server running on port ${port}`))
    })
    .catch(console.error) 