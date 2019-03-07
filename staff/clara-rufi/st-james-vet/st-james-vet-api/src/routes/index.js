
const express = require('express')
const cors = require('../cors')
const bodyParser = require('body-parser')
const tokenHelper = require('../token-helper')
const { tokenVerifierMiddleware } = tokenHelper

const { registerUser, registerPet, authenticateUser, retrieveUsers, retrieveUser, retrievePet, retrievePets, updateUser, updatePet, retrievePetVisit,updateVisit, notFound } = require('./handlers')

const jsonBodyParser = bodyParser.json()

const router = express.Router()

router.use(cors)

router.post('/user', jsonBodyParser, registerUser)

router.post('/pet', jsonBodyParser, registerPet)

router.post('/user/auth', jsonBodyParser, authenticateUser)

router.get('/users', tokenVerifierMiddleware, retrieveUsers)

router.get('/pets/:ownerId', tokenVerifierMiddleware, retrievePets)

router.get('/user/:userId', tokenVerifierMiddleware, retrieveUser)

router.get('/pet/:petsId', tokenVerifierMiddleware, retrievePet)

router.get('/visit/:petsId', tokenVerifierMiddleware, retrievePetVisit)

router.put('/user', [tokenVerifierMiddleware, jsonBodyParser], updateUser)

router.put('/pet', [tokenVerifierMiddleware, jsonBodyParser], updatePet)

router.put('/visit', [tokenVerifierMiddleware, jsonBodyParser], updateVisit)


module.exports = router