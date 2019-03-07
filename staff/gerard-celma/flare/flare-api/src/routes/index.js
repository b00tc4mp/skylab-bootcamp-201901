const express = require('express')
const cors = require('../cors')
const bodyParser = require('body-parser')
const tokenHelper = require('../token-helper')
const { tokenVerifierMiddleware } = tokenHelper
const { registerUser, authenticateUser, retrieveUser, updateUser, removeUser, createMessage, messageRead, messageDelete, notFound } = require('./handlers')

const jsonBodyParser = bodyParser.json()
const router = express.Router()


router.use(cors)

router.post('/user', jsonBodyParser, registerUser)

router.post('/user/auth', jsonBodyParser, authenticateUser)

router.get('/user', tokenVerifierMiddleware, retrieveUser)

router.put('/user', [jsonBodyParser, tokenVerifierMiddleware], updateUser)

router.delete('/user', tokenVerifierMiddleware, removeUser)

router.post('/message/create', [jsonBodyParser, tokenVerifierMiddleware], createMessage)

router.post('/message/read', [jsonBodyParser, tokenVerifierMiddleware], messageRead)

router.post('/message/delete', [jsonBodyParser, tokenVerifierMiddleware], messageDelete)

// router.get('*', notFound)


module.exports = router