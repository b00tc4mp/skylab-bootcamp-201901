const mongoose = require('mongoose')

const { user, customer, electronicControlModule, product, note } = require('./schemas')

const model = mongoose.model.bind(mongoose)

module.exports = { 
    User: model('User', user),
    Customer: model('Customer', customer),
    ElectronicControlModule: model('ElectronicControlModule', electronicControlModule),
    Product: model('Product', product),
    Note: model('Note', note)
}