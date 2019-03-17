
const express = require('express')
const cors = require('../cors')
const bodyParser = require('body-parser')
const tokenHelper = require('../token-helper')
const { tokenVerifierMiddleware } = tokenHelper

const { registerUser, registerPet,assignAppointment, authenticateUser, retrieveUsers, retrieveAppointmentsOwner,retrieveUserSelected,retrieveUser, retrievePet, retrievePets, retrieveAppointments,updateUser, updatePet, retrievePetVisit,updateVisit, deleteAppointment,notFound } = require('./handlers')

const jsonBodyParser = bodyParser.json()

const router = express.Router()

router.use(cors)

router.post('/user', jsonBodyParser, registerUser)

router.post('/pet', jsonBodyParser, registerPet)

router.post('/appointment', jsonBodyParser, assignAppointment)

router.post('/user/auth', jsonBodyParser, authenticateUser)

router.get('/users', tokenVerifierMiddleware, retrieveUsers)

router.get('/appointmentsOwner', tokenVerifierMiddleware, retrieveAppointmentsOwner)

router.get('/user/:userSelectedId', tokenVerifierMiddleware, retrieveUserSelected)

router.get('/pets/:ownerId', tokenVerifierMiddleware, retrievePets)

router.get('/appointments/:year/:month', tokenVerifierMiddleware, retrieveAppointments)

router.get('/user/', tokenVerifierMiddleware, retrieveUser)

router.get('/pet/:petsId', tokenVerifierMiddleware, retrievePet)

router.get('/visit/:petsId', tokenVerifierMiddleware, retrievePetVisit)

router.put('/user', [tokenVerifierMiddleware, jsonBodyParser], updateUser)

router.put('/pet', [tokenVerifierMiddleware, jsonBodyParser], updatePet)

router.put('/visit', [tokenVerifierMiddleware, jsonBodyParser], updateVisit)

router.delete('/appointment', jsonBodyParser, deleteAppointment)


module.exports = router