const { Schema } = require('mongoose')


const Pet = new Schema({


    owner: { type: Schema.Types.ObjectId, ref: 'User' },

    name: {
        type: String,
        required: true
    },

    specie: {
        type: String,
        required: true
    },

    breed: {
        type: String,
        required: true
    },

    color: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    birthdate: {
        type: String,
        required: true
    }, 

    microchip: {
        type: String,
    },

    petlicence: {
        type: String,
    },

    neutered: {
        type: String,
        required: true
    },

    vaccionations: {
        type: String,
    },

    controls: {
        type: String
    },

    details:{
        type: String
    }
})

module.exports = Pet