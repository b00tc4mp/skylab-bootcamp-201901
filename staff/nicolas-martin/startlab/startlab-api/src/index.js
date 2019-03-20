require('dotenv').config()
require('isomorphic-fetch')

// const mongoose = require('mongoose')
const { mongoose } = require('startlab-data')
const express = require('express')
const bodyParser = require('body-parser')

// const logic = require('./logic')
const cors = require('./cors')
const tokenHelper = require('./token-helper')
const { tokenVerifierMiddleware } = tokenHelper

const {
    // User API
    registerUser,
    authenticateUser,
    retrieveUser,
    isAdmin,

    // CRUD Exercise
    createExercise,
    retrieveExercise,
    updateExercise,
    deleteExercise,
    listExercises,

    getExercisesFromUser,
    updateExerciseFromUser,

    checkAnswer,

    // invitations
    sendInvitationEmail,
    createInvitation,
    listInvitations,
    retrieveInvitation,
    updateInvitation,
    deleteInvitation,

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

        // CRUD Exercises
        router.post('/admin/exercise/create', [jsonBodyParser, tokenVerifierMiddleware], createExercise)
        router.get('/admin/exercise/list', [tokenVerifierMiddleware], listExercises)
        router.get('/admin/exercise/:exerciseId', [jsonBodyParser, tokenVerifierMiddleware], retrieveExercise)
        router.post('/admin/exercise/update', [jsonBodyParser, tokenVerifierMiddleware], updateExercise)
        router.delete('/admin/exercise/delete/:exerciseId', [jsonBodyParser, tokenVerifierMiddleware], deleteExercise)

        router.post('/user/historical/update', [jsonBodyParser, tokenVerifierMiddleware], updateExerciseFromUser)

        router.get('/student/start', [tokenVerifierMiddleware], getExercisesFromUser)

        // Code sanity
        router.post('/checkanswer', [jsonBodyParser, tokenVerifierMiddleware], checkAnswer)

        // Mail
        router.post('/admin/email/invitation', [jsonBodyParser, tokenVerifierMiddleware], sendInvitationEmail)

        // CRUD Invitations
        router.post('/admin/invitation/create', [jsonBodyParser, tokenVerifierMiddleware], createInvitation)
        router.get('/admin/invitation/list', [tokenVerifierMiddleware], listInvitations)
        router.get('/admin/invitation/:invitationId', [jsonBodyParser, tokenVerifierMiddleware], retrieveInvitation)
        router.post('/admin/invitation/update', [jsonBodyParser, tokenVerifierMiddleware], updateInvitation)
        router.delete('/admin/invitation/delete/:invitationId', [jsonBodyParser, tokenVerifierMiddleware], deleteInvitation)


        app.use('/api', router)

        app.set('view engine', 'pug')

        router.get('*', notFound)

        app.listen(port, () => console.log(`server running on port ${port}`))
    })
    .catch(console.error) 