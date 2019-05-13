const express = require('express')
const package = require('./package.json')
const bodyParser = require('body-parser')
const logic = require('./logic')

const jsonParser = bodyParser.json()

const { argv: [, , port = 8080] } = process

const app = express()

app.post('/user', jsonParser, (req, res) => {
    const { body: { name, surname, email, password } } = req
    
    try {
        logic.registerUser(name, surname, email, password)
            .then(() => res.json({ message: 'Ok, user registered. '}))
            .catch(({ message }) => {
                res.status(400).json({ error: message})
            })
    } catch ({ message }) {
        res.status(400).json({ error: message})
    }
})

app.get('/user', jsonParser, (req, res) => {
    let { headers: {authorization: token }} = req
    token = token.split(' ')[1]
    
    try {
        logic.retrieveUser(token)
            .then(data => res.json(data))
            .catch(({ message }) => res.status(401).json({ error: message }))
    } catch ({ message }) {
        res.status(401).json({error: message})
    }
})

app.post('/user/auth', jsonParser, (req, res) => {
    const { body: { username, password } } = req
    
    try {
        logic.authenticateUser(username, password)
            .then(token => res.json(token))
            .catch(({ message })=> res.status(401).json({ error: message }))
    } catch ({ message }) {
        res.status(401).json({error: message})
    }
})

app.get('/ducks/search', jsonParser, (req, res) => {
    const { query: { q }} = req
    let { headers: {authorization: token }} = req
    token = token.split(' ')[1]

    try {
        logic.searchDucks(token, q)
            .then(ducks => res.json(ducks))
            .catch(({ message })=> res.status(401).json({ error: message }))
    } catch ({ message }) {
        res.status(401).json({error: message})
    }
})

app.get('/ducks/:id', jsonParser, (req, res) => {
    const { params: { id }} = req
    let { headers: {authorization: token }} = req
    token = token.split(' ')[1]

    try {
        logic.retrieveDuck(token, id)
            .then(duck => res.json(duck))
            .catch(({ message })=> res.status(401).json({ error: message }))
    } catch ({ message }) {
        res.status(401).json({error: message})
    }
})

app.get('/user/favs/:id', jsonParser, (req, res) => {
    const { params: { id }} = req
    let { headers: {authorization: token }} = req
    token = token.split(' ')[1]

    try {
        logic.toggleFavDuck(token, id)
            .then(() => res.json({ message: 'Ok, fav saved. '}))
            .catch(({ message })=> res.status(401).json({ error: message }))
    } catch ({ message }) {
        res.status(401).json({error: message})
    }
})

app.get('/user/favs', jsonParser, (req, res) => {
    let { headers: {authorization: token }} = req
    token = token.split(' ')[1]

    try {
        logic.retrieveFavDucks(token)
            .then(favs => res.json(favs))
            .catch(({ message })=> res.status(401).json({ error: message}))
    } catch ({ message }) {
        res.status(401).json({error: message})
    }
})

app.use(function (req, res, next) {
    res.redirect('/')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))