const mongoose = require('mongoose')
const Product = require('./model/schemas/product')
const User = require('./model/schemas/user')
const Order = require('./model/schemas/order')


module.exports = {
    mongoose,
    models: {
        Product: mongoose.model('Product', Product),
        User: mongoose.model('User', User),
        Order: mongoose.model('Order', Order),
    }
}

