const express = require('express')
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
            .then(() =>{ 
                res.render('login')
            })
            .catch(({ message }) => {
                
                res.render('register',{ name, surname, email, message })
            })
    } catch ({ message }) {
        
        res.render('register',{ name, surname, email, message })
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
        .catch(({ message }) => res.render('home', { name, message }))
})

app.get('/home/search', checkLogin('/', false), urlencodedParser, (req, res) => {
    const { query: { query }, logic, session } = req
    
    session.query = query
    
    Promise.all([logic.searchDucks(query), logic.retrieveFavDucks()])
        .then(([ducks, ducksFav]) => {
            
            ducks = ducks.map(({ id, title, imageUrl: image, price }) => ({ id, url: `/home/duck/${id}`, title, image, price }))
            return logic.retrieveUser()
                .then(({ name }) => res.render('home' , { name, query, ducks, ducksFav }))
        })
        .catch(({ message }) => res.render('home' , { name, query, ducks, ducksFav, message }))
})

app.get('/home/duck/:id', checkLogin('/', false), (req, res) => {
    const { params: { id }, logic, session: { query } } = req

    Promise.all([logic.retrieveDuck(id), logic.retrieveFavDucks()])
        .then(([{ title, imageUrl: image, description, price }, ducksFav]) => {
            const duck = { id, title, image, description, price }
            

            return logic.retrieveUser()
                .then(({ name }) => res.render('home', { query, name, duck, ducksFav }))
        })
})
app.post('/home/fav/:id', checkLogin('/', false), (req, res)=>{
    const { params: { id }, logic, session: {query} } = req
    
    logic.toggleFavDuck(id)
        .then(()=> Promise.all([logic.searchDucks(query), logic.retrieveFavDucks()]))
        
        .then(([ducks, ducksFav]) => {
            
            ducks = ducks.map(({ id, title, imageUrl: image, price }) => ({ id, url: `/home/duck/${id}`, title, image, price }))
            return logic.retrieveUser()
                .then(({ name }) => res.render('home' , { name, query, ducks, ducksFav }))
        })
})

app.get('/home/favorites', checkLogin('/', false), urlencodedParser, (req, res) => {
    const { query: { query }, logic } = req

    logic.retrieveFavDucks()
        .then((favlist) => {         
            favlist = favlist.map(({ id, title, imageUrl: image, price }) => ({ id, url: `/home/duck/${id}`, title, image, price }))
            return logic.retrieveUser()
                .then(({ name }) => res.render('home' , { name, query, favlist }))
        })
        .catch(({ message }) => res.render('home' , { name, query, favlist, message }))
})
app.post('/logout', (req, res) => {
    req.session.destroy()

    res.redirect('/')
})

app.use(function (req, res, next) {
    res.redirect('/')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))