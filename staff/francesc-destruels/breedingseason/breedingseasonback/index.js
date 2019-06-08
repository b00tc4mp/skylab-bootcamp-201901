require('dotenv').config()

const express = require('express')
const package = require('./package.json')
const routes = require('./routes')
const cors = require('cors')
const { mongoose } = require("breedingseason-data")

const { env: { PORT, MONGO_URL: url }, argv: [, , port = PORT || 7000] } = process;

(async () => {
    client = await mongoose.connect('mongodb://localhost/breeding-user-api-test', { useNewUrlParser: true }) // esperamos que se levabte mongo testing!!!

    const app = express()

    app.use(cors())

    app.use('/api', routes)

    app.use(function (req, res, next) {
        res.status(404).json({ error: 'Not found.' })
    })

    app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))

})()