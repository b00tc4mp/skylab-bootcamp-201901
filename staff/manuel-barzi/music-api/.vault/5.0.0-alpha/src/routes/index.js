const express = require('express')
const cors = require('../cors')
const bodyParser = require('body-parser')
const tokenHelper = require('../token-helper')
const { tokenVerifierMiddleware } = tokenHelper
const { registerUser, authenticateUser, retrieveUser, searchArtists, addCommentToArtist, listCommentsFromArtist, notFound } = require('./handlers')

const jsonBodyParser = bodyParser.json()

const router = express.Router()

router.use(cors)

router.post('/user', jsonBodyParser, registerUser)

router.post('/user/auth', jsonBodyParser, authenticateUser)

router.get('/user', tokenVerifierMiddleware, retrieveUser)

router.get('/artists', searchArtists)

router.post('/artist/:artistId/comment', [jsonBodyParser, tokenVerifierMiddleware], addCommentToArtist)

router.get('/artist/:artistId/comment', tokenVerifierMiddleware, listCommentsFromArtist)

// router.get('/artist/:id', retrieveArtist)

// router.get('/album/:id', retrieveAlbum)

// router.get('/track/:id', retrieveTrack)

// router.get('*', notFound)

module.exports = router