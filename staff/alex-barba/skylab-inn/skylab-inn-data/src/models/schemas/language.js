const { Schema } = require('mongoose')

const Language = new Schema({

    language: {
        type: String,
        required: true
    },

    level: {
        type: String,
        enum: ['Elementary proficiency', 'Limited working proficiency', 'Professional working proficiency', 'Full professional proficiency', 'Native or bilingual proficiency' ],
        required: true
    }
})

module.exports = Language