const { User, validateAuthUser, validateRegisterUser } = require('./event-data/modelos/users')
const { Event, validateEvent } = require('./event-data/modelos/events')
const { EventType, validateEventType } = require('./event-data/modelos/eventType')
const { Field, validateField } = require('./event-data/modelos/medical-fields')
const { Organization, validateAuthOrganization, validateRegisterOrganization } = require('./event-data/modelos/organization')
const { Purchase, validatePurchase } = require('./event-data/modelos/purchase')
const { QueAns } = require('./event-data/modelos/questionsAnswers')
const mongoose = require('mongoose')



module.exports = {
    mongoose,
    User,validateAuthUser,validateRegisterUser,
    Event,validateEvent,
    EventType,validateEventType,
    Field,validateField,
    Organization,validateAuthOrganization,validateRegisterOrganization,
    Purchase,validatePurchase,
    QueAns
}