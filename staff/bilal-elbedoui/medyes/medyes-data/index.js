const mongoose = require('mongoose')

const model = mongoose.model.bind(mongoose)

const { user, event, eventType, comment, purchase, organization, medicalField } = require('./schemas')


module.exports = {
    mongoose,
    models: {
        User: model('User', user),
        Event: model('Event', event),
        EventType: model('EventType', eventType),
        Comment: model('Comment', comment),
        Purchase: model('Purchase', purchase),
        Organization: model('Organization', organization),
        MedicalField: model('MedicalField', medicalField)
    }
}