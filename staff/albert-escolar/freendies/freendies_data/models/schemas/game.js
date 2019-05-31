const {Schema, ObjectId} = require('mongoose');

const Game = new Schema({

    //todo validation
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
        requires: false
    },

    images: [{
        // type:String,
        // requires: false
    }],

    gameFile: {
        // type:String,
        // requires: true
    }

})

module.exports = Game