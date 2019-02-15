const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const logicFactory = require('./src/logic-factory')

const { argv: [, , port = 8080] } = process

const app = express()

app.use(session({
    secret: 'a secret phrase used to encrypt data that flows from server to client and viceversa',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
    store: new FileStore({
        path: './.sessions'
    })
}))

const formBodyParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'))

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
    res.send(renderPage(`<section class="landing">
        <a href="/login">Login</a> or <a href="/register">Register</a>
    </section>`))
})

app.get('/register', (req, res) => {
    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) {
        res.redirect('/home')
    } else {
        const feedback = pullFeedback(req)

        res.send(renderPage(`<section class="register">
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
    </section>`))
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

        res.send(renderPage(`<section class="login">
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
    </section>`))
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
                .then(user => res.send(renderPage(`<section class="home">
        Welcome, ${user.name}!
        ${feedback ? `<section class="feedback feedback--error">
            ${feedback}
        </section>` : ''}
        <form action="/logout" method="post">
            <button type="submit">Logout</button>
        </form>
    </section>`)))
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
    const logic = logicFactory.create(req)

    logic.logOutUser()

    res.redirect('/')
})

app.get('*', (req, res) => res.send(404, renderPage(`<section class="not-found">
        <h2>NOT FOUND</h2>

        Go <a href="/">Home</a>
    </section>`)))


app.listen(port, () => console.log(`server running on port ${port}`))