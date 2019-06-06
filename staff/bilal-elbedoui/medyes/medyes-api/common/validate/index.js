const Joi = require('@hapi/joi')
const PasswordComplexity = require('joi-password-complexity')

const password = {
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

const user = {
    fullname: Joi.string().min(5).required(),
    email: Joi.string().min(2).email().required(),
    phoneNumber: Joi.string().min(9).required(),
    role: Joi.string().required(),
    organization: Joi.string(),
    situation: Joi.string().required(),
    password: new PasswordComplexity(password).required()

}

function validateUser(_user) {
    return Joi.validate(_user, user)
}

const credentials = {
    email: Joi.string().min(9).email().required(),
    password: new PasswordComplexity(password).required()
}

function validateCredentials(_credentials) {
    return Joi.validate(_credentials, credentials)
}

const organization = {
    organizationName: Joi.string().min(5).required(),
    organizationPhone: Joi.string().min(9).required(),
    organizationMail: Joi.string().min(9).email().required(),
    organizationAddress: Joi.string().required(),
    password: new PasswordComplexity(password).required()
}

function validateOrganization(_organization) {
    return Joi.validate(_organization, organization)
}

const event = {
    userId: Joi.objectId().required(),
    organizationId: Joi.objectId().required(),
    title: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(200).required(),
    field: Joi.objectId().required(),
    eventType: Joi.objectId().required(),
    location: Joi.object().min(1).required(),
    date: Joi.date().required(),
    numberTicketsAvailable: Joi.number().required(),
    price: Joi.required()
}

function validateEvent(_event) {
    return Joi.validate(_event, event)
}

const eventType = {
    name: Joi.string().min(5).required()
}

function validateEventType(_eventType) {
    return Joi.validate(_eventType, eventType)
}

const medicalField = {
    name: Joi.string().min(5).required()
}

function validateField(_medicalField) {
    return Joi.validate(_medicalField, medicalField)
}

const purchase = {
    eventId: Joi.objectId().required(),
    customerId: Joi.objectId().required()
}

function validatePurchase(_purchase) {
    return Joi.validate(_purchase, purchase)
}

module.exports = {
    validateUser,
    validateCredentials,
    validateOrganization,
    validateEvent,
    validateEventType,
    validateField,
    validatePurchase
}