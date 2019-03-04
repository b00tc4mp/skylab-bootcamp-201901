require('dotenv').config()
require('isomorphic-fetch')

const { mongoose } = require('data')
const express = require('express')
const package = require('../package.json')
const tokenHelper = require('../src/token-helper')
const router = require('./routes')

const { env: { DB_URL, PORT, SECRET }, argv: [, , port = PORT || 8080] } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        tokenHelper.jwtSecret = SECRET

        const app = express()

        app.use('/api', router)

        app.listen(port, () => console.log(`${package.name} ${package.version} running on port ${port}`))
    })
    .catch(console.error)


process.on('SIGINT', () => {
    mongoose.disconnect()
        .then(() => {
            console.log(`\n ${package.name} stopped`)

            process.exit(0)
        })
})