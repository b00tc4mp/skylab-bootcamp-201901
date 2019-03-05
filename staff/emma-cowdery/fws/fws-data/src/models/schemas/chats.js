const { Schema } = require('mongoose')

const Chats = new Schema({
    userIds: [{
        type: String
    }],

    chatName: {
        type: String,
        required: true
    },

    eventId: {
        type: String,
        required: true,
        unique: true
    },

    chatImg: {
        type: String
    },

    messages: {
        message: {
            userId: {
                type: String
            },

            text: {
                type: String
            },

            date: {
                type: Date
            }
        }
    }
})

module.exports = Chats