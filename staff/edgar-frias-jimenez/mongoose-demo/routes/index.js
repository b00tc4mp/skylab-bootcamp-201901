'use strict'

const express = require('express')
const productControllers = require('../controllers')
const userControllers = require('../controllers/user')
const api = express.Router()
const auth = require('../middlewares/auth')


api.get('/product', productControllers.getProducts)
api.get('/product/:productId', productControllers.getProduct)
api.post('/product', auth, productControllers.saveProduct)
api.put('/product/:productId', auth, productControllers.updateProduct)
api.delete('/product/:productId', auth, productControllers.deleteProduct)

api.post('/signup', userControllers.signUp)
api.post('/signin', userControllers.signIn)

api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Access granted' })
})

module.exports = api
