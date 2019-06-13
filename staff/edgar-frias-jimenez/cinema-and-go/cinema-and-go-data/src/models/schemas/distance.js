import { Schema, ObjectId } from 'mongoose'

const distance = new Schema({
    distance: Number,
    duration: Number,
    cinema: { type: ObjectId, ref: 'Cinema' },
    user : { type: ObjectId, ref: 'User' }
})

export default distance
