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

app.get('/', checkLogin('/home'), (req, res) => res.render('landing'))

app.get('/register', checkLogin('/home'), (req, res) => res.render('register'))

app.post('/register', [checkLogin('/home'), urlencodedParser], (req, res) => {
    const { body: { name, surname, email, password }, logic } = req

    try {
        logic.registerUser(name, surname, email, password)
            .then(() => res.redirect('/login'))
            // .then(() => res.render('login', { message: 'Ok, user correctly registered, you can now proceed to login'}))
            .catch(({ message }) => {
                res.render('register', { name, surname, email, message })
            })
    } catch ({ message }) {
        res.render('register', { name, surname, email, message })
    }
})

app.get('/login', checkLogin('/home'), (req, res) => {
    const refererUrl = req.get('referer')
    debugger
    if (refererUrl && refererUrl.includes('register')) {
        res.render('login', {message: 'Ok, user correctly registered, you can now proceed to login'})
    } else res.render('login')
})

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
        .catch(({ message }) => res.render(`<p>${message}</p>`))
})

app.get('/home/search', [checkLogin('/', false), urlencodedParser], (req, res) => {
    const { query: { query }, logic, session } = req
    
    session.query = query
    
    //inicializo session cart
    if(!session.cart) session.cart = []
    const itemsCart = session.cart.length
    
    Promise.all([logic.searchDucks(query), logic.retrieveFavDucks()])
        .then(([ducks, favs]) => {
            ducks = ducks.map(({ id, title, imageUrl: image, price }) => ({ id, url: `/home/duck/${id}`, title, image, price, urlFav: `/home/favs/${id}`, urlCart: `/home/cart/${id}`}))

            return logic.retrieveUser()
                .then(({ name }) => {debugger; res.render('home', { name, query, ducks, favs, itemsCart})})
        })
        .catch(({ message }) => res.render('home', { name, query, ducks, favs, itemsCart, message}))
})

app.get('/home/duck/:id', checkLogin('/', false), (req, res) => {
    const { params: { id }, logic, session: { query, cart } } = req

    const itemsCart = cart.length

    Promise.all([logic.retrieveDuck(id), logic.retrieveFavDucks()])
        .then(([{title, imageUrl: image, description, price }, favs]) => {
            const duck = { id, title, image, description, price, urlFav: `/home/favs/${id}`, urlCart: `/home/cart/${id}`}

            return logic.retrieveUser()
                .then(({ name }) => res.render('home', { query, name, duck, favs, itemsCart }))
        })
})

app.post('/home/favs/:id', [checkLogin('/', false), urlencodedParser], (req, res) => {
    const { params: { id }, logic, session: { query }, body: {handleFavs} } = req
    
    logic.toggleFavDuck(id)
        .then(() => {
            res.redirect(req.get('referer'))
        })
})

app.get('/home/favs/list', checkLogin('/', false), (req, res) => {
    const { logic, session: { query, cart } } = req

    const itemsCart = cart.length

    logic.retrieveFavDucks()
        .then((favlist) => {
            favlist = favlist.map(({ id, title, imageUrl: image, price }) => ({ id, url: `/home/duck/${id}`, title, image, price, urlFav: `/home/favs/${id}`}))
            
            let message = ''
            if(!favlist.length) message = 'Not favourite ducks!'

            return logic.retrieveUser()
                .then(({ name }) => res.render('home', { query, name, favlist, itemsCart, message }))
        })
})

app.post('/home/cart/:id', [checkLogin('/', false), urlencodedParser], (req, res) => {
    const { params: { id }, session: { query, cart }, body: {handleCart} } = req

    if(!cart) session.cart = []

    cart.push(id) //meter los productos en un array

    res.redirect(req.get('referer'))
})

app.get('/home/cart', checkLogin('/', false), (req, res) => {
    const { session: { cart, query }, logic } = req
    
    const itemsCart = cart.length

    Promise.all(cart.map(id => logic.retrieveDuck(id)))
        .then(listCart => {
            listCart = listCart.map(({ id, title, imageUrl: image, price }) => ({ id, url: `/home/duck/${id}`, title, image, price }))

            return logic.retrieveUser()
                .then(({ name }) => res.render('home', { name, query, itemsCart, listCart }))
        })
})

app.post('/logout', (req, res) => {
    req.session.destroy()

    res.redirect('/')
})

app.use((req, res, next) => res.redirect('/'))

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))