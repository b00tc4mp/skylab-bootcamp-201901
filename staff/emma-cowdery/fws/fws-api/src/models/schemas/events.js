const { Schema } = require('mongoose')

const Events = new Schema({
    restaurantId: {
        type: String
    },

    psrticipants: [{
        type: String,
        unique: true
    }]
})

module.exports = Events
