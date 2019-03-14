const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')

const { argv: [, , port = 8080] } = process

const app = express()

const formBodyParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'))

let feedback = ''

app.get('/register', (req, res) => {
    res.send(`<html>
<head>
    <title>HELLO WORLD</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <h1>HELLO WORLD</h1>
    <section class="register">
        <h2>Register</h2>
        <form method="POST" action="/register">
        <input name="name" type="text" placeholder="name">
        <input name="surname" type="text" placeholder="surname">
        <input name="username" type="text" placeholder="username">
        <input name="password" type="password" placeholder="password">
        <button type="submit">Register</button>
        </form>
        ${feedback? `<section class="feedback feedback--warn">
            ${feedback}
        </section>` : ''}
    </section>
</body>
</html>`)
})

app.post('/register', formBodyParser, (req, res) => {
    const { body: { name, surname, username, password } } = req

    const data = JSON.stringify({ name, surname, username, password })

    const options = {
        hostname: 'skylabcoders.herokuapp.com',
        port: 443,
        path: '/api/user',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const request = https.request(options, response => {
        let content = ''

        response.on('data', data => {
            content += data
        })

        response.on('end', () => {
            const { status, error } = JSON.parse(content)

            if (status === 'OK')
                res.send(`<html>
<head>
    <title>HELLO WORLD</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <h1>HELLO WORLD</h1>
    <section class="register">
        <h2>Registration confirmation</h2>
        Ok, user <strong>${username}</strong> successfully registered, please proceed to <a href="/login">login</a>.
        </form>
    </section>
</body>
</html>`)
            else {
                feedback = error

                res.redirect('/register')
            }

        })
    })

    request.on('error', error => {
        console.error(error)
    })

    request.write(data)

    request.end()
})


app.listen(port, () => console.log(`server running on port ${port}`))