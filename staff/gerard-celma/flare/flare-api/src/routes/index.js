const express = require('express')
const bodyParser = require('body-parser')
const tokenHelper = require('../token-helper')
const cors = require('cors')
const { tokenVerifierMiddleware } = tokenHelper
const { registerUser, authenticateUser, retrieveUser, retrieveUsers, updateUser, updateUserPhoto, removeUser, createMessage, uploadMessagePhoto, messageRead, messageDelete, retrieveReceivedMessages, retrieveSentMessages, retrieveAllMessages, notFound } = require('./handlers')
const imageParser = require('../imageParser')
const cloudinaryUploader = require('../cloudinary')
const jsonBodyParser = bodyParser.json()
const router = express.Router()

router.use(cors())


router.post('/user', jsonBodyParser, registerUser)

router.post('/user/auth', jsonBodyParser, authenticateUser)

router.get('/user', tokenVerifierMiddleware, retrieveUser)

router.put('/user', [jsonBodyParser, tokenVerifierMiddleware], updateUser)

router.put('/user/photo', [imageParser, cloudinaryUploader, tokenVerifierMiddleware], updateUserPhoto)

router.delete('/user', tokenVerifierMiddleware, removeUser)

router.get('/users', tokenVerifierMiddleware, retrieveUsers)

router.post('/message/create', [jsonBodyParser, tokenVerifierMiddleware], createMessage)

router.post('/message/photo/:msgId', [imageParser, cloudinaryUploader, tokenVerifierMiddleware], uploadMessagePhoto)

router.post('/message/read', [jsonBodyParser, tokenVerifierMiddleware], messageRead)

router.post('/message/delete', [jsonBodyParser, tokenVerifierMiddleware], messageDelete)

router.get('/message/received', tokenVerifierMiddleware, retrieveReceivedMessages)

router.get('/message/sent', tokenVerifierMiddleware, retrieveSentMessages)

router.get('/message/all', tokenVerifierMiddleware, retrieveAllMessages)

// router.get('*', notFound)


module.exports = router