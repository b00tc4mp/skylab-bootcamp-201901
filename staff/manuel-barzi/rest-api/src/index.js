require('dotenv').config()

require('isomorphic-fetch')

const express = require('express')
const bodyParser = require('body-parser')

const { register, authenticate, retrieve, notFound } = require('./routes')

const { env: { PORT }, argv: [, , port = PORT || 8080] } = process

const app = express()

const jsonBodyParser = bodyParser.json()

// app.post('/register', formBodyParser, register.post)

app.post('/authenticate', jsonBodyParser, authenticate.post)

// app.get('/retrieve', retrieve.get)

// app.get('*', notFound.get)

app.listen(port, () => console.log(`server running on port ${port}`))