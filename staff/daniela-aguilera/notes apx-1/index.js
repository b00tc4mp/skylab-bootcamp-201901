require('dotenv').config()

const express = require('express')
const package = require('./package.json')
const routes = require('./routes')
const cors = require('./routes/cors')
const { MongoClient } = require('mongodb')
const userData = require('./data/user-data')

const { env: { PORT }, argv: [, , port = PORT || 8080], } = process

const app = express()

app.use(cors)

app.use('/api', routes)

app.use(function (req, res, next) {
    res.status(404).json({ error: 'Not found.' })
})

const url = 'mongodb://localhost/rest-api-test'
let db,users

(async () => {
    await MongoClient
        .connect(url, { useNewUrlParser: true })
        .then(client => {
            db = client.db();
            users = db.collection('users');
            userData.__col__ = users
        })
        .catch(error => Error(error));
})()

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))