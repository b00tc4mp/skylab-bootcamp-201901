const { Schema } = require('mongoose')
// const { isEmail } = require('validator')

module.exports = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
    card: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})