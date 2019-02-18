require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const logicFactory = require('./src/logic-factory')
const spotifyApi = require('./src/spotify-api/spotify-api-v1.1.0')


const { env: { PORT }, argv: [, , port = PORT || 8080] } = process

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

function renderPage(content) {
    return `<html>
<head>
    <title>HELLO WORLD!</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body class="main">
    <h1>HOME/h1>
    ${content}
</body>
</html>`
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
    const { session: { feedback } } = req

    const logic = logicFactory.create(req)

    try {
        if (logic.isUserLoggedIn)
            logic.retrieveUser()
                .then(user => {

                    res.render('home', { feedback });

                })
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


app.post('/search', formBodyParser, (req, res) => {

    const logic = logicFactory.create(req)

    const { body: { query }, session: { feedback } } = req

    try {
        logic.searchArtists(query).then((artists) => {

            res.render('artists', { artists })
        })
    } catch (error) {
        console.log('error');
        console.log(error.message)

    }

})

app.get('/artist/:artistId', (req, res) => {
    const { session: { feedback }, params: { artistId } } = req

    const logic = logicFactory.create(req)

    try {
        logic.retrieveAlbums(artistId)
            .then(albums => res.render('albums', { albums }))
            .catch(({ message }) => {
                req.session.feedback = message
            })
    } catch ({ message }) {
        req.session.feedback = message
    }
})


app.get('/album/:albumId', (req, res) => {
    const { session: { feedback }, params: { albumId } } = req

    const logic = logicFactory.create(req)

    try {

        logic.retrieveTracks(albumId)
            .then(tracks => {
                res.render('tracks', { tracks })
            })
            .catch(({ message }) => {
                req.session.feedback = message
            })
    } catch ({ message }) {

        req.session.feedback = message
    }
})

app.get('/track/:tracksId', (req, res) => {
    const { session: { feedback }, params: { tracksId } } = req

    const logic = logicFactory.create(req)

    try {

        logic.retrieveTrack(tracksId)
            .then(track => res.render('track', { track }))
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

app.get('*', (req, res) => res.send(404, renderPage(`<section class="not-found">
        <h2>NOT FOUND</h2>

        Go <a href="/">Home</a>
    </section>`)))


app.listen(port, () => console.log(`server running on port ${port}`))