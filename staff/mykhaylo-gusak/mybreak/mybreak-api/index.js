require('dotenv').config()

const express = require('express')
const app = express()
const { mongoose } = require('mybreak-data')
const bodyParser = require('body-parser')
const logic = require('./logic')
const jwt = require('jsonwebtoken')
const auth = require('./routes/auth.js')
const handleErrors = require('./routes/handle-errors')
const cors = require('cors')

const { env: { JWT_SECRET, MONGO_URL } } = process

    ; (async () => {
        try {
            await mongoose.connect(MONGO_URL, { useNewUrlParser: true })
            console.log(`connected to database MongoDB! Port:${MONGO_URL}`)

        } catch (error) {
            console.error(error)
        }

        app.use(bodyParser.json())

        app.use(cors())

        app.post('/register', (req, res) => {
            const { body: { name, surname, email, password, age } } = req

            return (async () => {
                try {
                    await logic.registerUser(name, surname, email, password, age)
                    res.status(200).json()
                } catch (err) {
                    res.status(400).json({ message: err.message })
                }
            })()
        });

        app.post('/auth', (req, res) => {
            const { body: { email, password } } = req

            return (async () => {
                try {
                    const id = await logic.authenticateUser(email, password)

                    const token = await jwt.sign({ id }, JWT_SECRET, { expiresIn: '47m' })
                    debugger
                    res.status(200).json({ token })
                } catch (err) {
                    res.status(400).json({ message: err.message })
                }
            })()
        });

        app.get('/user', auth, (req, res) => {
            const { userId } = req

            debugger
            return (async () => {
                try {
                    const data = await logic.retrieveUser(userId)
                    debugger
                    res.status(200).json(data)
                } catch (err) {
                    res.status(400).json({ message: err.message })
                }
            })()
        });

        app.get('/update', auth, (req, res) => {
            const { userId, body } = req
            return (async () => {
                try {
                    const data = await logic.updateUser(userId, body)
                    res.status(200).json(data)
                } catch (err) {
                    res.status(400).json({ message: err.message })
                }
            })()
        });

        app.post('/delete', auth, (req, res) => {
            const { userId, body: { password } } = req
            debugger
            return (async () => {
                try {
                    const data = await logic.deleteUser(userId, password)
                    debugger
                    res.status(200).json(data)
                } catch (err) {
                    res.status(400).json({ message: err.message })
                }
            })()
        });

        // CARD

        app.post('/card/update', auth, (req, res) => {
            const { userId, body: { productId } } = req
            debugger
            return (async () => {
                try {
                    const data = await logic.updateCard(userId, productId)
                    res.status(200).json(data)
                } catch (err) {
                    res.status(400).json({ message: err.message })
                }
            })()
        });

        // PRODUCTS

        app.get('/products/:category', auth, (req, res) => {
            const { body: { email, password }, params: { category } } = req

            return (async () => {
                try {
                    const products = await logic.retrieveProducts(category)
                    res.status(200).json(products)
                } catch (err) {
                    res.status(400).json({ message: err.message })
                }
            })()
        })

        // ORDERS

        app.post('/order/add', auth, (req, res) => {
            const { userId, body: { ubication } } = req
            debugger
            return (async () => {
                try {
                    const data = await logic.addOrder(userId, ubication)
                    debugger
                    res.status(200).json(data)
                } catch (err) {
                    res.status(400).json({ message: err.message })
                }
            })()
        });


        app.get('/order/retrieve', auth, (req, res) => {
            const { userId } = req

            return (async () => {
                try {
                    const orders = await logic.retrieveOrderByAuthor(userId)
                    res.status(200).json(orders)
                } catch (err) {
                    res.status(400).json({ message: err.message })
                }
            })()
        })

        app.get('/orders', auth, (req, res) => {
            return (async () => {
                try {
                    const orders = await logic.retrieveOrders()
                    debugger
                    res.status(200).json(orders)
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









