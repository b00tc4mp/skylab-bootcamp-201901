const { Schema } = require("mongoose");
const {
    Types: { ObjectId }
} = Schema;

const Review = new Schema({
    text: {
        type: String,
        required: true
    },

    score: {
        type: Number,
        required: true
    },

    author: {
        type: ObjectId,
        required: true,
        ref: "User"
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    game: {
        type: ObjectId,
        required: true,
        ref: "Game"
    }
});

module.exports = Review;
