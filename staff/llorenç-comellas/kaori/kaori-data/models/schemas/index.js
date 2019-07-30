const { Schema } = require('mongoose')


const ProductSchema = new Schema({
    title: { type: String, required: [true, 'title required'] },
    image: { type: String, required: [true, 'image required'] },
    description: { type: String, required: [true, 'description required'] },
    price: { type: Number, required: [true, 'price required'] },
    category: {
        type: String, required: [true, 'category required'],
        enum: {
            values: ['ENTRANTES', 'PACKS', 'MAKIS', 'FISH_ROLLS']
        }
    }
})

const CartItemSchema = new Schema ({
    productId: {type: Schema.Types.ObjectId, ref: 'Product', required: [true, 'product id required']},
    quantity: {type: Number, required: [true, 'quantity required']}
})

const UserSchema = new Schema({
    name: { type: String, required: [true, 'name is required'] },
    surname: { type: String, required: [true, 'surname is required'] },
    phone: { type: String, required: [true, 'phone is required'] },
    email: { type: String, required: [true, 'email is required'], unique: true },
    password: { type: String, required: [true, 'password is required'] },
    cart: [CartItemSchema]
})

const OrderSchema = new Schema({
    products:[{ type: Object}],
    date: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = {
    UserSchema,
    ProductSchema,
    CartItemSchema,
    OrderSchema
}