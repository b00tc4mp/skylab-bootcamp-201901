const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const auth = require('../middlewares/auth')

const { registerUser, authenticateUser, retrieveUser, updateUser, removeUser,
    retrieveUserMaps, retrieveUserMap,
    createMap, updateMap, removeMap,
    createCollection, updateCollection, removeCollection,
    createPin, updatePin, removePin
} = require('./handlers')


const jsonBodyParser = bodyParser.json()

const router = express.Router()

router.use(cors())

router.post('/user', jsonBodyParser, registerUser)
router.post('/user/auth', jsonBodyParser, authenticateUser)
router.get('/user', auth, retrieveUser)
router.put('/user', [jsonBodyParser, auth], updateUser)
router.delete('/user', auth, removeUser)

router.get('/user/maps', auth, retrieveUserMaps)
router.get('/map/:id', auth, retrieveUserMap)

router.post('/map', [jsonBodyParser, auth], createMap)
router.put('/map/:id', [jsonBodyParser, auth], updateMap)
router.delete('/map/:id', auth, removeMap)

router.post('/map/:id/pin', [jsonBodyParser, auth], createPin)
router.put('/pin/:id', [jsonBodyParser, auth], updatePin)
router.delete('/pin/:id', auth, removePin)

router.post('/map/:id/collection', [jsonBodyParser, auth], createCollection)
router.put('/map/:id/collection/:title', [jsonBodyParser, auth], updateCollection)
router.delete('/map/:id/collection/:title', auth, removeCollection)

module.exports = router