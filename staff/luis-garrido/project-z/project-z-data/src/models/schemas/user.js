const { Schema } = require('mongoose')

const User = new Schema({
    
    admin: {
        type: Boolean,
        required: true
    },
    
    username: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: false
    },

    surname: {
        type: String,
        required: false
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: email => {
                return /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(email);
            },
            message: props => `${props.value} is not a valid email`
        }
    },

    password: {
        type: String,
        required: true
    },

    desiredGames: [String],

    playedGames: [String],

    reviewedGames: [String]
})

module.exports = User