const { Schema, SchemaType: { ObjectId } } = require('mongoose')

const Congress = new Schema({

    name: {
        type: String,
        require: true,
        minlength: [2, 'very short congress name'],
        maxlength: [50, 'very long congress name'],
        // lowercase: true,
        // uppercase: true
    },

    description: {
        type: String,
        required: true,
        minlength: [10, 'very short descriptions name'],
        maxlength: [1200, 'very long description name'],
        // lowercase: true,
        // uppercase: true
    },

    category: {
        type: [String],
        required: true,
        enum: ['salsa', 'bachata', 'souk', 'mambo'],
        // lowercase: true,
        // uppercase: true

    },

    address: {
        type: String,
        required: true,
        minlength: [10, 'very short is address name'],
        maxlength: [20, 'very long is address name']

    },

    city: {
        type: String,
        required: true,
        minlength: [2, 'very short is city name'],
        maxlength: [20, 'very long is city name'],
        // enum: ['madrid', 'barcelona', 'valencia', 'tenerife']

    },

    hotel: {
        type: String,
        minlength: [2, 'very short is hotel name'],
        maxlength: [100, 'very long is hotel name']

    },

    price: {
        type: Number,
        rquired: true,
        min: [5, 'Conferences are not allowed below € 5'],
        max: [10000, 'Conferences higher than € 10,000 are not allowed']

    },

    date: {
        type: Date,
        // required: true
    },

    artists: {
        type: ObjectId,
        ref: 'Artist'
    }

})

module.export = Congress

