const mongoose = require('mongoose')
const order = require('./schemas/orders')
const user = require('./schemas/user.js')
const product = require('./schemas/product.js')

const model = mongoose.model.bind(mongoose) // ??? WTF

module.exports = {

    User: model('User', user),
    Product: model('product', product)
    // Order: model('Order', order)
}

