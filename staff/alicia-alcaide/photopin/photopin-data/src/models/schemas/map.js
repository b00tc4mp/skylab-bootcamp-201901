const { Schema } = require('mongoose')

const pmap = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String },
    tags: [{ type: String }],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPublic: { type: Boolean, default: false },
    collections: [{
        title: String,
        pins: [{ type: Schema.Types.ObjectId, ref: 'Pin' }]
    }]
})

module.exports = pmap