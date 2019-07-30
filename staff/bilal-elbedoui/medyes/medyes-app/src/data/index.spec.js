const { mongoose, models: { User, Event, EventType, Comment, Purchase, Organization, MedicalField } } = require('medyes-data')
const { expect } = require('chai')


const users = require('./users')
const organizations = require('./organizations')
const events = require('./events')



describe('API-CLIENT', () => {

    (async () => {
        try {
            mongoose.connect('mongodb://localhost/project-test', { useNewUrlParser: true, useCreateIndex: true })

            console.log('Connected to the project database react...')
        } catch (error) {
            console.log('Cannot connecte to the db...')
        }
    })()

    let superUser, superOrg, name, phone, address, mail, fullname, email, role, organization, position, password
    beforeEach(async () => {
        debugger
        await User.deleteMany()
        await Organization.deleteMany()


        superUser = await users.createUser(fullname = 'superName', email = 'superMail@supermail.com', role = 'normal', organization = undefined, phone = 'super1234578', position = 'planner', password = 'BBbb11..')
        debugger
        [superUser] = await User.find({ email })

        superUser.role = 'superAdmin'

        await superUser.save();

        const { data: { token } } = await users.authenticateUser(email, password)

        mail = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmal.com`

        superOrg = await organizations.createOrganization(token, name = 'superOrgafull', phone = '32165498720', address = 'Calle del puente muerto', mail)
    })


    describe.skip('USERS', () => {

        describe('Create the different users', () => {
            beforeEach(() => {

                fullname = `Carlos-${Math.floor(Math.random() * (1000 - 1)) + 1}tonto`
                organization = undefined
                email = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
                phone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                position = 'student'
                password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`

            })
            it('Should create a normal user', async () => {
                role = 'normal'

                const response = await users.createUser(fullname, email, role, organization, phone, position, password)

                expect(response.data.message).to.equal('User registered')
            })
            it('Should create a representant of random company', async () => {
                debugger
                [superOrg] = await Organization.find({ mail })

                role = 'admin'
                const response = await users.createUser(fullname, email, role, organization = superOrg.id, phone, position, password)

                expect(response).to.exist
                expect(response.data.message).to.equal('User registered')

                const userCreated = await User.find({ 'email': email })

                const [user] = userCreated

                expect(user.fullname).to.equal(fullname)
                expect(user.email).to.equal(email)
                expect(user.role).to.equal(role)
                expect(user.phone).to.equal(phone)
                expect(user.position).to.equal(position)
                expect(user.password).to.exist
            })
        })
        describe('Authenticate Admin USer', () => {
            let user, orga, fullname, email, role, organization, phone, position, password, response
            beforeEach(async () => {
                debugger
                [superOrg] = await Organization.find({ mail })
                email = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
                user = await users.createUser(fullname = 'bilalAuth', email, role = 'admin', organization = superOrg.id, phone = "1234567899", position = 'planner', password = 'BBbb11..')
                debugger
            })

            it('Should succed if the credentials are correct', async () => {
                debugger
                response = await users.authenticateUser(email, password)
                debugger
                expect(response.data.message).to.exist
                expect(response.data.message).to.equal("User logged in")
            })
            it('Should fail if the is not properly written', async () => {
                try {
                    debugger
                    email = 'nowrittenprop@.com'
                    response = await users.authenticateUser(email, password)
                } catch (error) {
                    debugger
                    expect(error).to.exist
                    expect(error.response.data.error).to.equal('"email" must be a valid email')
                }
            })
            it('Should fail if the email does not exist', async () => {
                try {
                    const email = 'holhola@gmail.com'
                    user = await users.authenticateUser(email, password)
                } catch (error) {
                    expect(error).to.exist
                    expect(error.response.data.error).to.equal(`User with the email holhola@gmail.com doesn't exist`)
                }
            })
            it('Should fail if the password is not correct', async () => {
                try {
                    password = 'LLbb33..'
                    response = await users.authenticateUser(email, password)
                } catch (error) {
                    expect(error).to.exist
                    expect(error.response.data.error).to.equal('Wrong credentials!')
                }
            })
        })
        describe('Authenticate Normal USer', () => {
            let fullname, email, role, undefined, phone, position, password
            beforeEach(async () => {
                fullname = `Carlos-${Math.floor(Math.random() * (1000 - 1)) + 1}tonto`
                email = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
                phone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                position = 'student'
                password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                await users.createUser(fullname, email, role = 'normal', undefined, phone, position, password)
            })

            it('Should succed if the credentials are correct', async () => {
                const response = await users.authenticateUser(email, password)

                expect(response.data.message).to.exist
            })
            it('Should fail if the is not properly written', async () => {
                try {
                    email = 'nowrittenprop@.com'
                    const response = await users.authenticateUser(email, password)
                } catch (error) {
                    expect(error).to.exist
                    expect(error.response.data.error).to.equal('"email" must be a valid email')
                }
            })
            it('Should fail if the email does not exist', async () => {
                try {
                    const email = 'holhola@gmail.com'
                    const user = await users.authenticateUser(email, password)
                } catch (error) {
                    expect(error).to.exist
                    expect(error.response.data.error).to.equal(`User with the email holhola@gmail.com doesn't exist`)
                }
            })
            it('Should fail if the password is not correct', async () => {
                try {
                    password = 'LLbb33..'
                    const user = await users.authenticateUser(email, password)
                } catch (error) {
                    expect(error).to.exist
                    expect(error.response.data.error).to.equal('Wrong credentials!')
                }
            })
        })
        describe('Retrieve User', () => {
            let fullname, email, role, undefined, phone, position, password, user, userAuthenticated
            beforeEach(async () => {
                fullname = `Carlos-${Math.floor(Math.random() * (1000 - 1)) + 1}tonto`
                email = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
                phone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                position = 'student'
                password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`

                user = await users.createUser(fullname, email, role = 'normal', undefined, phone, position, password)

                userAuthenticated = await users.authenticateUser(email, password)

            })
            it('Should Retrieve a user that have been created before', async () => {
                const { data: { token } } = userAuthenticated
                debugger
                const userRetrieved = await users.retrieveUser(token)
                debugger
                expect(userRetrieved).to.exist
                expect(userRetrieved.data.email).to.equal(email)
                expect(userRetrieved.data.role).to.equal(role)
                expect(userRetrieved.data.position).to.equal(position)
                expect(userRetrieved.status).to.equal(200)
            })
        })
    })
    describe('EVENTS', () => {
        describe('Retrieve Events', () => {
            beforeEach(async () => {
                // await MedicalField.deleteMany()
                // await EventType.deleteMany()
                // await Event.deleteMany()
                // await Organization.deleteMany()

                // name = `Enterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                // phone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                // mail = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
                // address = `adresssss-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                // debugger
                // orga = await logic.createOrganization(superUser.id, name, phone, address, mail)

                // fullname = `Carlos-${Math.floor(Math.random() * (1000 - 1)) + 1}tonto`
                // email = `user-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
                // phone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                // position = 'student'
                // password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`

                // user = await logic.createUser(fullname, email, role = 'admin', organization = orga.id, phone, position, password)
                // const { userId,orgId } = await logic.authenticateUser(email, password)

                // nameMedicalField = `Allerd${Math.floor(Math.random() * (1000 - 1)) + 1}ogy`
                // nameEventType = `Master${Math.floor(Math.random() * (1000 - 1)) + 1}class`

                // field = await logic.createMedicalField(superUser.id, name = nameMedicalField)
                // eventType = await logic.createEventType(superUser.id, name = nameEventType)


                // title = "PARA POSSSST"
                // description = " Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo blanditiis illum cum consequuntur aliquid veritatis alias quas fuga velit reprehenderit? Natus quis dolor cumque numquam accusantium id itaque autem quam."
                // medicalField = field.id
                // eventType = eventType.id
                // location = { "country": "Spain", "city": "Madrid", "address": "Plaza del sol" }
                // date = "Sun Jun 02 2019 12:38:27 GMT+0200"
                // numberTicketsAvailable = 100
                // price = 600

                // eventCreated = await logic.createEvent(userId,orgId , title, description, medicalField, eventType, location, date, numberTicketsAvailable, price)

            })
            it('Shoud retrieve all the fiels if the query is not provided', async () => {
                debugger
                const eventRetrieved = await events.retrieveEvents()

                expect(eventRetrieved[0]).to.exist
                expect(eventRetrieved).to.have.lengthOf(1)
                expect(eventRetrieved[0].title).to.equal('PARA POSSSST')
            })
            xit('Shoud retrieve all the fiels with two parameters in the query', async () => {
                debugger
                const eventRetrieved = await logic.retrieveEvents(nameMedicalField, nameEventType)

                expect(eventRetrieved[0]).to.exist
                expect(eventRetrieved).to.have.lengthOf(1)
                expect(eventRetrieved[0].title).to.equal(eventCreated.title)
                expect(eventRetrieved[0].description).to.equal(eventCreated.description)
                expect(eventRetrieved[0].price).to.equal(eventCreated.price)
            })
            xit('Shoud fail if any event exists with the queries provided', async () => {
                try {
                    await logic.retrieveEvents(nameMedicalField = 'cardilogy', nameEventType = 'conference')

                } catch (error) {
                    expect(error.message)
                    expect(error.message).to.equal('There are no events available')
                }
            })
            xit('Shoud retrieve all the fiels with just one parametre in the query', async () => {
                debugger
                const eventRetrieved = await logic.retrieveEvents(nameMedicalField)
                debugger
                expect(eventRetrieved[0]).to.exist
                expect(eventRetrieved).to.have.lengthOf(1)
                expect(eventRetrieved[0].title).to.equal(title)
                expect(eventRetrieved[0].description).to.equal(description)
                expect(eventRetrieved[0].price).to.equal(price)
            })
            xit('Shoud fail if any event exists with the query provided', async () => {
                try {
                    await logic.retrieveEvents(nameMedicalField = 'cardilogy')

                } catch (error) {
                    expect(error.message)
                    expect(error.message).to.equal('There are no events available')
                }
            })
            xit('Should retrieve the event providing the event ID', async () => {

                const eventRetrieved = await logic.retrieveOneEvent(eventCreated.id)

                expect(eventRetrieved).to.exist
                expect(eventRetrieved.title).to.equal(eventCreated.title)
                expect(eventRetrieved.description).to.equal(eventCreated.description)
                expect(eventRetrieved.price).to.equal(eventCreated.price)
            })
            xit('Should fail if the Id event is not correct', async () => {
                try {
                    await logic.retrieveOneEvent('5cf6f504f037d0412cecad3f')
                } catch (error) {

                    expect(error.message).to.exist
                    expect(error.message).to.equal('This events does not exist anymore')
                }

            })
        })
    })
})

