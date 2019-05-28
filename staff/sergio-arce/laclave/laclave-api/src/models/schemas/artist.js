const { Schema } = require('mongoose')

const Artist = new Schema({

    name: {
        type: String,
        // required: true,
        minlength: [2, 'the name of the artist is very short'],
        maxlength: [20, 'the name of the artist is very long'],
        // lowercase: true,
        // uppercase: true
    },

    age: {
        type: Number,
        // required: true,
        min: [16, 'no artists under 16 are allowed'],
        max: [100, 'no artists older than 100 years old'],
    },

    country: {
        type: String,
        // required: true,
        minlength: [2, 'the country of the artist is very short'],
        maxlength: [20, 'the country of the artist is very long'],
        // enum: ['spain', 'cuba', 'puerto rico', 'usa']
    },

    category: {
        type: [ String ],
        // required: true,
        enum: ['salsa', 'bachata', 'suok', 'mambo']
        // lowercase: true,
        // uppercase: true
    },

})

module.export = Artist