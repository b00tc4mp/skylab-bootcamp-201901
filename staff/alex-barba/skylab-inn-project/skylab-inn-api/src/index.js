'use strict'

require('dotenv').config()

const { mongoose } = require('skylab-inn-data')
const express = require('express')
const tokenHelper = require('./token-helper')
const logic = require('./logic')
const router = require('./routes')


const { env: { MONGODB_URI: DB_URL, PORT, JWT_SECRET, APP_URL, API_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET }, argv: [, , port = PORT || 8000] } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        tokenHelper.jwtSecret = JWT_SECRET
        logic.appUrl = APP_URL
        logic.apiUrl = API_URL
        logic.cloud_name = CLOUDINARY_CLOUD_NAME
        logic.api_key = CLOUDINARY_API_KEY
        logic.api_secret = CLOUDINARY_API_SECRET

        const app = express()

        app.use('/api', router)

        app.listen(port, () => console.log(`running in port ${port}`))
    })
    .catch(console.error)
    
process.on('SIGINT', () => {
    mongoose.disconnect()
        .then(() => process.exit(0))
})