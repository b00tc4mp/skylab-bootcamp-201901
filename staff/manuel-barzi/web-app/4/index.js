const express = require('express')
const { bodyParser, cookieParser, injectLogic, checkLogin } = require('./middlewares')
const render = require('./components/render')
const package = require('./package.json')
const { Login, Register, Home } = require('./components')
const storage = require('./storage')
const token = require('./common/token')

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
                const payload = token.payload(logic.__userToken__)

                const expires = new Date(payload.exp * 1000)

                res.setHeader('set-cookie', [`token=${logic.__userToken__}; expires=${expires}`])

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

app.get('/home/search', checkLogin('/', false), bodyParser, (req, res) => {
    const { query: { query }, logic } = req

    // storage.get(logic.__userId__).query = query
    storage.get(logic.__userToken__).query = query

    logic.searchDucks(query)
        .then(ducks => {
            ducks = ducks.map(({ id, title, imageUrl: image, price }) => ({ url: `/home/duck/${id}`, title, image, price }))

            return logic.retrieveUser()
                .then(({ name }) => res.send(render(new Home().render({ name, query, ducks }))))
        })
        .catch(({ message }) => res.send(render(`<p>${message}</p>`)))
})

app.get('/home/duck/:id', checkLogin('/', false), (req, res) => {
    const { params: { id }, logic } = req

    // const query = storage.get(logic.__userId__).query
    const query = storage.get(logic.__userToken__).query

    logic.retrieveDuck(id)
        .then(({ title, imageUrl: image, description, price }) => {
            const duck = { title, image, description, price }

            return logic.retrieveUser()
                .then(({ name }) => res.send(render(new Home().render({ query, name, duck }))))
        })
})

app.post('/logout', (req, res) => {
    res.clearCookie('token')

    res.redirect('/')
})

app.use(function(req, res, next) {
    res.redirect('/')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))