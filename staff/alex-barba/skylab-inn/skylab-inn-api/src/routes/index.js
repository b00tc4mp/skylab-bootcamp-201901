const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const tokenHelper = require('../token-helper')
const { tokenVerifierMiddleware } = tokenHelper
const { registerUser, authenticateUser, retrieveUser, updateUser, searchSkylaber, retrieveSkylaber, advancedSearchSkylaber } = require('./handlers')

const jsonBodyParser = bodyParser.json()

const router = express.Router()

router.use(cors())

router.post('/user', jsonBodyParser, registerUser)
router.post('/user/auth', jsonBodyParser, authenticateUser)
router.get('/user', tokenVerifierMiddleware, retrieveUser)
router.put('/user', [jsonBodyParser, tokenVerifierMiddleware], updateUser)
router.post('/user/search', [jsonBodyParser, tokenVerifierMiddleware], searchSkylaber)
router.post('/user/advanced-search', [jsonBodyParser, tokenVerifierMiddleware], advancedSearchSkylaber)
router.get('/skylaber/:id', tokenVerifierMiddleware, retrieveSkylaber)

module.exports = router

