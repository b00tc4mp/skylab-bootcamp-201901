const mongoose = require('mongoose')
const user = require('./schemas/user.js')
const item = require('./schemas/item.js')

mongoose.set('useCreateIndex', true);
const User = mongoose.model('User', user)
const Item = mongoose.model('Item', item)

module.exports = { 
    User: User,
    Item: Item
}