const express = require('express')
const { bodyParser, cookieParser, injectLogic, checkLogin } = require('./middlewares')
const render = require('./render')
const package = require('./package.json')
const { Login, Register, Home, Search } = require('./components')

const { argv: [, , port = 8080] } = process

const app = express()

app.use(express.static('public'))

app.use(cookieParser, injectLogic)

app.get('/', checkLogin('/home'), (req, res) => {
    res.send(render(`<h1>Welcome to this Web Application</h1>
<a href="/register">Register</a> or <a href="/login">Login</a>`))
})

app.get('/register', checkLogin('/home'), (req, res) => {
    res.send(render(new Register().render()))
})

app.post('/register', [checkLogin('/home'), bodyParser], (req, res) => {
    const { body: { name, surname, email, password }, logic } = req

    try {
        logic.registerUser(name, surname, email, password)
            .then(() => res.send(render(`<p>Ok, user correctly registered, you can now proceed to <a href="/login">login</a></p>`)))
            .catch(({ message }) => {
                res.send(render(new Register().render({ name, surname, email, message })))
            })
    } catch ({ message }) {
        res.send(render(new Register().render({ name, surname, email, message })))
    }
})

app.get('/login', checkLogin('/home'), (req, res) =>
    res.send(render(new Login().render()))
)

app.post('/login', [checkLogin('/home'), bodyParser], (req, res) => {
    const { body: { email, password }, logic } = req

    try {
        logic.loginUser(email, password)
            .then(() => {
                res.setHeader('set-cookie', [`token=${logic.__userToken__}`])
                res.redirect('/home')
            })
            .catch(({ message }) => res.send(render(new Login().render({ email, message }))))
    } catch ({ message }) {
        res.send(render(new Login().render({ email, message })))
    }
})

app.get('/home', checkLogin('/', false), (req, res) => {
    const { logic } = req

    logic.retrieveUser()
        .then(({ name }) => res.send(render(new Home().render({ name }))))
        .catch(({ message }) => res.send(render(`<p>${message}</p>`)))
})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))