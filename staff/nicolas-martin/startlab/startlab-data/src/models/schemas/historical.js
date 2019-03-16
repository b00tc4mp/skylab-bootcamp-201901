const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const Historical = new Schema ({
        exercise: {
            type: ObjectId,
            required: true,
            ref: 'Exercise'
        },

        answer: {
            type: String,
            default: ''
        },

        completed: {
            type: Boolean,
            default: false
        }
})

module.exports = Historical