const {model} = require('mongoose')
const user = require('./schemas/user.js')
const item = require('./schemas/item.js')

// mongoose.set('useCreateIndex', true);

const User = model('User', user)

module.exports = { 
    User ,
    Item: model('Item', item)
}