require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
// const FileStore = require('session-file-store')(session)
const logicFactory = require('./src/logic-factory')
// const spotifyApi = require('./src/spotify-api')

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

function renderPage(content) { 
    return `<html>
<body class="main">
    <h1>Spotify App! 🤡</h1>
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
                    res.redirect('/home', {feedback})
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

app.post('/search', formBodyParser, (req, res) => {
  
    const { body: { query } } = req
    const logic = logicFactory.create(req)
    try {
        debugger
        if (logic.isUserLoggedIn){
            logic.searchArtists(query)
                .then(artists => {
                    res.artist = artists
                    res.render('home', {artists})              
                })
        }else{
            res.redirect('/login')
        }   
    } catch (error) {
        // req.session.feedback = message
        const feedback = pullFeedback(req)

        res.render('home', { feedback })
    }   
})

app.post('/albums', formBodyParser, (req, res) => {
  
      const { body: { artistId } } = req
      const logic = logicFactory.create(req)
   
      try {
          if (logic.isUserLoggedIn){
  
              logic.retrieveAlbums(artistId)
                  .then(albums => {
                    res.albums = albums
                      res.render('home', {albums})              
                  })
          }else{
              res.redirect('/login')
          }   
      } catch (error) {
          console.log(error.message)
      }   
  })

  app.post('/tracks', formBodyParser, (req, res) => {
  
      const { body: { tracksId } } = req
      const logic = logicFactory.create(req)
   
      try {
          if (logic.isUserLoggedIn){
              
  
              logic.retrieveTracks(tracksId)
                  .then(tracks => {
                    res.tracks = tracks
                      res.render('home', {tracks})              
                  })
          }else{
              res.redirect('/login')
          }   
      } catch (error) {
          console.log(error.message)
      }   
  })

  app.post('/track', formBodyParser, (req, res) => {
      const { body: { trackId } } = req
      const logic = logicFactory.create(req)
   
        try {
            if (logic.isUserLoggedIn){
    
                logic.retrieveTrack(trackId)
                    .then(track => {
                        res.track = track
                        res.render('home', {track})              
                    })
            }else{
                res.redirect('/login')
            }   
        } catch (error) {
            console.log(error.message)
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