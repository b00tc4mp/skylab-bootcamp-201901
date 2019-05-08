const express = require('express')
const bodyParser = require('./body-parser')
const render = require('./render')
const fs = require('fs')
const logic = require('./logic')

const { argv: [, , port] } = process

const app = express()

app.use(express.static('public'))
app.use(express.static('./'))

let user = {}

app.get('/', [
    function (req, res, next) {
        fs.readFile('./html/index.html', 'utf-8', (err, content) => {
            res.htmlData = content
            next(err)
        })
    },
    function (req, res, next) {
        fs.readFile('./components/landing/index.html', 'utf8', (err, content) => {
            res.body = content
            debugger
            next(err)
        })
    },
    function (req, res) {
        let { htmlData, body } = res
        htmlData = htmlData.match(/<.+>/gm)
        const index = htmlData.indexOf('</body>')
        htmlData.splice(index, 0, body)
        htmlData = htmlData.join('')
        res.send(htmlData)
    }
  ])

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