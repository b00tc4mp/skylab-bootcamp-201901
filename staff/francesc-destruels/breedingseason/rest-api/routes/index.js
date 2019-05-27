const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
// const handleErrors = require('./handle-errors')
const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET } } = process

const jsonParser = bodyParser.json()

const router = express.Router()

router.post('/user', jsonParser, async (req, res) => {
    const { body: { nickname, age, email, password } } = req

    try {
        await logic.registerUser(nickname, age, email, password)

        res.status(201).json({ message: 'Ok, user registered. ' })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

router.post('/users/auth', jsonParser, async (req, res) => {
    const { body: { nicknameOEmail, password } } = req

    try {
        const id = await logic.authenticateUser(nicknameOEmail, password)

        let newtoken = jwt.sign({ sub: id },  JWT_SECRET, { expiresIn: '5h' })
        return res.json({ token: newtoken })

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

router.get('/user', async(req, res) => {

    try {
        let payload = jwt.verify(token,  JWT_SECRET)

        const { sub } = payload

        const user = await logic.retrieveUser(sub) // cojerá token

        const { nickname, age, email } =user
    
        res.json({ nickname, age, email })

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

module.exports = router