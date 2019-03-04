const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const User = new Schema ({
    name: {
        type: String,
        required: true,
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
                return /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(email);
            },
            message: props => `${props.value} is not a valid email`
        }
    },

    password: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    historical: [{
        exercise: {
            type: ObjectId,
            answer: String,
            required: true,
            ref: 'Exercise'
        },
        answer: {
            type: String,
            default: ''
        },
        completed: {
            type: Boolean,
            default: false
        },
    }]

})

module.exports = User