const { Schema } = require('mongoose')

const Users = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: email => {
                return /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(email)
            },
            message: props => `${props.value} is not a valid email`
        }
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String
    },

    favouriteRestaurants: [{
        type: String,
        unique: true
    }],

    chatRooms: [{
        type: String,
        unique: true
    }],

    events: [{
        type: String,
        unique: true
    }],

    instagram: {
        type: String
    },

    twitter: {
        type: String
    },

    facebook: {
        type: String
    },

    about: {
        interests: {
            type: String
        }
    },

    howTo: {
        type: Boolean,
        required: true
    }
})

module.exports = Users