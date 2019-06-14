const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const logic = require('../logic')
const handleErrors = require('./handle-errors')
const auth = require('./auth')

const { env: { JWT_SECRET } } = process

const jsonParser = bodyParser.json()

const router = express.Router()

router.post('/users', jsonParser, (req, res) => {
    const { body: { name, surname, email, password } } = req
    
    handleErrors(async () => {
        await logic.registerUser(name, surname, email, password)
        
        return res.status(201).json({ message: 'Ok, user registered.' })
    }, res)
})

router.post('/users/auth', jsonParser, (req, res) => {
    const { body: { email, password } } = req
    
    handleErrors(async () => {
        const sub = await logic.authenticateUser(email, password)
        const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '1m' })
        return res.json({ token })
    }, res)
})

router.get('/users', auth, (req, res) => {
    const { userId } = req
    
    handleErrors(async () => {
        const user = await logic.retrieveUser(userId)

        return res.json(user)
    }, res)
})

router.put('/users/update', jsonParser, auth, (req, res) => {
    const { userId, body } = req
    
    handleErrors(async () => {
        const user = await logic.updateUser(userId, body)
        
        return res.json(user)
    }, res)
})

router.delete('/users/delete', jsonParser, auth, (req, res) => {
    const { userId, body: { email, password } } = req
    
    handleErrors(async () => {
        await logic.deleteUser(userId, email, password)

        return res.json({ message: 'Ok, user deleted.' })
    }, res)
})

router.get('/users/items/bids', auth, (req, res) => {
    const { userId } = req
    
    handleErrors(async () => {
        const userItems = await logic.retriveUserItemsBids(userId)
        
        return res.json(userItems)
    }, res)
})

router.post('/items/:id/bids', jsonParser, auth, (req, res) => {
    const { userId, params: { id }, body: { amount } } = req
    
    handleErrors(async () => {
        await logic.placeBid(id, userId, amount)
        
        return res.json({ message: 'Ok, bid placed.' })
    }, res)
})

router.get('/items/:id/bids', auth, (req, res) => {
    const { userId, params: { id } } = req
    
    handleErrors(async () => {
        const bids = await logic.retrieveItemBids(id, userId)
        
        return res.json(bids)
    }, res)
})

router.post('/items', jsonParser, auth, (req, res) => {
    const { userId, body } = req

    let { title, description, startPrice, startDate, finishDate, reservedPrice, images, category, city } = body

    //CHECK UPLOAD IMAGES ON CREATE ITEM
    startDate = new Date(startDate)
    finishDate = new Date(finishDate)
    
    handleErrors(async () => {
        await logic.createItem(userId, title, description, startPrice, startDate, finishDate, reservedPrice, images, category, city)
        
        return res.status(201).json({ message: 'Ok, item created.' })
    }, res)
})

router.get('/items', jsonParser, (req, res) => {
    const { query } = req

    let { query: text, category, city, startDate, endDate, startPrice, endPrice } = query
    
    if(startDate && endDate) {
        startDate = new Date(startDate)
        endDate = new Date(endDate)
    }

    if(startPrice && endPrice) {
        startPrice = Number(startPrice)
        endPrice = Number(endPrice)
    }
    
    handleErrors(async () => {
        const items = await logic.searchItems(text, category, city, startDate, endDate, startPrice, endPrice)
        
        return res.json(items)
    }, res)
})

router.get('/items/:id', auth, (req, res) => {
    const { userId, params: { id } } = req 
    debugger
    handleErrors(async () => {
        const item = await logic.retrieveItem(id, userId)
        
        return res.json(item)
    }, res)
})

router.get('/cities', (req, res) => {
    handleErrors(async () => {
        const cities = await logic.retrieveCities()

        return res.json(cities)
    }, res)
})

router.get('/categories', (req, res) => {
    handleErrors(async () => {
        const categories = await logic.retrieveCategories()
        
        return res.json(categories)
    }, res)
})

module.exports = router