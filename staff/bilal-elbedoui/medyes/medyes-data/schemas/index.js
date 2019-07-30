const user = require('./user')
const event = require('./event')
const eventType = require('./event-type')
const organization = require('./organization')
const medicalField = require('./medical-field')
const location = require('./location')
const purchase = require('./purchase')
const comment = require('./comment')

module.exports =  {
    user,
    event,
    eventType,
    organization,
    medicalField,
    location,
    purchase,
    comment
}