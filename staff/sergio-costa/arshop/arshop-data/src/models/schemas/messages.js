const { SchemaTypes: { ObjectId }, Schema } = require('mongoose')

const Message = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User'
    },

    text: {
        type: String,
        required: true
    },
})

module.exports = Message