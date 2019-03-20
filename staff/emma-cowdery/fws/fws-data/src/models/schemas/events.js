const { Schema } = require('mongoose')

const Events = new Schema({
    restaurantId: {
        type: String
    },

    participants: [{
        type: String,
        unique: true
    }],

    eventTime: {
        type: String,
        required: true
    },

    eventDate: {
        type: Date,
        required: true
    },

    reservationName: {
        type: String,
        required: true
    },

    restaurantCategory: {
        type: String,
        required: true
    },

    eventLocation: [{
        type: Number,
        required: true
    }],

    priceLevel: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    restaurantName: {
        type: String,
        required: true
    },

    chatId: {
        type: String
    }
})

module.exports = Events
