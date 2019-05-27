const { model } = require('mongoose')
const { user, item, bid } = require('./schemas')

const Users = model('Users', user)
const Items = model('Items', item) 
const Bids = model('Bids', bid) 

module.exports = {
    Users,
    Items,
    Bids
}
