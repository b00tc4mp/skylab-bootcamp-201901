const mongoose = require('mongoose')

const { user, customer, electronicModule, product, note } = require('./schemas')

const model = mongoose.model.bind(mongoose)

module.exports = { 
    User: model('User', user),
    Customer: model('Customer', customer),
    ElectronicModule: model('ElectronicModule', electronicModule),
    Product: model('Product', product),
    Note: model('Note', note)
}