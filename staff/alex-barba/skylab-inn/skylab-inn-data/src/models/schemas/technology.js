const { Schema } = require('mongoose')

const Technology = new Schema({

    tech: {
        type: String,
        required: true
    },

    level: {
        type: String,
        enum: ['Fundamental awareness', 'Novice', 'Intermediate', 'Advance', 'Expert' ],
        required: true
    }
})

module.exports = Technology