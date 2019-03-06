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
    retrieveDronesUser,
    updateDrone,
    deleteDrone,
    addFlight,
    retrieveFlights,
    retrieveFlightsUser,
    retrieveFlightsDrone,
    retrieveFlightsUserDrone,
    updateFlight,
    deleteFlight } = require('./handlers')

const jsonBodyParser = bodyParser.json()

const router = express.Router()

router.use(cors())

//routes

//user
router.post('/user', jsonBodyParser, registerUser)

router.post('/user/auth', jsonBodyParser, authenticateUser)

router.get('/user', tokenVerifierMiddleware, retrieveUser)

router.put('/user/update', [jsonBodyParser, tokenVerifierMiddleware], updateUser)

router.delete('/user', tokenVerifierMiddleware, deleteUser)


//drone
router.post('/drone', [jsonBodyParser, tokenVerifierMiddleware], addDrone)

router.get('/drones', tokenVerifierMiddleware, retrieveDrones)

router.get('/user/:userId/drones', tokenVerifierMiddleware, retrieveDronesUser)

router.put('/drone/update', [jsonBodyParser, tokenVerifierMiddleware], updateDrone)

router.delete('/drone', [jsonBodyParser, tokenVerifierMiddleware], deleteDrone)

//flights
router.post('/flight', [jsonBodyParser, tokenVerifierMiddleware], addFlight)

router.get('/flights', tokenVerifierMiddleware, retrieveFlights)

router.get('/user/:userId/flights', tokenVerifierMiddleware, retrieveFlightsUser)

router.get('/drone/:droneId/flights', tokenVerifierMiddleware, retrieveFlightsDrone)

router.get('/user/:userId/drone/:droneId/flights', tokenVerifierMiddleware, retrieveFlightsUserDrone)

router.put('/flight/update', [jsonBodyParser, tokenVerifierMiddleware], updateFlight)

router.delete('/flight', [jsonBodyParser, tokenVerifierMiddleware], deleteFlight)


//notfound
router.all('*', notFound)

module.exports = router