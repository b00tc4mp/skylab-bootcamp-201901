require('dotenv').config()

const express = require('express')
const package = require('./package.json')
const routes = require('./src/routes')
const cors = require('cors')
const { mongoose } = require('cinema-and-go-data')

// PRO:
// const { env: { PORT, MONGO_URL: url }, argv: [, , port = PORT || 8080], } = process;

// PRE
const { env: { PORT, MONGO_URL_TEST: url }, argv: [, , port = PORT || 8080], } = process;

(async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })

        console.log(`connected to ${url} database`)

        const app = express()

        app.use(cors())

        app.use('/api', routes)

        app.use(function (req, res, next) {
            res.status(404).json({ error: 'Not found.' })
        })

        app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))
    } catch (error) {
        console.log(error.name, error.message)
    }
})()


process.on('SIGINT', async () => {
    await mongoose.disconnect()

    console.log('Session terminated.')
    process.exit(0)
})

