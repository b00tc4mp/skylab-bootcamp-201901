const { SchemaTypes: { ObjectId }, Schema } = require('mongoose')

const Model = new Schema({

    porduct: {
        type: ObjectId,
        ref: 'Product'
    },

    modelUrl: {
        type: String
    },
})

module.exports = Model