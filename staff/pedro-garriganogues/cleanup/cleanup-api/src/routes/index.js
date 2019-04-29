const express = require('express')
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()
const logic = require('../logic')
const router = express.Router()
require('dotenv').config()

const jwt = require('jsonwebtoken')
const jwtValidation = require('./utils/jwt-validation')

const { env: { TOKEN_SECRET, TOKEN_EXP } } = process

const jwtValidator = jwtValidation(TOKEN_SECRET)




router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { name, surname, email, password, passwordConfirmation } } = req

    return logic.registerUser(name, surname, email, password, passwordConfirmation)
        .then(() => {
            res.status(201)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


router.get('/users/:userId', jwtValidator, (req, res) => {
    const { params: { userId } } = req

    return logic.retrieveUser(userId)
        .then(user => {
            res.status(200)
            res.json({ status: 'OK', data: user })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})



router.get('/order/:userId', (req, res) => {
    const { params: { userId } } = req

    return logic.retrieveOrder(userId)
        .then(user => {
            res.status(200)
            res.json({ status: 'OK', data: user })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.post('/user/auth', jsonBodyParser, (req, res) => {


    const { body: { email, password } } = req
    logic.authenticateUser(email, password)
        .then(id => {
            const token = jwt.sign({ id }, TOKEN_SECRET, { expiresIn: TOKEN_EXP })
            res.status(200)
            res.json({ status: 'OK', data: { id, token } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})




router.post('/order', jsonBodyParser, (req, res) => {
    const { body: { paymentMethod, status, products, userId } } = req

    return logic.makeOrder(paymentMethod, status, products, userId)
        .then(orderId => {
            res.status(201)
            res.json({ status: 'OK', data: orderId })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/categories/products/:productId', (req, res) => {
    const { params: { productId } } = req

    return logic.getProduct(productId)
        .then(product => {
            res.status(200)
            res.json({ status: 'OK', data: product })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


router.get('/products', (req, res) => {
    let { query: { ids } } = req

    if (!ids)
        logic.listTheProducts()
            .then(products => {
                res.status(200)
                res.json({ status: 'OK', data: products })
            })
            .catch(({ message }) => {
                res.status(400)
                res.json({ status: 'KO', error: message })
            })
    else
        return logic.listProductsByIds(ids)
            .then(products => {
                res.status(200)
                res.json({ status: 'OK', data: products })

            })
            .catch(({ message }) => {
                res.status(400)
                res.json({ status: 'KO', error: message })
            })
})


router.post('/order/:id', jsonBodyParser, (req, res) => {
    const { body: { paymentMethod, status, products, userId, productId } } = req

    return logic.makeOrder(paymentMethod, status, products, userId, productId)
        .then(orderId => {
            res.status(201)
            res.json({ status: 'OK', data: orderId })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})



module.exports = router