const express = require('express')

const { argv: [, , port] } = process

const app = express()

let user = {}

app.get('/hola-mundo', (req, res) => {
    res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>Hola, Mundo!</h1>
</body>
</html>`)
})

app.get('/hola', (req, res) => {
    res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
    <h1>Hola, ${req.query.name} ${req.query.surname}!</h1>
    </body>
    </html>`)
})

app.get('/register', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <form method="post" action="/register">
            <input type="text" name="username">
            <input type="password" name="password">
            <button>Register</button>
        </form>
    </body>
    </html>`)
})

app.post('/register', (req, res) => {
    let raw = ''

    req.on('data', data => raw += data)

    req.on('end', () => {
        const keyValues = raw.split('&')

        const body = {}

        keyValues.forEach(keyValue => {
            const [key, value] = keyValue.split('=')

            body[key] = value
        })

        const { username, password } = body

        user.username = username
        user.password = password

        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body>
            <p>Ok, user correctly registered.</p>
        </body>
        </html>`)
    })
})

app.get('/login', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <form method="post" action="/login">
            <input type="text" name="username">
            <input type="password" name="password">
            <button>Login</button>
        </form>
    </body>
    </html>`)
})

app.post('/login', (req, res) => {
    let raw = ''

    req.on('data', data => raw += data)

    req.on('end', () => {
        const keyValues = raw.split('&')

        const body = {}

        keyValues.forEach(keyValue => {
            const [key, value] = keyValue.split('=')

            body[key] = value
        })

        const { username, password } = body

        if (username === user.username && password === user.password) res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body>
            <p>Ok, user correctly logged in.</p>
        </body>
        </html>`)
        else res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body>
            <p>Wrong credentials.</p>
        </body>
        </html>`)
    })
})

app.listen(port)