const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const logic = require('../logic')
const handleErrors = require('./handle-errors')
const auth = require('./auth')
const multisearch = require('./multisearch')

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
        const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '1h' })
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
    const { userId, body: { name, surname, email, password } } = req
    
    handleErrors(async () => {
        await logic.updateUser(userId, name, surname, email, password)
        
        return res.status(201).json({ message: 'Ok, user updated.' })
    }, res)
})

router.delete('/users/delete', jsonParser, auth, (req, res) => {
    const { userId, body: { email, password } } = req
    
    handleErrors(async () => {
        await logic.deleteUser(userId, email, password)

        return res.json({ message: 'Ok, user deleted.' })
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

router.post('/items', jsonParser, (req, res) => {
    const { body: { 
        title, description, startPrice, startDate, finishDate, reservedPrice, images, category, city  
    } } = req
    
    handleErrors(async () => {
        //FALTA PASARLE EL userId para proteger lo de crear items?¿?¿
        await logic.createItem(title, description, startPrice, startDate, finishDate, reservedPrice, images, category, city)
        
        return res.status(201).json({ message: 'Ok, item created.' })
    }, res)
})

router.get('/items', jsonParser, multisearch, (req, res) => {
    const { query } = req 

    handleErrors(async () => {
        const items = await logic.searchItems(query)
        
        return res.json(items)
    }, res)
})

router.get('/items/:id', (req, res) => {
    const { params: { id } } = req 
    
    handleErrors(async () => {
        const item = await logic.retrieveItem(id)
        
        return res.json(item)
    }, res)
})

module.exports = router