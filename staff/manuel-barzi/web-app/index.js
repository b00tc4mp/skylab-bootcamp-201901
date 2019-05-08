const express = require('express')
const bodyParser = require('./body-parser')
const render = require('./render')
const logic = require('./logic')

const { argv: [, , port] } = process

const app = express()

app.use(express.static('public'))

let user = {}

app.get('/', (req, res) =>
    res.send(render(`<h1>Welcome to this Web Application</h1>
<a href="/register">Register</a> or <a href="/login">Login</a>`))
)

app.get('/register', (req, res) =>
    res.send(render(`<h2>Register</h2>
    <form method="post" action="/register">
            <input type="text" name="username" required>
            <input type="password" name="password" required>
            <button>Register</button>
        </form>`))
)

app.post('/register', bodyParser, (req, res) => {
    const { username, password } = req.body 

    user.username = username
    user.password = password

    res.send(render(`<p>Ok, user correctly registered, you can now proceed to <a href="/login">login</a></p>`))
})

app.get('/login', (req, res) =>
    res.send(render(`<h1>Login</h1>
    <form method="post" action="/login">
            <input type="text" name="username">
            <input type="password" name="password">
            <button>Login</button>
        </form>`))
)

app.post('/login', bodyParser, (req, res) => {
    const { username, password } = req.body

    if (username === user.username && password === user.password) res.redirect('/home')
    else res.send(render(`<p>Wrong credentials.</p>`))
})

app.get('/home', (req, res) =>
    res.send(render(`<h1>Hola, ${user.username}!`))
)

app.listen(port)