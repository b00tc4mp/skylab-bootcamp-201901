const { Schema } = require('mongoose')
const { Types: { ObjectId }} = Schema

const Game = new Schema({
    
    developers: {
        type: [{ type: Number, ref: 'Developer' }]
    },

    genres: {
        type: [{ type: Number, ref: 'Genre' }]
    },

    publishers: {
        type: [{ type: Number, ref: 'Publisher' }]
    },

    alternates: {
        type: [String]
    },

    reviews: {
        type: [{ type: ObjectId, ref: 'Review' }]
    },

    id: {
        type: Number,
        required: true,
        unique: true
    },

    game_title: {
        type: String,
        required: true,
        unique: true
    },

    release_date: {
        type: String
    },

    platform: {
        type: [{ type: Number, ref: 'Platform' }],
        required: true
    },

    players: {
        type: Number
    },

    overview: {
        type: String
    },

    last_updated: {
        type: String
    },

    rating: {
        type: String
    },

    coop: {
        type: String
    },

    youtube: {
        type: String
    },

    os: {
        type: String
    },
    
    processor: {
        type: String
    },

    ram: {
        type: String
    },

    hdd: {
        type: String
    },

    video: {
        type: String
    },

    sound: {
        type: String
    }
})

module.exports = Game