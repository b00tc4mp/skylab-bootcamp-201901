const { SchemaTypes: { ObjectId }, Schema } = require('mongoose')
const Messages = require('./messages')

const Chat = new Schema({
    userIds: [{
        type: ObjectId,
        ref: 'User'
    }],

    chatName: {
        type: String,
        required: true
    },

    chatImg: {
        type: String
    },

    messages: [Messages]
})

module.exports = Chat