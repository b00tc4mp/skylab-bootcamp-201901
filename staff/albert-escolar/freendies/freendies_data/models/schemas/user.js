const { Schema, ObjectId } = require('mongoose')

const User = new Schema({

    username: {
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

    uploads:[{
        type: ObjectId,
        ref: 'Game' 
    }],


    favoriteGames:[{
        type: ObjectId,
        ref: 'Game' 
    }]
})

module.exports = User;