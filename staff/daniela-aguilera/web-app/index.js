const express = require('express')
<<<<<<< HEAD
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
=======
const { injectLogic, checkLogin } = require('./middlewares')
const render = require('./components/render')
const package = require('./package.json')
const bodyParser = require('body-parser')
const session = require('express-session')


const urlencodedParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

const app = express()

app.set('view engine', 'pug')
app.set('views', 'components')

app.use(session({
    secret: 'my super secret phrase to encrypt my session',
    resave: true,
    saveUninitialized: true
}))

app.use(express.static('public'), injectLogic)

app.get('/', checkLogin('/home'), (req, res) => {
    res.render('landing')
})

app.get('/register', checkLogin('/home'), (req, res) => {
    res.render('register')
})

app.post('/register', [checkLogin('/home'), urlencodedParser], (req, res) => {
    const { body: { name, surname, email, password }, logic } = req

    try {
        logic.registerUser(name, surname, email, password)
            .then(() => res.send(render(`<p>Ok, user correctly registered, you can now proceed to <a href="/login">login</a></p>`)))
            .catch(({ message }) => {
                res.render('register', { name, surname, email, message })
            })
    } catch ({ message }) {
        res.render('register', { name, surname, email, message })
    }
})

app.get('/login', checkLogin('/home'), (req, res) =>
    res.render('login')
)

app.post('/login', [checkLogin('/home'), urlencodedParser], (req, res) => {
    const { body: { email, password }, logic, session } = req

    try {
        logic.loginUser(email, password)
            .then(() => {
                session.token = logic.__userToken__

                res.redirect('/home')
            })
            .catch(({ message }) => res.render('login', { email, message }))
    } catch ({ message }) {
        res.render('login', { email, message })
    }
})

app.get('/home', checkLogin('/', false), (req, res) => {
    const { logic } = req

    logic.retrieveUser()
        .then(({ name }) => res.render('home', { name }))
        .catch(({ message }) => res.send(render(`<p>${message}</p>`)))
})

app.get('/home/search', checkLogin('/', false), urlencodedParser, (req, res) => {
    const { query: { query }, logic, session } = req

    session.query = query

    logic.searchDucks(query)
        .then(ducks => {
            ducks = ducks.map(duck => {
                const { id, title, imageUrl: image, price } = duck
                return { url: `/home/duck/${id}`, title, image, price }
            })

            logic.retrieveUser()
                //.then(({ name }) => res.send(render(new Home().render({ name, query, ducks }))))
                .then(({ name }) => res.render('home', { name, query, ducks }))
        })
        .catch(({ message }) => res.send(render(`<p>${message}</p>`)))
})

app.get('/home/duck/:id', checkLogin('/', false), (req, res) => {
    const { params: { id }, logic, session: { query } } = req

    logic.retrieveDuck(id)
        .then(({ title, imageUrl: image, description, price }) => {
            const duck = { id, title, image, description, price }
            logic.retrieveFavDucks()
                .then(ducks => {
                    duck.isFav = ducks.some(duck => duck.id === id)

                    logic.retrieveCartDucks()
                        .then(ducks => {
                            duck.isInCart = ducks.some(duck => duck.id === id)
                            logic.retrieveUser()
                                .then((user) => res.render('home', { query, name: user.name, duck }))
                        })
                })
        })
})


app.post('/fav/:id', checkLogin('/', false), (req, res) => {
    const { params: { id }, logic } = req
    logic.toggleFavDuck(id)
        .then(() => res.redirect(`/home/duck/${id}`))
        .catch(({ message }) => res.send(render(`<p>${message}</p>`)))
})


app.get('/fav', checkLogin('/', false), (req, res) => {
    const { logic } = req
    logic.retrieveFavDucks()
        .then(ducks => {
            ducks = ducks.map(duck => {
                const { id, title, imageUrl: image, price } = duck
                return { url: `/home/duck/${id}`, title, image, price }
            })
            logic.retrieveUser()
                .then((user) => res.render('home', { query: 'Favoritos', ducks, name: user.name }))
        })
})


app.post('/cart/:id', checkLogin('/', false), (req, res) => {
    const { params: { id }, logic } = req
    logic.toggleCart(id)
        .then(() => res.redirect(`/home/duck/${id}`))
        .catch(({ message }) => res.send(render(`<p>${message}</p>`)))
})


app.get('/cart', checkLogin('/', false), (req, res) => {
    const { logic } = req
    logic.retrieveCartDucks()
        .then(ducks => {
            ducks = ducks.map(duck => {
                const { id, title, imageUrl: image, price } = duck
                return { url: `/home/duck/${id}`, title, image, price }
            })
            logic.retrieveUser()
                .then((user) => res.render('home', { query: 'shopping cart', ducks, name: user.name }))
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
>>>>>>> upstream/develop
