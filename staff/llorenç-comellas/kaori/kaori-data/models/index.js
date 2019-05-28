const mongoose = require('mongoose')
const schemas = require('./schemas')

const { UserSchema, ProductSchema, CartSchema } = schemas

const User = mongoose.model('User', UserSchema)
const Product = mongoose.model('Product', ProductSchema)
const Cart = mongoose.model('Cart', CartSchema)

module.exports = {
    User,
    Product,
    Cart  
}
