const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')


const User = new Schema({

    name: {
        type: String,
        require: true,
        minlength: [2, 'the name of the user is very short'],
        maxlength: [50, 'the name of the user is very long']
    },

    username: {
        type: String,
        require: true,
        minlength: [2, 'the username of the user is very short'],
        maxlength: [50, 'the username of the user is very long']
    },

    email: {
        type: String,
        require: true,
        unique: true,
        minlength: [2, 'the email of the user is very short'],
        maxlength: [50, 'the email of the user is very long']
    },

    password: {
        type: String,
        require: true
    },

    favartists: [{
       type: ObjectId,
       ref: 'Artist'
    }], 

    congresses: [{
        type: ObjectId,
        ref: 'Congress'
    }]
})

module.exports = User