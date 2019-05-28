'use strict'

const User = require('./models/user')
const Order = require('./models/order')
const mongoose = require('mongoose')

module.exports = {
  mongoose,
  User: mongoose.model('User', User),
  Order: mongoose.model('Order', Order)
}
