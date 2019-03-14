const express = require('express')

// 1
// const bodyParser = require('./body-parser')

// 2
// const bodyParserMiddleware = require('./body-parser-middleware')

// 3
const bodyParser = require('body-parser')

const formBodyParser = bodyParser.urlencoded({ extended: false })

const app = express()

app.get('/', (req, res) => {
    res.send('hello GET\n')
})

app.post('/', (req, res) => {
    res.send('hello POST\n')
})

app.put('/', (req, res) => {
    res.send('hello PUT\n')
})

app.get('/login', (req, res) => {
    res.send(`<html>
<head><title>HELLO WORLD</title></head>
<body>
    <form method="POST" action="/login">
        <input name="username" type="text" placeholder="username">
        <input name="password" type="password" placeholder="password">
        <button type="submit">Login</button>
    </form>
</body>
</html>`)
})

// 1
// app.post('/login', (req, res) => {
//     bodyParser(req, params => {
//         const { username, password } = params

//         if (username === 'manuelbarzi' && password === 'p') res.send('ok, logged in')
//         else res.send('wrong credentials')
//     })
// })

// 2
// app.post('/login', bodyParserMiddleware, (req, res) => {
//     const { params: { username, password } } = req

//     if (username === 'manuelbarzi' && password === 'p') res.send('ok, logged in')
//     else res.send('wrong credentials')
// })

// 3
app.post('/login', formBodyParser, (req, res) => {
    const { body: { username, password } } = req

    if (username === 'manuelbarzi' && password === 'p') res.send('ok, logged in')
    else res.send('wrong credentials')
})

app.listen(8080)