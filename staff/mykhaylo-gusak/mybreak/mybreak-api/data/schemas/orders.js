const { Schema } = require('mongoose')

const order = new Schema({
    date: { type: Date, default: Date.now },
    products: [],
    code: []
})

module.exports = { order }
