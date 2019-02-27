'use strict'

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const router = require('./src/routes/index')
const cors = require('cors')

const { env: { PORT, DB_URL } } = process

mongoose.connect(DB_URL)
    .then(() => {
        const port = PORT || process.argv[2] || 3000

        const app = express()

        app.use(cors())

        app.use('/', router)

        app.listen(port, () => console.log(`server running on port ${port}`))

        process.on('SIGINT', () => {
            mongoose.disconnect()
                .then(() => {
                    console.log('\nserver stopped')

                    process.exit(0)
                })
        })
    })
    .catch(console.error)