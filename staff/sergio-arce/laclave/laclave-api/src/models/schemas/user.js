
const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

const User = new Schema({

    name: {
        type: String,
        required: true,
        minlength: [2, 'the name of the user is very short'],
        maxlength: [50, 'the name of the user is very long']
    },
    
    username: {
        type: String,
        required: true,
        minlength: [2, 'the username of the user is very short'],
        maxlength: [50, 'the username of the user is very long']
    },

    email: {
        type: String,
        required: true,
        minlength: [2, 'the email of the user is very short'],
        maxlength: [50, 'the email of the user is very long'],
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: [6, 'the password of the user is very short']
    },

    favorites: [{
        type: ObjectId,
        ref: 'Artist'
    }],

    createdArtists: [{
        type: ObjectId,
        ref: 'Artist'
    }],

    createdCongresses: [{
        type: ObjectId,
        ref: 'Congress'
    }]

})

module.exports = User