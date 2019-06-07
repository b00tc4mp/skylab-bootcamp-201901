require('dotenv').config()
const { mongoose } = require('medyes-data')
const express = require('express')

const { env: { MONGO_URL, PORT = 8080 } } = process;

(async () => {
    try {

        await mongoose.connect(MONGO_URL, { useNewUrlParser: true })

        console.log('Connected to the project database')

        const app = express()

        app.use(express.json())

        app.use('/api/medical-field', require('./routes/medical-fields'))

        app.use('/api/eventtype', require('./routes/event-types'))

        app.use('/api/organization', require('./routes/organizations'))

        app.use('/api/user', require('./routes/users'))

        app.use('/api/event', require('./routes/events'))

        app.use('/api/purchase', require('./routes/purchases'))

        app.listen(PORT, () => console.log(`listening to the port ${PORT}...`))
    } catch (error) {
        console.log('Cannot connect to the db')
    }
})()
