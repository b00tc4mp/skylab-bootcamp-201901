const mongoose = require('mongoose')
const express = require('express')

const { env: { MONGO_URL, PORT = 8080 }} = process

(async () => {
    try {
        mongoose.connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true })
        
        const app = express()
        app.use(express.json())
        app.use('/api/medical-fields', require('./routes/medical-fields'))
        app.use('/api/eventtype', require('./routes/eventType'))
        app.use('/api/organization', require('./routes/organization'))
        app.use('/api/users', require('./routes/users'))
        app.use('/api/events', require('./routes/events'))
        app.use('/api/purchase', require('./routes/purchase'))

        console.log('Connected to the project database...')

        app.listen(PORT, () => console.log(`listening to the port ${PORT}...`))
    } catch (error) {
        console.log('Cannot connecte to the db...')
    }
})()
