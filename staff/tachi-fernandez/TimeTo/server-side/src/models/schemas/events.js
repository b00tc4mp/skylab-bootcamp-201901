const mongoose = require("mongoose");
const {
    Schema,
    SchemaTypes:{ObjectId}
} = mongoose

const User  = require('./user')
const Events = new Schema ({

    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    title:{
        type: String,
        require: true
    },

    description:{
        type: String,
        require : true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    ubication:{
        type: String,
        require: true
    },

    category: {
        type: String,
        require: true
    }
})

module.exports = Events
