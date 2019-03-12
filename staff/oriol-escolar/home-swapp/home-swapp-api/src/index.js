require('dotenv').config()

require('isomorphic-fetch')

const { mongoose } = require('homeSwapp-data')
const express = require('express')
const bodyParser = require('body-parser')
const tokenHelper = require('./token-helper')
const { tokenVerifierMiddleware } = tokenHelper
const package = require('../package.json')
const cors = require('./cors')

const {
    registerUser, authenticateUser, retrieveUser, updateUser, createHouse, updateHouse,
    retrieveHouse, deleteHouse, toggleFavorite, retrieveMyHouses, retrieveFavorites, retrieveHousesByQuery, notFound
} = require('./routes')

const { env: { DB_URL, PORT, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        tokenHelper.jwtSecret = JWT_SECRET
        // spotifyApi.token = SPOTIFY_API_TOKEN

        const app = express()

        const jsonBodyParser = bodyParser.json()

        const router = express.Router()

        router.use(cors)

        // user
        router.post('/user', jsonBodyParser, registerUser)

        router.post('/user/auth', jsonBodyParser, authenticateUser)

        router.get('/user', tokenVerifierMiddleware, retrieveUser)

        router.put('/user/update', tokenVerifierMiddleware, jsonBodyParser, updateUser)

        router.post('/user/toggleFav', tokenVerifierMiddleware, jsonBodyParser, toggleFavorite)

        router.get('/user/retrieveMyHouses', tokenVerifierMiddleware, jsonBodyParser, retrieveMyHouses)

        router.get('/user/retrieveFavs', tokenVerifierMiddleware, jsonBodyParser, retrieveFavorites)



        //house

        router.post('/user/house', tokenVerifierMiddleware, jsonBodyParser, createHouse)

        router.get('/user/house/:houseId', jsonBodyParser, retrieveHouse)

        router.get('/search/:query', jsonBodyParser, retrieveHousesByQuery)

        router.put('/user/house', tokenVerifierMiddleware, jsonBodyParser, updateHouse)

        router.delete('/user/house', tokenVerifierMiddleware, jsonBodyParser, deleteHouse)


        app.use('/api', router)

        app.listen(port, () => console.log(`${package.name} ${package.version} running on port ${port}`))
    })
    .catch(console.error)

process.on('SIGINT', () => {
    mongoose.disconnect()
        .then(() => {
            console.log(`\n ${package.name} stopped`)

            process.exit(0)
        })
})
