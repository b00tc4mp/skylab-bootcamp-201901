const {Schema} = require('mongoose')
const {isEmail} = require('validator')

const user = new Schema({
    name: {type: String, required: true },
    email: {type: String, required: true, validate: isEmail, unique: true },
    password: {type: String, required: true },
    //embebido
    history: [{
        type: Schema.Types.ObjectId,
        ref: 'Thing'
    }]
   
})

const thing = new Schema({
    image: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    //linkado
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = {user, thing}