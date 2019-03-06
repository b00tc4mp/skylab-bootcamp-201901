const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const logic = require('./src/logic')

const { argv: [, , port = 8080] } = process

const app = express()

app.use(session({
    secret: 'a secret phrase used to encrypt data that flows from server to client and viceversa',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

const formBodyParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'))

function pullFeedback(req) {
    const { session: { feedback } } = req

    req.session.feedback = null

    return feedback
}

function isUserLoggedIn(req) {
    const { session: { userId, token } } = req

    return !!(userId && token)
}

function logoutUser(req) {
    // WARN cleaning just session does not renew cookie (two consecutive users would re-use same cookie, not recommended)
    // const { session } = req
    // delete session.userId
    // delete session.token

    req.session.destroy() // NOTE this method destroys session and renews cookie (recommended)
}

app.get('/', (req, res) => {
    res.send(`<html>
<head>
    <title>HELLO WORLD</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body class="main">
    <h1>HELLO WORLD</h1>
    <section class="landing">
        <a href="/login">Login</a> or <a href="/register">Register</a>
    </section>
</body>
</html>`)
})

app.get('/register', (req, res) => {
    if (isUserLoggedIn(req)) {
        res.redirect('/home')
    } else {
        const feedback = pullFeedback(req)

        res.send(`<html>
<head>
    <title>HELLO WORLD</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body class="main">
    <h1>HELLO WORLD</h1>
    <section class="register">
        <h2>Register</h2>
        <form method="POST" action="/register">
        <input name="name" type="text" placeholder="name" required>
        <input name="surname" type="text" placeholder="surname" required>
        <input name="email" type="email" placeholder="email" required>
        <input name="password" type="password" placeholder="password" required>
        <input name="passwordConfirm" type="password" placeholder="confirm password" required>
        <button type="submit">Register</button>
        </form>
        ${feedback ? `<section class="feedback feedback--warn">
            ${feedback}
        </section>` : ''}
        Go <a href="/">Home</a> or <a href="/login">Login</a>
    </section>
</body>
</html>`)
    }
})

app.post('/register', formBodyParser, (req, res) => {
    const { body: { name, surname, email, password, passwordConfirm } } = req

    try {
        logic.registerUser(name, surname, email, password, passwordConfirm)
            .then(() => res.send(`<html>
<head>
    <title>HELLO WORLD</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body class="main">
    <h1>HELLO WORLD</h1>
    <section class="register">
        <h2>Registration confirmation</h2>
        Ok, user <strong>${email}</strong> successfully registered, please proceed to <a href="/login">login</a>.
        </form>
    </section>
</body>
</html>`))
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
    if (isUserLoggedIn(req)) {
        res.redirect('/home')
    } else {
        const feedback = pullFeedback(req)

        res.send(`<html>
<head>
    <title>HELLO WORLD</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body class="main">
    <h1>HELLO WORLD</h1>
    <section class="login">
        <h2>Login</h2>
        <form method="POST" action="/login">
        <input name="email" type="email" placeholder="email" required>
        <input name="password" type="password" placeholder="password" required>
        <button type="submit">Login</button>
        </form>
        ${feedback ? `<section class="feedback feedback--warn">
            ${feedback}
        </section>` : ''}
        Go <a href="/">Home</a> or <a href="/register">Register</a>
    </section>
</body>
</html>`)
    }
})

app.post('/login', formBodyParser, (req, res) => {
    const { body: { email, password } } = req

    try {
        logic.logInUser(email, password)
            .then(({ id, token }) => {
                req.session.userId = id
                req.session.token = token

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
        const { session: { userId, token, feedback } } = req

        if (userId && token)
            logic.retrieveUser(userId, token)
                .then(user => res.send(`<html>
<head>
    <title>HELLO WORLD</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body class="main">
    <h1>HELLO WORLD</h1>
    <section class="home">
        Welcome, ${user.name}!
        ${feedback ? `<section class="feedback feedback--error">
            ${feedback}
        </section>` : ''}
        <form action="/logout" method="post">
            <button type="submit">Logout</button>
        </form>
    </section>
</body>
</html>`))
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

app.post('/logout', (req, res) => {
    logoutUser(req)

    res.redirect('/')
})

app.get('*', (req, res) => res.send(404, `<html>
<head>
    <title>HELLO WORLD</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body class="main">
    <h1>HELLO WORLD</h1>
    <section class="not-found">
        <h2>NOT FOUND</h2>

        Go <a href="/">Home</a>
    </section>
</body>
</html>`))


app.listen(port, () => console.log(`server running on port ${port}`))