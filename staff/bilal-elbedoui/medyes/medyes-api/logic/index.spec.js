const { mongoose } = require('DATA');
const express = require('express');
// const { Field, validateField } = require('../data/event-data/modelos/medical-fields');
// const { EventType, validateEventType } = require('../data/event-data/modelos/eventType');
// const { Organization, validateRegisterOrganization, validateAuthOrganization } = require('../data/event-data/modelos/organization');
// const { User, validateRegisterUser, validateAuthUser } = require('../data/event-data/modelos/users');
// const { Event, validateEvent } = require('../data/event-data/modelos/events')
// const { QueAns } = require('../data/event-data/modelos/questionsAnswers')
// const { Purchase, validatePurchase } = require('../data/event-data/modelos/purchase')

const { Field } = require('DATA');
const { EventType } = require('DATA');
const { Organization } = require('DATA');
const { User } = require('DATA');
const { Event } = require('DATA');
const { QueAns } = require('DATA');
const { Purchase } = require('DATA');

const logic = require('.')
const { expect } = require('chai')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');


describe('LOGIC', () => {

    before(() => mongoose.connect('mongodb://localhost/project-test', { useNewUrlParser: true }))

    describe('MEDICAL-FIELDS', () => {

        let name

        beforeEach(async () => {

            await Field.deleteMany()

            name = `Allerd${Math.floor(Math.random() * (1000 - 1)) + 1}ogy`
        })
        describe('Create a medical field', () => {
            let field
            it('Should create the entry', async () => {
                field = await logic.createMedicalField({ name })

                expect(field).to.not.be.undefined
                expect(field.name).to.equal(name)
            })
            it('Should fail if name is not a String ', async () => {
                try {
                    name = 5

                    field = await logic.createMedicalField({ name })
                } catch (error) {
                    expect(error.message).to.not.be.undefined
                    expect(error.message).to.equal('"name" must be a string')
                }
            })
            it('should fail if the field has more than 40 carachters', async () => {
                try {
                    name = "sjhsaajkascnanasclnlnlncan kbbjklnlbjkbacnldslncnlcdnanaclknalnadlañlda.acdndjbdcdajbackjbakbj"
                    field = await logic.createMedicalField({ name })
                } catch (error) {
                    expect(error.message).to.not.be.undefined
                    expect(error.message).to.equal("Path `name` (`sjhsaajkascnanasclnlnlncan kbbjklnlbjkbacnldslncnlcdnanaclknalnadlañlda.acdndjbdcdajbackjbakbj`) is longer than the maximum allowed length (40).")
                }
            })
        })
        describe('Retrieve a field', () => {
            let field
            beforeEach(async () => field = await logic.createMedicalField({ name })
            )
            it('Should retrieve a field providing the id ', async () => {
                const fieldRetrieved = await logic.getOnefield(field.id)

                expect(fieldRetrieved).to.not.be.undefined
                expect(fieldRetrieved.id).to.exist
                expect(fieldRetrieved.name).to.equal(field.name)
            })
        })
        describe('Retrieve all fields', () => {
            let fields;

            beforeEach(async () => {
                fields = new Array(10).fill().map(field => {
                    return field = {
                        name: `Cardio${Math.floor(Math.random() * (1000 - 1)) + 1}logy`
                    }
                })
                return await Promise.all(fields.map(async field => await logic.createMedicalField(field)))
            })
            it('Should retrieve all the fields', async () => {
                const campos = await logic.getAllfields()
                expect(campos).to.have.lengthOf(10)
            })
        })
    })
    describe('EVENT-TYPE', () => {

        let name

        beforeEach(async () => {
            await EventType.deleteMany()

            name = `Master${Math.floor(Math.random() * (1000 - 1)) + 1}class`
        })
        describe('Create an event type', () => {

            it('Should create the entry', async () => {
                const event = await logic.createEventType({ name })

                expect(event).to.not.be.undefined
                expect(event.name).to.equal(name)
            })
            it('Should fail if name is not a String ', async () => {
                try {
                    name = 5

                    field = await logic.createEventType({ name })
                } catch (error) {
                    expect(error.message).to.not.be.undefined
                    expect(error.message).to.equal('"name" must be a string')
                }
            })
            it('should fail if the event type name has more than 40 carachters', async () => {
                try {
                    name = "sjhsaajkascnanasclnlnlncan kbbjklnlbjkbacnldslncnlcdnanaclknalnadlañlda.acdndjbdcdajbackjbakbj"
                    field = await logic.createEventType({ name })
                } catch (error) {
                    expect(error.message).to.not.be.undefined
                    expect(error.message).to.equal("Path `name` (`sjhsaajkascnanasclnlnlncan kbbjklnlbjkbacnldslncnlcdnanaclknalnadlañlda.acdndjbdcdajbackjbakbj`) is longer than the maximum allowed length (40).")
                }
            })
        })
        describe('Retrieve the event type', () => {
            let events
            beforeEach(async () => events = await logic.createEventType({ name })
            )
            it('Should retrieve the event type providing the id ', async () => {

                const eventRetrieved = await logic.getOneEventType(events.id)

                expect(eventRetrieved).to.not.be.undefined
                expect(eventRetrieved.id).to.exist
                expect(eventRetrieved.name).to.equal(events.name)
            })
        })
        describe('Retrieve all event types', () => {
            let events;

            beforeEach(async () => {

                events = new Array(7).fill().map(event => {
                    return event = {
                        name: `Cardio${Math.floor(Math.random() * (1000 - 1)) + 1}logy`
                    }
                })
                return await Promise.all(events.map(async event => await logic.createEventType(event)))
            })
            it('Should retrieve all the fields', async () => {
                const campos = await logic.getAllEventType()

                expect(campos).to.have.lengthOf(7)
            })
        })
    })
    describe('USERS', () => {

        let organizationName, organizationPhone, organizationMail, organizationAddress, password
        let orga
        let fullname, email, role, organization, phoneNumber, situation

        beforeEach(async () => {

            await Organization.deleteMany()
            await User.deleteMany()

            organizationName = `Enterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            organizationPhone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            organizationMail = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmal.com`
            organizationAddress = `adresssss-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`

            orga = await logic.createOrganization({ organizationName, organizationPhone, organizationMail, organizationAddress, password })

            fullname = `Carlos-${Math.floor(Math.random() * (1000 - 1)) + 1}tonto`
            email = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
            organization = orga.id
            phoneNumber = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            situation = 'student'
            password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`
        })
        describe('Create Admin User', () => {

            it('Should create a representant of random company', async () => {
                role = 'admin'

                const userAdmin = await logic.createUser({ fullname, email, role, organization, phoneNumber, situation, password })

                expect(userAdmin).to.not.be.undefined
                expect(userAdmin).to.exist
                expect(userAdmin.organization.id).to.equal(orga.id)

                const usersRep = await User.find()

                const [user] = usersRep

                expect(user.fullname).to.equal(fullname)
                expect(user.email).to.equal(email)
                expect(user.role).to.equal(role)
                expect(user.phoneNumber).to.equal(phoneNumber)
                expect(user.situation).to.equal(situation)
                expect(user.password).to.exist
            })
            it('Should fail if the user role is normal', async () => {
                role = 'normal';
                let userAdmin
                try {
                    userAdmin = await logic.createUser({ fullname, email, role, organization, phoneNumber, situation, password })
                } catch (error) {
                    expect(error.message).to.equal('You should not have a Organization ID')
                    expect(userAdmin).to.be.undefined
                }
            })
            it('should fail if the user provide us a none correct Organization ID', async () => {
                try {
                    role = 'admin'

                    await logic.createUser({ fullname, email, role, organization: '5cf61de6bf73b3409c82f329', phoneNumber, situation, password })
                } catch (error) {
                    expect(error.message).to.exist
                    expect(error.message).to.equal('Organization not found')
                }
            })
            it('Should fail is the information provided is not accepted by the validator', async () => {
                try {
                    role = 'admin'

                    await logic.createUser({ fullname, email, role, organization, phoneNumber, situation, password: 'bbnm' })
                } catch (error) {
                    expect(error.message).to.exist
                    expect(error.message).to.equal('"password" must meet password complexity requirements')
                }
            })
            it('Should fail is the user already exists', async () => {
                role = 'admin'

                await logic.createUser({ fullname, email: 'usesexisting@gmail.es', role, organization, phoneNumber, situation, password })
                try {

                    await logic.createUser({ fullname, email: 'usesexisting@gmail.es', role, organization, phoneNumber, situation, password })
                } catch (error) {

                    expect(error.message).to.be.not.undefined
                    expect(error.message).to.equal(`The user with the email usesexisting@gmail.es already exists`)
                }
            })
            it('should fail if the user situation does not match with the options', async () => {
                try {
                    role = 'admin'
                    await logic.createUser({ fullname, email, role, organization, phoneNumber, situation: 'nonCorrectsituation', password })
                } catch (error) {

                    expect(error.message).to.be.not.undefined
                    expect(error.message).to.equal('the value introduced does not match with the options')
                }
            })
        })
        describe('Create Normal User', () => {


            it('should create a normal user', async () => {
                const normalUser = await User.create({ fullname, email, role: 'normal', phoneNumber, situation, password })

                expect(normalUser).to.exist
                expect(normalUser.role).to.equal('normal')
                expect(normalUser).to.be.an('object')
                debugger
                const user = await User.find()

                role = 'normal'
                const [userResult] = user

                expect(userResult.fullname).to.equal(fullname)
                expect(userResult.email).to.equal(email)
                expect(userResult.role).to.equal(role)
                expect(userResult.phoneNumber).to.equal(phoneNumber)
                expect(userResult.situation).to.equal(situation)
                expect(userResult.password).to.exist
            })
            it('should fail if the user situation does not match with the options', async () => {
                try {
                    await logic.createUser({ fullname, email, role: 'normal', phoneNumber, situation: 'nonCorrectsituation', password })
                } catch (error) {
                    expect(error.message).to.be.not.undefined
                    expect(error.message).to.equal('the value introduced does not match with the options')
                }
            })
            it('Should fail if a normal user provide us an Organization ID', async () => {
                try {
                    await logic.createUser({ fullname, email, role: 'normal', organization, phoneNumber, situation, password })
                } catch (error) {
                    expect(error.message).to.be.not.undefined
                    expect(error.message).to.equal('You should not have a Organization ID')
                }
            })

        })
        describe('Authenticate Admin USer', () => {
            beforeEach(async () => {
                const orga = await logic.createOrganization({ organizationName: 'testName56', organizationPhone: '123test456', organizationMail: 'testemail@gmila.com', organizationAddress: 'CAlle roc borronat', password: 'BBbb11..' })
                const user = await logic.createUser({ fullname, email, role: 'admin', organization: orga.id, phoneNumber, situation, password })
            })

            it('Should succed if the credentials are correct', async () => {
                const user = await logic.authenticateUser({ email, password })

                expect(user).to.exist
                expect(user).to.be.an('object')
            })
            it('Should fail if the is not properly written', async () => {
                try {
                    const email = 'nowrittenprop@.com'
                    const user = await logic.authenticateUser({ email, password })
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal('"email" must be a valid email')
                }
            })
            it('Should fail if the email does not exist', async () => {
                try {
                    const email = 'holhola@gmail.com'
                    const user = await logic.authenticateUser({ email, password })
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal(`User with the email holhola@gmail.com doesn't exist`)
                }
            })
            it('Should fail if the password is not correct', async () => {
                try {
                    password = 'LLbb33..'
                    const user = await logic.authenticateUser({ email, password })
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal('Wrong credentials!')
                }
            })
        })
        describe('Authenticate Normal USer', () => {
            beforeEach(async () => {
                const user = await logic.createUser({ fullname, email, role: 'normal', phoneNumber, situation, password })
            })

            it('Should succed if the credentials are correct', async () => {
                const user = await logic.authenticateUser({ email, password })

                expect(user).to.exist
                expect(user).to.be.an('object')
            })
            it('Should fail if the is not properly written', async () => {
                try {
                    const email = 'nowrittenprop@.com'
                    const user = await logic.authenticateUser({ email, password })
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal('"email" must be a valid email')
                }
            })
            it('Should fail if the email does not exist', async () => {
                try {
                    const email = 'holhola@gmail.com'
                    const user = await logic.authenticateUser({ email, password })
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal(`User with the email holhola@gmail.com doesn't exist`)
                }
            })
            it('Should fail if the password is not correct', async () => {
                try {
                    password = 'LLbb33..'
                    const user = await logic.authenticateUser({ email, password })
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal('Wrong credentials!')
                }
            })
        })
        describe('Retrieve User', () => {
            let user
            beforeEach(async () => {
                user = await logic.createUser({ fullname, email, role: 'normal', phoneNumber, situation, password })
            })
            it('Should Retrieve a user that have been created before', async () => {
                const userRetrieved = await logic.retrieveUser(user.id)

                expect(userRetrieved).to.exist
                expect(userRetrieved.email).to.equal(email)
                expect(userRetrieved.role).to.equal(role)
                expect(userRetrieved.situation).to.equal(situation)
            })
        })
    })

    describe('ORGANIZATION', () => {

        let organizationName, organizationPhone, organizationMail, organizationAddress, password

        beforeEach(async () => {

            await Organization.deleteMany()

            organizationName = `Enterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            organizationPhone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            organizationMail = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmal.com`
            organizationAddress = `adresssss-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`

        })
        describe('Register organization', () => {
            it('Should succed registering a new organization', async () => {

                const res = await logic.createOrganization({ organizationName, organizationPhone, organizationMail, organizationAddress, password })

                expect(res).to.not.be.undefined

                const orga = await Organization.find()

                expect(orga).to.exist
                expect(orga).to.have.lengthOf(1)

                const [organization] = orga
                expect(organization.organizationName).to.equal(organizationName)
                expect(organization.organizationPhone).to.equal(organizationPhone)
                expect(organization.organizationMail).to.equal(organizationMail)
                expect(organization.organizationAddress).to.equal(organizationAddress)
                expect(organization.password).to.exist
                expect(await bcrypt.compare(password, organization.password)).to.be.true
            })
            it('Should fail if the password does not respect the password complexity', async () => {
                try {
                    password = 1235
                    const res = await logic.createOrganization({ organizationName, organizationPhone, organizationMail, organizationAddress, password })
                } catch (error) {
                    expect(error.message).to.be.not.undefined
                    expect(error.message).to.equal('"password" must meet password complexity requirements')
                }
            })
            it('Should fail if the email already exists', async () => {
                await Organization.deleteMany()

                await logic.createOrganization({ organizationName: 'entreprise-prueba', organizationPhone: '123456789', organizationMail: 'email@gmaiiil.com', organizationAddress: 'Calle de la marina', password: 'BBbb11..' })
                try {
                    await logic.createOrganization({ organizationName, organizationPhone, organizationMail: 'email@gmaiiil.com', organizationAddress, password })
                } catch (error) {
                    expect(error.message).to.be.not.undefined
                    expect(error.message).to.equal(`The organization with the email email@gmaiiil.com already exists`)
                }
            })
            it('Should fail if the organization name has less than 10 characters', async () => {
                try {
                    const res = await logic.createOrganization({ organizationName: 'bilalot', organizationPhone, organizationMail, organizationAddress, password })
                } catch (error) {
                    expect(error.message).to.exist
                    expect(error.message).to.equal("Path `organizationName` (`bilalot`) is shorter than the minimum allowed length (10).")
                }
            })
        })
        describe('Authenticate organization', () => {
            let orga
            beforeEach(async () => orga = await logic.createOrganization({ organizationName, organizationPhone, organizationMail, organizationAddress, password }))

            it('Should succed if the credentials are correct', async () => {
                debugger
                const orgaId = await logic.authenticateOrganization({ organizationMail, password })


                expect(orgaId).to.exist
                expect(orgaId).to.equal(orga._id.toString())
            })
            it('Should fail if the is not properly written', async () => {
                try {
                    orga = await logic.authenticateOrganization({ organizationMail: 'holholala', password })
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal('"organizationMail" must be a valid email')
                }
            })
            it('Should fail if the email does not exist', async () => {
                try {
                    orga = await logic.authenticateOrganization({ organizationMail: 'holhola@gmail.com', password })
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal(`Organization with the email holhola@gmail.com doesn't exist`)
                }
            })
            it('Should fail if the password is not correct', async () => {
                try {
                    const orga = await logic.authenticateOrganization({ organizationMail, password: 'HHhh11..' })

                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal('Wrong credential')
                }
            })
        })
        describe('Retrieve Organization', () => {
            let orga
            beforeEach(async () => orga = await logic.createOrganization({ organizationName, organizationPhone, organizationMail, organizationAddress, password }))

            it('Should retrieve a correct user', async () => {
                const result = await logic.retrieveOrganization(orga._id)

                expect(result).to.exist
                expect(result).to.be.an('object')

                expect(result.id).to.not.be.undefined

                expect(result.organizationName).to.equal(organizationName)
                expect(result.organizationPhone).to.equal(organizationPhone)
                expect(result.organizationMail).to.equal(organizationMail)
                expect(result.organizationAddress).to.equal(organizationAddress)
                expect(result.password).to.not.exist
            })
            it('should fail if the Organization does not exist', async () => {
                try {
                    const result = await logic.retrieveOrganization('5cf3a7d829aec72e183cb119')
                } catch (error) {
                    expect(error.message).to.exist
                    expect(error.message).to.equal('Organization does not exist')
                }
            })
        })
    })
    describe('EVENT', () => {
        describe('Create an event', () => {
            let orga, user, userAuthenticated, event, field, eventType
            let organizationName, organizationPhone, organizationMail, organizationAddress, password
            let fullname, email, role, organization, phoneNumber, situation

            beforeEach(async () => {
                await Event.deleteMany()
                await Organization.deleteMany()
                await User.deleteMany()

                organizationName = `Enterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                organizationPhone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                organizationMail = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmal.com`
                organizationAddress = `adresssss-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`

                orga = await logic.createOrganization({ organizationName, organizationPhone, organizationMail, organizationAddress, password })

                fullname = `Carlos-${Math.floor(Math.random() * (1000 - 1)) + 1}tonto`
                email = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
                phoneNumber = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                situation = 'student'
                password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                debugger
                user = await logic.createUser({ fullname, email, role: 'admin', organization: orga.id, phoneNumber, situation, password })
                userAuthenticated = await logic.authenticateUser({ email, password })

                let nameField = `Allerd${Math.floor(Math.random() * (1000 - 1)) + 1}ogy`
                let nameType = `Master${Math.floor(Math.random() * (1000 - 1)) + 1}class`

                field = await logic.createMedicalField({ name: nameField })
                eventType = await logic.createEventType({ name: nameType })

                event = {
                    title: "PARA POSSSST",
                    description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam.",
                    field: field.id,
                    eventType: eventType.id,
                    location: { "country": "Spain", "city": "Madrid", "address": "Plaza del sol" },
                    date: "Sun Jun 02 2019 12:38:27 GMT+0200",
                    numberTicketsAvailable: 100,
                    price: 600
                }
            })
            it('a User Admin Should be able to create an event', async () => {
                const { sub, subOrga } = userAuthenticated
                const eventCreated = await logic.createEvent({ sub, subOrga }, event)

                const eventFound = await Event.findById(eventCreated._id)

                expect(eventCreated).to.exist
                expect(eventCreated.description).to.exist
                expect(eventCreated.field).to.be.an('object')
                expect(eventCreated.eventType).to.be.an('object')
                expect(eventCreated.location).to.exist
                expect(eventCreated.price).to.equal(event.price)
            })
            it('should fail if the organization in not provided in the token', async () => {
                try {
                    const { sub, subOrga } = userAuthenticated
                    await logic.createEvent(sub, event)
                } catch (error) {
                    expect(error.message).to.exist
                    expect(error.message).to.equal('You are not allowed to create events')
                }
            })
            it('should fail if the fields are not correct', async () => {
                event.title = 533263
                try {
                    const { sub, subOrga } = userAuthenticated
                    await logic.createEvent({ sub, subOrga }, event)
                } catch (error) {
                    expect(error.message).to.exist
                    expect(error.message).to.equal('"title" must be a string')
                }
            })
            it('should fail if Mongoose Schema is not respected', async () => {
                event.price = 2000
                try {
                    const { sub, subOrga } = userAuthenticated
                    await logic.createEvent({ sub, subOrga }, event)
                } catch (error) {

                    expect(error.message).to.exist
                    expect(error.message).to.equal('Path `price` (2000) is more than maximum allowed value (1000).')
                }
            })
            // it('should fail if the representant does belong to the organization',async ()=>{
            //     try{
            //         const {sub , subOrga} = userAuthenticated
            //         debugger
            //         await orga.representants.splice(0)
            //         await orga.save()
            //         await logic.createEvent({sub, subOrga},event)
            //     }catch(error){
            //         debugger
            //         expect(error.message).to.exist
            //         // expect(error.message).to.equal('Path `price` (2000) is more than maximum allowed value (1000).')
            //     }
            // })
        })
        describe('Retrieve events', () => {
            let event, eventCreated, medicalfield, eventType, nameField, nameType
            beforeEach(async () => {
                await Event.deleteMany()
                await Organization.deleteMany()
                await User.deleteMany()
                const orga = await logic.createOrganization({ organizationName: 'prubeaaaaaa', organizationPhone: '123456789', organizationMail: 'bilal4563@gmail.com', organizationAddress: 'calee Marinaa 179', password: 'BBbb11..' })
                const user = await logic.createUser({ fullname: 'nameTest', email: 'pruebaa@gmallll.com', role: 'admin', organization: orga.id, phoneNumber: '123456789', situation: 'student', password: 'BBbb11..' })

                nameField = `Allerd${Math.floor(Math.random() * (1000 - 1)) + 1}ogy`
                nameType = `Master${Math.floor(Math.random() * (1000 - 1)) + 1}class`

                medicalfield = await logic.createMedicalField({ name: nameField })
                eventType = await logic.createEventType({ name: nameType })
                event = {
                    title: `PARA P${Math.floor(Math.random() * (1000 - 1)) + 1}OSSSST`,
                    description: `${Math.floor(Math.random() * (1000 - 1)) + 1}Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam.`,
                    field: medicalfield.id,
                    eventType: eventType.id,
                    location: { country: `Spa${Math.floor(Math.random() * (1000 - 1)) + 1}in`, city: "Madrid", address: "Plaza del sol" },
                    date: "Sun Jun 02 2019 12:38:27 GMT+0200",
                    numberTicketsAvailable: 100,
                    price: 600
                }

                let userAuthenticated = await logic.authenticateUser({ email: 'pruebaa@gmallll.com', password: 'BBbb11..' })
                debugger
                const { sub, subOrga } = userAuthenticated

                eventCreated = await logic.createEvent({ sub, subOrga }, event)
            })
            it('Shoud retrieve all the fiels if the query is not provided', async () => {

                const eventRetrieved = await logic.retrieveEvents()

                expect(eventRetrieved[0]).to.exist
                expect(eventRetrieved).to.have.lengthOf(1)
                expect(eventRetrieved[0].title).to.equal(eventCreated.title)
                expect(eventRetrieved[0].description).to.equal(eventCreated.description)
                expect(eventRetrieved[0].price).to.equal(eventCreated.price)
            })
            it('Shoud retrieve all the fiels with two parameters in the query', async () => {

                const eventRetrieved = await logic.retrieveEvents({ nameField, nameType })

                expect(eventRetrieved[0]).to.exist
                expect(eventRetrieved).to.have.lengthOf(1)
                expect(eventRetrieved[0].title).to.equal(eventCreated.title)
                expect(eventRetrieved[0].description).to.equal(eventCreated.description)
                expect(eventRetrieved[0].price).to.equal(eventCreated.price)
            })
            it('Shoud fail if any event exists with the query provided', async () => {
                try {
                    await logic.retrieveEvents({ nameField: 'cardilogy', nameType: 'conference' })

                } catch (error) {
                    expect(error.message)
                    expect(error.message).to.equal('There are no events available')
                }
            })
            it('Shoud retrieve all the fiels qith just one parametre in the query', async () => {

                const eventRetrieved = await logic.retrieveEvents({ nameField })

                expect(eventRetrieved[0]).to.exist
                expect(eventRetrieved).to.have.lengthOf(1)
                expect(eventRetrieved[0].title).to.equal(eventCreated.title)
                expect(eventRetrieved[0].description).to.equal(eventCreated.description)
                expect(eventRetrieved[0].price).to.equal(eventCreated.price)
            })
            it('Shoud fail if any event exists with the query provided', async () => {
                try {
                    await logic.retrieveEvents({ nameField: 'cardilogy' })

                } catch (error) {
                    expect(error.message)
                    expect(error.message).to.equal('There are no events available')
                }
            })
            it('Should retrieve the event providing the event ID', async () => {

                const eventRetrieved = await logic.retrieveOneEvent(eventCreated._id)

                expect(eventRetrieved).to.exist
                expect(eventRetrieved.title).to.equal(eventCreated.title)
                expect(eventRetrieved.description).to.equal(eventCreated.description)
                expect(eventRetrieved.price).to.equal(eventCreated.price)
            })
            it('Should fail if the Id event is not correct', async () => {
                try {
                    await logic.retrieveOneEvent('5cf6f504f037d0412cecad3f')
                } catch (error) {

                    expect(error.message).to.exist
                    expect(error.message).to.equal('This events does not exist anymore')
                }
            })
        })
        describe('Update event', () => {

            let event, eventCreated, medicalfield, eventType, nameField, nameType, userAuthenticated
            beforeEach(async () => {
                await Event.deleteMany()
                await Organization.deleteMany()
                await User.deleteMany()
                const orga = await logic.createOrganization({ organizationName: 'prubeaaaaaa', organizationPhone: '123456789', organizationMail: 'bilal4563@gmail.com', organizationAddress: 'calee Marinaa 179', password: 'BBbb11..' })
                const user = await logic.createUser({ fullname: 'nameTest', email: 'pruebaa@gmallll.com', role: 'admin', organization: orga.id, phoneNumber: '123456789', situation: 'student', password: 'BBbb11..' })

                nameField = `Allerd${Math.floor(Math.random() * (1000 - 1)) + 1}ogy`
                nameType = `Master${Math.floor(Math.random() * (1000 - 1)) + 1}class`

                medicalfield = await logic.createMedicalField({ name: nameField })
                eventType = await logic.createEventType({ name: nameType })
                event = {
                    title: `PARA P${Math.floor(Math.random() * (1000 - 1)) + 1}OSSSST`,
                    description: `${Math.floor(Math.random() * (1000 - 1)) + 1}Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam.`,
                    field: medicalfield.id,
                    eventType: eventType.id,
                    location: { country: `Spa${Math.floor(Math.random() * (1000 - 1)) + 1}in`, city: "Madrid", address: "Plaza del sol" },
                    date: "Sun Jun 02 2019 12:38:27 GMT+0200",
                    numberTicketsAvailable: 100,
                    price: 600
                }

                userAuthenticated = await logic.authenticateUser({ email: 'pruebaa@gmallll.com', password: 'BBbb11..' })

                // { sub, subOrga } = userAuthenticated

                eventCreated = await logic.createEvent(userAuthenticated, event)
            })
            it('Should update the description event', async () => {

                const body = 'holoooooooooooooooooooooooooooooooooooooooooooooooooooaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakkkkkkkkkkkkkkkkkkkkkkñññññññññññññññññññññññññññññññññññññññññññññññññññkkkkkkkkkkkkkkkkkkkkkkkkñññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññ'

                const eventUpdated = await logic.updateDescriptionEvent(eventCreated.id, userAuthenticated, body)

                expect(eventUpdated.description).to.equal(body)
            })
            it('Should not leave a normal user update the event decription', async () => {
                let { sub, subOrga } = userAuthenticated
                const body = 'holoooooooooooooooooooooooooooooooooooooooooooooooooooaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakkkkkkkkkkkkkkkkkkkkkkñññññññññññññññññññññññññññññññññññññññññññññññññññkkkkkkkkkkkkkkkkkkkkkkkkñññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññ'
                try {
                    await logic.updateDescriptionEvent(eventCreated.id, sub, body)
                } catch (error) {
                    expect(error.message).to.exist
                    expect(error.message).to.equal('You are now allowed to modify this event')
                }
            })
        })
        describe('Posts', () => {
            let event, eventCreated, medicalfield, eventType, nameField, nameType, userAuthenticated, userNormalAuthenticated
            beforeEach(async () => {

                await Event.deleteMany()
                await Organization.deleteMany()
                await User.deleteMany()
                const orga = await logic.createOrganization({ organizationName: 'prubeaaaaaa', organizationPhone: '123456789', organizationMail: 'bilal4563@gmail.com', organizationAddress: 'calee Marinaa 179', password: 'BBbb11..' })
                const user = await logic.createUser({ fullname: 'nameTest', email: 'pruebaa@gmallll.com', role: 'admin', organization: orga.id, phoneNumber: '123456789', situation: 'student', password: 'BBbb11..' })
                const userNormal = await logic.createUser({ fullname: 'nameTest', email: 'pruebaaNormal@gmallll.com', role: 'normal', phoneNumber: '123456789', situation: 'student', password: 'BBbb11..' })

                nameField = `Allerd${Math.floor(Math.random() * (1000 - 1)) + 1}ogy`
                nameType = `Master${Math.floor(Math.random() * (1000 - 1)) + 1}class`
                medicalfield = await logic.createMedicalField({ name: nameField })
                eventType = await logic.createEventType({ name: nameType })

                event = {
                    title: `PARA P${Math.floor(Math.random() * (1000 - 1)) + 1}OSSSST`,
                    description: `${Math.floor(Math.random() * (1000 - 1)) + 1}Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam.`,
                    field: medicalfield.id,
                    eventType: eventType.id,
                    location: { country: `Spa${Math.floor(Math.random() * (1000 - 1)) + 1}in`, city: "Madrid", address: "Plaza del sol" },
                    date: "Sun Jun 02 2019 12:38:27 GMT+0200",
                    numberTicketsAvailable: 100,
                    price: 600
                }

                userAuthenticated = await logic.authenticateUser({ email: 'pruebaa@gmallll.com', password: 'BBbb11..' })

                userNormalAuthenticated = await logic.authenticateUser({ email: 'pruebaaNormal@gmallll.com', password: 'BBbb11..' })

                eventCreated = await logic.createEvent(userAuthenticated, event)

            })
            it('Should add a post by the event representant as an answer ', async () => {
                text = "pruebaaaaaaa"
                let { sub, subOrga } = userAuthenticated
                debugger
                const post = await logic.addNewPost(eventCreated.id, userAuthenticated, { text })

                expect(post).to.exist
                expect(post.roleAuthor).to.equal('Representant of the event')

            })
            it('Should add a post by a normal user as an question ', async () => {
                text = "pruebaaaaaaa"
                const post = await logic.addNewPost(eventCreated.id, userNormalAuthenticated, { text })
                debugger
                expect(post).to.exist
                expect(post.roleAuthor).to.equal('normal')
            })
            it('Should retrieve the posts', async () => {
                const posts = await logic.retrievePosts(eventCreated.id)

                expect(posts).to.exist
            })
        })
    })
    describe('PURCHASE', () => {

        describe('to make a purchase', () => {

            let event, eventCreated, medicalfield, eventType, nameField, nameType, userAuthenticated, userNormalAuthenticated, numberOfticketsBoughts

            beforeEach(async () => {

                await Event.deleteMany()
                await Organization.deleteMany()
                await User.deleteMany()
                const orga = await logic.createOrganization({ organizationName: 'prubeaaaaaa', organizationPhone: '123456789', organizationMail: 'bilal4563@gmail.com', organizationAddress: 'calee Marinaa 179', password: 'BBbb11..' })
                const user = await logic.createUser({ fullname: 'nameTest', email: 'pruebaa@gmallll.com', role: 'admin', organization: orga.id, phoneNumber: '123456789', situation: 'student', password: 'BBbb11..' })
                const userNormal = await logic.createUser({ fullname: 'nameTest', email: 'pruebaaNormal@gmallll.com', role: 'normal', phoneNumber: '123456789', situation: 'student', password: 'BBbb11..' })

                nameField = `Allerd${Math.floor(Math.random() * (1000 - 1)) + 1}ogy`
                nameType = `Master${Math.floor(Math.random() * (1000 - 1)) + 1}class`
                medicalfield = await logic.createMedicalField({ name: nameField })
                eventType = await logic.createEventType({ name: nameType })

                event = {
                    title: `PARA P${Math.floor(Math.random() * (1000 - 1)) + 1}OSSSST`,
                    description: `${Math.floor(Math.random() * (1000 - 1)) + 1}Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam.`,
                    field: medicalfield.id,
                    eventType: eventType.id,
                    location: { country: `Spa${Math.floor(Math.random() * (1000 - 1)) + 1}in`, city: "Madrid", address: "Plaza del sol" },
                    date: "Sun Jun 02 2019 12:38:27 GMT+0200",
                    numberTicketsAvailable: 100,
                    price: 600
                }

                numberOfticketsBoughts = 2

                userAuthenticated = await logic.authenticateUser({ email: 'pruebaa@gmallll.com', password: 'BBbb11..' })

                userNormalAuthenticated = await logic.authenticateUser({ email: 'pruebaaNormal@gmallll.com', password: 'BBbb11..' })

                eventCreated = await logic.createEvent(userAuthenticated, event)
            })
            it('Should decrease the amount of tickets available once a purchase is done', async () => {
                debugger
                const purchase = await logic.makePurchase(eventCreated.id, userNormalAuthenticated, { numberOfticketsBoughts })

                const purchaseRetrieved = await Purchase.findById(purchase.id)
                const eventRetrieved = await Event.findById(eventCreated.id)

                expect(purchaseRetrieved).exist
                expect(eventRetrieved.numberTicketsAvailable).to.equal(98)

            })
        })

    })
    after(async () => mongoose.disconnect(true))
})