require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
// const FileStore = require('session-file-store')(session)
require('isomorphic-fetch')

const { landing, register, login, home, logout, notFound } = require('./routes')

const { env: { PORT }, argv: [, , port = PORT || 8080] } = process

const app = express()

app.use(session({
    secret: 'a secret phrase',
    resave: true,
    saveUninitialized: true,
    // store: new FileStore({
    //     path: './.sessions'
    // })
}))

app.use(express.static('public'))

app.set('view engine', 'pug')
app.set('views', 'src/components')

const formBodyParser = bodyParser.urlencoded({ extended: false })

app.get('/', landing.get)

app.get('/register', register.get)
app.post('/register', formBodyParser, register.post)

app.get('/login', login.get)
app.post('/login', formBodyParser, login.post)

app.get('/home', home.get)

app.post('/logout', logout.post)

app.get('*', notFound.get)

app.listen(port, () => console.log(`server running on port ${port}`))