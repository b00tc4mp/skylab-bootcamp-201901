const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
// const handleErrors = require('./handle-errors')
const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET } } = process

const jsonParser = bodyParser.json()

const router = express.Router()

// User routes 

// User creation route 
router.post('/user', jsonParser, async (req, res) => {
    const { body: { nickname, age, email, password } } = req

    try {
        await logic.registerUser(nickname, age, email, password)

        res.status(201).json({ message: 'Ok, user registered. ' })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

// User authenticate route
router.post('/users/auth', jsonParser, async (req, res) => {
    const { body: { nicknameOEmail, password } } = req

    try {
        const id = await logic.authenticateUser(nicknameOEmail, password)

        let newtoken = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '5h' })
        return res.json({ token: newtoken })

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

// User data retrieve route
router.get('/user', async (req, res) => {
    const { header: { } } = req //sacar token

    try {
        let payload = jwt.verify(token, JWT_SECRET) // verificar token

        const { sub } = payload

        const user = await logic.retrieveUser(sub) // 

        const { nickname, age, email, avatar } = user

        res.json({ nickname, age, email, avatar })

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

// User game retrieve route
router.get('/user/gamedata', async (req, res) => {
    const { header: { } } = req //sacar token

    try {
        let payload = jwt.verify(token, JWT_SECRET)

        const { sub } = payload

        const gamedata = await logic.retrieveUserGameData(sub) // Should be an object containing a key GAMES with an array with up to 5 games data and the id key of the user

        res.json(gamedata)

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

// Game routes

//New Game route 
router.post('/newGame', async (req, res) => {
    const { header: { }, body: { gameId, style } } = req //sacar token

    try {
        let payload = jwt.verify(token, JWT_SECRET)

        const { sub } = payload

        await logic.newGame(sub, gameId, style)

        res.status(201).json({message: `game with id ${gameId} created waiting to start`})

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

router.post('/joinGame', async (req, res) => {
    const { header: { }, body: { gameId } } = req //sacar token

    try {
        let payload = jwt.verify(token, JWT_SECRET)

        const { sub } = payload

        const game = await logic.joinGame(sub, gameId)

        res.json(game) // whith contain all the needed data for the game to start

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

router.get('/startGame/:gameId', async (req, res) => {
    const { header: { }, param: { gameId } } = req //sacar token

    try {
        let payload = jwt.verify(token, JWT_SECRET)

        const { sub } = payload

        const startingPacket = await logic.startGame(sub, gameId)

        res.json(startingPacket) // all the necessary staff to start the game

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

router.post('/continueGame/:gameId', async (req, res) => {
    const { header: { }, params: { gameId }, body: { update} } = req //sacar token

    try {
        let payload = jwt.verify(token, JWT_SECRET)

        const { sub } = payload

        const nextRoundData = await logic.continueGame(sub, gameId, update)

        res.json(nextRoundData) // whith contain all the needed data for the next round or the info to finish the game

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})


module.exports = router