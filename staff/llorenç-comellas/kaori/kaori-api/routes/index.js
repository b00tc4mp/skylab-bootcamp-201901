const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const jwt = require('jsonwebtoken')
const auth = require('./auth')

const { env: { JWT_SECRET } } = process
const jsonParser = bodyParser.json()
const router = express.Router()

//Users

router.post('/users', jsonParser, (req, res) => {
    const { body: { name, surname, phone, email, password } } = req

    return logic.registerUser(name, surname, phone, email, password)
        .then(() => res.status(201).json({ message: 'Ok, user registered.' }))

})

router.post('/users/auth', jsonParser, (req, res) => {
    const { body: { email, password } } = req

    return logic.authenticateUser(email, password)
        .then(sub => {
            const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '47m' })
            res.json({ token })
        })
})

router.get('/users/:id', auth, (req, res) => {
    const { userId } = req

    return logic.retrieveUser(userId)
        .then(user => res.json(user))
})

// Products

router.post('/products', jsonParser, (req, res) => {
    const { body: { title, image, description, price, category } } = req

    return logic.createProduct(title, image, description, price, category)
        .then(() => res.status(201).json({ message: 'Ok, product create.' }))

})

router.get('/products/:id', (req, res) => {

    const { params: { id } } = req

    return logic.retrieveProduct(id)
        .then(product => res.json(product))
})


module.exports = router