const { Schema } = require('mongoose')

const Order = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, required: true },
  size: { type: String, required: true },
  flavors: { type: Array, required: true }
})

module.exports = Order
