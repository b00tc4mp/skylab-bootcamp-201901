const { Schema } = require('mongoose')


const Appointment = new Schema({

    owner: { type: Schema.Types.ObjectId, ref: 'User' },

    pet: { type: Schema.Types.ObjectId, ref: 'Pet' },
    
    date: { 
        unique: true,
        type: Date,
    }
   
})

module.exports = Appointment