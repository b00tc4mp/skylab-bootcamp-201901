require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
// const FileStore = require('session-file-store')(session)
const logicFactory = require('./src/logic-factory')
const spotifyApi = require('./src/spotify-api')
const { REACT_APP_SPOTIFY_API_TOKEN } = process.env
spotifyApi.token = REACT_APP_SPOTIFY_API_TOKEN
const { env: { PORT }, argv: [, , port = PORT || 8083] } = process

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

function renderPage(content) {
    return `<html>
<head>
    <title>HELLO WORLD!</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body class="main">
    <h1>HELLO WORLD! 🤡</h1>
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
            .then(() => res.render('register-confirm', { email }))
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
                .then(({ name }) => res.render('home', { feedback, name }))
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

app.post('/artists', formBodyParser, (req, res) => {
    let { body: { query }, session: { feedback } } = req
    const logic = logicFactory.create(req)

    try {
        logic.searchArtists(query)
            .then(artists =>
                res.render('artists', { feedback, artists })
            )
            .catch(({ message }) => req.session.feedback = message
            )
    } catch ({ message }) {
        feedback = message

    }

})

app.get('/artist/:artisId', (req, res) => {
    let { params: { artisId }, session: { feedback } } = req
    const logic = logicFactory.create(req)
    try {
        logic.retrieveAlbums(artisId)
            .then(albums =>
                res.render('albums', { feedback, albums })
            )
            .catch(({ message }) => req.session.feedback = message
            )
    } catch ({ message }) {
        feedback = message

    }

})


app.get('/album/:albumId', (req, res) => {
    let { params: { albumId }, session: { feedback } } = req
    const logic = logicFactory.create(req)
    try {
        logic.retrieveTracks(albumId)
            .then(tracks => {
                console.log(tracks);
                res.render('tracks', { feedback, tracks })
            })
            .catch(({ message }) => req.session.feedback = message
            )
    } catch ({ message }) {
        feedback = message

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