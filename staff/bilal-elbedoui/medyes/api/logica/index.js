// const mongoose = require('mongoose');
// const { Field, validateField } = require('../data/event-data/modelos/medical-fields');
// const { EventType, validateEventType } = require('../data/event-data/modelos/eventType');
// const { Organization, validateRegisterOrganization, validateAuthOrganization } = require('../data/event-data/modelos/organization');
// const { User, validateRegisterUser, validateAuthUser } = require('../data/event-data/modelos/users');
// const { Event, validateEvent } = require('../data/event-data/modelos/events');
// const { QueAns } = require('../data/event-data/modelos/questionsAnswers');
// const { Purchase, validatePurchase } = require('../data/event-data/modelos/purchase');
// const { LogicError, ValidateError } = require('../common/errors');
// const Fawn = require('fawn');
// const bcrypt = require('bcrypt');

const {mongoose} = require('DATA');
const { Field, validateField } = require('DATA');
const { EventType, validateEventType } = require('DATA');
const { Organization, validateRegisterOrganization, validateAuthOrganization } = require('DATA');
const { User, validateRegisterUser, validateAuthUser } = require('DATA');
const { Event, validateEvent } = require('DATA');
const { QueAns } = require('DATA');
const { Purchase, validatePurchase } = require('DATA');
const { LogicError, ValidateError } = require('../common/errors');
const Fawn = require('fawn');
const bcrypt = require('bcrypt');

Fawn.init(mongoose)

const logic = {
    /***********************************MEDICAL-FIELDS FUNCTIONS*********************************************/
    async createMedicalField(field1) {

        const { error } = validateField(field1)
        if (error) throw new ValidateError(error.details[0].message);
        const { name } = field1
        try {
            const field = new Field({
                name
            })
            return await field.save();
        } catch (err) {
            for (field in err.errors)
                throw new ValidateError(err.errors[field].message);
        }
    },

    async getOnefield(id) {
        return await Field.findById(id)
    },

    async getAllfields() {
        return await Field.find().select('name').sort('name')
    },

    /***********************************EVENT-TYPES FUNCTIONS*********************************************/

    async createEventType(type) {

        const { error } = validateEventType(type);
        if (error) throw new ValidateError(error.details[0].message);
        const { name } = type
        try {
            const eventType = new EventType({
                name
            })
            return await eventType.save();
        } catch (err) {
            for (field in err.errors)
                throw new ValidateError(err.errors[field].message);
        }
    },

    async getOneEventType(id) {
        return await EventType.findById(id)
    },

    async getAllEventType() {
        return await EventType.find()
    },

    /***********************************ORGANIZATION FUNCTIONS*********************************************/


    async createOrganization(req) {

        const { error } = validateRegisterOrganization(req);
        if (error) throw new ValidateError(error.details[0].message);

        const { organizationName, organizationPhone, organizationMail, organizationAddress, password } = req

        let user = await Organization.findOne({ organizationMail })

        if (user) throw Error(`The organization with the email ${organizationMail} already exists`)

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        try {
            user = await Organization.create({ organizationName, organizationPhone, organizationMail, organizationAddress, password: hash })

            return user
        } catch (ex) {
            for (field in ex.errors)
                throw new ValidateError(ex.errors[field].message);
        }
    },

    async authenticateOrganization(req) {

        const { error } = validateAuthOrganization(req)
        if (error) throw new ValidateError(error.details[0].message);

        const { organizationMail, password } = req
        debugger
        let orga = await Organization.findOne({ organizationMail })
        if (!orga) throw new LogicError(`Organization with the email ${organizationMail} doesn't exist`)

        const validPassword = await bcrypt.compare(password, orga.password)
        if (!validPassword) throw new LogicError('Wrong credential')
        
        const sub = orga.id

        return sub
    },

    async retrieveOrganization(id) {

        const orga = await Organization.findById(id).select('-password');
        if (!orga) throw new LogicError('Organization does not exist');

        return orga;

    },

    /***********************************USER FUNCTIONS*********************************************/


    async createUser(req) {
        const { error } = validateRegisterUser(req);
        if (error) throw new ValidateError(error.details[0].message);

        const { fullname, email, role, organization, phoneNumber, situation, password } = req
        debugger
        let user = await User.findOne({ email })
        if (user) throw Error(`The user with the email ${email} already exists`)

        if (role === 'admin') {
            let orga = await Organization.findById(organization)
            if (!orga) throw Error('Organization not found')
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt)
            try {
                user = await User.create({ fullname, email, role, organization: orga, phoneNumber, situation, password: hash })
                orga.representants.push(user.id)
                await orga.save()
                return user
            } catch (ex) {
                for (field in ex.errors) {
                    throw new ValidateError(ex.errors[field].message);
                }
            }
        } else if (role === 'normal' && !organization) {

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt)
            try {
                user = await User.create({ fullname, email, role, phoneNumber, situation, password: hash })
                return user
            } catch (ex) {
                for (field in ex.errors) {
                    throw new ValidateError(ex.errors[field].message);
                }
            }
        } else {
            throw Error('You should not have a Organization ID')
        }
    },

    async authenticateUser(body) {

        const { error } = validateAuthUser(body)
        if (error) throw new ValidateError(error.details[0].message);
        const { email, password } = body

        let user = await User.findOne({ email })
        if (!user) throw new LogicError(`User with the email ${email} doesn't exist`)

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) throw new LogicError('Wrong credentials!')

        let info
        if (user.role === 'admin') {
            info = { sub: user.id, subOrga: user.organization }
        } else {
            info = { sub: user.id }
        }
        
        return info
    },
    async retrieveUser(id) {

        let user = await User.findById(id).select('-password');
        if (!user) throw Error('User does not exist')

        return user

    },

    /**************************************EVENTS FUNCTIONS************************************************/

    async createEvent({sub,subOrga}, event) {
        debugger
        if (!subOrga) throw Error('You are not allowed to create events')

        const { error } = validateEvent({sub,subOrga}, event)
        if (error) throw new ValidateError(error.details[0].message)

        let { title, description, field, eventType, location, date, numberTicketsAvailable, price } = event
        
        let user = await User.findById(sub).select('-password')
        let medicalField = await Field.findById(field)
        let type = await EventType.findById(eventType)
        let orga = await Organization.findById(subOrga._id)

        if (orga.representants.indexOf(sub) >= 0) {
            try {
                event = await new Event({
                    title,
                    description,
                    representant: user,
                    field: medicalField,
                    eventType: type,
                    location,
                    date,
                    numberTicketsAvailable,
                    price
                })
                await event.save()
                orga.events.push(event.id)
                await orga.save()
                return event
            } catch (ex) {
                for (field in ex.errors) {
                    throw new ValidateError(ex.errors[field].message);
                }
            }
        } else {
            throw Error('You do not belong anymore to this organization')
        }
    },

    async retrieveEvents(query) {
        debugger

        if(query===undefined) {
            const events = await Event.find()
            if (!events) throw Error('There are no events available')
            return events
        }

        const { field, eventType } = query

        if (field && eventType) {
            const events = await Event.find().and([{ 'field.name': field }, { 'eventType.name': eventType }])
            if (!events) throw Error('There are no events available')
            return events;
        }
        else if (field) {
            const event = await Event.find({ 'field.name': field })
            if (!events) throw Error('There are no events available')
            return event;
        } else if(!field && !eventType) {
            const events = await Event.find()
            if (!events) throw Error('There are no events available')
            return events
        } 

    },

    async retrieveOneEvent(id) {

        const event = await Event.findById(id)
        if (!event) throw Error('This events does not exist anymore')
        return event;

    },

    async updateDescriptionEvent(eventid, userId, body) {
        debugger
        // const {error} = validateEvent(body.description)
        // const { error } = validateEvent({ representant, organization }, event)

        const {sub, subOrga} = userId;
        if (!subOrga) throw Error('You are now allowed to modify this event')

        // const orga = await this.retrieveOrganization(organization._id)
        let event = await Event.findById(eventid)

        if (event.representant.id === sub /*&& orga.representants.indexOf(_id) >= 0*/) {

            event.description = body;

            const result = await event.save();

            return result
        } else {
            throw Error('Just who created the event is allowed to carry out modifications')
        }
    },

    async addNewPost(eventid, userId, body) {
        debugger
        const {sub, subOrga} = userId;
        let role, orga;
        if(!subOrga){
            role='normal'
        }else{
            orga = await Organization.findById(subOrga._id)
            orga.events.indexOf(eventid) >= 0 && orga.representants.indexOf(sub) >= 0 ? role = 'Representant of the event' : role = 'normal'
        }
        debugger
        let post = await new QueAns({
            event: eventid,
            author: sub,
            roleAuthor: role,
            text:body.text
        })

        await post.save()

        return post;
    },



    async retrievePosts(eventId) {

        const posts = await QueAns.find({ 'event': eventId })
        return posts

    },

    /******************************PURCHASE FUNCTIONS***************************/

    async makePurchase(eventId, customer, body) {

        const { sub: customerId, subOrga } = customer
        const { error } = validatePurchase({ eventId, customerId })
        if (error) throw new ValidateError(error.details[0].message)

        const { numberOfticketsBoughts } = body

        const event = await Event.findById(eventId)

        if (event.numberTicketsAvailable === 0) return 'SOLD OUT'
        let purchase = new Purchase({

            customer: customerId,
            event: eventId,
            numberOfticketsBoughts

        })
        try {
            const result = await purchase.save()

            const result1 = await Event.findById(eventId)

            result1.numberTicketsAvailable = result1.numberTicketsAvailable - numberOfticketsBoughts

            await result1.save()

            return result;
        } catch (ex) {

            throw Error('Something failed')
        }
    },

    async retrievePurchases(eventId){

        const purchases = await Purchase.find()
        return purchases
        
    }
}

module.exports = logic
