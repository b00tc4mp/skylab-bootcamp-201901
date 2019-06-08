const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

const Congress = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, 'very short congress name']    
    },
    description: {
        type: String,
        minlength: [10, 'the description is very short']
    },

    category: {
        type: String,
        required: true,
        enum: ['salsa', 'bachata', 'mambo']
    },

    address: {
        type: String,
        minlength: [2, 'the address is very short'],
        maxlength: [100, 'the address is very long']
    },

    city: {
        type: String,
    },

    hotel: {
        type: String,
        minlength: [1, 'the name of the hotel is very short'],
        maxlength: [100, 'the name of the hotel is very long']
    }, 

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    artists: [{ 
        type: ObjectId, 
        ref: 'Artist' 
    }],

    tickets: [{
        type: {
            type: String,
            required: true,
            minlength: [5, 'Conferences are not allowed below € 5'],
            maxlength: [100, 'the name of the ticket type is very long']
        },

        price: {
            type: Number,
            required: true,
            min: [5, 'Congresses are not allowed below € 5'],
            max: [10000, 'Congresses higher than € 10,000 are not allowed']
        }     
    }],

    image: {
        type: String,
        required: true,
        default: 'https://scontent.fprg2-1.fna.fbcdn.net/v/t1.0-9/50463155_1982100098564296_1406765015377117184_n.jpg?_nc_cat=105&_nc_ht=scontent.fprg2-1.fna&oh=45d372c223d76935a9c3c59a8fc70545&oe=5D2EB81C'
    },
    
    owner: { 
        type: ObjectId, 
        ref: 'User' 
    }
})

module.exports = Congress