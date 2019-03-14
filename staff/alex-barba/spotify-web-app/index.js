require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const logicFactory = require('./src/logic-factory')
const spotifyApi = require('./src/spotify-api')

const { env: { PORT }, argv: [, , port = PORT || 8080] } = process

const { REACT_APP_SPOTIFY_API_TOKEN } = process.env

spotifyApi.token = REACT_APP_SPOTIFY_API_TOKEN

const app = express()

app.use(session({
    secret: 'a secret phrase',
    resave: true,
    saveUninitialized: true,
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
            .then(() => res.render('register-confirm',  { email }))
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

    if (logic.isUserLoggedIn)
        
        logic.retrieveUser()
            .then(user => {
                res.render('home', { user })
            })
            .catch(({ message }) => {
                req.session.feedback = message
                const feedback = pullFeedback(req)
                res.render('home', {feedback})
            })
    else res.redirect('/login')

})

app.post('/home', formBodyParser, (req, res) => {
    const { body: { query } } = req

    res.redirect(`home&search&${query}`)

})

app.get('/home&search&:query', (req, res) => {
    const { session: { feedback }, params : { query } } = req

    const logic = logicFactory.create(req)
    if(logic.isUserLoggedIn) {
        try {
            logic.searchArtists(query)
                .then(artists => res.render('results-artists', { artists }))
                .catch(({ message }) => {
                    req.session.feedback = message
                    const feedback = pullFeedback(req)

                    res.render('home', { feedback })
                })
        } catch ({ message }) {
            req.session.feedback = message
            const feedback = pullFeedback(req)

            res.render('home', { feedback })
        }
    }
})

app.get('/home&artist&:artistId', (req, res) => {
    const { session: { feedback }, params : { artistId } } = req

    const logic = logicFactory.create(req)

    try {
        logic.retrieveAlbums(artistId)
            .then(albums => res.render('results-albums', { albums }))
            .catch(({ message }) => {
                req.session.feedback = message
            })
    } catch ({ message }) {
        req.session.feedback = message
    }
})

app.get('/home&album&:albumId', (req, res) => {
    const { session: { feedback }, params : { albumId } } = req

    const logic = logicFactory.create(req)

    try {
        logic.retrieveTracks(albumId)
            .then(tracks => res.render('results-tracks', { tracks }))
            .catch(({ message }) => {
                req.session.feedback = message
            })
    } catch ({ message }) {
        req.session.feedback = message
    }
})

app.get('/home&track&:trackId', (req, res) => {
    const { session: { feedback }, params : { trackId } } = req

    const logic = logicFactory.create(req)

    try {
        debugger;
        logic.retrieveTrack(trackId)
            .then(track => res.render('results-track', { track }))
            .catch(({ message }) => {
                req.session.feedback = message
            })
    } catch ({ message }) {
        req.session.feedback = message
    }
})


app.post('/logout', (req, res) => {
    const logic = logicFactory.create(req)

    logic.logOutUser()

    res.redirect('/')
})

app.get('*', (req, res) => {
    res.status(404)
    res.render('not-found')
})

app.listen(port, () => console.log(`server running on port ${port}`))