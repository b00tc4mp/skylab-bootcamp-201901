const { Schema } = require('mongoose')
const { Types: { ObjectId }} = Schema

const Workspace = new Schema ({
    name:{
        type: String,
        required: true
    },
    //plural
    user:[{
        type: ObjectId,
        required: true,
        ref: 'User'
    }],
    //plural
    service:[{
        type: ObjectId,
        required: false,
        ref: 'Service'
    }],
    hash:[{
        type: String,
        required: false
    }]
})

module.exports = Workspace