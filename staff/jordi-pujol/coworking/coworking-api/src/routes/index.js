const express = require('express')
const cors = require('../cors')
const bodyParser = require('body-parser')
const tokenHelper = require('../token-helper')
const imageParser = require('../imageParser')
const cloudinaryUploader = require('../cloudinary')
const { tokenVerifierMiddleware } = tokenHelper

const { registerUser, authenticateUser, retrieveUser, updateUser, removeUser, searchServices, createWorkspace, addUserToWorkSpace, createNewUserLink, verifyNewUserLink, createService, retrieveService, updateService, deleteService, retrieveWorkspaceServices, addUserToService, createComment, retrieveServiceComments, removeComment, closeService, retrieveUserServices, retrieveUserSubmitedServices, retrieveProfile, updateUserPhoto } = require('./handlers')

const jsonBodyParser = bodyParser.json()
const router = express.Router()

router.use(cors)

router.post('/user', jsonBodyParser, registerUser)

router.get('/user', tokenVerifierMiddleware ,retrieveUser)

router.put('/user', [jsonBodyParser, tokenVerifierMiddleware], updateUser)

router.post('/user/auth', jsonBodyParser, authenticateUser)

router.delete('/user', [tokenVerifierMiddleware, jsonBodyParser], removeUser)

router.get('/user/service', tokenVerifierMiddleware, retrieveUserServices)

router.get('/user/service/submited', tokenVerifierMiddleware, retrieveUserSubmitedServices)

router.get('/user/:username', tokenVerifierMiddleware ,retrieveProfile)

router.post('/user-photo', [imageParser, cloudinaryUploader, tokenVerifierMiddleware], updateUserPhoto)


router.post('/workspace', [tokenVerifierMiddleware, jsonBodyParser], createWorkspace)

router.post('/workspace/user', [tokenVerifierMiddleware, jsonBodyParser], addUserToWorkSpace)

router.get('/workspace/link', tokenVerifierMiddleware, createNewUserLink)

router.post('/workspace/link', [tokenVerifierMiddleware, jsonBodyParser], verifyNewUserLink)


router.post('/service', [tokenVerifierMiddleware, jsonBodyParser], createService)

router.post('/service/:serviceId', tokenVerifierMiddleware, addUserToService)

router.get('/service/:serviceId', tokenVerifierMiddleware, retrieveService)

router.get('/services?:query', tokenVerifierMiddleware, searchServices)

router.get('/service/workspace/:workspaceId', tokenVerifierMiddleware, retrieveWorkspaceServices)

router.put('/service/:serviceId', [tokenVerifierMiddleware, jsonBodyParser], updateService)

router.delete('/service/:serviceId', tokenVerifierMiddleware, deleteService)

router.post('/closeservice/:serviceId', tokenVerifierMiddleware, closeService)


router.post('/comment/:serviceId', [tokenVerifierMiddleware, jsonBodyParser], createComment)

router.get('/comment/:serviceId', tokenVerifierMiddleware, retrieveServiceComments)

// router.put('/service/:serviceId', [tokenVerifierMiddleware, jsonBodyParser], updateComment)

router.delete('/comment/:serviceId/:commentId', tokenVerifierMiddleware, removeComment)

module.exports = router