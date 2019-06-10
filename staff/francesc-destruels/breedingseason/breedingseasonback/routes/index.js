const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const jwt = require('jsonwebtoken')
const auth = require('./auth')
const { alivePrivateGames, alivePublicGames } = require('../logic/game/game')

const { env: { JWT_SECRET } } = process

const jsonParser = bodyParser.json()

const router = express.Router()

// User routes 

// User creation route 
router.post('/user', jsonParser, async (req, res) => { //OK
    const { body: { nickname, age, email, password } } = req

    try {

        await logic.registerUser(nickname, age, email, password)

        res.status(201).json({ message: 'Ok, user registered. ' })
    } catch ({ message }) {

        res.status(400).json({ error: message })
    }
})

// User authenticate route
router.post('/users/auth', jsonParser, async (req, res) => { //OK
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
router.get('/user', auth, async (req, res) => { //OK
    const { userId } = req //sacar token

    try {
        const user = await logic.retrieveUser(userId) // 

        const { nickname, age, email, avatar } = user

        res.json({ nickname, age, email, avatar })

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

// User game retrieve route
router.get('/user/gamedata', auth, async (req, res) => {
    const { userId } = req //sacar token

    try {
        const gamedata = await logic.retrieveUserGameData(userId) // Should be an object containing a key GAMES with an array with up to 5 games data and the id key of the user

        res.json(gamedata)

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

// Game routes

//New Game route 
router.post('/newGame', auth, jsonParser, async (req, res) => {
    const { userId, body: { style, privateGame } } = req //sacar token

    try {

        let Game = privateGame === "true" ? true : false

        const gameId = userId + Math.floor(Math.random() * 585)

        const response = await logic.newGame(userId, gameId, style, Game)

        res.status(201).json({ gameId: response }) // se guardará en app que eres el creador la instancia para permitir arrancar sin que tocase :D

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

router.get('/joinGame/:gameId', auth, jsonParser, async (req, res) => {
    const { userId, params: { gameId } } = req //sacar token

    try {
        const game = await logic.joinGame(userId, gameId)

        res.json(game)

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

router.get('/startGame/:gameId', auth, async (req, res) => {
    const { userId, params: { gameId } } = req //sacar token

    try {
        const intial = await logic.startGame(userId, gameId)
        res.json(intial)

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

// router.get('/updateGame/:gameId', auth, async (req, res) => {
//     const { userId, param: { gameId } } = req //sacar token

//     try {
//         const data = await logic.updateGame(userId, gameId)

//         if (data) res.json(data)
//         else res.jason({ messaje: "Waitng players" })

//     } catch ({ message }) {
//         res.status(400).json({ error: message })
//     }
// })

router.post('/continueGame/:gameId', auth, jsonParser, async (req, res) => {
    const { userId, params: { gameId }, body: { gamePlay, updatedAmount } } = req //sacar token

    try {
        const nextRoundData = await logic.continueGame(userId, gameId, gamePlay, updatedAmount)
        res.json(nextRoundData) // whith contain all the needed data for the next round or the info to finish the game

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})


module.exports = router