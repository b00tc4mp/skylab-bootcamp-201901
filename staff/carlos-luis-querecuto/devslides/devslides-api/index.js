const dotenv = require('dotenv')
const express = require('express')
const package = require('./package.json')
const routes = require('./routes')
/* const cors = require('./routes/cors') */
const cors = require('cors')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()
const { mongoose } = require('devslides-data')


dotenv.config()
const { env: { PORT, MONGO_URL: url }, argv: [, , port = PORT || 8080], } = process;

mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });

const app = express()

app.use(cors())

app.use(jsonParser)

app.use('/api', routes)

/* app.use(function (req, res, next) {
    res.status(404).json({ error: 'Not found.' })
}) */

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))