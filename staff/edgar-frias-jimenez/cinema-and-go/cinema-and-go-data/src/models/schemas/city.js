import { Schema, ObjectId } from 'mongoose'

const city = new Schema({
    name: { type: String, required: true },
    link: { type: String, required: true },
    cinemas: [{ type: ObjectId, ref: 'cinema'}]
})

export default city
