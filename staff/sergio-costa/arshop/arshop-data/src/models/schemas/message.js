const { SchemaTypes: { ObjectId }, Schema } = require('mongoose')

const Message = new Schema({

    sender: {
        type: ObjectId,
        ref: 'User'
    },

    text: {
        type: String
    }
})

module.exports = Message