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

// TODO other routes

app.use(function (req, res, next) {
    debugger
    res.redirect('/')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))