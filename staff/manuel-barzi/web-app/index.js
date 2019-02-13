const express = require('express')

const { argv: [, , port = 8080] } = process

const app = express()

app.use(express.static('public'))

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
    </section>
</body>
</html>`)
})

app.listen(port, () => console.log(`server running on port ${port}`))