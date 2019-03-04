const { Schema } = require('mongoose')
const Work = require('./work')

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

    techs: [{ type: String, default: undefined }],

    languages: [{type: String, default: undefined }],

    education: [{
        college: {
            type: String,
            required: true
        },

        degree: {
            type: String,
            required: true
        },
    }]
})

module.exports = User