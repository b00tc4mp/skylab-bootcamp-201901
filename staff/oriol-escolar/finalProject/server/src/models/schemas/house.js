const { Schema, ObjectId } = require('mongoose')

const House = new Schema({


    owner: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },

    images: [{

        type: String,
        required: true
    }],


    description: {
        type: String,
        required: true
    },

    info: {

        petsAllowed: {
            
            type: String,
            required: true

        },

        smokersAllowed: {
            
            type: String,
            required: true

        },


        numberOfBeds: {
            
            type: Number,
            required: true
            
        }



    }

   
})

module.exports = House