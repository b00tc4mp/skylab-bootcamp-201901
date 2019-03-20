require('dotenv').config()

require('isomorphic-fetch')

const { mongoose } = require('sail-away-data')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const logic = require('./logic')
const tokenHelper = require('./middlewares/token-helper')
const { tokenVerifierMiddleware } = tokenHelper
const imageParser = require('./middlewares/image-parser')
const cloudinaryUploader = require('./middlewares/cloudinary-uploader')

const {
    registerUser,
    authenticateUser,
    retrieveUser,
    retrieveUserLogged,
    updateUser,
    updateBoat,
    updateUserPicture,
    updateBoatPicture,
    searchUsers,

    addJourney,
    retrieveJourney,
    myJourneys,
    searchJourneys,
    updateJourney,
    deleteJourney,

    toggleFavoriteJourney,
    toggleFavoriteCrew,

    notFound } = require('./routes')


const { env: { TEST_DB_URL, PORT, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process


mongoose.connect(TEST_DB_URL, { useNewUrlParser: true })
    .then(() => {

        tokenHelper.jwtSecret = JWT_SECRET

        const jsonBodyParser = bodyParser.json()

        const app = express()
        const router = express.Router()

        app.use(cors())
        app.use('/api', router)

        router.post('/user', jsonBodyParser, registerUser)
        router.post('/user/auth', jsonBodyParser, authenticateUser)
        router.get('/user/:id', jsonBodyParser, retrieveUser)
        router.get('/user', tokenVerifierMiddleware, retrieveUserLogged)
        router.put('/user', tokenVerifierMiddleware, jsonBodyParser, updateUser)
        router.post('/users', jsonBodyParser, searchUsers)
        router.put('/update-boat', tokenVerifierMiddleware, jsonBodyParser, updateBoat)
        router.post('/update-picture/:boatId', [imageParser, cloudinaryUploader, tokenVerifierMiddleware], updateBoatPicture)
        router.post('/update-picture/', [imageParser, cloudinaryUploader, tokenVerifierMiddleware], updateUserPicture)

        router.post('/journey', jsonBodyParser, addJourney)
        router.get('/journey/:id', retrieveJourney)
        router.get('/search', searchJourneys)
        router.get('/my-journeys', tokenVerifierMiddleware, myJourneys)
        router.put('/journey/:id', jsonBodyParser, updateJourney)
        router.delete('/journey/:id', deleteJourney)

        router.put('/favorite-journey/:journeyId', tokenVerifierMiddleware, toggleFavoriteJourney)
        router.put('/favorite-crew/:crewId', tokenVerifierMiddleware, toggleFavoriteCrew)

        router.get('*', notFound)

        app.listen(port, () => console.log(`server running on port ${port}`))

    })
    .catch(error => console.error(error))

process.on('SIGINT', () => {
    mongoose.disconnect()
        .then(() => {
            console.log('\nsail-away stopped running')

            process.exit(0)
        })
})