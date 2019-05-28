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
            .then(() => res.send(render(`<p>Ok, user correctly registered, you can now proceed to <a href="/login">login</a></p>`)))
            .catch(({ message }) => {
                res.render('register', { name, surname, email, password, message })
            })
    } catch ({ message }) {
        res.render('register', { name, surname, email, password, message })
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
    let { query: { query }, logic, session, id } = req

    if (query) session.query = query
    else (query = session.query)


    logic.searchDucks(query)
        .then(ducks => {

            logic.retrieveFavDucks()
                .then(favs => {

                    for (let i = 0; i < ducks.length; i++) {
                        let check = false
                        for (let a = 0; a < favs.length; a++) {
                            if (typeof favs[a] === 'object' && favs[a].id === ducks[i].id) {

                                ducks[i] = { id: ducks[i].id, url: `/home/duck/${ducks[i].id}`, title: ducks[i].title, image: ducks[i].imageUrl, price: ducks[i].price, favo: true}
                                check = true
                            }
                        }
                        if (check === false) ducks[i] = { id: ducks[i].id, url: `/home/duck/${ducks[i].id}`, title: ducks[i].title, image: ducks[i].imageUrl, price: ducks[i].price, favo: false }
                    }

                    return logic.retrieveUser()
                        .then(({ name }) => res.render('Home', { name, query, ducks }))
                })

        })

        .catch(({ message }) => res.render('Home', { name, query, message }))
})





app.get('/home/duck/:id', checkLogin('/', false), (req, res) => {
    const { params: { id }, logic, session: { query } } = req
    let fav = false
    
    logic.retrieveFavDucks()
        .then(favs => {
            favs.forEach(function (item) {
                if (item.id === id)
                    fav = true
            })

           return logic.retrieveDuck(id)
                .then(({ title, imageUrl: image, description, price }) => {
                    const duck = { title, image, description, price , id ,fav }

                    return logic.retrieveUser()
                        .then(({ name }) => res.render('home', { query, name, duck }))
                })

        })

})


app.get('/toggle', checkLogin('/', false), (req, res) => {
    const { query: { id }, logic } = req
    return logic.toggleFavDuck(id)
        .then(() => {
            res.redirect('/home/search')
        })
})

app.get('/toggle/detail', checkLogin('/', false), (req, res) => {
    const { query: { id }, logic } = req
    return logic.toggleFavDuck(id)
        .then(() => {
            res.redirect(`/home/duck/${id}`)
        })
})



app.get('/home/favs', checkLogin('/', false), (req, res) => {
    const { params: { id }, logic, session: { query } } = req
    let favs
    logic.retrieveFavDucks()
        .then(ducks => {
            favs = ducks.map(({ id, title, imageUrl: image, price }) => ({ url: `/home/duck/${id}`, title, image, price }))


            return logic.retrieveUser()
                .then(({ name }) => res.render('home', { query, name, favs }))
        })
})


app.get('/cart', checkLogin('/', false), (req, res) => {
    const { query: { id }, logic } = req
    
    return logic.toggleCart(id)
        .then(() => {
            res.redirect(`/home/duck/${id}`)
        })
})

app.get('/cart/details', checkLogin('/', false), (req, res) => {
    const { logic } = req
    
    logic.retrieveCart()
        .then(ducks => {
            favs = ducks.map(({ imageUrl: image ,price,title}) => ({ image,price,title}))


        return logic.retrieveUser()
            .then(({ name }) => res.render('home', { name, favs }))
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