const { Schema } = require('mongoose')
const Work = require('./work')
const Education = require('./education')
const Language = require('./language')
const Technology = require('./technology')

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

    telephone: { type: Number },

    git: { type: String },

    linkedin: { type: String },

    slack: { type: String },

    workExperience: [Work],

    technology: [Technology],

    language: [Language],

    education: [Education]
})

module.exports = User