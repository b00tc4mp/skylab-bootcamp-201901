const { model } = require('mongoose')
const { users, items, bids, auctions, categories } = require('./schemas')

const Users = model('Users', users)
const Items = model('Items', items) 
const Auctions = model('Auctions', auctions)
const Bids = model('Bids', bids) 
const Categories = model('Categories', categories)

module.exports = {
    Users,
    Items,
    Auctions,
    Categories,
    Bids,
}
