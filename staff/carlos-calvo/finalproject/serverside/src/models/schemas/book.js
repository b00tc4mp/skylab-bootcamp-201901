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

    parameters: [String], //array de String de parametros calculados previamente al leer el fichero.

    userId: { //Referencia del usuario.
        type: ObjectId,
        required: true,
        ref: 'User'
    },

})

module.exports = Book