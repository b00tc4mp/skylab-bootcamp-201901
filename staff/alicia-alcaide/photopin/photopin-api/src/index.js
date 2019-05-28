require('dotenv').config()

const express = require('express')
const packageJSON = require('../package.json')
const cors = require('cors')
const { mongoose } = require('photopin-data')
const routes = require('./routes')

const { env: { PORT, MONGODB_URL: url }, argv: [, , port = PORT || 8080], } = process;


(async () => {
    try {
        //await mongoose.connect(url, { useNewUrlParser: true })
        await mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })

        console.log('Connection to mongodb ok')

        const app = express()
    
        app.use(cors())
        app.use('/api', routes)

        app.use(function (req, res, next) {
            res.status(404).json({ error: 'Not found.' })
        })

        app.listen(port, () => console.log(`${packageJSON.name} ${packageJSON.version} up on port ${port}`))

    } catch (error) {
        console.error(error)
    }
})()

/* 
process.on('SIGINT', () => {
    mongoose.disconnect()
        .then(() => {
            console.log('\nsail-away stopped running')

            process.exit(0)
        })
}) */