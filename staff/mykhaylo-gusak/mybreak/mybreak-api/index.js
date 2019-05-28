const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logic = require('./logic')
var jwt = require('jsonwebtoken');

const secret = 'hola';


(async () => {
    try {
        await mongoose.connect('mongodb://localhost/mybreak-api', { useNewUrlParser: true })
        console.log('connected to database MongoDB!')

    } catch (error) {
        console.error(error)
    }

    app.use(bodyParser.json())

    app.post('/register', (req, res) => {
        const { body: { name, surname, email, password } } = req
        return (async () => {
            try {
                await logic.registerUser(name, surname, email, password)
                res.status(200).json()
            } catch (err) {
                res.status(400).json({ message: err.message })
            }
        })()
    });

    app.post('/login', (req, res) => {
        const { body: { email, password } } = req
        return (async () => {
            try {
                const id = await logic.authenticateUser(email, password)
                const token = jwt.sign( id , secret, { expiresIn: '47m' })
                debugger
                res.status(200).json({ token  })
            } catch (err) {

                res.status(400).json({ message: err.message })
            }
        })()
    });

    app.get('/product/drink', (req, res) => {

        return (async () => {
            try {
                await logic.retrieveProduct('drink')
            } catch (err) {
                res.status(400).json({ message: err.message })
            }
        })()
    })

    app.use(function (req, res, next) {
        res.status(404).json({ error: 'Not found.' })
    })

    app.listen(3030, function () {
        console.log('Example app listening on port 3030!');
    });

    // await mongoose.disconnect()
})()









