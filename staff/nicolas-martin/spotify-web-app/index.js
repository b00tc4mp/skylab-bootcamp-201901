require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
// const FileStore = require('session-file-store')(session)
const logicFactory = require('./src/logic-factory')

const { env: { PORT }, argv: [, , port = PORT || 8080] } = process

const app = express()

app.use(session({
    secret: 'a secret phrase',
    resave: true,
    saveUninitialized: true,
    // store: new FileStore({
    //     path: './.sessions'
    // })
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

app.get('/', (req, res) => {
    res.render('landing')
})

app.get('/register', (req, res) => {
    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) {
        res.redirect('/search')
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
            .then(() => res.render('register-confirm', {email}))
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
    const logic = logicFactory.create(req)
    res.render('home')
})

// artists list
app.get('/home/artists', formBodyParser, (req, res) => {
    const { session: { feedback }, query : { query } } = req
    const logic = logicFactory.create(req)

    try {
        logic.searchArtists(query)
            .then(results => res.render('home', { results, feedback: null }))
            .catch(({ message }) => {
                req.session.feedback = message
                const feedback = pullFeedback(req)
                res.render('home', { feedback })
            })

    } catch ({ message }) {
        req.session.feedback = message
        res.render('home', { feedback })
    }
})

// albums list
app.get('/albums/:artistId', (req, res) => {
    const { session: { feedback }, params : { artistId } } = req
    const logic = logicFactory.create(req)

    try {
        logic.retrieveAlbums(artistId)
            .then(albums => res.render('home', { albums, feedback: null }))
            .catch(({ message }) => {
                req.session.feedback = message
                const feedback = pullFeedback(req)
                res.render('home', { feedback })
            })

    } catch ({ message }) {
        req.session.feedback = message
        res.render('albums', { feedback })
    }

})

// tracks id
app.get('/tracks/:albumId', (req, res) => {
    const { session: { feedback }, params : { albumId } } = req
    const logic = logicFactory.create(req)

    try {
        logic.retrieveTracks(albumId)
            .then(tracks => res.render('home', { tracks, feedback: null }))
            .catch(({ message }) => {
                req.session.feedback = message
                const feedback = pullFeedback(req)
                res.render('home', { feedback })
            })

    } catch ({ message }) {
        req.session.feedback = message
        res.render('albums', { feedback })
    }

})


app.post('/logout', (req, res) => {
    const logic = logicFactory.create(req)

    logic.logOutUser()

    res.redirect('/')
})

app.get('*', (req, res) => res.status(404).render('404'))

app.listen(port, () => console.log(`server running on port ${port}`))