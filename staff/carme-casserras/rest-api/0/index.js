const express = require('express')
const package = require('./package.json')
const bodyParser = require('body-parser')
const logic = require('./logic')

const jsonParser = bodyParser.json()

const { argv: [, , port = 8080] } = process

const app = express()

app.post('/user', jsonParser, (req, res) => {
    debugger
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

app.post('/auth', jsonParser, (req, res) => {

    const { body: { email, password } } = req

    try {
        logic.authenticateUser(email, password)
            .then(token => res.json({token}))   

    } catch ({ message }) {
        res.status(400).json({ error: message})
    }
})

app.get('/user', (req, res) => {
    
    let {headers: {authorization} } = req

    let token = authorization.slice(7, authorization.length)
    
    try {
        logic.retrieveUser(token)
            .then(res => res.json({res}))
    } catch ({ message }) {
        res.status(400).json({ error: message})
    }
})

// TODO other routes

app.use(function (req, res, next) {
    
    res.redirect('/')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))
