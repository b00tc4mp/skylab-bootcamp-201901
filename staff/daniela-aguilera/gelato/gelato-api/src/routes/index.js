const express = require('express')
// const app = express()
const router = express.Router()
const jwt = require('jsonwebtoken')
const handleErrors = require('./handle-errors')
const logic = require('../logic')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const auth = require('./auth')

const { env: { JWT_SECRET } } = process

router.post('/user', jsonParser, (req, res) => {
  const { body: { name, surname, email, password } } = req
  handleErrors(async () => {
    await logic.registerUser(name, surname, email, password)

    return res.status(201).json({ message: 'User registered.' })
  }, res)
})

router.post('/user/auth', jsonParser, (req, res) => {
  const { body: { email, password } } = req

  handleErrors(async () => {
    const sub = await logic.authenticateUser(email, password)
    const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '10h' })

    return res.json({ token })
  }, res)
})

router.get('/user', auth, (req, res) => {
  handleErrors(async () => {
    const { userId } = req
    const user = await logic.retrieveUserBy(userId)
    return res.json(user)
  }, res)
})

router.delete('/user', auth, (req, res) => {
  handleErrors(async () => {
    const { userId } = req
    await logic.removeUser(userId)
    return res.status(200).json({ message: 'User deleted.' })
  }, res)
})

router.post('/user/order', auth, jsonParser, (req, res) => {
  const { body, userId } = req
  const { flavors, size, type, totalPrice } = body
  debugger
  handleErrors(async () => {
    await logic.addOrder({ client: userId, flavors, size, type, totalPrice })
    return res.status(200).json({ message: 'Your order is on the way.' })
  }, res)
})

router.get('/user/orders', auth, (req, res) => {
  handleErrors(async () => {
    const { userId } = req
    const orders = await logic.retrieveOrdersByUserId(userId)
    return res.json(orders)
  }, res)
})

router.get('/user/order/:id', auth, jsonParser, (req, res) => {
  const { userId } = req
  const { id } = req.params

  handleErrors(async () => {
    const order = await logic.retrieveOneOrderByOrderId({ orderId: id, userId })
    return res.json(order)
  }, res)
})

router.delete('/user/order/:id', auth, (req, res) => {
  const { params, userId } = req
  const { id } = params

  handleErrors(async () => {
    await logic.removeOneOrder({ orderId: id, userId })
    return res.json()
  }, res)
})

router.get('/store/orders', jsonParser, (req, res) => {
  handleErrors(async () => {
    const orders = await logic.retrieveAllOrders()
    return res.json(orders)
  }, res)
})

module.exports = router
