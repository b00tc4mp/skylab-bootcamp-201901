const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const fieldsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:40,
        trim:true
    }
})


function validateField(field){

    const Schema={
        name: Joi.string().min(5).required()
    }
    return Joi.validate(field, Schema)
}

exports.fieldsSchema = fieldsSchema;
exports.Field = mongoose.model('Field', fieldsSchema)
exports.validateField = validateField
