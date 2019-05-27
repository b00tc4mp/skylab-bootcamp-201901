const mongoose = require('mongoose')
const schemas = require('./schemas')

const { UserSchema, ProductSchema } = schemas

const User = mongoose.model('User', UserSchema)
const Product = mongoose.model('Product', ProductSchema)

module.exports = {
    User,
    Product
}
