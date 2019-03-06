const { Schema } = require('mongoose')

const Platform = new Schema({
    
    id: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    alias: {
        type: String
    },

    'icon-path': {
        type: String
    },

    console: {
        type: String
    },

    controller: {
        type: String
    },

    developer: {
        type: String
    },

    manufacturer: {
        type: String
    },

    media: {
        type: String
    },

    cpu: {
        type: String
    },

    memory: {
        type: String
    },

    graphics: {
        type: String
    },

    sound: {
        type: String
    },

    maxcontrollers: {
        type: String
    },
    
    display: {
        type: String
    },

    overview: {
        type: String
    },

    youtube: {
        type: String
    }

})

module.exports = Platform