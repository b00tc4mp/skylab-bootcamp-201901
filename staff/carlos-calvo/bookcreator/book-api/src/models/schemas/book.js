const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema

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

    parameters: {}, //Object con properties

    userId: { //Referencia del usuario.
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    isTemplate: {
        type: Boolean,
        default: false
    }

})

module.exports = Book