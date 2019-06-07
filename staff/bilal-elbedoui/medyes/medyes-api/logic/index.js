const { LogicError, ValidateError } = require('../common/errors');
const bcrypt = require('bcrypt');
const { validateUser, validateCredentials, validateOrganization, validateEvent, validateEventType, validateField, validatePurchase } = require('../common/validate')

const { mongoose, models: { User, Event, EventType, Comment, Purchase, Organization, MedicalField } } = require('medyes-data')

const logic = {
    /***********************************MEDICAL-FIELDS FUNCTIONS*********************************************/
    createMedicalField(name) {

        const { error } = validateField({ name })
        if (error) throw new ValidateError(error.details[0].message);

        return (async () => {
            try {
                const medicalField = new MedicalField({
                    name
                })
                return await medicalField.save();
            } catch (err) {
                for (field in err.errors)
                    throw new ValidateError(err.errors[field].message);
            }

        })()
    },

    getOnefield(id) {
        return (async()=>{
            return await MedicalField.findById(id)
        })()
    },

    getAllfields() {
        return(async()=>{
            return await MedicalField.find().select('name').sort('name')
        })()
    },

    /***********************************EVENT-TYPES FUNCTIONS*********************************************/

    createEventType(name) {

        const { error } = validateEventType({ name });
        if (error) throw new ValidateError(error.details[0].message);

        return (async () => {
            try {
                const eventType = new EventType({
                    name
                })
                return await eventType.save();
            } catch (err) {
                for (field in err.errors)
                    throw new ValidateError(err.errors[field].message);
            }
        })()
    },

    getOneEventType(id) {
        return(async()=>{
            return await EventType.findById(id)
        })()
    },

    getAllEventType() {
        return(async()=>{
            return await EventType.find()
        })()
    },

    /***********************************ORGANIZATION FUNCTIONS*********************************************/


    createOrganization(name, phone, address, mail) {

        const { error } = validateOrganization({ name, phone, address, mail });
        if (error) throw new ValidateError(error.details[0].message);

        return (async () => {

            let user = await Organization.findOne({ mail })
            if (user) throw Error(`The organization with the email ${mail} already exists`)

            try {
                user = await new Organization({ name, phone, address, mail })
                await user.save()
                return user
            } catch (ex) {
                for (field in ex.errors)
                    throw new ValidateError(ex.errors[field].message);
            }
        })()
    },

    retrieveOrganization(id) {
        return (async () => {
            const orga = await Organization.findById(id).select('-password');
            if (!orga) throw new LogicError('Organization does not exist');

            return orga;
        })()
    },

    /***********************************USER FUNCTIONS*********************************************/

    createUser(fullname, email, role, organization, phone, position, password) {
        const { error } = validateUser({ fullname, email, role, organization, phone, position, password })
        if (error) throw new ValidateError(error.details[0].message);

        return (async () => {

            let user = await User.findOne({ email })
            if (user) throw Error(`The user with the email ${email} already exists`)

            if (role === 'admin') {
                let orga = await Organization.findById(organization)
                if (!orga) throw Error('Organization not found')
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt)
                try {
                    user = await new User({ fullname, email, role, organization: orga.id, phone, position, password: hash })
                    await user.save()
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
                    user = await new User({ fullname, email, role, phone, position, password: hash })
                    await user.save()
                    return user
                } catch (ex) {
                    for (field in ex.errors) {
                        throw new ValidateError(ex.errors[field].message);
                    }
                }
            } else {
                throw Error('You should not have a Organization ID')
            }
        })()
    },

    authenticateUser(email, password) {

        const { error } = validateCredentials({ email, password })
        if (error) throw new ValidateError(error.details[0].message);

        return (async () => {

            let user = await User.findOne({ email })
            if (!user) throw new LogicError(`User with the email ${email} doesn't exist`)

            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) throw new LogicError('Wrong credentials!')

            let info
            if (user.role === 'admin') {
                info = { sub: user.id, org: user.organization }
            } else {
                info = { sub: user.id }
            }
            return info
        })()

    },
    retrieveUser(id) {
        return (async () => {
            let user = await User.findById(id).select('-password');
            if (!user) throw Error('User does not exist')

            return user
        })()

    },

    /**************************************EVENTS FUNCTIONS************************************************/

    createEvent(userId, orgId, title, description, medicalField, eventType, location, date, numberTicketsAvailable, price) {
        if (!orgId) throw Error('You are not allowed to create events')

        const { error } = validateEvent({ userId, title, description, medicalField, eventType, location, date, numberTicketsAvailable, price })
        if (error) throw new ValidateError(error.details[0].message)

        return (async () => {

            let user = await User.findById(userId).select('-password')
            let field = await MedicalField.findById(medicalField)
            let type = await EventType.findById(eventType)
            let orga = await Organization.findById(orgId)

            if (orga.representants.indexOf(userId) >= 0) {
                try {

                    event = await new Event({
                        title,
                        description,
                        representant: user,
                        medicalField,
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
        })()
    },

    retrieveEvents(medicalField, eventType) {

        return (async () => {
            debugger
            if (!medicalField && !eventType) {
                const events = await Event.find()
                if (!events) throw Error('There are no events available')
                return events
            }

            debugger
            if (medicalField && eventType) {
                const events = await Event.find().populate('medicalField eventType').lean()
                const result = events.filter(event => {
                    return event.medicalField.name === medicalField && event.eventType.name === eventType
                });
                // const events = await Event.find().and([{ 'medicalField.name': medicalField }, { 'eventType.name': eventType }])
                if (!result) throw Error('There are no events available')
                return result;
            }
            else if (medicalField) {
                debugger
                const events = await Event.find().populate('medicalField').lean()
                const result = events.filter(event => {
                    return event.medicalField.name === medicalField
                });
                if (!result) throw Error('There are no events available')
                return result;
            } else if (!medicalField && !eventType) {
                const events = await Event.find()
                if (!events) throw Error('There are no events available')
                return events
            }
        })()
    },

    retrieveOneEvent(id) {
        return (async () => {
            const event = await Event.findById(id)
            if (!event) throw Error('This events does not exist anymore')
            return event;
        })()

    },

    updateDescriptionEvent(eventId, userId, description) {
        debugger

        return (async () => {
            debugger
            let event = await Event.findById(eventId)

            if (event.representant.toString() === userId) {
                debugger
                event.description = description;

                const result = await event.save();

                return result
            } else {
                throw Error('Just who created the event is allowed to carry out modifications')
            }
        })()

    },

    addNewPost(eventid, sub, org, text) {
        debugger
        return (async () => {

            let role, orga;

            if (!org) {
                role = 'normal'
            } else {
                orga = await Organization.findById(org)
                debugger
                orga.events.indexOf(eventid) >= 0 && orga.representants.indexOf(sub) >= 0 ? role = 'Representant of the event' : role = 'normal'
            }
            debugger
            let post = await new Comment({
                event: eventid,
                author: sub,
                roleAuthor: role,
                text
            })


            await post.save()

            return post;
        })()
    },

    retrievePosts(eventId) {
        return (async () => {
            const posts = await Comment.find({ 'event': eventId })
            return posts
        })()
    },

    /******************************PURCHASE FUNCTIONS***************************/

    makePurchase(eventId, customerId, numberOfTickets) {

        const { error } = validatePurchase({ eventId, customerId })
        if (error) throw new ValidateError(error.details[0].message)

        return (async () => {

                const event = await Event.findById(eventId)

                if (event.numberTicketsAvailable === 0) return 'SOLD OUT'
                let purchase = new Purchase({

                    customer: customerId,
                    event: eventId,
                    numberOfTickets

                })
                try {
                    const result = await purchase.save()

                    const result1 = await Event.findById(eventId)

                    result1.numberTicketsAvailable = result1.numberTicketsAvailable - numberOfTickets

                    await result1.save()

                    return result;
                } catch (ex) {

                    throw Error('Something failed')
                }
            })()
    },

    retrievePurchases(userId, orgaId) {
        return(async()=>{
            const purchases = await Purchase.find()
            return purchases

        })()

    }
}

module.exports = logic
