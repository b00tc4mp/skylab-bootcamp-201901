const dotenv = require('dotenv')
const { mongoose, models: { User, Point, Tracker, Track } } = require('track-data')
const { errors: { LogicError, RequirementError, ValueError, InputError } } = require('track-utils')
const { expect } = require('chai')
const logic = require('.')
const bcrypt = require('bcryptjs')

dotenv.config()

const { env: { MONGO_URL_USER_DATA_TEST: url } } = process

describe('logic', () => {
    before(async () => {
        try {
            await mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
            console.log(`connected to ${url} database`)
        } catch (error) {
            /* istanbul ignore next */
            console.log(error, error.message)
        }
    })

    let name, surname, email, password

    beforeEach(async () => {
        const users = new Array(10).fill().map(item => item = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@mail.com`,
            password: `password-${Math.random()}`
        })

        const user = users[Math.floor(Math.random() * users.length)]

        name = user.name
        surname = user.surname
        email = user.email
        password = user.password

        await User.deleteMany()
    })

    describe('users', () => {

        describe('register user', () => {
            it('should succeed on correct data', async () => {

                await logic.registerUser(name, surname, email, password)
                const user = await User.findOne({ email })
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(await bcrypt.compare(password, user.password)).to.be.true
            })


            it('should fail on retrying to register an already existing user', async () => {
                try {
                    await User.create({ name, surname, email, password })
                    await logic.registerUser(name, surname, email, password)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with email ${email} already exists`)
                }
            })

            it('should fail on undefined email', () => {

                expect(() => logic.registerUser(name, surname, undefined, password)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {

                expect(() => logic.registerUser(name, surname, null, password)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                expect(() => logic.registerUser(name, surname, '', password)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                expect(() => logic.registerUser(name, surname, ' \t    \n', password)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on undefined name', () => {

                expect(() => logic.registerUser(undefined, surname, email, password)).to.throw(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {

                expect(() => logic.registerUser(null, surname, email, password)).to.throw(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                expect(() => logic.registerUser('', surname, email, password)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                expect(() => logic.registerUser(' \t    \n', surname, email, password)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {

                expect(() => logic.registerUser(name, undefined, email, password)).to.throw(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {

                expect(() => logic.registerUser(name, null, email, password)).to.throw(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                expect(() => logic.registerUser(name, '', email, password)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                expect(() => logic.registerUser(name, ' \t    \n', email, password)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on undefined password', () => {

                expect(() => logic.registerUser(name, surname, email, undefined)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on null password', () => {

                expect(() => logic.registerUser(name, surname, email, null)).to.throw(RequirementError, `password is not optional`)
            })

            it('should fail on empty password', () => {
                expect(() => logic.registerUser(name, surname, email, '')).to.throw(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                expect(() => logic.registerUser(name, surname, email, ' \t    \n')).to.throw(ValueError, 'password is empty')
            })

            describe('after created user', () => {
                let user, _password

                beforeEach(async () => {
                    _password = bcrypt.hashSync(password, 10)
                    user = await User.create({ name, surname, email, password: _password })
                })

                describe('authenticate user', () => {
                    it('should success on correct data', async () => {
                        const id = await logic.authenticateUser(email, password)

                        expect(id).to.equal(user.id)
                    })
                })

                describe('retrieve user', () => {
                    it('should success on correct user id', async () => {
                        const _user = await logic.retrieveUser(user.id)

                        expect(_user.id).to.be.undefined
                        expect(_user.name).to.equal(user.name)
                        expect(_user.surname).to.equal(user.surname)
                        expect(_user.email).to.equal(user.email)
                        expect(_user.password).to.be.undefined
                    })
                })
            })

        })

        describe('authenticate user', () => {
            let user
            let _password

            beforeEach(async () => {

                _password = await bcrypt.hash(password, 11)
                user = await User.create({ name, surname, email, password: _password })
            })

            it('should succeed on correct credentials', async () => {
                const id = await logic.authenticateUser(email, password)

                expect(id).to.exist
                expect(id).to.be.a('string')

                expect(id).to.equal(user.id)
            })

            it('should fail on non-existing user', async () => {
                let _email = 'THIS_USER_EMAIL_IS_FAKE@mail.com'
                try {
                    await logic.authenticateUser(_email, password)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with email ${_email} doesn't exists`)
                }
            })

            it('should fail on wrong credentials', async () => {
                try {
                    await logic.authenticateUser(email, 'incorrect password')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`wrong credentials`)
                }
            })

        })

        describe('retrieve user', () => {
            let user
            let _password

            beforeEach(async () => {

                _password = await bcrypt.hash(password, 11)
                user = await User.create({ name, surname, email, password: _password })
            })

            it('should succeed on correct id from existing user', async () => {
                const _user = await logic.retrieveUser(user.id)

                expect(_user.id).to.be.undefined
                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(surname)
                expect(_user.email).to.equal(email)
                expect(_user.password).to.be.undefined
            })

            it('should fail on incorrect user id', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'

                try {
                    await logic.retrieveUser(wrongId)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

        })

        describe('update user', () => {
            let user
            let _password
            const data = {
                name: 'UPDATED',
                surname: 'UPDATED'
            }
            const data2 = {
                email: '123test@123456.com'
            }

            beforeEach(async () => {

                _password = await bcrypt.hash(password, 11)
                user = await User.create({ name, surname, email, password: _password })
                user2 = await User.create({ name, surname, email: 'alpha123@mail.com', password: _password })
            })

            it('should succeed on correct data', async () => {

                await logic.updateUser(user.id, data)

                const updatedUser = await User.findById(user.id)

                expect(updatedUser.name).to.equal('UPDATED')
                expect(updatedUser.surname).to.equal('UPDATED')

            })

            it('should succeed on correct data', async () => {

                await logic.updateUser(user.id, data2)

                const updatedUser = await User.findById(user.id)

                expect(updatedUser.name).to.equal(user.name)
                expect(updatedUser.surname).to.equal(user.surname)

            })

            it('should fail on incorrect id user', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'
                try {
                    await logic.updateUser(wrongId, data)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on change existing user email', async () => {
                const repeatData={
                    email: 'alpha123@mail.com'
                }
                try {
                    await logic.updateUser(user.id, repeatData)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`email ${repeatData.email} already registered`)
                }

            })
        })

        describe('delete user', () => {
            let user
            let _password

            beforeEach(async () => {

                _password = await bcrypt.hash(password, 11)
                user = await User.create({ name, surname, email, password: _password })
            })

            it('should succeed on correct data', async () => {
                const resp = await logic.deleteUser(user.id)
                expect(resp).to.equal('user deleted')
                const _resp = await User.findById(user.id)
                expect(_resp).to.equal(null)
            })

            it('should fail on incorrect id user', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'

                try {
                    await logic.deleteUser(wrongId)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }

            })
        })

        describe('create POI', () => {
            let user
            let _password

            beforeEach(async () => {

                _password = await bcrypt.hash(password, 11)
                user = await User.create({ name, surname, email, password: _password })
            })
            it('should succeed on correct data [FULL]', async () => {
                const lat = Math.random() * 100
                const lon = Math.random() * 10
                const poiData = {
                    title: 'My Fav',
                    color: '#ff0000',
                    latitude: lat,
                    longitude: lon
                }
                await logic.addPOI(user.id, poiData)
                const resp = await User.findById(user.id)
                const pos = resp.pois.length - 1
                expect(resp.pois[pos].title).to.equal('My Fav')
                expect(resp.pois[pos].color).to.equal('#ff0000')
                expect(resp.pois[pos].latitude).to.equal(poiData.latitude)
                expect(resp.pois[pos].longitude).to.equal(poiData.longitude)
            })

            it('should succeed on correct data [without title]', async () => {
                const lat = Math.random() * 100
                const lon = Math.random() * 10
                const poiData = {
                    color: '#ff0000',
                    latitude: lat,
                    longitude: lon
                }
                await logic.addPOI(user.id, poiData)
                const resp = await User.findById(user.id)
                const pos = resp.pois.length - 1
                expect(resp.pois[pos].title).to.exist
                expect(resp.pois[pos].color).to.equal('#ff0000')
                expect(resp.pois[pos].latitude).to.equal(poiData.latitude)
                expect(resp.pois[pos].longitude).to.equal(poiData.longitude)
            })

            it('should succeed on correct data [without color]', async () => {
                const lat = Math.random() * 100
                const lon = Math.random() * 10
                const poiData = {
                    title: 'My Fav',
                    latitude: lat,
                    longitude: lon
                }
                await logic.addPOI(user.id, poiData)
                const resp = await User.findById(user.id)
                const pos = resp.pois.length - 1
                expect(resp.pois[pos].title).to.equal('My Fav')
                expect(resp.pois[pos].color).to.equal('#89c800')
                expect(resp.pois[pos].latitude).to.equal(poiData.latitude)
                expect(resp.pois[pos].longitude).to.equal(poiData.longitude)
            })

            it('should succeed on correct data [without title & color]', async () => {
                const lat = Math.random() * 100
                const lon = Math.random() * 10
                const poiData = {
                    latitude: lat,
                    longitude: lon
                }
                await logic.addPOI(user.id, poiData)
                const resp = await User.findById(user.id)
                const pos = resp.pois.length - 1
                expect(resp.pois[pos].title).to.exist
                expect(resp.pois[pos].color).to.equal('#89c800')
                expect(resp.pois[pos].latitude).to.equal(poiData.latitude)
                expect(resp.pois[pos].longitude).to.equal(poiData.longitude)
            })

            it('should fail on incorrect id user', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'
                const lat = Math.random() * 100
                const lon = Math.random() * 10
                const poiData = {
                    title: 'My Fav',
                    color: '#ff0000',
                    latitude: lat,
                    longitude: lon
                }
                try {
                    await logic.addPOI(wrongId, poiData)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }

            })

            it('should fail on undefined id user', async () => {
                const lat = Math.random() * 100
                const lon = Math.random() * 10
                const poiData = {
                    title: 'My Fav',
                    color: '#ff0000',
                    latitude: lat,
                    longitude: lon
                }
                try {
                    await logic.addPOI(undefined, poiData)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`id is not optional`)
                }

            })

            it('should fail on null id user', async () => {
                const lat = Math.random() * 100
                const lon = Math.random() * 10
                const poiData = {
                    title: 'My Fav',
                    color: '#ff0000',
                    latitude: lat,
                    longitude: lon
                }
                try {
                    await logic.addPOI(null, poiData)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`id is not optional`)
                }

            })

            it('should fail on undefined data poi', async () => {
                try {
                    await logic.addPOI(user.id, undefined)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(InputError)
                    expect(error.message).to.equal('incorrect poi info')
                }

            })

            it('should fail on null data poi', async () => {
                try {
                    await logic.addPOI(user.id, null)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(InputError)
                    expect(error.message).to.equal('incorrect poi info')
                }

            })

            it('should fail on null data latitude ', async () => {
                const lat = null
                const lon = Math.random() * 10
                const poiData = {
                    title: 'My Fav',
                    color: '#ff0000',
                    latitude: lat,
                    longitude: lon
                }
                try {
                    await logic.addPOI(user.id, poiData)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`latitude is not optional`)
                }
            })

            it('should fail on undefined data latitude ', async () => {
                const lat = undefined
                const lon = Math.random() * 10
                const poiData = {
                    title: 'My Fav',
                    color: '#ff0000',
                    latitude: lat,
                    longitude: lon
                }
                try {
                    await logic.addPOI(user.id, poiData)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`latitude is not optional`)
                }
            })
            it('should fail on null data longitude ', async () => {
                const lon = null
                const lat = Math.random() * 100
                const poiData = {
                    title: 'My Fav',
                    color: '#ff0000',
                    latitude: lat,
                    longitude: lon
                }
                try {
                    await logic.addPOI(user.id, poiData)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`longitude is not optional`)
                }
            })

            it('should fail on undefined data longitude ', async () => {
                const lon = undefined
                const lat = Math.random() * 100
                const poiData = {
                    title: 'My Fav',
                    color: '#ff0000',
                    latitude: lat,
                    longitude: lon
                }
                try {
                    await logic.addPOI(user.id, poiData)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`longitude is not optional`)
                }
            })
        })

        describe('retrieve ALL POIS', () => {
            let user
            let _user
            let _password
            let lat
            let lon
            let poiData
            let poiData2

            beforeEach(async () => {

                _password = await bcrypt.hash(password, 11)
                user = await User.create({ name, surname, email: '123@123.bbb', password: _password })
                _user = await User.create({ name, surname, email: '123@123.aaa', password: _password })
                lat = Math.random() * 100
                lon = Math.random() * 10
                poiData = {
                    title: 'My Fav',
                    color: '#ff0000',
                    latitude: lat,
                    longitude: lon
                }
                poiData2 = {
                    title: 'Your Fav',
                    color: '#ff9999',
                    latitude: lat,
                    longitude: lon
                }
                await logic.addPOI(user.id, poiData)
                await logic.addPOI(user.id, poiData2)
            })

            it('should succeed on correct id from existing user', async () => {
                const data = await logic.retrieveAllPOI(user.id)
                expect(data.length).to.equal(2)
            })

            it('should fail on incorrect user id', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'

                try {
                    await logic.retrieveAllPOI(wrongId)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on user without POIs', async () => {
                try {
                    await logic.retrieveAllPOI(_user.id)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user without POIs`)
                }
            })

        })

        describe('retrieve POI', () => {
            let user
            let _user
            let _password
            let lat
            let lon
            let poiData
            let poiData2

            beforeEach(async () => {

                _password = await bcrypt.hash(password, 11)
                user = await User.create({ name, surname, email, password: _password })
                _user = await User.create({ name, surname, email: '123@123.ccc', password: _password })
                lat = Math.random() * 100
                lon = Math.random() * 10
                poiData = {
                    title: 'My Fav',
                    color: '#ff0000',
                    latitude: lat,
                    longitude: lon
                }
                await logic.addPOI(user.id, poiData)
                poiData2 = {
                    title: 'Your Fav',
                    color: '#ff9999',
                    latitude: lat,
                    longitude: lon
                }
                await logic.addPOI(user.id, poiData2)
                user = await User.findById(user.id)
            })

            it('should succeed on correct id from existing user', async () => {
                const data = await logic.retrieveOnePOI(user.id, user.pois[0].id)
                expect(data.title).to.equal('My Fav')
                expect(data.color).to.equal('#ff0000')
                expect(data.latitude).to.equal(poiData.latitude)
                expect(data.longitude).to.equal(poiData.longitude)
            })

            it('should fail on incorrect user id', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'

                try {
                    await logic.retrieveOnePOI(wrongId, user.pois[0].id)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on user with wrong POI id', async () => {
                const poiId = '1234132412'
                try {
                    await logic.retrieveOnePOI(user.id, poiId)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`POI with id ${poiId} doesn't exists`)
                }
            })
            it('should fail on user without POIs', async () => {
                try {
                    await logic.retrieveOnePOI(_user.id, user.pois[0].id)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`POI with id ${user.pois[0].id} doesn't exists`)
                }
            })
            it('should fail on undefined POI id', async () => {
                try {
                    await logic.retrieveOnePOI(_user.id, undefined)
                } catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`poiID is not optional`)
                }
            })

        })

        describe('update POI', () => {
            let user
            let _user
            let _password
            let lat
            let lon
            let poiData
            let poiData2

            beforeEach(async () => {

                _password = await bcrypt.hash(password, 11)
                lat = Math.random() * 100
                lon = Math.random() * 10
                poiData = {
                    title: 'My Fav',
                    color: '#ff0000',
                    latitude: lat,
                    longitude: lon
                }
                poiData2 = {
                    title: 'Your Fav',
                    color: '#ff9999',
                    latitude: lat,
                    longitude: lon
                }
                user = await User.create({ name, surname, email, password: _password, pois: [poiData, poiData2] })
                _user = await User.create({ name, surname, email: '1235@1235.ccc', password: _password })

            })

            it('should succeed on correct id from existing user', async () => {
                let _poiData = {
                    title: 'Your UPDATED Fav',
                    color: '#009999',
                    latitude: lat,
                    longitude: lon
                }
                await logic.updatePOI(user.id, user.pois[0].id, _poiData)
                const data = await User.findById(user.id)
                expect(data.pois[0].title).to.equal('Your UPDATED Fav')
                expect(data.pois[0].color).to.equal('#009999')
                expect(data.pois[0].latitude).to.equal(_poiData.latitude)
                expect(data.pois[0].longitude).to.equal(_poiData.longitude)
            })

            it('should succeed on correct id from existing user [only title]', async () => {
                let _poiData = {
                    title: 'Your UPDATED Fav'
                }
                await logic.updatePOI(user.id, user.pois[0].id, _poiData)
                const data = await User.findById(user.id)
                expect(data.pois[0].title).to.equal('Your UPDATED Fav')
                expect(data.pois[0].color).to.equal('#ff0000')
                expect(data.pois[0].latitude).to.equal(poiData.latitude)
                expect(data.pois[0].longitude).to.equal(poiData.longitude)
            })

            it('should succeed on correct id from existing user [only latitude and longitude]', async () => {
                let _poiData = {
                    latitude: lat,
                    longitude: lon
                }
                await logic.updatePOI(user.id, user.pois[0].id, _poiData)
                const data = await User.findById(user.id)
                expect(data.pois[0].title).to.equal('My Fav')
                expect(data.pois[0].color).to.equal('#ff0000')
                expect(data.pois[0].latitude).to.equal(_poiData.latitude)
                expect(data.pois[0].longitude).to.equal(_poiData.longitude)
            })

            it('should fail on incorrect user id', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'

                try {
                    await logic.updatePOI(wrongId, user.pois[0].id, poiData)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on user with wrong POI id', async () => {
                const poiId = '1234132412'
                try {
                    await logic.updatePOI(user.id, poiId, poiData)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`POI with id ${poiId} doesn't exists`)
                }
            })
            it('should fail on user without POIs', async () => {
                try {
                    await logic.updatePOI(_user.id, user.pois[0].id, poiData)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`POI with id ${user.pois[0].id} doesn't exists`)
                }
            })
            it('should fail on undefined POI id', async () => {
                try {
                    await logic.updatePOI(user.id, undefined, poiData)
                } catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`poiID is not optional`)
                }
            })
            it('should fail on undefined poiData', async () => {
                try {
                    await logic.updatePOI(user.id, user.pois[0].id, undefined)
                } catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`poiData is not optional`)
                }
            })
            it('should fail on undefined  poiID and poiData', async () => {
                try {
                    await logic.updatePOI(user.id, undefined, undefined)
                } catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`poiID is not optional`)
                }
            })

        })

        describe('delete POI', () => {
            let user
            let _password
            let lat
            let lon
            let poiData
            let poiData2

            beforeEach(async () => {

                _password = await bcrypt.hash(password, 11)
                user = await User.create({ name, surname, email, password: _password })
                lat = Math.random() * 100
                lon = Math.random() * 10
                poiData = {
                    title: 'My Fav',
                    color: '#ff0000',
                    latitude: lat,
                    longitude: lon
                }
                poiData2 = {
                    title: 'Your Fav',
                    color: '#ff9999',
                    latitude: lat,
                    longitude: lon
                }
                await logic.addPOI(user.id, poiData)
                await logic.addPOI(user.id, poiData2)
                user = await User.findById(user.id)
            })

            it('should succeed on correct id from existing user', async () => {
                await logic.deletePOI(user.id, user.pois[0].id)
                data = await User.findById(user.id)
                expect(data.pois.length).to.equal(1)
                expect(data.pois[0].title).to.equal('Your Fav')
                expect(data.pois[0].color).to.equal('#ff9999')
                expect(data.pois[0].latitude).to.equal(poiData2.latitude)
                expect(data.pois[0].longitude).to.equal(poiData2.longitude)
            })

            it('should fail on incorrect user id', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'

                try {
                    await logic.deletePOI(wrongId, user.pois[0].id)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on user with wrong POI id', async () => {
                const poiId = '1234132412'
                try {
                    await logic.deletePOI(user.id, poiId)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`POI with id ${poiId} doesn't exists`)
                }
            })

            it('should fail on user without POIs', async () => {
                try {
                    await logic.deletePOI(user.id, user.pois[0].id)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`POI with id ${user.pois[0].id} doesn't exists`)
                }
            })

            it('should fail on undefined POI id', async () => {
                try {
                    await logic.deletePOI(user.id, undefined)
                } catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`poiID is not optional`)
                }
            })

        })

        describe('create Tracker', () => {
            let user
            let _password

            beforeEach(async () => {

                _password = await bcrypt.hash(password, 11)
                user = await User.create({ name, surname, email, password: _password })
            })
            it('should succeed on correct tracker data [FULL]', async () => {
                const trackerData = {
                    serialNumber: '1234567890',
                    licensePlate: '1234-ABC'
                }
                await logic.addTracker(user.id, trackerData)
                const resp = await User.findById(user.id)
                const pos = resp.trackers.length - 1
                expect(resp.trackers[pos].serialNumber).to.equal('1234567890')
                expect(resp.trackers[pos].licensePlate).to.equal('1234-ABC')
            })

            it('should succeed on correct data [without license plate]', async () => {
                const trackerData = {
                    serialNumber: '1234567890'
                }
                await logic.addTracker(user.id, trackerData)
                const resp = await User.findById(user.id)
                const pos = resp.trackers.length - 1
                expect(resp.trackers[pos].serialNumber).to.equal('1234567890')
                expect(resp.trackers[pos].licensePlate).to.exist
            })

            it('should fail on incorrect id user', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'
                const trackerData = {
                    serialNumber: '1234567890'
                }
                try {
                    await logic.addTracker(wrongId, trackerData)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }

            })

            it('should fail on undefined id user', async () => {
                const trackerData = {
                    serialNumber: '1234567890'
                }
                try {
                    await logic.addTracker(undefined, trackerData)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`id is not optional`)
                }

            })

            it('should fail on null id user', async () => {
                const trackerData = {
                    serialNumber: '1234567890'
                }
                try {
                    await logic.addTracker(null, trackerData)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`id is not optional`)
                }

            })

            it('should fail on undefined data tracker', async () => {
                try {
                    await logic.addTracker(user.id, undefined)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(InputError)
                    expect(error.message).to.equal('incorrect tracker info')
                }

            })

            it('should fail on null data tracker', async () => {
                try {
                    await logic.addTracker(user.id, null)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(InputError)
                    expect(error.message).to.equal('incorrect tracker info')
                }

            })

            it('should fail on add existing tracker serial number', async () => {

                const _serialNumber = '123123123'

                try {
                    await logic.addTracker(user.id, { serialNumber: _serialNumber })
                    await logic.addTracker(user.id, { serialNumber: _serialNumber })
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`Serial Number ${_serialNumber} already registered`)
                }

            })

            it('should fail on add existing tracker license plate', async () => {
                const _serialNumber = '1234500000'
                const _licensePlate = '1234-SKY'
                const __serialNumber = '1231456456'

                try {
                    await logic.addTracker(user.id, { serialNumber: _serialNumber, licensePlate: _licensePlate })
                    await logic.addTracker(user.id, { serialNumber: __serialNumber, licensePlate: _licensePlate })
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`License Plate ${_licensePlate} already registered`)
                }

            })

        })

        describe('retrieve ALL Trackers', () => {
            let user
            let _user
            let _password
            let trackerData
            let trackerData2

            beforeEach(async () => {

                _password = await bcrypt.hash(password, 11)
                trackerData = {
                    serialNumber: '1234567890',
                    licensePlate: '1234-ABC'
                }
                trackerData2 = {
                    serialNumber: '12332100',
                    licensePlate: '9089-POP'
                }

                user = await User.create({ name, surname, email, password: _password, trackers: [trackerData, trackerData2] })
                _user = await User.create({ name, surname, email: '123@123.ccc', password: _password })
            })

            it('should succeed on correct id from existing user', async () => {
                const data = await logic.retrieveAllTrackers(user.id)
                expect(data.length).to.equal(2)
            })

            it('should fail on incorrect user id', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'

                try {
                    await logic.retrieveAllTrackers(wrongId)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on user without Trackers', async () => {
                try {
                    await logic.retrieveAllTrackers(_user.id)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user without Trackers`)
                }
            })

        })

        describe('retrieve Tracker', () => {
            let user
            let _user
            let _password
            let trackerData
            let trackerData2

            beforeEach(async () => {

                _password = await bcrypt.hash(password, 11)
                trackerData = {
                    serialNumber: '1234567890',
                    licensePlate: '1234-ABC'
                }
                trackerData2 = {
                    serialNumber: '12332100',
                    licensePlate: '9089-POP'
                }

                user = await User.create({ name, surname, email, password: _password, trackers: [trackerData, trackerData2] })
                _user = await User.create({ name, surname, email: '123@123.ccc', password: _password })
            })

            it('should succeed on correct id from existing user', async () => {
                const data = await logic.retrieveTracker(user.id, user.trackers[0].id)
                expect(data.serialNumber).to.equal('1234567890')
                expect(data.licensePlate).to.equal('1234-ABC')
            })

            it('should fail on incorrect user id', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'

                try {
                    await logic.retrieveTracker(wrongId, user.trackers[0].id)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on user with wrong Tracker id', async () => {
                const trackerId = '1234132412'
                try {
                    await logic.retrieveTracker(user.id, trackerId)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`Tracker with id ${trackerId} doesn't exists`)
                }
            })
            it('should fail on user without Trackers', async () => {
                try {
                    await logic.retrieveTracker(_user.id, user.trackers[0].id)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`Tracker with id ${user.trackers[0].id} doesn't exists`)
                }
            })
            it('should fail on undefined Tracker id', async () => {
                try {
                    await logic.retrieveTracker(_user.id, undefined)
                } catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`trackerID is not optional`)
                }
            })

        })

        describe('retrieve Tracker by SN', () => {
            let user
            let _user
            let _password
            let trackerData
            let trackerData2

            beforeEach(async () => {

                _password = await bcrypt.hash(password, 11)
                trackerData = {
                    serialNumber: '1234567890',
                    licensePlate: '1234-ABC'
                }
                trackerData2 = {
                    serialNumber: '12332100',
                    licensePlate: '9089-POP'
                }

                user = await User.create({ name, surname, email, password: _password, trackers: [trackerData, trackerData2] })
                _user = await User.create({ name, surname, email: '123@123.ccc', password: _password })
            })

            it('should succeed on correct id from existing user', async () => {
                const data = await logic.retrieveTrackerBySN(user.id, user.trackers[0].serialNumber)
                expect(data.serialNumber).to.equal('1234567890')
                expect(data.licensePlate).to.equal('1234-ABC')
            })

            it('should fail on incorrect user id', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'

                try {
                    await logic.retrieveTrackerBySN(wrongId, user.trackers[0].serialNumber)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on user with wrong Tracker SN', async () => {
                const trackerSN = 'FAKE_FAKE'
                try {
                    await logic.retrieveTrackerBySN(user.id, trackerSN)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`Tracker with SN ${trackerSN} doesn't exists`)
                }
            })
            it('should fail on user without Trackers', async () => {
                try {
                    await logic.retrieveTrackerBySN(_user.id, user.trackers[0].serialNumber)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`Tracker with SN ${user.trackers[0].serialNumber} doesn't exists`)
                }
            })
            it('should fail on undefined Serial Number', async () => {
                try {
                    await logic.retrieveTrackerBySN(user.id, undefined)
                } catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`serialNumber is not optional`)
                }
            })

        })

        describe('retrieve Tracker by License Plate', () => {
            let user
            let _user
            let _password
            let trackerData
            let trackerData2

            beforeEach(async () => {

                _password = await bcrypt.hash(password, 11)
                trackerData = {
                    serialNumber: '1234567890',
                    licensePlate: '1234-ABC'
                }
                trackerData2 = {
                    serialNumber: '12332100',
                    licensePlate: '9089-POP'
                }

                user = await User.create({ name, surname, email, password: _password, trackers: [trackerData, trackerData2] })
                _user = await User.create({ name, surname, email: '123@123.ccc', password: _password })
            })

            it('should succeed on correct id from existing user', async () => {
                const data = await logic.retrieveTrackerByLicense(user.id, user.trackers[0].licensePlate)
                expect(data.serialNumber).to.equal('1234567890')
                expect(data.licensePlate).to.equal('1234-ABC')
            })

            it('should fail on incorrect user id', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'

                try {
                    await logic.retrieveTrackerByLicense(wrongId, user.trackers[0].licensePlate)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on user with wrong Tracker License', async () => {
                const trackerLicense = 'FAKE_FAKE'
                try {
                    await logic.retrieveTrackerByLicense(user.id, trackerLicense)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`Tracker with License Plate ${trackerLicense} doesn't exists`)
                }
            })
            it('should fail on user without Trackers', async () => {
                try {
                    await logic.retrieveTrackerByLicense(_user.id, user.trackers[0].licensePlate)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`Tracker with License Plate ${user.trackers[0].licensePlate} doesn't exists`)
                }
            })
            it('should fail on undefined License', async () => {
                try {
                    await logic.retrieveTrackerByLicense(user.id, undefined)
                } catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`licensePlate is not optional`)
                }
            })

        })

        describe('update Tracker', () => {
            let user
            let _password
            let poiData
            let trackerData
            let trackerData2

            beforeEach(async () => {

                lat = Math.random() * 100
                lon = Math.random() * 10
                poiData = {
                    title: 'My Fav',
                    color: '#ff0000',
                    latitude: lat,
                    longitude: lon
                }
                trackerData = {
                    serialNumber: '1234567890',
                    licensePlate: '1234-ABC'
                }
                trackerData2 = {
                    serialNumber: '0987654321',
                    licensePlate: '0909-CXD'
                }
                _password = await bcrypt.hash(password, 11)
                _user = await User.create({ name, surname, email: '12__3@123.com', password: _password })
                user = await User.create({ name, surname, email, password: _password, pois: poiData, trackers: [trackerData, trackerData2] })
            })

            it('should succeed on correct id from existing user', async () => {
                let _trackerData = {
                    serialNumber: '09-UPDATE-91',
                    licensePlate: '0909-UPDATE'
                }
                await logic.updateTracker(user.id, user.trackers[0].id, _trackerData)
                const data = await User.findById(user.id)
                expect(data.trackers[0].serialNumber).to.equal('09-UPDATE-91')
                expect(data.trackers[0].licensePlate).to.equal('0909-UPDATE')
            })

            it('should succeed on correct id from existing user [only serialnumber]', async () => {
                let _trackerData = {
                    serialNumber: '09-UPDATE-91'
                }
                await logic.updateTracker(user.id, user.trackers[0].id, _trackerData)
                const data = await User.findById(user.id)
                expect(data.trackers[0].serialNumber).to.equal('09-UPDATE-91')
                expect(data.trackers[0].licensePlate).to.equal('1234-ABC')
            })

            it('should succeed on correct id from existing user [only licenseplate]', async () => {
                let _trackerData = {
                    licensePlate: '0909-UPDATE'
                }
                await logic.updateTracker(user.id, user.trackers[0].id, _trackerData)
                const data = await User.findById(user.id)
                expect(data.trackers[0].serialNumber).to.equal('1234567890')
                expect(data.trackers[0].licensePlate).to.equal('0909-UPDATE')
            })

            it('should fail on correct id from existing user [only duplicated licenseplate]', async () => {
                let _trackerData = {
                    licensePlate: '0909-UPDATE'
                }
                try {
                    await logic.updateTracker(user.id, user.trackers[0].id, _trackerData)
                    await logic.updateTracker(user.id, user.trackers[0].id, _trackerData)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`License Plate ${_trackerData.licensePlate} already registered`)
                }
            })

            it('should fail on correct id from existing user [only duplicated serialNumber]', async () => {
                let _trackerData = {
                    serialNumber: '09-UPDATE-91'
                }
                try {
                    await logic.updateTracker(user.id, user.trackers[0].id, _trackerData)
                    await logic.updateTracker(user.id, user.trackers[0].id, _trackerData)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`Serial Number ${_trackerData.serialNumber} already registered`)
                }
            })

            it('should fail on incorrect user id', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'

                try {
                    await logic.updateTracker(wrongId, user.trackers[0].id, trackerData)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on user with wrong Tracker id', async () => {
                const trackerId = '1234132412'
                try {
                    await logic.updateTracker(user.id, trackerId, poiData)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`Tracker with id ${trackerId} doesn't exists`)
                }
            })
            it('should fail on user without trackers', async () => {
                try {
                    await logic.updateTracker(_user.id, user.trackers[0].id, trackerData)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`Tracker with id ${user.trackers[0].id} doesn't exists`)
                }
            })
            it('should fail on undefined tracker id', async () => {
                try {
                    await logic.updateTracker(user.id, undefined, poiData)
                } catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`trackerID is not optional`)
                }
            })
            it('should fail on undefined trackerData', async () => {
                try {
                    await logic.updateTracker(user.id, user.trackers[0].id, undefined)
                } catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`trackerData is not optional`)
                }
            })
            it('should fail on undefined  trackerID and trackerData', async () => {
                try {
                    await logic.updateTracker(user.id, undefined, undefined)
                } catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`trackerID is not optional`)
                }
            })

        })

        describe('delete Tracker', () => {
            let user
            let _password
            let poiData
            let trackerData
            let trackerData2

            beforeEach(async () => {

                lat = Math.random() * 100
                lon = Math.random() * 10
                poiData = {
                    title: 'My Fav',
                    color: '#ff0000',
                    latitude: lat,
                    longitude: lon
                }
                trackerData = {
                    serialNumber: '1234567890',
                    licensePlate: '1234-ABC'
                }
                trackerData2 = {
                    serialNumber: '0987654321',
                    licensePlate: '0909-CXD'
                }
                _password = await bcrypt.hash(password, 11)
                _user = await User.create({ name, surname, email: '12__3@123.com', password: _password })
                user = await User.create({ name, surname, email, password: _password, pois: poiData, trackers: [trackerData, trackerData2] })
            })

            it('should succeed on correct id from existing user', async () => {
                await logic.deleteTracker(user.id, user.trackers[0].id)
                data = await User.findById(user.id)
                expect(data.trackers.length).to.equal(1)
                expect(data.trackers[0].licensePlate).to.equal('0909-CXD')
            })

            it('should fail on incorrect user id', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'

                try {
                    await logic.deleteTracker(wrongId, user.trackers[0].id)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on user with wrong tracker id', async () => {
                const trackerId = '1234132412'
                try {
                    await logic.deleteTracker(user.id, trackerId)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`Tracker with id ${trackerId} doesn't exists`)
                }
            })

            it('should fail on user without trackers', async () => {
                try {
                    await logic.deleteTracker(_user.id, user.trackers[0].id)
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`Tracker with id ${user.trackers[0].id} doesn't exists`)
                }
            })

            it('should fail on undefined tracker id', async () => {
                try {
                    await logic.deleteTracker(user.id, undefined)
                } catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`trackerID is not optional`)
                }
            })

        })

        describe('create Track', () => {
            let user
            let _password
            let lat
            let lon
            let trackerData
            let trackerData2

            beforeEach(async () => {
                lat = Math.random() * 100
                lon = Math.random() * 10
                _password = await bcrypt.hash(password, 11)
                trackerData2 = {
                    serialNumber: '1234567890',
                    licensePlate: '1234-ABC'
                }
                trackerData = {
                    serialNumber: '1234567123',
                    licensePlate: '1244-ABC'
                }
                user = await User.create({ name, surname, email, password: _password, trackers: [trackerData, trackerData2] })
            })
            it('should succeed on correct track data', async () => {
                const trackData = {
                    serialNumber: '1234567890',
                    latitude: lat,
                    longitude: lon,
                    speed: 123.21,
                    status: 'OFF',
                    date: new Date().toISOString()
                }
                await logic.addTrack(user.id, trackData)
                const resp = await User.findById(user.id)
                expect(resp.trackers[1].tracks[0].speed).to.be.equal('123.21')
                expect(resp.trackers[1].tracks[0].status).to.be.equal('OFF')
            })

            it('should succeed on correct track partial data', async () => {
                const trackData = {
                    serialNumber: '1234567890',
                    latitude: lat,
                    longitude: lon,
                    date: new Date().toISOString()
                }
                await logic.addTrack(user.id, trackData)
                const resp = await User.findById(user.id)
                expect(resp.trackers[1].tracks[0].speed).to.be.equal('0')
                expect(resp.trackers[1].tracks[0].status).to.be.equal('ON')
            })

            it('should fail on incorrect id user', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'
                const trackData = {
                    serialNumber: '1234567890',
                    latitude: lat,
                    longitude: lon,
                    speed: 123.21,
                    status: 'ON',
                    date: new Date().toISOString()
                }
                try {
                    await logic.addTrack(wrongId, trackData)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }

            })

            it('should fail on undefined id user', async () => {
                const trackData = {
                    serialNumber: '1234567890',
                    latitude: lat,
                    longitude: lon,
                    speed: 123.21,
                    status: 'ON',
                    date: new Date().toISOString()
                }
                try {
                    await logic.addTrack(undefined, trackData)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`id is not optional`)
                }

            })

            it('should fail on null id user', async () => {
                const trackData = {
                    serialNumber: '1234567890',
                    latitude: lat,
                    longitude: lon,
                    speed: 123.21,
                    status: 'ON',
                    date: new Date().toISOString()
                }
                try {
                    await logic.addTrack(null, trackData)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`id is not optional`)
                }

            })
            it('should fail on unexisting serial number tracker', async () => {
                const trackData = {
                    serialNumber: '000_NO_EXIST',
                    latitude: lat,
                    longitude: lon,
                    speed: 123.21,
                    status: 'ON',
                    date: new Date().toISOString()
                }
                try {
                    await logic.addTrack(user.id, trackData)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`Tracker with SN ${trackData.serialNumber} doesn't exists`)
                }

            })

            it('should fail on undefined data track', async () => {
                try {
                    await logic.addTrack(user.id, undefined)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(InputError)
                    expect(error.message).to.equal('incorrect track info')
                }

            })

            it('should fail on null data track', async () => {
                try {
                    await logic.addTrack(user.id, null)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(InputError)
                    expect(error.message).to.equal('incorrect track info')
                }

            })

        })

        describe('create Track via TCP', () => {
            let user
            let _password
            let lat
            let lon
            let trackerData
            let trackerData2

            beforeEach(async () => {
                lat = Math.random() * 100
                lon = Math.random() * 10
                _password = await bcrypt.hash(password, 11)
                trackerData2 = {
                    serialNumber: '1234567890',
                    licensePlate: '1234-ABC'
                }
                trackerData = {
                    serialNumber: '1234567123',
                    licensePlate: '1244-ABC'
                }
                user = await User.create({ name, surname, email, password: _password, trackers: [trackerData, trackerData2] })
            })
            it('should succeed on correct track data', async () => {
                const trackData = {
                    serialNumber: '1234567890',
                    latitude: lat,
                    longitude: lon,
                    speed: 123.21,
                    status: 'OFF',
                    date: new Date().toISOString()
                }
                await logic.addTrackTCP(trackData)
                const resp = await User.findById(user.id)
                expect(resp.trackers[1].tracks[0].speed).to.be.equal('123.21')
                expect(resp.trackers[1].tracks[0].status).to.be.equal('OFF')
            })

            it('should succeed on correct track partial data', async () => {
                const trackData = {
                    serialNumber: '1234567890',
                    latitude: lat,
                    longitude: lon,
                    date: new Date().toISOString()
                }
                await logic.addTrackTCP(trackData)
                const resp = await User.findById(user.id)
                expect(resp.trackers[1].tracks[0].speed).to.be.equal('0')
                expect(resp.trackers[1].tracks[0].status).to.be.equal('ON')
            })

            it('should fail on unexisting serial number tracker', async () => {
                const trackData = {
                    serialNumber: '000_NO_EXIST',
                    latitude: lat,
                    longitude: lon,
                    speed: 123.21,
                    status: 'ON',
                    date: new Date().toISOString()
                }
                try {
                    await logic.addTrackTCP(trackData)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`User with Tracker SN 000_NO_EXIST doesn't exists`)
                }

            })

            it('should fail on undefined data track', async () => {
                try {
                    await logic.addTrackTCP(undefined)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(InputError)
                    expect(error.message).to.equal('incorrect track info')
                }

            })

            it('should fail on null data track', async () => {
                try {
                    await logic.addTrackTCP(null)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(InputError)
                    expect(error.message).to.equal('incorrect track info')
                }

            })

        })

        describe('retrieve Last Track', () => {
            let user
            let _password
            let lat
            let lon
            let trackerData
            let trackerData2
            let trackData
            let trackData2
            let trackData3

            beforeEach(async () => {
                lat = Math.random() * 100
                lon = Math.random() * 10
                _password = await bcrypt.hash(password, 11)
                trackData = {
                    serialNumber: '1234567890',
                    latitude: lat,
                    longitude: lon,
                    speed: 123.21,
                    status: 'OFF',
                    date: new Date().toISOString()
                }
                trackData2 = {
                    serialNumber: '1234567890',
                    latitude: lat,
                    longitude: lon,
                    speed: 100.00,
                    status: 'ON',
                    date: new Date().toISOString()
                }
                trackData3 = {
                    serialNumber: '1234567123',
                    latitude: lat,
                    longitude: lon,
                    speed: 123.21,
                    status: 'OFF',
                    date: new Date().toISOString()
                }
                trackerData2 = {
                    serialNumber: '1234567890',
                    licensePlate: '1234-ABC',
                    tracks: [trackData, trackData2]
                }
                trackerData = {
                    serialNumber: '1234567123',
                    licensePlate: '1244-ABC',
                    tracks: trackData3
                }
                user = await User.create({ name, surname, email, password: _password, trackers: [trackerData, trackerData2] })
            })
            it('should succeed on correct track data', async () => {
                const resp = await logic.retrieveLastTrack(user.id, user.trackers[1].id)
                expect(resp.speed).to.be.equal(user.trackers[1].tracks[1].speed)
                expect(resp.status).to.be.equal(user.trackers[1].tracks[1].status)
            })


            it('should fail on incorrect id user', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'
                try {
                    await logic.retrieveLastTrack(wrongId, user.trackers[1].id)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }

            })

            it('should fail on undefined id user', async () => {
                try {
                    await logic.retrieveLastTrack(undefined, user.trackers[1].id)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`id is not optional`)
                }

            })

            it('should fail on null id user', async () => {
                try {
                    await logic.retrieveLastTrack(null, user.trackers[1].id)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`id is not optional`)
                }

            })
            it('should fail on unexisting ID tracker', async () => {
                const badId = 'Bad_Tracker_Id'
                try {
                    await logic.retrieveLastTrack(user.id, badId)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`Tracker with id ${badId} doesn't exists`)
                }

            })

            it('should fail on undefined tracker id', async () => {
                try {
                    await logic.retrieveLastTrack(user.id, undefined)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal('trackerID is not optional')
                }

            })

            it('should fail on null tracker id', async () => {
                try {
                    await logic.retrieveLastTrack(user.id, null)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal('trackerID is not optional')
                }

            })

        })

        describe('retrieve All Last Tracks', () => {
            let user
            let _user
            let _password
            let lat
            let lon
            let trackerData
            let trackerData2
            let trackData
            let trackData2
            let trackData3

            beforeEach(async () => {
                lat = Math.random() * 100
                lon = Math.random() * 10
                _password = await bcrypt.hash(password, 11)
                trackData = {
                    serialNumber: '1234567890',
                    latitude: lat,
                    longitude: lon,
                    speed: 123.21,
                    status: 'OFF',
                    date: new Date()
                }
                trackData2 = {
                    serialNumber: '1234567890',
                    latitude: lat,
                    longitude: lon,
                    speed: 100.00,
                    status: 'ON',
                    date: new Date()
                }
                trackData3 = {
                    serialNumber: '1234567123',
                    latitude: lat,
                    longitude: lon,
                    speed: 123.21,
                    status: 'OFF',
                    date: new Date()
                }
                trackerData2 = {
                    serialNumber: '1234567890',
                    licensePlate: '1234-ABC',
                    tracks: [trackData, trackData2]
                }
                trackerData = {
                    serialNumber: '1234567123',
                    licensePlate: '1244-ABC',
                    tracks: trackData3
                }
                user = await User.create({ name, surname, email, password: _password, trackers: [trackerData, trackerData2] })
                _user = await User.create({ name, surname, email: '123@123.com', password: _password })
            })
            it('should succeed on correct track data', async () => {
                const resp = await logic.retrieveAllLastTracks(user.id)
                expect(resp.length).to.be.equal(2)
                expect(resp[0].speed).to.be.equal(user.trackers[0].tracks[0].speed)
            })


            it('should fail on incorrect id user', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'
                try {
                    await logic.retrieveAllLastTracks(wrongId)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }

            })

            it('should fail on undefined id user', async () => {
                try {
                    await logic.retrieveAllLastTracks(undefined)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`id is not optional`)
                }

            })

            it('should fail on null id user', async () => {
                try {
                    await logic.retrieveAllLastTracks(null)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`id is not optional`)
                }

            })

            it('should fail on user without trackers', async () => {
                try {
                    await logic.retrieveAllLastTracks(_user.id)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal('User without trackers')
                }

            })

        })

        describe('retrieve Range of Tracks', () => {
            let user
            let _user
            let _password
            let trackerData
            let trackerData2
            let trackerData3
            let trackData
            let trackData2
            let startTime
            let endTime

            beforeEach(async () => {
                startTime = new Date(new Date().getTime() + (Math.random() * 10000)).toISOString()
                endTime = new Date((new Date().getTime() + (Math.random() * 10000) + 10000)).toISOString()
                _password = await bcrypt.hash(password, 11)


                trackData = new Array(60).fill().map(item => item = {
                    serialNumber: '978878981234',
                    latitude: Math.random() * 100,
                    longitude: Math.random() * 10,
                    speed: 123.21 + Math.random() * 10,
                    status: 'ON',
                    date: new Date(new Date().getTime() + (Math.random() * 10000))
                })
                trackData2 = {
                    serialNumber: '1234560000',
                    latitude: 41.1234,
                    longitude: 2.4322,
                    speed: 123.21,
                    status: 'OFF',
                    date: new Date(2019, 4, 12)
                }
                trackerData = {
                    serialNumber: '978878981234',
                    licensePlate: '1234-ABC',
                    tracks: trackData
                }
                trackerData2 = {
                    serialNumber: '1234560000',
                    licensePlate: '1234-ABC',
                    tracks: trackData2
                }
                trackerData3 = {
                    serialNumber: '1234560000',
                    licensePlate: '1234-ABC'
                }
                user = await User.create({ name, surname, email, password: _password, trackers: trackerData })
                _user = await User.create({ name, surname, email: '123@123.com', password: _password, trackers: [trackerData2, trackerData3] })
            })
            it('should succeed on correct track data', async () => {
                const resp = await logic.retrieveRangeOfTracks(user.id, user.trackers[0].id, startTime, endTime)
                expect(resp).to.exist
                expect(resp.length).to.be.greaterThan(0)
            })


            it('should fail on incorrect id user', async () => {
                const wrongId = '5cb9998f2e59ee0009eac02c'
                try {
                    await logic.retrieveRangeOfTracks(wrongId, user.trackers[0].id, startTime, endTime)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }

            })

            it('should fail on no tracks between time inputs', async () => {
                try {
                    await logic.retrieveRangeOfTracks(_user.id, _user.trackers[0].id, startTime, endTime)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`Tracker without tracks between ${startTime} and ${endTime}`)
                }

            })

            it('should fail on undefined id user', async () => {
                try {
                    await logic.retrieveRangeOfTracks(undefined, user.trackers[0].id, startTime, endTime)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`id is not optional`)
                }

            })

            it('should fail on null id user', async () => {
                try {
                    await logic.retrieveRangeOfTracks(null, user.trackers[0].id, startTime, endTime)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal(`id is not optional`)
                }

            })
            it('should fail on unexisting ID tracker', async () => {
                const badId = 'Bad_Tracker_Id'
                try {
                    await logic.retrieveRangeOfTracks(user.id, badId, startTime, endTime)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`Tracker with id ${badId} doesn't exists`)
                }

            })

            it('should fail on undefined tracker id', async () => {
                try {
                    await logic.retrieveRangeOfTracks(user.id, undefined, startTime, endTime)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal('trackerID is not optional')
                }

            })

            it('should fail on null tracker id', async () => {
                try {
                    await logic.retrieveRangeOfTracks(user.id, null, startTime, endTime)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal('trackerID is not optional')
                }

            })
            it('should fail on undefined start time', async () => {
                try {
                    await logic.retrieveRangeOfTracks(user.id, user.trackers[0].id, undefined, endTime)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal('startTime is not optional')
                }

            })

            it('should fail on null start time', async () => {
                try {
                    await logic.retrieveRangeOfTracks(user.id, user.trackers[0].id, null, endTime)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal('startTime is not optional')
                }

            })

            it('should fail on undefined start time', async () => {
                try {
                    await logic.retrieveRangeOfTracks(user.id, user.trackers[0].id, startTime, undefined)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal('endTime is not optional')
                }

            })

            it('should fail on null start time', async () => {
                try {
                    await logic.retrieveRangeOfTracks(user.id, user.trackers[0].id, startTime, null)
                }
                catch (error) {
                    expect(error).to.be.instanceOf(RequirementError)
                    expect(error.message).to.equal('endTime is not optional')
                }

            })

        })
    })

    after(() => mongoose.disconnect())
})