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

router.get('/users', auth, (req, res) => {
    handleErrors(async () => {
        const { userId } = req

        const user = await logic.retrieveUser(userId)

        return res.json(user)
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

router.post('/items/:id/bid', jsonParser, auth, (req, res) => {
    handleErrors(async () => {
        const { userId, params: { id }, body: { amount } } = req

        await logic.placeBid(id, userId, amount)
        
        return res.json({ message: 'Ok, bid placed.' })
    }, res)
})

router.post('/items', jsonParser, (req, res) => {
    handleErrors(async () => {
        const { body: { 
            title, description, startPrice, startDate, finishDate, reservedPrice  
        } } = req
        debugger
        //FALTA PASARLE EL userId para proteger lo de crear items
        await logic.createItem(title, description, startPrice, startDate, finishDate, reservedPrice)
        
        return res.status(201).json({ message: 'Ok, item created.' })
    }, res)
})

module.exports = router