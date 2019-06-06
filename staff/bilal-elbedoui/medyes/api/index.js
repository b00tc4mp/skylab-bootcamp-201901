const config = require('config')
const mongoose = require('mongoose')
const express = require('express');
const app = express();


// If the environment variable is not defined it will not work

if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1)
}

(async () => {
    try {
        mongoose.connect('mongodb://localhost/project-test', { useNewUrlParser: true, useCreateIndex: true })

        console.log('Connected to the project database...')
    } catch (error) {
        console.log('Cannot connecte to the db...')
    }
})()

app.use(express.json());
app.use('/api/medical-fields', require('./routes/medical-fields'))
app.use('/api/eventtype', require('./routes/eventType'))
app.use('/api/organization', require('./routes/organization'))
app.use('/api/users', require('./routes/users'))
app.use('/api/events', require('./routes/events'))
app.use('/api/purchase', require('./routes/purchase'))




const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening to the port ${port}...`))