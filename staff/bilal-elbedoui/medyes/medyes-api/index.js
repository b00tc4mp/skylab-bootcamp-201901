require('dotenv').config()
const { mongoose } = require('medyes-data')
const express = require('express')

const { env: { MONGO_URL, PORT = 8080 } } = process;

(async () => {
    try {

        await mongoose.connect(MONGO_URL, { useNewUrlParser: true })

        

        console.log('Connected to the project database...')


    } catch (error) {
        console.log('Cannot connecte to the db...')
    }
})()

debugger
        const app = express()
        debugger
        app.use(express.json())
        debugger
        app.use('/api/medical-field', require('./routes/medical-fields'))
        debugger
        app.use('/api/eventtype', require('./routes/event-type'))

        app.use('/api/organization', require('./routes/organization'))

        app.use('/api/user', require('./routes/user'))

        app.use('/api/event', require('./routes/events'))

        app.use('/api/purchase', require('./routes/purchase'))

        app.listen(PORT, () => console.log(`listening to the port ${PORT}...`))
