const express = require('express')
const bodyParser = require('./body-parser')

const { argv: [, , port] } = process
let islogged = false
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

app.get('/', (req, res) =>
    res.send(render(`<h1>WELCOME TO THE JUNGLE!!!</h1>
    <p><a href="/register">register</a><span>or</span><a href="/login">login</a></p>`))
)

app.get('/register', (req, res) =>
    res.send(render(`<form method="post" action="/register">
            <input type="text" placeholder="username" name="username" autofocus>
            <input type="password" placeholder="password" name="password">
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
            <input type="text" placeholder="username" name="username" autofocus>
            <input type="password" placeholder="password" name="password">
            <button>Login</button>
        </form>`))
)

app.post('/login', bodyParser, (req, res) => {
    const { username, password } = req.body

    if (username === user.username && password === user.password) {
        res.redirect('/home')
        islogged=true}
    else res.send(render(`<p>Wrong credentials.</p>`))
})

app.get('/home', (req, res) =>{
    islogged && res.send(render(`<h1>Hola, ${user.username}!</h1><form method="post" action="/logout"><button>LogOut</button></form>`))
    islogged && res.redirect('/')
})
app.get('/logout', (req, res) =>{
    islogged && res.redirect('/home')
    !islogged && res.redirect('/')
})
app.post('/logout', bodyParser, (req, res) => {
    { islogged= false
        res.redirect('/')}
})

app.listen(port)