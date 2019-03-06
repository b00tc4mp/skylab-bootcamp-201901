const mongoose = require('mongoose')
const Product = require('./schemas/product')
const User = require('./schemas/user')

module.exports = {
    Product: mongoose.model('Product', Product),
    User: mongoose.model('User', User),
}
