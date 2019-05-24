import { Schema } from 'mongoose'
import { isEmail } from 'validator'


const note = new Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

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
    notes: [note]
})

user.methods.wtfholic = function () {
    return this.age > 17 ? 'alcoholic' : 'milkaholic'
}

export default { user, note }