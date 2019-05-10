const express = require('express')
const { bodyParser, cookieParser } = require('./middlewares')
const render = require('./render')
const Logic = require('./logic')
const package = require('./package.json')
const { login, register, home } = require('./components')

const { argv: [, , port = 8080] } = process

const app = express()

app.use(express.static('public'))

function checkLogin(path, loggedIn = true) {
    return function (req, res, next) {
        const { cookies: { token } } = req

        const logic = new Logic(token)

        req.logic = logic

        if (logic.isUserLoggedIn === loggedIn) return res.redirect(path)

        next()
    }
}

app.use(cookieParser)

app.get('/', checkLogin('/home'), (req, res) => {
    res.send(render(`<h1>Welcome to this Web Application</h1>
<a href="/register">Register</a> or <a href="/login">Login</a>`))
})

app.get('/register', checkLogin('/home'), (req, res) => {
    res.send(render(register()))
})

app.post('/register', [checkLogin('/home'), bodyParser], (req, res) => {
    const { body: { name, surname, email, password }, logic } = req

    try {
        logic.registerUser(name, surname, email, password)
            .then(() => res.send(render(`<p>Ok, user correctly registered, you can now proceed to <a href="/login">login</a></p>`)))
            .catch(({ message }) => {
                res.send(render(register(name, surname, email, message)))
            })
    } catch ({ message }) {
        res.send(render(register(name, surname, email, message)))
    }
})

app.get('/login', checkLogin('/home'), (req, res) =>
    res.send(render(login()))
)

app.post('/login', [checkLogin('/home'), bodyParser], (req, res) => {
    const { body: { email, password }, logic } = req

    try {
        logic.loginUser(email, password)
            .then(() => {
                res.setHeader('set-cookie', [`token=${logic.__userToken__}`])
                res.redirect('/home')
            })
            .catch(({ message }) => res.send(render(login(email, message))))
    } catch ({ message }) {
        res.send(render(login(email, message)))
    }
})

app.get('/home', checkLogin('/', false), (req, res) => {
    const { logic } = req

    const time = Math.random() * 10000

    setTimeout(() => {
        if (!logic.isUserLoggedIn) res.redirect('/')
        else logic.retrieveUser()
            .then(({ name }) => res.send(render(home(name))))
            .catch(({ message }) => res.send(render(`<p>${message}</p>`)))
    }, time)



})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))