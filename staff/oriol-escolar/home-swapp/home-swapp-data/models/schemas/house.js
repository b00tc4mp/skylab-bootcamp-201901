const { Schema, ObjectId } = require('mongoose')

const House = new Schema({


    
    ownerId: {
        type: ObjectId,
        required: true,
        ref: 'User'
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
            
            type: String,
            required: true
            
        }



    },

    adress: 
    {

        
        country:{
            type: String,
            required: true

        },
        city:{
            type: String,
            required: true

        },

        street:{
            type: String,
            required: true

        },

        number:{
            type: String,
            required: true

        },

    }


   
})

module.exports = House