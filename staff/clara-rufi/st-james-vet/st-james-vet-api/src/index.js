require('dotenv').config()

require('isomorphic-fetch')


const {mongoose} = require('../../vet-data')
const express = require('express')
const tokenHelper = require('./token-helper')
const package = require('../package.json')
const router = require('../src/routes')
// const cors = require('./cors')

const { env: { DB_URL, PORT, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process


mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        tokenHelper.jwtSecret = JWT_SECRET

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