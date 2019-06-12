const { mongoose, models: { User, Event, EventType, Comment, Purchase, Organization, MedicalField } } = require('medyes-data')
const logic = require('.')
const { expect } = require('chai')




describe('LOGIC', () => {
    let superUser,fullname, email, undefined, phone, position, password
    before(async() => {
       await  mongoose.connect('mongodb://localhost/project-test', { useNewUrlParser: true })
    })

    beforeEach(async()=>{
        await User.deleteMany()
       debugger
       superUser= await logic.createUser(fullname='superName', email='superMail@supermail.com', role = 'normal', organization=undefined, phone='super1234578', position='planner', password='BBbb11..')
       debugger
       superUser.role='superAdmin'
       debugger
       await superUser.save()
     
    })

    describe('MEDICAL-FIELDS', () => {

        let name

        beforeEach(async () => {

            await MedicalField.deleteMany()

            name = `Allerd${Math.floor(Math.random() * (1000 - 1)) + 1}ogy`
        })
        describe('Create a medical field', () => {
            let field
            it('Should create the entry', async () => {
                field = await logic.createMedicalField(superUser.id, name)

                expect(field).to.not.be.undefined
                expect(field.name).to.equal(name)
            })
            it('Should fail if name is not a String ', async () => {
                try {
                    name = 5

                    field = await logic.createMedicalField(superUser.id, name)
                } catch (error) {
                    expect(error.message).to.not.be.undefined
                    expect(error.message).to.equal('"name" must be a string')
                }
            })
            it('should fail if the field has more than 40 carachters', async () => {
                try {
                    name = "sjhsaajkascnanasclnlnlncan kbbjklnlbjkbacnldslncnlcdnanaclknalnadlañlda.acdndjbdcdajbackjbakbj"
                    field = await logic.createMedicalField(superUser.id, name)
                } catch (error) {
                    expect(error.message).to.not.be.undefined
                    expect(error.message).to.equal("Path `name` (`sjhsaajkascnanasclnlnlncan kbbjklnlbjkbacnldslncnlcdnanaclknalnadlañlda.acdndjbdcdajbackjbakbj`) is longer than the maximum allowed length (40).")
                }
            })
        })
        describe('Retrieve a field', () => {
            let field
            beforeEach(async () => field = await logic.createMedicalField(superUser.id, name)
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

            name = 'Allerd${Math.floor(Math.random() * (1000 - 1)) + 1}ogy'

            beforeEach(async () => {

                await logic.createMedicalField(superUser.id, name)
                await logic.createMedicalField(superUser.id, name)
                await logic.createMedicalField(superUser.id, name)
                await logic.createMedicalField(superUser.id, name)
                await logic.createMedicalField(superUser.id, name)
                // fields = new Array(10).fill().map(field => {
                //     return field = {
                //         name: `Allerd${Math.floor(Math.random() * (1000 - 1)) + 1}ogy`
                //     }
                // })
                // return await Promise.all(fields.map(async field => await logic.createMedicalField(field)))
            })
            it('Should retrieve all the fields', async () => {
                const campos = await logic.getAllfields()
                expect(campos).to.have.lengthOf(5)
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
                const event = await logic.createEventType(superUser.id,name)

                expect(event).to.not.be.undefined
                expect(event.name).to.equal(name)
            })
            it('Should fail if name is not a String ', async () => {
                try {
                    name = 5

                    field = await logic.createEventType(superUser.id, name)
                } catch (error) {
                    expect(error.message).to.not.be.undefined
                    expect(error.message).to.equal('"name" must be a string')
                }
            })
            it('should fail if the event type name has more than 40 carachters', async () => {
                try {
                    name = "sjhsaajkascnanasclnlnlncan kbbjklnlbjkbacnldslncnlcdnanaclknalnadlañlda.acdndjbdcdajbackjbakbj"
                    field = await logic.createEventType(superUser.id, name)
                } catch (error) {
                    expect(error.message).to.not.be.undefined
                    expect(error.message).to.equal("Path `name` (`sjhsaajkascnanasclnlnlncan kbbjklnlbjkbacnldslncnlcdnanaclknalnadlañlda.acdndjbdcdajbackjbakbj`) is longer than the maximum allowed length (40).")
                }
            })
        })
        describe('Retrieve the event type', () => {
            let events
            beforeEach(async () => eventType = await logic.createEventType(superUser.id,name)
            )
            it('Should retrieve the event type providing the id ', async () => {

                const eventTypeRetrieved = await logic.getOneEventType(eventType.id)

                expect(eventTypeRetrieved).to.not.be.undefined
                expect(eventTypeRetrieved.id).to.exist
                expect(eventTypeRetrieved.name).to.equal(name)
            })
        })
        describe('Retrieve all event types', () => {
            let events;

            beforeEach(async () => {
                await logic.createEventType(superUser.id, name)
                await logic.createEventType(superUser.id, name)
                await logic.createEventType(superUser.id, name)
                await logic.createEventType(superUser.id, name)
                await logic.createEventType(superUser.id, name)
            })
            it('Should retrieve all the fields', async () => {
                const campos = await logic.getAllEventTypes()

                expect(campos).to.have.lengthOf(5)
            })
        })
    })
    describe('USERS', () => {

        let orga
        let fullname, email, role, organization, phoneNumber, situation, password

        beforeEach(async () => {

            await Organization.deleteMany()

            name = `Enterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            phone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            address = `adresssss-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            mail = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
            debugger
            orga = await logic.createOrganization(superUser.id, name, phone, address, mail)

            fullname = `Carlos-${Math.floor(Math.random() * (1000 - 1)) + 1}tonto`
            email = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
            position = 'student'
            password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`
        })
        describe('Create Admin User', () => {

            it('Should create a representant of random company', async () => {
                role = 'admin'
                debugger
                const userAdmin = await logic.createUser(fullname, email, role, organization = orga.id, phone, position, password)

                expect(userAdmin).to.exist
                expect(userAdmin.organization).to.be.an('object')

                const user = await User.findById(userAdmin.id)

                expect(user.fullname).to.equal(fullname)
                expect(user.email).to.equal(email)
                expect(user.role).to.equal(role)
                expect(user.phone).to.equal(phone)
                expect(user.position).to.equal(position)
                expect(user.password).to.exist
            })
            it('Should fail if the user role is normal', async () => {

                role = 'normal';
                let userAdmin
                try {
                    await logic.createUser(fullname, email, role, organization = orga.id, phone, position, password)
                } catch (error) {
                    expect(userAdmin).to.be.undefined
                    expect(error.message).to.equal('You should not have a Organization ID')
                }
            })
            it('should fail if the user provide us a none correct Organization ID', async () => {

                try {
                    role = 'admin'

                    await logic.createUser(fullname, email, role, organization = '5cf61de6bf73b3409c82f329', phone, position, password)
                } catch (error) {
                    expect(error.message).to.exist
                    expect(error.message).to.equal('Organization not found')
                }
            })
            it('Should fail is the information provided is not accepted by the validator', async () => {

                try {
                    role = 'admin'

                    await logic.createUser(fullname, email, role, organization, phone, position, password = '123')
                } catch (error) {
                    expect(error.message).to.exist
                    expect(error.message).to.equal('"password" must meet password complexity requirements')
                }
            })
            it('Should fail is the user already exists', async () => {
                role = 'admin'

                await logic.createUser(fullname, email = 'usesexisting@gmail.es', role, organization = orga.id, phone, position, password)
                try {

                    await logic.createUser(fullname, email = 'usesexisting@gmail.es', role, organization = orga.id, phone, position, password)
                } catch (error) {

                    expect(error.message).to.be.not.undefined
                    expect(error.message).to.equal(`The user with the email usesexisting@gmail.es already exists`)
                }
            })
            it('should fail if the user situation does not match with the options', async () => {
                try {
                    role = 'admin'

                    await logic.createUser(fullname, email, role, organization = orga.id, phone, position = 'nonCorrectsituation', password)
                } catch (error) {

                    expect(error.message).to.be.not.undefined
                    expect(error.message).to.equal('the value introduced does not match with the options')
                }
            })
        })
        describe('Create Normal User', () => {


            it('should create a normal user', async () => {
                debugger
                const normalUser = await logic.createUser(fullname, email, role = 'normal', undefined, phone, position, password)

                expect(normalUser).to.exist
                expect(normalUser.role).to.equal('normal')
                expect(normalUser).to.be.an('object')
                debugger
                const userResult = await User.findById(normalUser.id)

                role = 'normal'
    
                expect(userResult.fullname).to.equal(fullname)
                expect(userResult.email).to.equal(email)
                expect(userResult.role).to.equal(role)
                expect(userResult.phone).to.equal(phone)
                expect(userResult.position).to.equal(position)
                expect(userResult.password).to.exist
            })
            it('should fail if the user situation does not match with the options', async () => {
                try {
                    const normalUser = await logic.createUser(fullname, email, role = 'normal', undefined, phone, position = 'non correct position', password)
                } catch (error) {
                    expect(error.message).to.be.not.undefined
                    expect(error.message).to.equal('the value introduced does not match with the options')
                }
            })
            it('Should fail if a normal user provide us an Organization ID', async () => {
                try {
                    const normalUser = await logic.createUser(fullname, email, role = 'normal', organization = orga.id, phone, position, password)
                } catch (error) {
                    expect(error.message).to.be.not.undefined
                    expect(error.message).to.equal('You should not have a Organization ID')
                }
            })

        })
        describe('Authenticate Admin USer', () => {
            let user, orga
            beforeEach(async () => {
                orga = await logic.createOrganization(superUser.id, name = 'testName56', phone = '123test456', address = 'CAlle roc borronat', mail = 'testemail@gmila.com')
                user = await logic.createUser(fullname, email, role = 'admin', organization = orga.id, phone, position, password)
                debugger
            })

            it('Should succed if the credentials are correct', async () => {
                user = await logic.authenticateUser(email, password)

                expect(user).to.exist
                expect(user).to.be.an('object')
            })
            it('Should fail if the is not properly written', async () => {
                try {
                    const email = 'nowrittenprop@.com'
                    user = await logic.authenticateUser(email, password)
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal('"email" must be a valid email')
                }
            })
            it('Should fail if the email does not exist', async () => {
                try {
                    const email = 'holhola@gmail.com'
                    user = await logic.authenticateUser(email, password)
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal(`User with the email holhola@gmail.com doesn't exist`)
                }
            })
            it('Should fail if the password is not correct', async () => {
                try {
                    password = 'LLbb33..'
                    user = await logic.authenticateUser(email, password)
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal('Wrong credentials!')
                }
            })
        })
        describe('Authenticate Normal USer', () => {
            beforeEach(async () => {
                await logic.createUser(fullname, email, role = 'normal', undefined, phone, position, password)
            })

            it('Should succed if the credentials are correct', async () => {
                const user = await logic.authenticateUser(email, password)

                expect(user).to.exist
                expect(user).to.be.an('object')
            })
            it('Should fail if the is not properly written', async () => {
                try {
                    const email = 'nowrittenprop@.com'
                    const user = await logic.authenticateUser(email, password)
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal('"email" must be a valid email')
                }
            })
            it('Should fail if the email does not exist', async () => {
                try {
                    const email = 'holhola@gmail.com'
                    const user = await logic.authenticateUser(email, password)
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal(`User with the email holhola@gmail.com doesn't exist`)
                }
            })
            it('Should fail if the password is not correct', async () => {
                try {
                    password = 'LLbb33..'
                    const user = await logic.authenticateUser(email, password)
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equal('Wrong credentials!')
                }
            })
        })
        describe('Retrieve User', () => {
            let user
            beforeEach(async () => {
                debugger
                user = await logic.createUser(fullname, email, role = 'normal', undefined, phone, position, password)
            })
            it('Should Retrieve a user that have been created before', async () => {
                const userRetrieved = await logic.retrieveUser(user.id)

                expect(userRetrieved).to.exist
                expect(userRetrieved.email).to.equal(email)
                expect(userRetrieved.role).to.equal(role)
                expect(userRetrieved.position).to.equal(position)
            })
        })
    })

    describe('ORGANIZATION', () => {

        let name, phone, address, mail

        beforeEach(async () => {

            await Organization.deleteMany()

            name = `Enterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            phone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            address = `adresssss-${Math.floor(Math.random() * (1000 - 1)) + 1}`
            mail = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmal.com`

        })
        describe('Register organization', () => {
            it('Should succed registering a new organization', async () => {
                debugger
                const res = await logic.createOrganization(superUser.id, name, phone, address, mail)
                debugger
                expect(res).to.exist

                const orga = await Organization.find()
                debugger
                expect(orga).to.exist
                expect(orga).to.have.lengthOf(1)

                const [organization] = orga
                expect(organization.name).to.equal(name)
                expect(organization.phone).to.equal(phone)
                expect(organization.address).to.equal(address)
                expect(organization.mail).to.equal(mail)
            })
            it('Should fail if the email already exists', async () => {
                await logic.createOrganization(superUser.id, name = 'entreprise-prueba', phone = '123456789', address = 'Calle de la marina', mail = 'email@gmaiiil.com')
                try {
                    await logic.createOrganization(superUser.id, name, phone, address, organizationMail = 'email@gmaiiil.com')
                } catch (error) {
                    expect(error.message).to.be.not.undefined
                    expect(error.message).to.equal(`The organization with the email email@gmaiiil.com already exists`)
                }
            })
            it('Should fail if the organization name has less than 10 characters', async () => {
                try {
                    await logic.createOrganization(superUser.id, name = 'bilalot', phone, address, organizationMail)

                } catch (error) {
                    expect(error.message).to.exist
                    expect(error.message).to.equal("Path `name` (`bilalot`) is shorter than the minimum allowed length (10).")
                }
            })
        })
        describe('Retrieve Organization', () => {
            let orga
            beforeEach(async () => orga = await logic.createOrganization(superUser.id, name, phone, address, mail))

            it('Should retrieve a correct user', async () => {
                const result = await logic.retrieveOrganization(orga._id)

                expect(result).to.exist
                expect(result).to.be.an('object')

                expect(result.id).to.not.be.undefined

                expect(result.name).to.equal(name)
                expect(result.phone).to.equal(phone)
                expect(result.address).to.equal(address)
                expect(result.mail).to.equal(mail)

            })
            it('should fail if the Organization does not exist', async () => {
                try {
                    await logic.retrieveOrganization('5cf3a7d829aec72e183cb119')
                } catch (error) {
                    expect(error.message).to.exist
                    expect(error.message).to.equal('Organization does not exist')
                }
            })
        })
    })
    describe('EVENT', () => {
        describe('Create an event', () => {
            let orga, mail, userAuthenticated, event, medicalField, field, eventType, title, description, numberTicketsAvailable, price, location, date
            let user, fullname, email, organization, phone, position

            beforeEach(async () => {
                await Event.deleteMany()
                await Organization.deleteMany()

                name = `Enterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                phone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                mail = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
                address = `adresssss-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                debugger
                orga = await logic.createOrganization(superUser.id, name, phone, address, mail)

                fullname = `Carlos-${Math.floor(Math.random() * (1000 - 1)) + 1}tonto`
                email = `user-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
                phone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                position = 'student'
                password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`

                user = await logic.createUser(fullname, email, role = 'admin', organization = orga.id, phone, position, password)
                userAuthenticated = await logic.authenticateUser(email, password)
                debugger
                let nameField = `Allerd${Math.floor(Math.random() * (1000 - 1)) + 1}ogy`
                let nameType = `Master${Math.floor(Math.random() * (1000 - 1)) + 1}class`

                field = await logic.createMedicalField(superUser.id, name = nameField)
                eventType = await logic.createEventType(superUser.id, name = nameType)


                title = "PARA POSSSST"
                description = " Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam."
                medicalField = field.id
                eventType = eventType.id
                location = { "country": "Spain", "city": "Madrid", "address": "Plaza del sol" }
                date = "Sun Jun 02 2019 12:38:27 GMT+0200"
                numberTicketsAvailable = 100
                price = 600
                debugger
            })
            it('a User Admin Should be able to create an event', async () => {
                debugger
                const { userId, orgId } = userAuthenticated
                const eventCreated = await logic.createEvent(userId, orgId, title, description, medicalField, eventType, location, date, numberTicketsAvailable, price)

                const eventFound = await Event.findById(eventCreated.id)

                expect(eventCreated).to.exist
                expect(eventCreated.description).to.exist
                expect(eventCreated.medicalField).to.be.an('object')
                expect(eventCreated.eventType).to.be.an('object')
                expect(eventCreated.location).to.exist
                expect(eventCreated.price).to.equal(price)
            })
            it('should fail if the organization in not provided in the token', async () => {
                debugger
                try {
                    let { userId, orgId } = userAuthenticated
                    org = undefined
                    await logic.createEvent(userId,undefined, title, description, medicalField, eventType, location, date, numberTicketsAvailable, price)
                } catch (error) {
                    expect(error.message).to.exist
                    expect(error.message).to.equal('You are not allowed to create events')
                }
            })
            it('should fail if the fields are not correct', async () => {
                title = 533263
                try {
                    const { userId, orgId } = userAuthenticated
                    await logic.createEvent(userId, orgId, title, description, medicalField, eventType, location, date, numberTicketsAvailable, price)
                } catch (error) {
                    expect(error.message).to.exist
                    expect(error.message).to.equal('"title" must be a string')
                }
            })
            it('should fail if Mongoose Schema is not respected', async () => {
                price = 2000
                try {
                    const { userId, orgId } = userAuthenticated
                    await logic.createEvent(userId, orgId, title, description, medicalField, eventType, location, date, numberTicketsAvailable, price)
                } catch (error) {

                    expect(error.message).to.exist
                    expect(error.message).to.equal('Path `price` (2000) is more than maximum allowed value (1000).')
                }
            })
        })
        describe('Retrieve events', () => {
            let orga, mail, userAuthenticated, event, medicalField, field, eventType, title, description, numberTicketsAvailable, price, location, date
            let user, fullname, email, organization, phone, position, eventCreated
            let nameMedicalField, nameEventType

            beforeEach(async () => {
                await MedicalField.deleteMany()
                await EventType.deleteMany()
                await Event.deleteMany()
                await Organization.deleteMany()

                name = `Enterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                phone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                mail = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
                address = `adresssss-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                debugger
                orga = await logic.createOrganization(superUser.id, name, phone, address, mail)

                fullname = `Carlos-${Math.floor(Math.random() * (1000 - 1)) + 1}tonto`
                email = `user-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
                phone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                position = 'student'
                password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`

                user = await logic.createUser(fullname, email, role = 'admin', organization = orga.id, phone, position, password)
                const { userId,orgId } = await logic.authenticateUser(email, password)

                nameMedicalField = `Allerd${Math.floor(Math.random() * (1000 - 1)) + 1}ogy`
                nameEventType = `Master${Math.floor(Math.random() * (1000 - 1)) + 1}class`

                field = await logic.createMedicalField(superUser.id, name = nameMedicalField)
                eventType = await logic.createEventType(superUser.id, name = nameEventType)


                title = "PARA POSSSST"
                description = " Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam."
                medicalField = field.id
                eventType = eventType.id
                location = { "country": "Spain", "city": "Madrid", "address": "Plaza del sol" }
                date = "Sun Jun 02 2019 12:38:27 GMT+0200"
                numberTicketsAvailable = 100
                price = 600

                eventCreated = await logic.createEvent(userId,orgId , title, description, medicalField, eventType, location, date, numberTicketsAvailable, price)

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
                debugger
                const eventRetrieved = await logic.retrieveEvents(nameMedicalField, nameEventType)

                expect(eventRetrieved[0]).to.exist
                expect(eventRetrieved).to.have.lengthOf(1)
                expect(eventRetrieved[0].title).to.equal(eventCreated.title)
                expect(eventRetrieved[0].description).to.equal(eventCreated.description)
                expect(eventRetrieved[0].price).to.equal(eventCreated.price)
            })
            it('Shoud fail if any event exists with the queries provided', async () => {
                try {
                    await logic.retrieveEvents(nameMedicalField = 'cardilogy', nameEventType = 'conference')

                } catch (error) {
                    expect(error.message)
                    expect(error.message).to.equal('There are no events available')
                }
            })
            it('Shoud retrieve all the fiels with just one parametre in the query', async () => {
                debugger
                const eventRetrieved = await logic.retrieveEvents(nameMedicalField)
                debugger
                expect(eventRetrieved[0]).to.exist
                expect(eventRetrieved).to.have.lengthOf(1)
                expect(eventRetrieved[0].title).to.equal(title)
                expect(eventRetrieved[0].description).to.equal(description)
                expect(eventRetrieved[0].price).to.equal(price)
            })
            it('Shoud fail if any event exists with the query provided', async () => {
                try {
                    await logic.retrieveEvents(nameMedicalField = 'cardilogy')

                } catch (error) {
                    expect(error.message)
                    expect(error.message).to.equal('There are no events available')
                }
            })
            it('Should retrieve the event providing the event ID', async () => {

                const eventRetrieved = await logic.retrieveOneEvent(eventCreated.id)

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

            let orga, mail, userAuthenticated, event, medicalField, field, eventType, title, description, numberTicketsAvailable, price, location, date
            let user, fullname, email, organization, phone, position, eventCreated
            let nameMedicalField, nameEventType

            beforeEach(async () => {
                await MedicalField.deleteMany()
                await EventType.deleteMany()
                await Event.deleteMany()
                await Organization.deleteMany()

                name = `Enterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                phone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                mail = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
                address = `adresssss-${Math.floor(Math.random() * (1000 - 1)) + 1}`

                orga = await logic.createOrganization(superUser.id, name, phone, address, mail)

                fullname = `Carlos-${Math.floor(Math.random() * (1000 - 1)) + 1}tonto`
                email = `user-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
                phone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                position = 'student'
                password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`

                user = await logic.createUser(fullname, email, role = 'admin', organization = orga.id, phone, position, password)
                userAuthenticated = await logic.authenticateUser(email, password)

                nameMedicalField = `Allerd${Math.floor(Math.random() * (1000 - 1)) + 1}ogy`
                nameEventType = `Master${Math.floor(Math.random() * (1000 - 1)) + 1}class`

                field = await logic.createMedicalField(superUser.id, name = nameMedicalField)
                eventType = await logic.createEventType(superUser.id, name = nameEventType)


                title = "PARA POSSSST"
                description = " Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam."
                medicalField = field.id
                eventType = eventType.id
                location = { "country": "Spain", "city": "Madrid", "address": "Plaza del sol" }
                date = "Sun Jun 02 2019 12:38:27 GMT+0200"
                numberTicketsAvailable = 100
                price = 600

                const { userId,orgId  } = userAuthenticated

                eventCreated = await logic.createEvent(userId,orgId , title, description, medicalField, eventType, location, date, numberTicketsAvailable, price)

            })
            it('Should update the description event', async () => {
                debugger
                const { userId,orgId  } = userAuthenticated
                const body = 'holoooooooooooooooooooooooooooooooooooooooooooooooooooaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakkkkkkkkkkkkkkkkkkkkkkñññññññññññññññññññññññññññññññññññññññññññññññññññkkkkkkkkkkkkkkkkkkkkkkkkñññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññ'

                const eventUpdated = await logic.updateDescriptionEvent(eventCreated.id, userId, body)

                expect(eventUpdated.description).to.equal(body)
            })
            it('Should not leave a normal user update the event decription', async () => {
                let { userId,orgId } = userAuthenticated
                const body = 'holoooooooooooooooooooooooooooooooooooooooooooooooooooaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakkkkkkkkkkkkkkkkkkkkkkñññññññññññññññññññññññññññññññññññññññññññññññññññkkkkkkkkkkkkkkkkkkkkkkkkñññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññ'
                try {
                    await logic.updateDescriptionEvent(eventCreated.id, '5cfa39b8b47eb914acb14204', body)
                } catch (error) {
                    expect(error.message).to.exist
                    expect(error.message).to.equal('Just who created the event is allowed to carry out modifications')
                }
            })
        })
        describe('Posts', () => {
            let event, eventCreated, medicalfield, eventType, nameField, nameType, userAdminAuthenticated, userNormalAuthenticated, userAdmin, userNormal, orga
            beforeEach(async () => {
                await MedicalField.deleteMany()
                await EventType.deleteMany()
                await Event.deleteMany()
                await Organization.deleteMany()

                debugger
                orga = await logic.createOrganization(superUser.id, name = 'prubeaaaaaa', phone = '1234567891', address = 'calee Marinaa 179', mail = 'bilal4563@gmail.com')
                userAdmin = await logic.createUser(fullname = 'nameTest', email = 'pruebaa@gmallll.com', role = 'admin', organization = orga.id, phone = '1234567891', position = 'student', password = 'BBbb11..')
                userNormal = await logic.createUser(fullname = 'nameTest', email = 'pruebaaNormal@gmallll.com', role = 'normal', undefined, phone = '1234567891', position = 'student', password = 'BBbb11..')

                nameMedicalField = `Allerd${Math.floor(Math.random() * (1000 - 1)) + 1}ogy`
                nameEventType = `Master${Math.floor(Math.random() * (1000 - 1)) + 1}class`

                field = await logic.createMedicalField(superUser.id, name = nameMedicalField)
                eventType = await logic.createEventType(superUser.id, name = nameEventType)

                title = "PARA POSSSST"
                description = " Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam."
                medicalField = field.id
                eventType = eventType.id
                location = { "country": "Spain", "city": "Madrid", "address": "Plaza del sol" }
                date = "Sun Jun 02 2019 12:38:27 GMT+0200"
                numberTicketsAvailable = 100
                price = 600

                userAdminAuthenticated = await logic.authenticateUser(email = 'pruebaa@gmallll.com', password = 'BBbb11..')

                const { userId,orgId } = userAdminAuthenticated

                usernormalAuthenticated = await logic.authenticateUser(email = 'pruebaaNormal@gmallll.com', password = 'BBbb11..')

                eventCreated = await logic.createEvent(userId,orgId, title, description, medicalField, eventType, location, date, numberTicketsAvailable, price)

            })
            it('Should add a post by the event representant as an answer ', async () => {
                text = "pruebaaaaaaa"
                let { userId,orgId } = userAdminAuthenticated
                debugger
                const post = await logic.addNewPost(eventCreated.id, userId,orgId, text)

                expect(post).to.exist
                expect(post.roleAuthor).to.equal('Representant of the event')

            })
            it('Should add a post by a normal user as an question ', async () => {
                debugger
                text = "pruebaaaaaaa"
                const { userId } = usernormalAuthenticated
                const post = await logic.addNewPost(eventCreated.id, userId,orgId = undefined, text)
                debugger
                expect(post).to.exist
                expect(post.roleAuthor).to.equal('normal')
            })
            it('Should retrieve the posts', async () => {
                debugger
                text = "pruebaaaaaaa"
                const { userId } = usernormalAuthenticated
                let posts = await logic.addNewPost(eventCreated.id, userId,orgId = undefined, text)

                posts = await logic.retrievePosts(eventCreated.id)

                expect(posts).to.exist
            })
        })
    })
    describe('PURCHASE', () => {

        describe('to make a purchase', () => {

            let event, eventCreated, medicalfield, eventType, nameField, nameType, userAdminAuthenticated, userNormalAuthenticated, userAdmin, userNormal, orga, numberOfticketsBoughts
            beforeEach(async () => {
                await MedicalField.deleteMany()
                await EventType.deleteMany()
                await Event.deleteMany()
                await Organization.deleteMany()

                orga = await logic.createOrganization(superUser.id, name = 'prubeaaaaaa', phone = '1234567891', address = 'calee Marinaa 179', mail = 'bilal4563@gmail.com')
                userAdmin = await logic.createUser(fullname = 'nameTest', email = 'pruebaa@gmallll.com', role = 'admin', organization = orga.id, phone = '1234567891', position = 'student', password = 'BBbb11..')
                userNormal = await logic.createUser(fullname = 'nameTest', email = 'pruebaaNormal@gmallll.com', role = 'normal', undefined, phone = '1234567891', position = 'student', password = 'BBbb11..')

                nameMedicalField = `Allerd${Math.floor(Math.random() * (1000 - 1)) + 1}ogy`
                nameEventType = `Master${Math.floor(Math.random() * (1000 - 1)) + 1}class`

                field = await logic.createMedicalField(superUser.id, name = nameMedicalField)
                eventType = await logic.createEventType(superUser.id, name = nameEventType)

                title = "PARA POSSSST"
                description = " Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam."
                medicalField = field.id
                eventType = eventType.id
                location = { "country": "Spain", "city": "Madrid", "address": "Plaza del sol" }
                date = "Sun Jun 02 2019 12:38:27 GMT+0200"
                numberTicketsAvailable = 100
                price = 600

                userAdminAuthenticated = await logic.authenticateUser(email = 'pruebaa@gmallll.com', password = 'BBbb11..')

                const { userId,orgId } = userAdminAuthenticated

                userNormalAuthenticated = await logic.authenticateUser(email = 'pruebaaNormal@gmallll.com', password = 'BBbb11..')

                eventCreated = await logic.createEvent(userId,orgId, title, description, medicalField, eventType, location, date, numberTicketsAvailable, price)

                numberOfTickets = 2
                debugger
            })
            it('Should decrease the amount of tickets available once a purchase is done', async () => {
                
                const { userId } = userNormalAuthenticated
                debugger
                const purchase = await logic.makePurchase(eventCreated.id, userId, numberOfTickets)
                const purchaseRetrieved = await Purchase.findById(purchase.id)
                const eventRetrieved = await Event.findById(eventCreated.id)

                expect(purchaseRetrieved).exist
                expect(eventRetrieved.numberTicketsAvailable).to.equal(98)

            })
        })

    })
    after(async () => mongoose.disconnect(true))
})