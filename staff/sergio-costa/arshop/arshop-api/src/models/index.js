const mongoose = require('mongoose')
const { User, Product } = require('./schemas')

module.exports = {
    User: mongoose.model('User', User),
    Product: mongoose.model('Product', Product)
}