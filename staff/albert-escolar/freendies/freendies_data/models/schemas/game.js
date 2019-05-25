const {Schema, ObjectId} = require('mongoose');

const Game = new Schema({
    ownerId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    title: {
        type:String,
        requires: true
    },
    
    genre: {
        type:String,
        requires: true
    },  

    description: {
        type:String,
        requires: true
    },

    images: [{
        type:String,
        requires: true
    }],

    gameFile: {
        type:String,
        requires: true
    }

})

module.exports = Game