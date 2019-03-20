const { Schema } = require('mongoose')
const { Types: { ObjectId }} = Schema

const User = new Schema({
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
                return /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(email);
            },
            message: props => `${props.value} is not a valid email`
        }
    },

    password: {
        type: String,
        required: true
    },

    isAdmin:{
        type: Boolean,
        default: false,
        required: false
    },

    workspace:{
        type: ObjectId,
        required: false,
        ref: 'Workspace'
    },

    time: {
        type: Number,
        default: 0,
        required: false
    },

    age:{
        type: Number,
        required: false
    },

    companyName: {
        type: String,
        required: false
    },

    interests:{
        type: String,
        required: false
    },

    userName: {
        type: String,
        required: true,
        unique: true,
    },

    image: {
        type: String,
        required: false
    },

    backgroundImage: {
        type: String,
        required: false
    }
})

module.exports = User