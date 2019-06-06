const mongoose = require('mongoose')
const Joi= require('@hapi/joi')


const eventTypeSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:40,
        trim:true
    }
})


function validateEventType(type){
    const Schema={
        name: Joi.string().min(5).required()
    }
    const result= Joi.validate(type, Schema)
    return result
}

exports.eventTypeSchema = eventTypeSchema;
exports.EventType = mongoose.model('EventType', eventTypeSchema)
exports.validateEventType = validateEventType