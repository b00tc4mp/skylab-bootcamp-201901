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
            .then(() => res.status(201).json({ message: 'Ok, user registered.'})), 
        res)
})

router.post('/users/auth', jsonParser, (req, res) => {
    const { body: { email, password } } = req

    handleErrors(() => 
        logic.authenticateUser(email, password)
            .then(token => res.json(token)), res)
})

router.get('/users', jsonParser, (req, res) => {
    handleErrors(() => {
        const { headers: { authorization } } = req

        if (!authorization) throw new UnauthorizedError()

        const token = authorization.split(' ')[1]

        if (!token) throw new UnauthorizedError()
        
        return logic.retrieveUser(token)
            .then(user => res.json(user))
    }, res)
})

router.delete('/users/delete', jsonParser, (req, res) => {
    handleErrors(() => {
        const { headers: { authorization }, body: { email, password}  } = req
        debugger
        if (!authorization) throw new UnauthorizedError()

        const token = authorization.split(' ')[1]

        if (!token) throw new UnauthorizedError()
        
        return logic.deleteUser(token, email, password)
            .then(() =>res.json({ message: 'Ok, user deleted.'}))
    }, res)
})

router.put('/users/update', jsonParser, (req, res) => {
    handleErrors(() => {
        const { headers: { authorization }, body: data  } = req
        
        if (!authorization) throw new UnauthorizedError()

        const token = authorization.split(' ')[1]

        if (!token) throw new UnauthorizedError()
        
        return logic.updateUser(token, data)
            .then(() =>res.json({ message: 'Ok, user updated.'}))
    }, res)
})

router.post('/ducks/:id/fav', jsonParser, (req, res) => {
    handleErrors(() => {
        const { params: { id }, headers: { authorization } } = req

        if (!authorization) throw new UnauthorizedError()

        const token = authorization.split(' ')[1]

        if (!token) throw new UnauthorizedError()
        
        return logic.toggleFavDuck(token, id)
            .then(() => res.json({ message: 'Ok, duck saved in favourites. '}))
    }, res)
})

router.get('/ducks/fav', jsonParser, (req, res) => {
    handleErrors(() => {
        const { headers: { authorization } } = req

        if (!authorization) throw new UnauthorizedError()

        const token = authorization.split(' ')[1]

        if (!token) throw new UnauthorizedError()
        
        return logic.retrieveFavDucks(token)
            .then(favs => res.json(favs))
    }, res)
})

router.get('/ducks', jsonParser, (req, res) => {
    handleErrors(() => {
        const { query: { query }, headers: { authorization } } = req

        if (!authorization) throw new UnauthorizedError()

        const token = authorization.split(' ')[1]

        if (!token) throw new UnauthorizedError()
        
        return logic.searchDucks(token, query)
            .then(ducks => res.json(ducks))
    }, res)
})

router.get('/ducks/:id', jsonParser, (req, res) => {
    handleErrors(() => {
        const { params: { id }, headers: { authorization } } = req

        if (!authorization) throw new UnauthorizedError()

        const token = authorization.split(' ')[1]

        if (!token) throw new UnauthorizedError()
        
        return logic.retrieveDuck(token, id)
            .then(duck => res.json(duck))
    }, res)
})

module.exports = router