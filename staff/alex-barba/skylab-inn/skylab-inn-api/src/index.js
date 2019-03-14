'use strict'

require('dotenv').config()

const { mongoose } = require('skylab-inn-data')
const express = require('express')
const tokenHelper = require('./token-helper')
const router = require('./routes')

const { env: { DB_URL, PORT, JWT_SECRET }, argv: [, , port = PORT || 8000] } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        tokenHelper.jwtSecret = JWT_SECRET

        const app = express()

        app.use('/api', router)

        app.listen(port, () => console.log(`running in port ${port}`))
    })
    .catch(console.error)
    
process.on('SIGINT', () => {
    mongoose.disconnect()
        .then(() => process.exit(0))
})