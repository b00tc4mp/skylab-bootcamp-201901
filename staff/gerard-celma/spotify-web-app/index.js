require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const logicFactory = require('./src/logic-factory')

const { env: { PORT }, argv: [,,port = PORT || 8080] } = process

const app = express()

app.use(session({
    secret: 'kaboom',
    resave: true,
    saveUninitialized: true
}))

app.use(express.static('public'))

app.set('view engine', 'pug')
app.set('views', './src/components')

const formBodyParser = bodyParser.urlencoded({ extended: false })

function pullFeedback(req) {
    const { session: { feedback } } = req

    req.session.feedback = null

    return feedback
}

app.get('/', (req,res) => {
    res.render('landing')
})

app.get('/register', (req, res) => {
    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) {
        res.redirect('/home')
    } else {
        const feedback = pullFeedback(req)

        res.render('register', { feedback })
    }
})

app.post('/register', formBodyParser, (req, res) => {
    const { body: { name, surname, email, password, passwordConfirm } } = req

    const logic = logicFactory.create(req)

    try {
        logic.registerUser(name, surname, email, password, passwordConfirm)
            .then(() => res.send(renderPage(`<section class="register">
        <h2>Registration confirmation</h2>
        Ok, user <strong>${email}</strong> successfully registered, please proceed to <a href="/login">login</a>.
        </form>
    </section>`)))
            .catch(({ message }) => {
                req.session.feedback = message

                res.redirect('/register')
            })
    } catch ({ message }) {
        req.session.feedback = message

        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) {
        res.redirect('/home')
    } else {
        const feedback = pullFeedback(req)

        res.render('login', { feedback })
    }
})

app.post('/login', formBodyParser, (req, res) => {
    const { body: { email, password } } = req

    const logic = logicFactory.create(req)

    try {
        logic.logInUser(email, password)
            .then(() => res.redirect('/home'))
            .catch(({ message }) => {
                req.session.feedback = message

                res.redirect('/login')
            })
    } catch ({ message }) {
        req.session.feedback = message

        res.redirect('/login')
    }
})

app.get('/home', (req, res) => {
    try {
        const { session: { feedback } } = req

        const logic = logicFactory.create(req)

        if (logic.isUserLoggedIn)
            logic.retrieveUser()
                .then(user => res.render('home', {user}))
                .catch(({ message }) => {
                    req.session.feedback = message

                    res.redirect('/home')
                })
        else res.redirect('/login')
    } catch ({ message }) {
        req.session.feedback = message

        res.redirect('/home')
    }
})

app.post('/home', formBodyParser, (req,res) => {
    const { body: { query } } = req

    res.redirect(`home&search&${query}`)
})

app.get('/home&search&:query', (req,res) => {
    const { session:{ feedback }, params: { query } } = req

    const logic = logicFactory.create(req)
    if(logic.isUserLoggedIn) {
        try {
            logic.searchArtists(query)
                .then(artists => res.render('results-artists', {artists}))
                .catch(({ message }) => {
                    req.session.message = message

                    res.redirect('/home')
                })
        } catch({ message }) {
            req.message.feedback = message

            res.redirect('/home')
        }
    }
})

app.get('/home&artist&:artistId', formBodyParser, (req,res) => {
    const { session:{ feedback }, params: { artistId }} = req

    const logic = logicFactory.create(req)
    if(logic.isUserLoggedIn) {
        try {
            logic.retrieveAlbums(artistId)
                .then(albums => res.render('results-albums', { albums }))
                .catch(({ message }) => {
                    req.session.message = message

                    res.redirect('/home')
                })
        } catch({ message }) {
            req.message.feedback = message

            res.redirect('/home')
        }
    }
})

app.get('/home&album&:albumId', formBodyParser, (req,res) => {
    const { session:{ feedback }, params: { albumId }} = req

    const logic = logicFactory.create(req)
    if(logic.isUserLoggedIn) {
        try {
            logic.retrieveTracks(albumId)
                .then(tracks => res.render('results-tracks', { tracks }))
                .catch(({ message }) => {
                    req.message.feedback = message
        
                    res.redirect('/home')
                })
        } catch({ message }) {
            req.message.feedback = message

            res.redirect('/home')
        }
    }
})

app.post('/logout', (req, res) => {
    const logic = logicFactory.create(req)

    logic.logOutUser()

    res.redirect('/')
})


app.listen(port, () => console.log(`server running on port ${port}`))