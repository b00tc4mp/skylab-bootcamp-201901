const mongoose = require('mongoose')
const user = require('./schemas/user.js')
const product = require('./schemas/product.js')

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const { model } = mongoose

const User = model('User', user)
const Product = model('Product', product)

module.exports = { 
    User,
    Product
}