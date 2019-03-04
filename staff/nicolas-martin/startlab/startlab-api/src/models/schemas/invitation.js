const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const Invitation = new Schema({
    status: {
        type: String,
        enum: ['sent', 'active', 'created'],
        required: true
    },

    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Invitation