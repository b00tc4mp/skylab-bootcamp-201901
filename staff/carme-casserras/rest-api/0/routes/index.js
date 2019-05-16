const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const handleErrors = require('./handle-errors')
const { UnauthorizedError } = require('../common/errors')

const jsonParser = bodyParser.json()

const router = express.Router()

router.post('/users', jsonParser, (req, res) => {
    const { body: { name, surname, email, password } } = req

    handleErrors(() =>
        logic.registerUser(name, surname, email, password)
            .then(() => res.status(201).json({ message: 'Ok, user registered.' })),
        res)
})

router.post('/users/auth', jsonParser, (req, res) => {
    const { body: { email, password } } = req

    handleErrors(() =>
        logic.authenticateUser(email, password)
            .then(token => res.json({ token })),
        res)
})

router.get('/users', (req, res) => {
    handleErrors(() => {
        
        const { headers: { authorization } } = req

        if (!authorization) throw new UnauthorizedError()

        const token = authorization.slice(7)

        if (!token) throw new UnauthorizedError()

        return logic.retrieveUser(token)
            .then(user => res.json(user))
    },
        res)
})
//MIAU
router.put('/users', (req, res) => {
    handleErrors(() => {

        const {headers: { authorization} } = req

        if (!authorization) throw new UnauthorizedError()

        const token = authorization.slice(7)

        if (!token) throw new UnauthorizedError()

        return logic.updateUser(email, password, token)
            .then(user => res.json(user))
    },
        res)
})

router.post('/ducks/:id/fav', (req, res) => {
    handleErrors(() => {
        const { headers: { authorization }, params: { id } } = req

        if (!authorization) throw new UnauthorizedError()

        const token = authorization.slice(7)

        if (!token) throw new UnauthorizedError()

        return logic.toggleFavDuck(token, id)
            .then(() => res.json({ message: 'Ok, duck toggled.' }))
    },
        res)
})

router.get('/ducks/fav', (req, res) => {
    handleErrors(() => {
        debugger
        const { headers: { authorization } } = req

        if (!authorization) throw new UnauthorizedError()

        const token = authorization.slice(7)

        if (!token) throw new UnauthorizedError()

        return logic.retrieveFavDucks(token)
            .then(ducks => res.json(ducks))
    },
        res)
})

router.get('/ducks', (req, res) => {
    handleErrors(() => {
        const { headers: { authorization }, query: { query } } = req

        if (!authorization) throw new UnauthorizedError()

        const token = authorization.slice(7)

        if (!token) throw new UnauthorizedError()

        return logic.searchDucks(token, query)
            .then(ducks => res.json(ducks))
    },
        res)
})

router.get('/ducks/:id', (req, res) => {
    handleErrors(() => {
        const { headers: { authorization }, params: { id } } = req

        if (!authorization) throw new UnauthorizedError()

        const token = authorization.slice(7)

        if (!token) throw new UnauthorizedError()

        return logic.retrieveDuck(token, id)
            // .then(duck => res.json(duck))
            .then(res.json.bind(res))
    },
        res)
})

// TODO other routes (update, delete...)

module.exports = router