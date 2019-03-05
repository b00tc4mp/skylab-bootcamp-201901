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
    need:[{
        type: ObjectId,
        required: false,
        ref: 'Need'
    }]
})

module.exports = Workspace