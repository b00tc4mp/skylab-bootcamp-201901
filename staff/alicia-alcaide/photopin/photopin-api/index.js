require('dotenv').config()

const express = require('express')
const packageJSON = require('./package.json')
const { mongoose } = require('photopin-data')
const router = require('./src/routes')

// Base de datos correcta:
//const { env: { API_PORT, MONGODB_URL: url }, argv: [, , port = API_PORT || 8080], } = process;

// Base de datos de prueba de front
const { env: { API_PORT, MONGODB_URL_APP_LOGIC_TEST: url }, argv: [, , port = API_PORT || 8080], } = process;


(async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })

        console.log(`connected to ${url} database`)

        const app = express()
    
        app.use('/api', router)

        app.use(function (req, res, next) {
             res.status(404).json({ error: 'Not found.' })
        })

        app.listen(port, () => console.log(`${packageJSON.name} ${packageJSON.version} up on port ${port}`))

    } catch (error) {
        console.error(error)
    }
})()


process.on('SIGINT', async () => {
    await mongoose.disconnect()
    
    console.log('PhotoPin stopped running')
    process.exit(0)

}) 