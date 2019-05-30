import { Schema } from 'mongoose'
import { isEmail } from 'validator'

const element = new Schema({
    type: { type: String, required: true },
    style: { type: String, required: true },
    content: { type: Object, required: true },
})

const slide = new Schema({
    date: { type: Date, default: Date.now },
    style: { type: String, required: true },
    elements: [element]
})

const presentation = new Schema({
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    slides: [slide]
})

const user = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: isEmail
    },
    password: { type: String, required: true },
    presentations: [{ type: Schema.Types.ObjectId, ref: 'Presentation'}]
})

/* user.methods.wtfholic = function () {
    return this.age > 17 ? 'alcoholic' : 'milkaholic'
} */

export default { user, presentation , slide , element }