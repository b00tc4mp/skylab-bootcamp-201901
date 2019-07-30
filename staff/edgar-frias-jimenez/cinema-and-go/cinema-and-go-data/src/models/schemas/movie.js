import { Schema } from 'mongoose'

const movie = new Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    info: [String],
    cast: String
})

export default movie
