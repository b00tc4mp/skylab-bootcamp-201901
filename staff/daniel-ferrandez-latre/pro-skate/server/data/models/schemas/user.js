const { Schema } = require('mongoose')
const { isEmail } = require('validator')

const user = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: {
      type: String,
      required: true,
      unique: true,
      validate: isEmail
  },
  password: { type: String, required: true },
  age: Number,
  date: { type: Date, default: Date.now },
  cart: [{type: Schema.Types.ObjectId, ref: 'Item'} ],
  wishlist: [{type: Schema.Types.ObjectId, ref: 'Item'} ],
  historic: [{type: Schema.Types.ObjectId, ref: 'Item'} ]
})

module.exports = user