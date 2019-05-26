const {Schema} = require('mongoose')
const {isEmail} = require('validator')

const user = new Schema({
    name: {type: String, required: true },
    email: {type: String, required: true, validate: isEmail, unique: true },
    password: {type: String, required: true },
    stuffs: [{
        type: Schema.Types.ObjectId,
        ref: 'Stuff'
    }]
   
})

const stuff = new Schema({
    image: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = {user, stuff}