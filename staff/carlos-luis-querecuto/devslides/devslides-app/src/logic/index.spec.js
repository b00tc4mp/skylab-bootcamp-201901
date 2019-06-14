const dotenv = require('dotenv')
const data = require('devslides-data')
const { expect } = require('chai')
const logic = require('.');
const bcrypt = require('bcrypt')

dotenv.config()

const { models, mongoose } = data
const { User, Presentation } = models;

describe('logic', () => {
    let name, surname, username, email, password
    before(async () => {
        mongoose.connect('mongodb://localhost/devslides-api', { useNewUrlParser: true })
        await User.deleteMany()
        await Presentation.deleteMany()
    })
    describe('users', () => {

        beforeEach(() => {
            name = `name-${Math.random()}`,
                surname = `appsurname-${Math.random()}`,
                username = `username-${Math.random()}`,
                email = `email-${Math.random()}@mail.com`,
                password = `password-${Math.random()}`

        })

        describe('register user', () => {
            beforeEach(() => {
                username = `username-${Math.random()}`,
                    email = `email-${Math.random()}@mail.com`
            })
            it('should succeed on correct data', async () => {


                const res = await logic.registerUser(name, surname, username, email, password)

                expect(res).to.equal('User registered!')

                const users = await User.find()

                expect(users).to.exist
                expect(users).to.have.lengthOf(1)

                const [user] = users
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.username).to.equal(username)
                expect(user.email).to.equal(email)

                expect(user.password).to.exist

                expect(await bcrypt.compare(password, user.password)).to.be.true
            })

            it('should fail on existing email', async () => {
                email = 'used-email@mail.com'
                await User.create({ name, surname, username, email, password })
                try {
                    debugger
                    await logic.registerUser(name, surname, username, email, password)
                    throw Error('should not reach this point')
                }
                catch (err) {
                    expect(err.message).to.equal(`User with email ${email} already exists`)
                }
            })

            it('should fail on existing username', async () => {
                username = 'used-username'
                await User.create({ name, surname, username, email, password })
                email = `email-${Math.random()}@mail.com`
                try {
                    await logic.registerUser(name, surname, username, email, password)
                    throw Error('should not reach this point')
                }
                catch (err) {
                    expect(err.message).to.equal(`User with username ${username} already exists`)
                }
            })
        })
        describe('authenticate user', () => {

            beforeEach(async () => await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) }))

            it('should succeed on correct email', async () => {
                await logic.authenticateUser(email, password)

                const { __userToken__ } = logic

                expect(typeof __userToken__).to.equal('string')
            })

            it('should succeed on correct username', async () => {
                await logic.authenticateUser(username, password)

                const { __userToken__ } = logic

                expect(typeof __userToken__).to.equal('string')

                const [, payloadB64,] = __userToken__.split('.')
                const payloadJson = atob(payloadB64)
                const payload = JSON.parse(payloadJson)

                expect(typeof __userToken__).to.equal('string')

                expect(logic.isUserLoggedIn).to.be.true
            })

            it('should fail on incorrect credentials', async () => {
                try {
                    await logic.authenticateUser(email, `wrong-password-${Math.random()}`)
                    throw Error('should not reach this point')
                }
                catch (err) {
                    expect(err.message).to.equal('Incorrect data')
                }
            })
        })
    })

    describe.only('Presentation elements', () => {
        beforeEach(async () => {

            name = `name-${Math.random()}`,
                surname = `surname-${Math.random()}`,
                username = `username-${Math.random()}`,
                email = `email-${Math.random()}@mail.com`,
                password = `password-${Math.random()}`

        })
        describe('presentation', () => {
            let user
            beforeEach(async () => {
                user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) })
                await logic.authenticateUser(email, password)
            })
            it('should create an empty presentation from an existing user', async () => {
                debugger
                const title = `title-${Math.random()}`
                const res = await logic.createPresentation(title)
                expect(res).to.be.undefined
                debugger
                const _user = await User.findById(user.id).lean()
                const [presentationid] = _user.presentations
                const presentation = await Presentation.findById(presentationid).lean()

                expect(presentation).to.exist
                expect(presentation.title).to.equal(title)
                expect(presentation.author.toString()).to.equal(user.id)
            })
            it('should fail when create a presentation with an existing title on user collection', async () => {
                const title = `title-${Math.random()}`
                await logic.createPresentation(title)
                try {
                    await logic.createPresentation(title)
                }
                catch (err) {
                    expect(err.message).to.equal(`Presentation with title ${title} already exist`)
                }
            })
            /* it('should delete a presentation from an existing user', async () => {
                const title = `title-${Math.random()}`
                await logic.createPresentation(token, `presentation-${Math.random()}`)
                await logic.createPresentation(token, title)

                let _user = await User.findById(user.id).lean()
                expect(_user.presentations).to.have.length(2)
                const [presentationid] = _user.presentations

                await api.deletePresentation(token, presentationid.toString())
                _user = await User.findById(user.id).lean()
                expect(_user.presentations).to.have.length(1)

                const presentation = await Presentation.findById(presentationid)

                expect(presentation).to.equal(null)
            }) */
        })
    })
})