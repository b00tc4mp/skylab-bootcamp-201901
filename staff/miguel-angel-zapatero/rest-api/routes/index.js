const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const handleErrors = require('./handle-errors')
const jwt = require('jsonwebtoken')
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
        debugger
        const sub = await logic.authenticateUser(email, password)
        const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '47m' })
        return res.json({ token })
    }, res)
})

router.get('/users', auth, (req, res) => {
    handleErrors(async () => {
        const { userId } = req

        const user = await logic.retrieveUser(userId)

        return res.json(user)
    }, res)
})

router.delete('/users/delete', auth, jsonParser, (req, res) => {
    handleErrors(async () => {
        const { userId, body: { email, password}  } = req
        
        await logic.deleteUser(userId, email, password)
        
        return res.json({ message: 'Ok, user deleted.'})
    }, res)
})

router.patch('/users/update', auth, jsonParser, (req, res) => {
    handleErrors(async () => {
        const { userId, body: data  } = req
        
        await logic.updateUser(userId, data)
        
        return res.json({ message: 'Ok, user updated.'})
    }, res)
})

router.post('/ducks/:id/fav', auth, (req, res) => {
    handleErrors(async () => {
        const { userId, params: { id } } = req

        await logic.toggleFavDuck(userId, id)
        
        return res.json({ message: 'Ok, duck toggled.' })
    }, res)
})

router.get('/ducks/fav', auth, (req, res) => {
    handleErrors(async () => {
        const { userId } = req

        const ducks = await logic.retrieveFavDucks(userId)
        
        return res.json(ducks)
    }, res)
})

router.get('/ducks', auth, (req, res) => {
    handleErrors(async () => {
        const { userId, query: { query } } = req

        const ducks = await logic.searchDucks(userId, query)
        
        return res.json(ducks)
    }, res)
})

router.get('/ducks/:id', auth, (req, res) => {
    handleErrors(async () => {
        const { userId, params: { id } } = req

        const duck = await logic.retrieveDuck(userId, id)
        
        return res.json(duck)
    }, res)
})

router.post('/cart/:id/add', auth, (req, res) => {
    handleErrors(async () => {
        const { userId, params: { id } } = req

        await logic.addToCart(userId, id)
        
        return res.json({ message: 'Ok, item added.' })
    }, res)
})

router.patch('/cart/:id/update', auth, (req, res) => {
    handleErrors(async () => {
        const { userId, params: { id }, body: qty } = req

        await logic.updateItemCart(userId, id, qty)
        
        return res.json({ message: 'Ok, item updated.' })
    }, res)
})

router.delete('/cart/:id/delete', auth, (req, res) => {
    handleErrors(async () => {
        const { userId, params: { id } } = req

        await logic.deleteToCart(userId, id)
        
        return res.json({ message: 'Ok, item deleted.' })
    }, res)
})

router.get('/cart', auth, (req, res) => {
    handleErrors(async () => {
        const { userId } = req

        const items = await logic.retrieveCartItems(userId)
        
        return res.json(items)
    }, res)
})

module.exports = router