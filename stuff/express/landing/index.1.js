const express = require('express')

const { argv: [, , port] } = process

const app = express()

app.get('/hola-mundo', (req, res) => {
    res.status(200).send('Hola, Mundo!')
})

app.get('/hola', (req, res) => {
    res.status(200).send(`Hola, ${req.query.name} ${req.query.surname}!`)
})

app.listen(port)