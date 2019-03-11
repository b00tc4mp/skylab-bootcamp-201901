const mongoose = require("mongoose");
const {
    Schema,
    SchemaTypes:{ObjectId}
} = mongoose

const User  = require('./user')
const Events = require('./events')

const Comments = new Schema ({

    commentAuthor:{
        type: ObjectId,
        ref: 'User'
    },

    commentEvent:{
        type: ObjectId,
        ref: 'Events'
    },

    text:{
        type: String,
        require: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    }
    
})

module.exports = Comments
