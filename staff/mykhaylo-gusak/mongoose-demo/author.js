const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String
})

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;