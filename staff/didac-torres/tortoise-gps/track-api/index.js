require('dotenv').config()

const express = require('express')
const package = require('./package.json')
const routes = require('./routes')
const cors = require('cors')
const { mongoose } = require('track-data')

const { env: { PORT, MONGO_URL_USER_DATA_TEST: URL }, argv: [, , port = PORT || 8080], } = process;

(async () => {
    try {
        await mongoose.connect(URL, { 
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('Connection to mongo database')

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