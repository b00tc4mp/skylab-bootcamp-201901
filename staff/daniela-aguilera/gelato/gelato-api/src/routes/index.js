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
    const { id, superUser } = await logic.authenticateUser(email, password)
    const token = jwt.sign({ sub: id, adm: superUser }, JWT_SECRET, { expiresIn: '10h' })

    return res.json({ token, isAdmin: superUser })
  }, res)
})

router.get('/user', auth, (req, res) => {
  handleErrors(async () => {
    const { isAdmin, userId } = req
    const user = await logic.retrieveUserBy(userId)
    user.isAdmin = isAdmin

    return res.json(user)
  }, res)
})

router.put('/user/profile', auth, jsonParser, (req, res) => {
  const { userId, body } = req
  handleErrors(async () => {
    await logic.updateUser(userId, body)

    return res.status(201).json({ message: 'Ok, user updated.' })
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
  const { params, userId, isAdmin } = req
  const { id } = params

  handleErrors(async () => {
    await logic.removeOneOrder({ orderId: id, userId, isAdmin })
    return res.json()
  }, res)
})

router.get('/store/orders', auth, jsonParser, (req, res) => {
  handleErrors(async () => {
    const { isAdmin } = req
    const orders = await logic.retrieveAllOrders({ isAdmin })
    return res.json(orders)
  }, res)
})

module.exports = router
