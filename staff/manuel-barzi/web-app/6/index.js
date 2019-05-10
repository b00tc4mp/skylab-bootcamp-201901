const express = require('express')
const { injectLogic, checkLogin } = require('./middlewares')
const render = require('./components/render')
const package = require('./package.json')
const { Login, Register, Home } = require('./components')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session);


const urlencodedParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

const app = express()

// app.use(session({
//     secret: 'my super secret phrase to encrypt my session',
//     resave: true,
//     saveUninitialized: true
// }))

app.use(session({
    secret: 'my super secret phrase to encrypt my session',
    resave: false,
    saveUninitialized: false,
    store: new FileStore()
}))

app.use(express.static('public'), injectLogic)

app.get('/', checkLogin('/home'), (req, res) => {
    res.send(render(`<h1>Welcome to this Web Application</h1>
<a href="/register">Register</a> or <a href="/login">Login</a>`))
})

app.get('/register', checkLogin('/home'), (req, res) => {
    res.send(render(new Register().render()))
})

app.post('/register', [checkLogin('/home'), urlencodedParser], (req, res) => {
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

app.post('/login', [checkLogin('/home'), urlencodedParser], (req, res) => {
    const { body: { email, password }, logic, session } = req

    try {
        logic.loginUser(email, password)
            .then(() => {
                session.token = logic.__userToken__

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

app.get('/home/search', checkLogin('/', false), urlencodedParser, (req, res) => {
    const { query: { query }, logic, session } = req

    session.query = query

    logic.searchDucks(query)
        .then(ducks => {
            ducks = ducks.map(({ id, title, imageUrl: image, price }) => ({ url: `/home/duck/${id}`, title, image, price }))

            return logic.retrieveUser()
                .then(({ name }) => res.send(render(new Home().render({ name, query, ducks }))))
        })
        .catch(({ message }) => res.send(render(`<p>${message}</p>`)))
})

app.get('/home/duck/:id', checkLogin('/', false), (req, res) => {
    const { params: { id }, logic, session: { query } } = req

    logic.retrieveDuck(id)
        .then(({ title, imageUrl: image, description, price }) => {
            const duck = { title, image, description, price }

            return logic.retrieveUser()
                .then(({ name }) => res.send(render(new Home().render({ query, name, duck }))))
        })
})

app.post('/logout', (req, res) => {
    req.session.destroy()

    res.redirect('/')
})

app.use(function (req, res, next) {
    res.redirect('/')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))