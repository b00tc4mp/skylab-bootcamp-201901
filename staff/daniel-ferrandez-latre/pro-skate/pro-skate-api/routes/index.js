
const express = require('express')
const router = express.Router()
const logic = require('../logic')
const handleErrors = require('./handle-errors')
const jwt = require('jsonwebtoken')
const auth = require('./auth')

const { env: { JWT_SECRET } } = process





router.post('/users', (req, res) => {
    const { body: { name, surname, email, password, age, imageUrl  } } = req

    handleErrors(() =>
    
        logic.registerUser(name, surname, email, password, age, imageUrl )
            .then(() => res.status(201).json({ message: 'Ok, user registered.' })),
        res)
})

router.post('/users/auth', (req, res) => {
    const { body: { email, password } } = req

    handleErrors(() =>
        logic.authenticateUser(email, password)
            .then(sub => {
                const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '47m' })

                res.json({ token })
            }),
        res)
})

router.get('/users', auth, (req, res) => {
    handleErrors(() => {
        const { userId } = req

        return logic.retrieveUser(userId)
            .then(user => res.json(user))
    },
        res)
})


// TODO other routes (update, delete...)

module.exports = router