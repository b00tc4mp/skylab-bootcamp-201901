const express = require('express')
const router = express.Router()
const logic = require('../logic')
const handleErrors = require('./handle-errors')
const jwt = require('jsonwebtoken')
const auth = require('./auth')

const { env: { JWT_SECRET } } = process



/** USER */

router.post('/users', (req, res) => {
    const { body: { name, surname, email, password, age, imageUrl  } } = req

    handleErrors(async () => {
        
        await logic.registerUser(name, surname, email, password, age, imageUrl )
        res.status(201).json({ message: 'Ok, user registered.' })
    },res) 
})

router.post('/users/auth', (req, res) => {
    const { body: { email, password } } = req

    handleErrors(async () =>{
       const { sub, isAdmin } = await logic.authenticateUser(email, password)
       const token = jwt.sign({ sub, isAdmin }, JWT_SECRET, { expiresIn: '47m' })
       res.json({ token })
    }), res })
            

router.get('/users', auth, (req, res) => {
    handleErrors(async () => {
        const { userId, isAdmin } = req

        const user = await logic.retrieveUser(userId)
        return res.json(user)
    },
        res)
})

router.put('/users', auth, (req, res) =>{
    handleErrors(async () => {
        const { userId, body: { data } } = req

        const isUpdated = await logic.updateUser(userId, data)
        return res.json({ message: `User is updated ${isUpdated}` })
    },
        res)
})

router.delete('/users', auth, (req, res) =>{
    handleErrors(async () => {
        const { userId } = req

        const isUpdated = await logic.deleteUser(userId)
        return res.json({ message: `User is deleted ${isUpdated}` })
    },
        res)
})

/** PRODUCT */

router.post('/product', auth, (req, res) => {
    const { userId, body: { name, imagesUrl, description, price, tag } } = req

    handleErrors(async () => {
        await logic.createProduct( userId, { name, imagesUrl, description, price, tag } )
        res.status(201).json({ message: 'Ok, product created.' })
    },res) 
})

router.get('/products/:id', (req, res) => {
    handleErrors(async () => {
        const { params: { id } } = req

        const product = await logic.retrieveProduct(id)
        return res.json(product)
    },
        res)
})

router.get('/products', (req, res) => {
    handleErrors(async () => {
       
        const products = await logic.retrieveAllProducts()
        return res.json(products)
    },
        res)
})

router.get('/products', (req, res) => {
    handleErrors(async () => {
        const { query: { tag } } = req
        const products = await logic.retrieveProductsByTag(tag)
        return res.json(products)
    },
        res)
})

router.get('/products', (req, res) => {
    handleErrors(async () => {
        const { query: { price } } = req
        const products = await logic.retrieveProductsByPrice(price)
        return res.json(products)
    },
        res)
})


module.exports = router