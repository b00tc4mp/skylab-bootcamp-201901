const { Schema } = require('mongoose')


const Appointment = new Schema({


    owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],

    pet: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],

    day: {
        type: String,
        required: true
    }
})

module.exports = Appointment