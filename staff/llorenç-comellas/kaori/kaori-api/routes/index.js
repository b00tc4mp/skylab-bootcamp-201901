const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const jwt = require('jsonwebtoken')
const handleErrors = require('./handle-errors')
const auth = require('./auth')

const { env: { JWT_SECRET } } = process
const jsonParser = bodyParser.json()
const router = express.Router()

//Users

router.post('/users', jsonParser, (req, res) => {
    const { body: { name, surname, phone, email, password } } = req

    handleErrors(async () => {
        await logic.registerUser(name, surname, phone, email, password)
        return res.status(201).json({ message: 'Ok, user registered.' })
    }, res)
})

router.post('/users/auth', jsonParser, (req, res) => {
    const { body: { email, password } } = req

    handleErrors(async () => {
        const sub = await logic.authenticateUser(email, password)

        const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '2h' })
        return res.json({ token })

    }, res)
})

router.get('/users/:id', auth, (req, res) => {
    const { params: { id: userId } } = req

    handleErrors(async () => {
        const user = await logic.retrieveUser(userId)
        return res.json(user)
    }, res)
})

// Products

router.post('/products', jsonParser, (req, res) => {
    const { body: { title, image, description, price, category } } = req
    handleErrors(async () => {
        await logic.createProduct(title, image, description, price, category)
        return res.status(201).json({ message: 'Ok, product create.' })
    }, res)

})

router.get('/product/:id', (req, res) => {

    const { params: { id: productId } } = req
    handleErrors(async () => {
        const product = await logic.retrieveProduct(productId)
        return res.json(product)
    }, res)
})

router.get('/products/:category', (req, res) => {

    const { params: { category } } = req
    handleErrors(async () => {
        const products = await logic.retrieveProductsByCategory(category)
        return res.json(products)
    }, res)
})

// Cart

router.post('/products/:id/cart', auth, (req, res) => {
    const { userId, params: { id } } = req

    handleErrors(async () => {
        await logic.addToCart(id, userId)
        return res.status(201).json({ message: 'Ok, product add to cart' })
    }, res)
})

router.delete('/products/:id/cart', auth, (req, res) => {
    const { userId, params: { id } } = req

    handleErrors(async () => {
        await logic.deleteToCart(id, userId)
        return res.status(200).json({ message: 'Ok, product delete to cart' })
    }, res)
})

router.get('/products/cart/:id', auth, (req, res) => {
    const { params: { id} } = req

    handleErrors(async () => {
        const cart = await logic.retrieveCart(id)
        return res.json(cart)
    }, res)
})

//Order:

router.post('/order/:id', auth, (req, res) => {
    const { params: { id } } = req
    handleErrors(async () => {
        await logic.cartToOrder(id)
        return res.status(200).json({ message: 'Ok, pass cart to order' })
    }, res)
})



module.exports = router