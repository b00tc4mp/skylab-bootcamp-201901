require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
// const FileStore = require('session-file-store')(session)
const logicFactory = require('./src/logic-factory')
const spotifyApi = require('./src/spotify_Api/index')

const { env: { PORT }, argv: [, , port = PORT || 8080] } = process
const { env: { REACT_APP_SPOTIFY_API_TOKEN } } = process

spotifyApi.token = REACT_APP_SPOTIFY_API_TOKEN

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
<body class="main">
    <h1>Spotify App!</h1>
     ${content}
// </body>
// </html>`
}

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
                .then(user => {
                    res.render('home', { user, feedback })
                })

                .catch(({ message }) => {
                    req.session.feedback = message
                    const feedback = pullFeedback(req)
                    res.redirect('/home', { feedback })
                })

        else res.redirect('/login')
    } catch ({ message }) {
        req.session.feedback = message

        res.redirect('/home')
    }
})

// app.post('/home', formBodyParser, (req, res) => {
//     const { body: { query } } = req

//     res.redirect('/home')   
//     // ('/home')

// })

app.post('/home', formBodyParser, (req, res) => {
    const { body: { query } } = req  //body es el q ve dels forms dels pugs. 
    const logic = logicFactory.create(req)
    try {
        if (logic.isUserLoggedIn) {
            logic.searchArtists(query)
                .then(artists => {
                    res.artists = artists
                    res.render('artists', { artists })
                })
        } else {
            res.redirect('/login')
        }
    } catch (error) {
        // req.session.feedback = message
        const feedback = pullFeedback(req)

        res.render('home', { feedback })
    }
})

app.post('/albums=:artistId', formBodyParser, (req, res) => {
    debugger
    const { params: { artistId } } = req //params es a partir de : en aquesta cas, artistId
    const logic = logicFactory.create(req)

    req.session.artistId = artistId

    try {
        if (logic.isUserLoggedIn) {

            logic.retrieveAlbums(artistId)
                .then(albums => {
                    res.albums = albums
                    res.render('albums', { albums, artistId })
                })
        } else {
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error.message)
    }
})

app.post('/tracks=:albumId', formBodyParser, (req, res) => {
    debugger
    const { params: { albumId}, session:{artistId}} = req  //els params agafa el valor a partir dels: en aquest cas, albumId

    const logic = logicFactory.create(req)

    req.session.albumId = albumId


    try {
        if (logic.isUserLoggedIn) {

            logic.retrieveTracks(albumId)
                .then(tracks => {
                    res.tracks = tracks
                    res.render('tracks', { tracks, albumId, artistId }) //aixi passem el valor de tracks i albumId al pug de track          
                })
        } else {
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error.message)
    }
})

app.post('/track=:trackId', formBodyParser, (req, res) => {
    debugger
    //els params agafa el valor a partir dels: en aquest cas, albumId
    const { body: { trackId }, session: { albumId } } = req
    const logic = logicFactory.create(req)

    try {
        if (logic.isUserLoggedIn) {

            logic.retrieveTrack(trackId)
                .then(track => {
                    debugger
                    res.track = track
                    res.render('track', { track, albumId })
                })

        } else {
            debugger
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error.message)
    }
})

app.post('/logout', (req, res) => {
    const logic = logicFactory.create(req)

    logic.logOutUser()

    res.redirect('/login')
})

app.get('*', (req, res) => res.send(404, renderPage(`<section class="go">
        Go <a href="/login">Login</a>
    </section>`)))


app.listen(port, () => console.log(`server running on port ${port}`))