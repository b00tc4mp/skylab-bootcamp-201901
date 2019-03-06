const mongoose = require("mongoose");
const {
    Schema,
    SchemaTypes:{ObjectId}
} = mongoose

const User  = require('./user')
const Events = new Schema ({

    // author: {
    //     type: ObjectId,
    //     required: true,
    //     ref: 'User'
    // },

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
        type: ObjectId,
        require: true
    },

    members:[{
        type: ObjectId,
        ref: 'Events'
    }],
    
})

module.exports = Events
