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
            .then(() => res.render('login', { message: 'Ok, user correctly registered, you can now proceed to login'}))
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

    Promise.all([logic.searchDucks(query), logic.retrieveFavDucks()])
        .then(([ducks, favs]) => {
            ducks = ducks.map(({ id, title, imageUrl: image, price }) => ({ id, url: `/home/duck/${id}`, title, image, price, urlFav: `/home/favs/${id}`}))

            return logic.retrieveUser()
                .then(({ name }) => res.render('home', { name, query, ducks, favs }))
        })
        .catch(({ message }) => res.send(render(`<p>${message}</p>`)))
})

app.get('/home/duck/:id', checkLogin('/', false), (req, res) => {
    const { params: { id }, logic, session: { query } } = req

    Promise.all([logic.retrieveDuck(id), logic.retrieveFavDucks()])
    // logic.retrieveDuck(id)
        .then(([{ title, imageUrl: image, description, price }, favs]) => {
            const duck = { id, title, image, description, price, urlFav: `/home/favs/${id}`}

            return logic.retrieveUser()
                .then(({ name }) => res.render('home', { query, name, duck, favs }))
        })
})

app.post('/home/favs/:id', [checkLogin('/', false), urlencodedParser], (req, res) => {
    const { params: { id }, logic, session: { query }, body: {favDuck} } = req
    
    logic.toggleFavDuck(id)
        .then(() => {
            switch (favDuck) {
                case 'ducks':
                    res.redirect(`/home/search?query=${query}`)
                    break
            
                case 'duck':
                    res.redirect(`/home/duck/${id}`)
                    break

                case 'favlist':
                    res.redirect(`/home/favs/list`)
                    break
            }
        })
})

app.get('/home/favs/list', checkLogin('/', false), (req, res) => {
    const { logic, session: { query } } = req

    logic.retrieveFavDucks()
        .then((favlist) => {
            favlist = favlist.map(({ id, title, imageUrl: image, price }) => ({ id, url: `/home/duck/${id}`, title, image, price, urlFav: `/home/favs/${id}`}))
            
            let message = ''
            if(!favlist.length) message = 'Not favourite ducks!'

            return logic.retrieveUser()
                .then(({ name }) => res.render('home', { query, name, favlist, message }))
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