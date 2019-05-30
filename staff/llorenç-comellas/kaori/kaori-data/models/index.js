const {model} = require('mongoose')
const { UserSchema, ProductSchema, CartItemSchema, OrderSchema}  = require('./schemas')

module.exports = {
    User: model('User', UserSchema),
    Product: model('Product', ProductSchema),
    CartItem: model('CartItem', CartItemSchema),
    Order: model('Order', OrderSchema)
}
