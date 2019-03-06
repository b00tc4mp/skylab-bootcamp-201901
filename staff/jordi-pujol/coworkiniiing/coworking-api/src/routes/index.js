const express = require('express')
const cors = require('../cors')
const bodyParser = require('body-parser')
const tokenHelper = require('../token-helper')
const { tokenVerifierMiddleware } = tokenHelper

const { registerUser, authenticateUser, retrieveUser, updateUser, removeUser, createWorkspace, addUserToWorkSpace, createNewUserLink, verifyNewUserLink, createService, retrieveService, updateService, deleteService } = require('./handlers')

const jsonBodyParser = bodyParser.json()
const router = express.Router()

router.use(cors)


router.post('/user', jsonBodyParser, registerUser)

router.get('/user', tokenVerifierMiddleware ,retrieveUser)

router.put('/user', [jsonBodyParser, tokenVerifierMiddleware], updateUser)

router.post('/user/auth', jsonBodyParser, authenticateUser)

router.delete('/user', [jsonBodyParser, tokenVerifierMiddleware], removeUser)


router.post('/workspace', jsonBodyParser, createWorkspace)

router.post('/workspace/user', jsonBodyParser, addUserToWorkSpace)

router.get('/workspace/link', tokenVerifierMiddleware, createNewUserLink)

router.post('/workspace/link', [tokenVerifierMiddleware, jsonBodyParser], verifyNewUserLink)


router.post('/service', [tokenVerifierMiddleware, jsonBodyParser], createService)

router.get('/service/:serviceId', tokenVerifierMiddleware, retrieveService)

router.put('/service/:serviceId', [tokenVerifierMiddleware, jsonBodyParser], updateService)

router.delete('/service/:serviceId', tokenVerifierMiddleware, deleteService)


// router.post('/service', [tokenVerifierMiddleware, jsonBodyParser], createComment)

// router.get('/service/:serviceId', tokenVerifierMiddleware, retrieveComment)

// router.put('/service/:serviceId', [tokenVerifierMiddleware, jsonBodyParser], updateComment)

// router.delete('/comment/:serviceId', tokenVerifierMiddleware, deleteComment)

module.exports = router