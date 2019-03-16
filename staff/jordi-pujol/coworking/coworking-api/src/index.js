require('dotenv').config()

const {mongoose} = require('coworking-data')
const express = require('express')
const tokenHelper = require('./token-helper')
const router = require('./routes')

const { env: { TEST_DB_URL, PORT, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process

mongoose.connect(TEST_DB_URL, {useNewUrlParser: true})
    .then (() => {

        tokenHelper.jwtSecret = JWT_SECRET

        const app = express()

        app.use('/api', router)

        app.listen(port, () => console.log(`server running on port 8000`))

    })
    .catch(console.error)

process.on('SIGINT', () => {
    mongoose.disconnect()
        .then(() => {
            console.log('\nserver stopped')
            
            process.exit(0)
        })
})