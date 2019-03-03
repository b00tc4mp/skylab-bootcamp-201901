const { Schema } = require('mongoose')

const Book = new Schema({

    title: {
        type: String,
        required: true
    },

    content :{
        type: String,
        required: true
    },

    coverphoto: {
        type: String,
        required: true
    },

    images: [String], //Array de strings de URL de photos

    parameters: [String]

})

module.exports = Book