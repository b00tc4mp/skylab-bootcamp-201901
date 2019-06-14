const { Schema } = require('mongoose')


const User = new Schema({

    role: {
        type: String,
        default: 'client'
    },

    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    idCard: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    adress: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
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

    passwordConfirmation: {
        type: String,
        required: true
    }
})

module.exports = User