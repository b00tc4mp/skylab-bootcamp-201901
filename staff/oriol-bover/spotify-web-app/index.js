require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const logicFactory = require('./src/logic-factory')
const spotifyApi = require('./src/spotify-api')

const { env: { PORT }, argv: [, , port = PORT || 8080] } = process

const { SPOTIFY_API_TOKEN } = process.env

spotifyApi.token = SPOTIFY_API_TOKEN

const app = express()


app.use(express.static('public'))

app.set('view engine', 'pug')
app.set('views', './src/components')
const formBodyParser = bodyParser.urlencoded({ extended: false })

app.use(session({
    secret: 'a secret phrase used to encrypt data that flows from server to client and viceversa',
    resave: true,
    saveUninitialized: true,
}))

function pullFeedback(req) {
    const { session: { feedback } } = req

    req.session.feedback = null

    return feedback
}

function renderPage(content) {
    return `<html>
<head>
    <title>HELLO WORLD</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <h1>HELLO WORLD</h1>
    ${content}
</body>
</html>`
}

app.get('/', (req, res) => {
    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) return res.redirect('/home')

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
    const { body: { name, surname, email, password, passwordConfirmation } } = req

    const logic = logicFactory.create(req)

    try {
        logic.registerUser(name, surname, email, password, passwordConfirmation)
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
        logic.loginUser(email, password)
            .then(() => {
                if (logic.isUserLoggedIn)
                    res.redirect('/home')
            })
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
        const items = [{active: true, url: '/home', name: 'home'}]

        if (logic.isUserLoggedIn)
            logic.retrieveUser()
                .then(user => res.render('home', { feedback, user, items }))
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
    const { body: { query } } = req

    res.redirect(`home/search/${query}`)
})

app.get('/home/search/:query', (req, res) => {
    const { session: { feedback }, params: { query } } = req
    const logic = logicFactory.create(req)
    const items = [
        {active: false, url: '/home', name: 'home'},
        {active: true, url: `/home/search/${query}`, name: query}
    ]

    if (logic.isUserLoggedIn) {
        try {
            logic.searchArtists(query)
                .then(artists => {
                    const items = [
                        {active: false, url: '/home', name: 'home'},
                        {active: true, url: `/home/search/${query}`, name: query}
                    ]
                    res.render('artistResults', { artists, items })
                })
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
    } else {
        res.redirect('/login')
    }
})

app.get('/home/albums/:artistId', (req, res) => {
    const { params: { artistId } } = req
    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) {
        try {
            logic.retrieveAlbums(artistId)
                .then(albums => {
                    const items = [
                        {active: false, url: '/home', name: 'home'},
                        {active: false, url: `/home/search/${albums[0].artists[0].name}`, name: albums[0].artists[0].name},
                        {active: true, url: `/home/albums/${artistId}`, name: 'albums'},
                    ]
                    res.render('albumResults', { albums, items })
                })
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
    } else {
        res.redirect('/login')
    }

})

app.get('/home/album/:albumId', (req, res) => {
    const { params: { albumId } } = req
    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) {
        try {
            logic.retrieveTracks(albumId)
                .then(tracks => {

                    logic.retrieveAlbum(albumId)
                        .then(album => {
                            const items = [
                                {active: false, url: '/home', name: 'home'},
                                {active: false, url: `/home/search/${album.artists[0].name}`, name: album.artists[0].name},
                                {active: false, url: `/home/albums/${album.artists[0].id}`, name: 'albums'},
                                {active: true, url: `/home/album/${album.id}`, name: album.name},
                            ]
                            res.render('trackResults', { tracks, album, items })
                        })
                })
        } catch (error) {
            req.session.feedback = message
            const feedback = pullFeedback(req)

            res.render('home', { feedback })
        }
    } else {
        res.redirect('/login')
    }
})

app.get('/home/track/:trackId', (req, res) => {
    const { params: { trackId } } = req
    const logic = logicFactory.create(req)

    if(logic.isUserLoggedIn){
        try {
            logic.retrieveTrack(trackId)
                .then(track => {
                    const items = [
                        {active: false, url: '/home', name: 'home'},
                        {active: false, url: `/home/search/${track.artists[0].name}`, name: track.artists[0].name},
                        {active: false, url: `/home/albums/${track.artists[0].id}`, name: 'albums'},
                        {active: false, url: `/home/album/${track.album.id}`, name: track.album.name},
                        {active: true, url: `/home/track/${track.id}`, name: track.name},
                    ]
                    res.render('trackDetail', {track, items})
                })
        } catch ({message}) {
            req.session.feedback = message
            const feedback = pullFeedback(req)

            res.render('home', { feedback })
        }
    }else{
        res.redirect('/login')
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