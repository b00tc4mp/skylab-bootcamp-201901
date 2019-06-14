const { Schema } = require('mongoose')

module.exports = new Schema({
    date: { type: Date, default: Date.now },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ubication: { type: String }
})