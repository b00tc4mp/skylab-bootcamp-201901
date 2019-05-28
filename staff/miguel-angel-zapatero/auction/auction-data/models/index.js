const { model } = require('mongoose')
const { user, item, bid } = require('./schemas')

const User = model('User', user)
const Item = model('Item', item) 
const Bid = model('Bid', bid) 

module.exports = {
    User,
    Item,
    Bid
}
