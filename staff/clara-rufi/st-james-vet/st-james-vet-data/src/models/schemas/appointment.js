const { Schema } = require('mongoose')


const Appointment = new Schema({


    owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],

    pet: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],

    year: {
        type: String,
        required: true
    },

    month: {
        type: String,
        required: true
    },
    
    day: {
        type: String,
        required: true
    },

    hour: {
        type: String,
        requiered: true
    }
})

module.exports = Appointment