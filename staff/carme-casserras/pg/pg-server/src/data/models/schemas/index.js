const {Schema} = require('mongoose')
const {isEmail} = require('validator')

const user = new Schema({
    name: {type: String, required: true },
    email: {type: String, required: true, validate: isEmail, unique: true },
    password: {type: String, required: true },
   
})

module.exports = {user}