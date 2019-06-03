const { Schema } = require('mongoose')
// import { isEmail } from 'validator'

const product = new Schema({
    description: {
        type: String,
        required: true,
        enum: ['REVISION', 'REPAIR', 'RESTORATION', 'MAINTENANCE', 'SPARES', 'REFUND', 'DISCOUNT' ],
        default: 'REVISION',
    },
    price: { type: Number, required: true }
})

const note = new Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const user = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate: isEmail
    },
    password: { type: String, required: true },
    category: { type: String, required: true, enum: ['MASTER', 'TECHNICIAN', 'ASSISTANT']}, // 'Admin'
})

const customer = new Schema({
    name: { type: String, required: true },
    surname: { type: String },
    phone: { type: String },
    address: { type: String },
    nid: { type: String, required: true },
    email: { type: String },
    notes: [note]
})

const electronicModule = new Schema({
    received: { type: Date, default: Date.now },
    reviewed: { type: Date },
    budgeted: { type: Date },
    approved: { type: Date },
    repaired: { type: Date },
    delivered: { type: Date },
    toCollect: { type: Date },
    collected: { type: Date },
    orderNumber: { type: String, required: true },
    brand: { type: String },
    model: { type: String },
    cylinders: { type: String },
    transmission: { type: String },
    year: { type: String },
    engine: { type: String },
    device: { type: String, required: true },
    serial: { type: String },
    fail: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    budget: [product],
    status: {
        type: String,
        required: true,
        enum: ['RECEIVED', 'REVIEWED', 'BUDGETED', 'APPROVED', 'REPAIRED', 'TO-COLLECT', 'DELIVERED', 'COLLECTED'],
        default: 'RECEIVED',
    },
    notes: [note]

})

module.exports = { user, customer, electronicModule, product, note }