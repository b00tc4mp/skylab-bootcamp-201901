const express = require('express')
// const cors = require('../cors')
const cors = require('cors')
const bodyParser = require('body-parser')
const tokenHelper = require('../token-helper')
const { tokenVerifierMiddleware } = tokenHelper
const { registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    deleteUser,
    notFound,
    addDrone,
    retrieveDrones,
    retrieveDronesUser } = require('./handlers')

const jsonBodyParser = bodyParser.json()

const router = express.Router()

router.use(cors())

//routes
router.post('/user', jsonBodyParser, registerUser)

router.post('/user/auth', jsonBodyParser, authenticateUser)

router.get('/user', tokenVerifierMiddleware, retrieveUser)

router.post('/user/update', [jsonBodyParser, tokenVerifierMiddleware], updateUser)

router.delete('/user', tokenVerifierMiddleware, deleteUser)

router.post('/drone', jsonBodyParser, addDrone)

router.get('/drones', tokenVerifierMiddleware, retrieveDrones)

router.get('/user/:userId/drones', tokenVerifierMiddleware, retrieveDronesUser)

router.all('*', notFound)

module.exports = router