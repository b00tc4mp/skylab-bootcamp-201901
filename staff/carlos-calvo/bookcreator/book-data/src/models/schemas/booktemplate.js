const { Schema } = require('mongoose')

const BookTemplate = new Schema({

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

    parameters: {}, //Object con properties

    images: [String], //Array de strings de URL de photos

    numDownloads: {
        type: Number,
        default: 0
    }
})


module.exports = BookTemplate