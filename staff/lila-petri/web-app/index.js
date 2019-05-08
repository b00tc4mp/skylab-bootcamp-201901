const express = require('express')
const bodyParser = require('./body-parser')
const errorParser = require('./error-parser')

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
        <title>Lila Web</title>
        <link rel="icon" href="https://andrewlock.net/content/images/2016/10/icon.png">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        ${body}
    </body>
    </html>`
}
app.get('/', (req,res) => 
    res.send(render(`<a href="/register">register</a></p>  <a href="/login">login</a></p>`))
)
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
    if (user.username!==undefined && user.password !== undefined){
        res.send(render(`<p>Ok, user correctly registered, you can now proceed to <a href="/login">login</a></p>`))
    } else res.send(render(`<p>Wrong credentials.</p>`))

    

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
    else res.send(render(`<p>Wrong credentials.</p>`))
})

app.get('/home', (req, res) =>
    res.send(render(`<h1>Hola, ${user.username}!`))
)

app.listen(port)
