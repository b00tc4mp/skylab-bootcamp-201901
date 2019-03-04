const { Schema } = require('mongoose')

const Events = new Schema({
    restaurantId: {
        type: String
    },

    // userId: {
    //     type: String
    // },

    participants: [{
        type: String,
        unique: true
    }],

    eventTime: {
        type: String,
        required: true
    },

    eventDate: {
        type: String,
        required: true
    }
})

module.exports = Events
