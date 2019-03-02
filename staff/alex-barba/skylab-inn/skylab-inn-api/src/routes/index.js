const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { tokenVerifierMiddelware } = require('../token-helper')
const { registerUser, authenticateUser } = require('./handlers')

const jsonBodyParser = bodyParser.json()

const router = express.Router()

router.use(cors())

router.post('/user', jsonBodyParser, registerUser)
router.post('/user/auth', jsonBodyParser, authenticateUser)



module.exports = router

