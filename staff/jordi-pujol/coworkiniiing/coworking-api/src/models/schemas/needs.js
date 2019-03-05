const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema
const Comment = require('../schemas/comments')

const Need = new Schema ({

    title:{
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    comments: [Comment]
})

module.exports = Need