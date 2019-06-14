const express = require('express')
// const cors = require('../cors')
const cors = require('cors')
const bodyParser = require('body-parser')
const tokenHelper = require('../token-helper')
const imageParser = require('../imageParser')
const cloudinaryUploader = require('../cloudinary')

const { tokenVerifierMiddleware } = tokenHelper
const { registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    uploadUserImage,
    deleteUser,
    notFound,
    addDrone,
    retrieveDrone,
    retrieveDrones,
    retrieveDronesUser,
    updateDrone,
    deleteDrone,
    startDrone,
    getDroneHistory,
    stopDrone,
    sendDroneCommand,
    addFlight,
    retrieveFlight,
    retrieveFlights,
    retrieveFlightsUser,
    retrieveFlightsDrone,
    retrieveFlightsUserDrone,
    updateFlight,
    deleteFlight,
    addProgram,
    retrieveProgram,
    retrievePrograms,
    retrieveProgramsUser,
    updateProgram,
    deleteProgram,
    playProgram,
    sendMail } = require('./handlers')

const jsonBodyParser = bodyParser.json()

const router = express.Router()

router.use(cors())

//routes

//user
router.post('/user', jsonBodyParser, registerUser)

router.post('/user/auth', jsonBodyParser, authenticateUser)

router.get('/user', tokenVerifierMiddleware, retrieveUser)

router.put('/user/update', [jsonBodyParser, tokenVerifierMiddleware], updateUser)

router.post('/user/photo', [imageParser, cloudinaryUploader, tokenVerifierMiddleware], uploadUserImage)

router.delete('/user', tokenVerifierMiddleware, deleteUser)


//drone
router.post('/drone', [jsonBodyParser, tokenVerifierMiddleware], addDrone)

router.get('/drone/:droneId', [tokenVerifierMiddleware], retrieveDrone)

router.get('/drones', tokenVerifierMiddleware, retrieveDrones)

router.get('/user/:userId/drones', tokenVerifierMiddleware, retrieveDronesUser)

router.put('/drone/update', [jsonBodyParser, tokenVerifierMiddleware], updateDrone)

router.delete('/drone', [jsonBodyParser, tokenVerifierMiddleware], deleteDrone)

router.post('/drone/start', [jsonBodyParser, tokenVerifierMiddleware], startDrone)

router.post('/drone/stop', [jsonBodyParser, tokenVerifierMiddleware], stopDrone)

router.post('/drone/command', [jsonBodyParser, tokenVerifierMiddleware], sendDroneCommand)

router.post('/drone/history', [jsonBodyParser, tokenVerifierMiddleware], getDroneHistory)

//flights
router.post('/flight', [jsonBodyParser, tokenVerifierMiddleware], addFlight)

router.get('/flights', tokenVerifierMiddleware, retrieveFlights)

router.get('/flight/:flightId', tokenVerifierMiddleware, retrieveFlight)

router.get('/user/:userId/flights', tokenVerifierMiddleware, retrieveFlightsUser)

router.get('/drone/:droneId/flights', tokenVerifierMiddleware, retrieveFlightsDrone)

router.get('/user/:userId/drone/:droneId/flights', tokenVerifierMiddleware, retrieveFlightsUserDrone)

router.put('/flight/update', [jsonBodyParser, tokenVerifierMiddleware], updateFlight)

router.delete('/flight', [jsonBodyParser, tokenVerifierMiddleware], deleteFlight)


//programs
router.post('/program', [jsonBodyParser, tokenVerifierMiddleware], addProgram)

router.get('/program/:programId', tokenVerifierMiddleware, retrieveProgram)

router.get('/programs', tokenVerifierMiddleware, retrievePrograms)

router.get('/user/:userId/programs', tokenVerifierMiddleware, retrieveProgramsUser)

router.put('/program/update', [jsonBodyParser, tokenVerifierMiddleware], updateProgram)

router.delete('/program', [jsonBodyParser, tokenVerifierMiddleware], deleteProgram)

router.post('/program/play', [jsonBodyParser, tokenVerifierMiddleware], playProgram)

//general routes
router.post('/sendemail', [jsonBodyParser, tokenVerifierMiddleware], sendMail)

//notfound
router.all('*', notFound)

module.exports = router