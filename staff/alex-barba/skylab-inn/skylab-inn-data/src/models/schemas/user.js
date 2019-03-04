const { Schema } = require('mongoose')
const Work = require('./work')
const Education = require('./education')

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

    git: { type: String, default: '' },

    linkedin: { type: String, default: '' },

    slack: { type: String, default: '' },

    workExperience: [{Work, default: ''}],

    techs: [String],

    languages: [String],

    education: [{Education, default: ''}]
})

module.exports = User