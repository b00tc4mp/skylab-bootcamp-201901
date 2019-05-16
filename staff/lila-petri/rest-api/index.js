require('dotenv').config()

const express = require('express')
const package = require('./package.json')
const routes = require('./routes')

const { env: { PORT }, argv: [, , port = PORT || 8080], } = process

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')

    next()
})

app.use('/api', routes)

app.use(function (req, res, next) {
    res.status(404).json({ error: 'Not found.'})
})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))