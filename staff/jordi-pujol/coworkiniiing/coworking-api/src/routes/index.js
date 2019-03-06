const express = require('express')
const cors = require('../cors')
const bodyParser = require('body-parser')
const tokenHelper = require('../token-helper')
const { tokenVerifierMiddleware } = tokenHelper

const { registerUser, authenticateUser, retrieveUser, updateUser, removeUser, createWorkspace, addUserToWorkSpace, createNewUserLink } = require('./handlers')

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

module.exports = router