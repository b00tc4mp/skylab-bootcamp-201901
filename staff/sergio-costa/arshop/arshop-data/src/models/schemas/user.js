const { SchemaTypes: { ObjectId }, Schema } = require('mongoose')

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

    products: [{
        type: ObjectId,
        ref: 'Product'
    }],

    favoriteProducts: [{
        type: ObjectId,
        ref: 'Product'
    }],

    imageUrl: {
        type: String
    },

    chats: [{
        type: ObjectId,
        ref: 'Chat'
    }]

})

module.exports = User