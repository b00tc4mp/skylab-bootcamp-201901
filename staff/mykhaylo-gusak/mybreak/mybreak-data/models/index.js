const mongoose = require('mongoose')
const order = require('./schemas/orders.js')
const user = require('./schemas/user.js')
const product = require('./schemas/product.js')

const model = mongoose.model.bind(mongoose) // ??? WTF

module.exports = {

    User: model('User', user),
    Product: model('Product', product),
    Order: model('Order', order)
}