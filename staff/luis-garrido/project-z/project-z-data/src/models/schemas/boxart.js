const { Schema } = require("mongoose");

const Boxart = new Schema({
    id_game: {
        type: Number,
        required: true,
        ref: "Game"
    },

    images: [
        {
            id: {
                type: Number,
                required: true
            },

            type: {
                type: String,
                required: true
            },

            side: {
                type: String,
                required: true
            },

            filename: {
                type: String,
                required: true
            },

            resolution: {
                type: String
            }
        }
    ]
});

module.exports = Boxart;
