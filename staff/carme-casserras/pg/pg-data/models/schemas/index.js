const {Schema} = require('mongoose')
// const {Types: { ObjectId }} = Schema
const {isEmail} = require('validator')

const user = new Schema({
    name: {type: String, required: true },
    email: {type: String, required: true, validate: isEmail, unique: true },
    password: {type: String, required: true },
    })

const thing = new Schema({
    image: {type: String, required: false},
    category: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: Number, default: 0},
    //linkado
    loc: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    //linkado
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },    
})

const location = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    latitude:  {type: Number, required: true},
    longitude: {type: Number, required: true}
})

module.exports = {user, thing, location}