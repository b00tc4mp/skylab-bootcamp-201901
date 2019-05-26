const { Schema } = require ('mongoose')
const {isEmail} = require('validator')

const issues= new Schema({
    key: {type: String, required: true},
    issueType: {type: String, required: true},
    createdDate :{type: Date, required: true},
    dueDate : {type: Date, required: true},
    status: {type: String, required: true},
    resolutionType : {type: String},
    resolutionDate : {type: Date, default: Date.now}

})