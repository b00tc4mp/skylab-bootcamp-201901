const { SchemaTypes: { ObjectId }, Schema } = require('mongoose')
const Message = require('./message')

const Chat = new Schema({

    users: [{
        type: ObjectId,
        ref: 'User',
        require: true
    }],

    messages: [Message]

})

module.exports = Chat