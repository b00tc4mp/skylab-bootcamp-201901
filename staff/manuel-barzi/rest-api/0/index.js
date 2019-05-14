const express = require('express')
const package = require('./package.json')
const bodyParser = require('body-parser')
const logic = require('./logic')
const handleErrors = require('./routes/handle-errors')

const jsonParser = bodyParser.json()

const { argv: [, , port = 8080] } = process

const app = express()

app.post('/user', jsonParser, (req, res) => {
    const { body: { name, surname, email, password } } = req

    handleErrors(() =>
        logic.registerUser(name, surname, email, password)
            .then(() => res.status(201).json({ message: 'Ok, user registered. ' })),
    res)
})

// TODO other routes

app.use(function (req, res, next) {
    debugger
    res.redirect('/')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))