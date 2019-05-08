const express = require('express')
const bodyParser = require('./body-parser')

const { argv: [, , port] } = process

const app = express()

app.use(express.static('public'))

let user = {}

function render(body) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        ${body}
    </body>
    </html>`
}

app.get('/landing', (req, res) => {

    res.send(render(`<h1>Welcome to XXX</h1>        
        <a href="/register">Register</a>
        <a href="/login">login</a>`))
})

app.get('/register', (req, res) =>
    res.send(render(`<form method="post" action="/register">
            <input type="text" name="username">
            <input type="password" name="password">
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
    res.send(render(`<form method="post" action="/login">
            <input type="text" name="username">
            <input type="password" name="password">
            <button>Login</button>
        </form>`))
)

app.post('/login', bodyParser, (req, res) => {
    const { username, password } = req.body

    if (username === user.username && password === user.password) res.redirect('/home')
    else        
        res.send(render(`<p>Wrong credentials.</p>
        <a href="/login">login</a>`))
    })     
            
app.get('/home', (req, res) =>
    res.send(render(`<h1>Hola, ${user.username}!
    <a href="/Landing">Logout</a>`))
)

app.listen(port)