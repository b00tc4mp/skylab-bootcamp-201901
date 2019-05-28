const express = require('express')
const { injectLogic, checkLogin } = require('./middlewares')
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
            .then(() => res.render('login'))
            .catch(({ message }) => res.render('register', { name, surname, email, message }))
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
        .catch(({ message }) => res.render('home', { message }))
})

app.get('/home/search', checkLogin('/', false), urlencodedParser, (req, res) => {
    const { query: { query }, logic, session } = req

    session.query = query

    logic.searchDucks(query)
        .then(ducks => {
            ducks = ducks.map(({ id, title, imageUrl: image, price }) => ({ id,url: `/home/duck/${id}`,favUrl: `/home/favduck/${id}`,cartUrl: `/home/cartduck/${id}`, title, image, price }))

            return logic.retrieveUser()
                .then(({ name }) => res.render('home', { name, query, ducks }))
        })
        .catch(({ message }) => res.render('home', { message }))
})

app.get('/home/duck/:id', checkLogin('/', false), (req, res) => {
    const { params: { id }, logic, session: { query } } = req

    logic.retrieveDuck(id)
        .then(({ title, imageUrl: image, description, price }) => {
            const duck = { title, image, description, price }

            return logic.retrieveUser()
                .then(({ name }) => res.render('home', { query, name, duck }))
        })
})

app.get('/home/favorites', checkLogin('/', false), (req, res) => {
    const { logic, session: { query } } = req

    logic.retrieveFavDucks()
        .then((favorites) => {
            favorites = favorites.map(({ id, title, imageUrl: image, price }) => ({ url: `/home/duck/${id}`, title, image, price }))

            return logic.retrieveUser()
                .then(({ name }) => res.render('home', { query, name, favorites }))

        })


})
app.get('/home/cart', checkLogin('/', false), (req, res) => {
    const { logic, session: { query } } = req

    logic.retrieveCartDucks()
    .then((cart) => {
        cart = cart.map(({ id, title, imageUrl: image, price }) => ({ url: `/home/duck/${id}`,cartUrl: `/home/cartduck/${id}`, title, image, price }))

        let totalPrice = 0
        let shipCost = 0
        let withShip = 0
            cart.forEach((item)=>{
                item=Number((item.price).slice(0, (item.price).length - 2)) 
                 totalPrice += item })

            totalPrice=totalPrice.toFixed(2)
            shipCost = (5 + cart.length * .8).toFixed(2)

            withShip = Number(totalPrice) + Number(shipCost)

            return logic.retrieveUser()
                .then(({ name }) => res.render('home', { query, name, cart, totalPrice, shipCost, withShip}))


    })


})

app.get('/home/favduck/:id', checkLogin('/', false), (req, res) => {
    const { params: { id }, logic, session: { query }  } = req

    logic.toggleFavDuck(id)
    .then(()=>{logic.retrieveFavDucks()
        .then((favorites) => {
            favorites = favorites.map(({ id, title, imageUrl: image, price }) => ({ url: `/home/duck/${id}`, title, image, price }))

            return logic.retrieveUser()
                .then(({ name }) => res.render('home', { query, name}))

        })})
})

app.get('/home/cartduck/:id', checkLogin('/', false), (req, res) => {

    const { params: { id }, logic, session: { query } } = req

    logic.toggleCartDuck(id).then(()=>{
        logic.retrieveCartDucks()
            .then((cart) => {
                cart = cart.map(({ id, title, imageUrl: image, price }) => ({ url: `/home/duck/${id}`, cartUrl: `/home/cartduck/${id}`, title, image, price }))

                return logic.retrieveUser()
                    .then(({ name }) => res.render('home', { query, name}))

            })
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