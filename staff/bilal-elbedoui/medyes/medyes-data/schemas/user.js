const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose

const user = new Schema({
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
        enum: ['normal', 'admin','superAdmin']
    },
    organization: {
        type: ObjectId,
        ref: 'Organization',
        required: function () { this.role === 'admin' ? true : false }
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 20,
        lowercase: true
    },
    position: {
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

module.exports = user
