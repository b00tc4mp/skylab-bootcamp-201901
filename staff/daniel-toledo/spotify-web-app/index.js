require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
// const FileStore = require('session-file-store')(session)
const logicFactory = require('./src/logic-factory')
const spotifyApi = require('./src/spotify-api')
let path = require('path');


const { env: { PORT, REACT_APP_SPOTIFY_API_TOKEN }, argv: [, , port = PORT || 8080] } = process

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
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
        <title>SputnikFy</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    
    </head>
    
    <body>
        <main>
            ${content}
        </main>    
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
            .then(() => res.redirect('/login'))
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
                .then(user => res.render('home', { user, feedback }))
                .catch(({ message }) => {
                    req.session.feedback = message

                    res.redirect('/home')
                })
        else res.redirect('/')
    } catch ({ message }) {
        req.session.feedback = message

        res.redirect('/home')
    }
})

app.post('/logout', (req, res) => {
    const logic = logicFactory.create(req)

    logic.logOutUser()

    res.redirect('/')
})

app.post('/search', formBodyParser, (req, res) => {
    const { body: { query } } = req

    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) res.redirect(`/search&q=${query}`)
    else res.redirect('/')

})

app.get('/search&q=:query', (req, res) => {
    const { session: { feedback }, params: { query } } = req

    req.session.query = query
    req.session.artistId = null
    req.session.albumId = null
    req.session.songId = null

    try {
        const logic = logicFactory.create(req)

        if (logic.isUserLoggedIn) {
            logic.searchArtists(query)
                .then(artists => res.render(`artists`, { feedback, query, artists}))
                .catch(({ message }) => {
                    req.session.feedback = message

                    res.redirect('/asyncron')
                })
        } else res.redirect('/')

    } catch ({ message }) {
        req.session.feedback = message

        res.redirect('/syncron')
    }
})

app.get('/search&artist=:artistId', (req, res) => {
    const { session: { feedback, query }, params: { artistId } } = req

    req.session.artistId = artistId
    req.session.albumId = null
    req.session.songId = null

    try {
        const logic = logicFactory.create(req)

        if (logic.isUserLoggedIn) {
            logic.retrieveAlbums(artistId)
                .then(albums => res.render(`albums`, { feedback, query, artistId, albums }))
                .catch(({ message }) => {
                    req.session.feedback = message

                    res.redirect('/asyncron-artist')
                })
        } else res.redirect('/')

    } catch ({ message }) {
        req.session.feedback = message

        res.redirect('/syncron-artist')
    }
})

app.get('/search&album=:albumId', (req, res) => {
    const { session: { feedback, query, artistId, songId }, params: { albumId } } = req

    req.session.albumId = albumId
    req.session.songId = null

    let imageAlbum
    let song

    try {
        const logic = logicFactory.create(req)

        if (logic.isUserLoggedIn) {
            if (songId) logic.retrieveTrack(songId).then(result=>song=result)
            logic.retrieveAlbum(albumId)
                .then(album => {
                    if (album.images[0].url) imageAlbum = album.images[0].url
                    else imageAlbum = `https://cdn.pixabay.com/photo/2016/06/01/09/21/music-1428660_960_720.jpg`
                    return logic.retrieveTracks(albumId)
                })
                .then(tracks => res.render(`tracks`, { feedback, query, artistId, albumId, tracks, imageAlbum, song }))
                .catch(({ message }) => {
                    req.session.feedback = message

                    res.redirect('/asyncron-tracks')
                })
        } else res.redirect('/')

    } catch ({ message }) {
        req.session.feedback = message

        res.redirect('/syncron-tracks')
    }
})

app.post('/search&song=:songId', (req, res) => {
    const { session: { albumId }, params: { songId } } = req

    req.session.songId = songId

    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) res.redirect(`/search&album=${albumId}`)
    else res.redirect('/')
})

app.get('*', (req, res) => res.send(404, renderPage(`<section class="not-found">
        <h2>NOT FOUND</h2>

        Go <a href="/">Home</a>
    </section>`)))


app.listen(port, () => console.log(`server running on port ${port}`))