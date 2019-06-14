const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

const Invitation = new Schema({
    status: {
        type: String,
        enum: ['sent', 'created'],
        default: 'created'
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
    }
})

module.exports = Invitation