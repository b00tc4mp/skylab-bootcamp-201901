const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const PasswordComplexity = require('joi-password-complexity');
// const jwt = require('jsonwebtoken');
// const config = require('config');
const { Types: { ObjectId } } = mongoose
const {organizationSchema} = require('./organization')


const usersSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: ['normal', 'admin']
    },
    organization: {
        type: organizationSchema,
        required: function () { this.role === 'admin' ? true : false }
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 20,
        lowercase: true
    },
    situation: {
        type: String,
        required: true,
        enum: { values: ['student', 'doctor', 'planner'], message: 'the value introduced does not match with the options' },
        trim: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 255,
        trim: true
    }
})


function password() {
    
    return complexityOptions = {
        min: 5,
        max: 255,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4
        /* 
           Min & Max not considered in the count. 
           Only lower, upper, numeric and symbol. 
           requirementCount could be from 1 to 4 
           If requirementCount=0, then it takes count as 4
       */
    }
}
function validateRegisterUser(user) {
    
    const complexityOptions = password()
    const schema = {
        fullname: Joi.string().min(5).required(),
        email: Joi.string().min(2).email().required(),
        phoneNumber: Joi.string().min(9).required(),
        role: Joi.string().required(),
        organization: Joi.string(),
        situation: Joi.string().required(),
        password: new PasswordComplexity(complexityOptions).required()

    }

    return Joi.validate(user, schema)
}

function validateAuthUser(user) {
    
    const complexityOptions = password()
    const schema = {
        email: Joi.string().min(9).email().required(),
        password: new PasswordComplexity(complexityOptions).required()
    }

    return Joi.validate(user, schema)
}
exports.User = mongoose.model('User', usersSchema);
exports.usersSchema = usersSchema;
exports.validateRegisterUser = validateRegisterUser;
exports.validateAuthUser = validateAuthUser;