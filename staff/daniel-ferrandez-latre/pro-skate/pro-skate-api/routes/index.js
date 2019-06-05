const express = require('express')
const router = express.Router()
const logic = require('../logic')
const handleErrors = require('./handle-errors')
const jwt = require('jsonwebtoken')
const auth = require('./auth')
const bodyParser  = require('body-parser')
const jsonParser = bodyParser.json()

const { env: { JWT_SECRET } } = process



/** USER */

//registerUser
router.post('/users', jsonParser, (req, res) => {
    const { body: { name, surname, email, password, age, imageUrl  } } = req
    debugger

    handleErrors(async () => {
        
        await logic.registerUser(name, surname, email, password, age, imageUrl )
        res.status(201).json({ message: 'Ok, user registered.' })
    }, res) 
})

//authenticateUser
router.post('/users/auth', jsonParser, (req, res) => {
    const { body: { email, password } } = req

    handleErrors(async () =>{
       const { sub, isAdmin } = await logic.authenticateUser(email, password)
       const token = jwt.sign({ sub, isAdmin }, JWT_SECRET, { expiresIn: '47m' })
       res.json({ token })
    }, res)})
            

//retrieveUser
router.get('/users', auth, (req, res) => {
    handleErrors(async () => {
        const { userId, isAdmin } = req

        const user = await logic.retrieveUser(userId)
        return res.json(user)
    },
        res)
})

//updateUser
router.put('/users', auth, (req, res) =>{
    handleErrors(async () => {
        const { userId, body: { data } } = req

        const isUpdated = await logic.updateUser(userId, data)
        return res.json({ message: `User is updated ${isUpdated}` })
    },
        res)
})

//deleteUser
router.delete('/users', auth, (req, res) =>{
    handleErrors(async () => {
        const { userId } = req

        const isUpdated = await logic.deleteUser(userId)
        return res.json({ message: `User with id ${userId} is deleted ${isUpdated}` })
    },
        res)
})

/** USER PRODUCT */

//retrieveCart
router.get('/users/cart', auth, (req, res) => {
    handleErrors(async () => {
        const { userId } = req

        const cart = await logic.retrieveCart(userId)
        return res.json(cart)
    },
        res)
})

//addProductToCart
router.post('/users/cart', auth, (req, res)=>{
    handleErrors( async ()=> {
        const { userId, body: { productId, quantity } } = req
        
        await logic.addProductToCart(userId, productId, quantity)
        return res.json({ message: `Product with id ${productId} successfully added to cart` })
    }, res)
})

//retrieveWhishList
router.get('/users/whislist', auth, (req, res) => {
    handleErrors(async () => {
        const { userId } = req

        const whislist = await logic.retrieveWhishList(userId)
        return res.json(whislist)
    },
        res)
})

//toggleWhishProduct
router.post('/users/whislist', auth, (req, res)=>{
    handleErrors( async ()=> {
        const { userId, productId } = req
        
        await logic.toggleWhishProduct(userId, productId )
        return res.json({ message: `Product with id ${productId} successfully toggle to cart` })
    }, res)
})

//checkoutCart
router.post('/users/checkout', auth, (req, res)=>{
    handleErrors( async ()=> {
        const { userId } = req
        
        await logic.checkoutCart(userId)
        return res.json({ message: `Cart successfully checked out` })
    }, res)
})

//retrieveHistoric
router.get('/users/historic', auth, (req, res) => {
    handleErrors(async () => {
        const { userId } = req

        const historic = await logic.retrieveHistoric(userId)
        return res.json(historic)
    },
        res)
})



/** PRODUCT */

//createProduct
router.post('/product', auth, (req, res) => {
    const { userId, body: { name, imagesUrl, description, price, tag } } = req

    handleErrors(async () => {
        await logic.createProduct( userId, { name, imagesUrl, description, price, tag } )
        res.status(201).json({ message: 'Ok, product created.' })
    },res) 
})

//retrieveProduct
router.get('/products/:id', (req, res) => {
    handleErrors(async () => {
        const { params: { id } } = req

        const product = await logic.retrieveProduct(id)
        return res.json(product)
    },
        res)
})

//retrieveAllProducts
router.get('/products', (req, res) => {
    handleErrors(async () => {
       
        const products = await logic.retrieveAllProducts()
        return res.json(products)
    },
        res)
})

//retrieveProductsByTag
router.get('/products', (req, res) => {
    handleErrors(async () => {
        const { query: { tag } } = req
        const products = await logic.retrieveProductsByTag(tag)
        return res.json(products)
    },
        res)
})

//retrieveProductsByPrice
router.get('/products', (req, res) => {
    handleErrors(async () => {
        const { query: { price } } = req
        const products = await logic.retrieveProductsByPrice(price)
        return res.json(products)
    },
        res)
})


module.exports = router