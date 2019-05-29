const { Schema, Schema: { Types: { ObjectId }} }  = require ('mongoose')


const pmap = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String },
    tags: [{ type: String}],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lastAuthorAccess: { type: Date, default: Date.now, required: true  },
    isPublic: { type: Boolean, default:false, required: true  },
    collections: [{
        title: String,
        pin: [{ type: ObjectId, ref: 'Pin' }]
    }]    
})

module.exports = pmap