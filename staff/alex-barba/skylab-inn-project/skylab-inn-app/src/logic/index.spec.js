'use strict'

require('dotenv').config()

import logic from '.'
import skylabInnApi from '../skylab-inn-api'
import bcrypt from 'bcrypt'
import {createToken} from '../token-helper'

const { mongoose, models: { EmailWhitelist, User, Work } } = require('skylab-inn-data')

const { env: { DB_URL } } = process

describe('logic', () => {

    beforeAll(() => mongoose.connect(DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Work.deleteMany(),
            EmailWhitelist.deleteMany()
        ])
    )
    
    describe('register user', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        let email, password, passwordConfirm

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`
            passwordConfirm = password

            return EmailWhitelist.create({ name, surname, email })
        })

        it('should succeed on correct data', async () => {
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)

            expect(id).toBeDefined()
            expect(typeof id === 'string').toBeTruthy()

            const user = await User.findOne({ email })

            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on duplicate email', () => {
            (async() => {

                const _name = 'Àlex'
                const _surname = 'Barba'
                const _email = `alex.barba-${Math.random()}@gmail.com`
                const _password = `Pass-${Math.random()}`
                const _passwordConfirm = _password
    
                const hash =  await bcrypt.hash(password, 11)
                const user1 = await User.create({name: _name, surname: _surname, email: _email, password: hash})
                return await logic.registerUser(_name, _surname, _email, _password, _passwordConfirm)
            })()
                .catch(error => {
                    expect(error).toBeDefined();
                })
        })
        
        it('should fail on empty name', () =>
            expect(() => logic.registerUser('', surname, email, password, passwordConfirm)).toThrowError('name is empty'))

        it('should fail on empty surname', () =>
            expect(() => logic.registerUser(name, '', email, password, passwordConfirm)).toThrowError('surname is empty'))

        it('should fail on empty email', () =>
            expect(() => logic.registerUser(name, surname, '', password, passwordConfirm)).toThrowError('email is empty'))

        it('should fail on empty password', () =>
            expect(() => logic.registerUser(name, surname, email, '', passwordConfirm)).toThrowError('password is empty'))

        it('should fail on empty password confirmation', () =>
            expect(() => logic.registerUser(name, surname, email, password, '')).toThrowError('passwordConfirm is empty'))

        it('should fail when name is a number', () =>
            expect(() => logic.registerUser(1, surname, email, password, passwordConfirm)).toThrowError(`1 is not a string`))

        it('should fail when name is an object', () =>
            expect(() => logic.registerUser({}, surname, email, password, passwordConfirm)).toThrowError(`[object Object] is not a string`))

        it('should fail when name is an array', () =>
            expect(() => logic.registerUser([1, 2, 3], surname, email, password, passwordConfirm)).toThrowError(`1,2,3 is not a string`))

        it('should fail when name is a boolean', () =>
            expect(() => logic.registerUser(true, surname, email, password, passwordConfirm)).toThrowError(`true is not a string`))

        it('should fail when surname is a number', () =>
            expect(() => logic.registerUser(name, 1, email, password, passwordConfirm)).toThrowError(`1 is not a string`))

        it('should fail when surname is an object', () =>
            expect(() => logic.registerUser(name, {}, email, password, passwordConfirm)).toThrowError(`[object Object] is not a string`))

        it('should fail when surname is an array', () =>
            expect(() => logic.registerUser(name, [1, 2, 3], email, password, passwordConfirm)).toThrowError(`1,2,3 is not a string`))

        it('should fail when surname is a boolean', () =>
            expect(() => logic.registerUser(name, true, email, password, passwordConfirm)).toThrowError(`true is not a string`))

        it('should fail when email is a number', () =>
            expect(() => logic.registerUser(name, surname, 1, password, passwordConfirm)).toThrowError(`1 is not a string`))

        it('should fail when email is an object', () =>
            expect(() => logic.registerUser(name, surname, {}, password, passwordConfirm)).toThrowError(`[object Object] is not a string`))

        it('should fail when email is an array', () =>
            expect(() => logic.registerUser(name, surname, [1, 2, 3], password, passwordConfirm)).toThrowError(`1,2,3 is not a string`))

        it('should fail when email is a boolean', () =>
            expect(() => logic.registerUser(name, surname, true, password, passwordConfirm)).toThrowError(`true is not a string`))

        it('should fail when password is a number', () =>
            expect(() => logic.registerUser(name, surname, email, 1, passwordConfirm)).toThrowError(`1 is not a string`))

        it('should fail when password is an object', () =>
            expect(() => logic.registerUser(name, surname, email, {}, passwordConfirm)).toThrowError(`[object Object] is not a string`))

        it('should fail when password is an array', () =>
            expect(() => logic.registerUser(name, surname, email, [1, 2, 3], passwordConfirm)).toThrowError(`1,2,3 is not a string`))

        it('should fail when password is a boolean', () =>
            expect(() => logic.registerUser(name, surname, email, true, passwordConfirm)).toThrowError(`true is not a string`))

        it('should fail when password confirmation is a number', () =>
            expect(() => logic.registerUser(name, surname, email, password, 1)).toThrowError(`1 is not a string`))

        it('should fail when password confirmation is an object', () =>
            expect(() => logic.registerUser(name, surname, email, password, {})).toThrowError(`[object Object] is not a string`))

        it('should fail when password confirmation is an array', () =>
            expect(() => logic.registerUser(name, surname, email, password, [1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when password confirmation is a boolean', () =>
            expect(() => logic.registerUser(name, surname, email, password, true)).toThrowError(`true is not a string`))
    })

    describe('authenticate user', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        let email, password

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            await EmailWhitelist.create({ name, surname, email })

            const hash = await bcrypt.hash(password, 11)
            return User.create({ name, surname, email, password: hash })
        })

        it('should succeed on correct data', async () => {
            const token = await logic.logInUser(email, password)

            expect(token).toBeDefined()
            expect(typeof token === 'string').toBeTruthy()

            const user = await User.findOne({ email })

            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on not registered email', () => {
            return logic.logInUser('not-previously-registered@mail.com', password)
                .catch(error => {
                    expect(error).toBeDefined();
                    expect(error.message).toBe(`user with email not-previously-registered@mail.com not found`)
                })
        })

        it('should fail on wrong credentials', () => {
            return logic.logInUser(email, 'not-a-matching-password')
                .catch(error => {
                    expect(error).toBeDefined();
                    expect(error.message).toBe(`wrong credentials`)
                })
        })

        it('should fail on empty email', () =>
            expect(() => logic.logInUser('', password)).toThrowError('email is empty'))

        it('should fail on empty password', () =>
            expect(() => logic.logInUser(email, '')).toThrowError('password is empty'))

        it('should fail when email is a number', () =>
            expect(() => logic.logInUser(1, password)).toThrowError(`1 is not a string`))

        it('should fail when email is an object', () =>
            expect(() => logic.logInUser({}, password)).toThrowError(`[object Object] is not a string`))

        it('should fail when email is an array', () =>
            expect(() => logic.logInUser([1, 2, 3], password)).toThrowError(`1,2,3 is not a string`))

        it('should fail when email is a boolean', () =>
            expect(() => logic.logInUser(true, password)).toThrowError(`true is not a string`))

        it('should fail when password is a number', () =>
            expect(() => logic.logInUser(email, 1)).toThrowError(`1 is not a string`))

        it('should fail when password is an object', () =>
            expect(() => logic.logInUser(email, {})).toThrowError(`[object Object] is not a string`))

        it('should fail when password is an array', () =>
            expect(() => logic.logInUser(email, [1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when password is a boolean', () =>
            expect(() => logic.logInUser(email, true)).toThrowError(`true is not a string`))
    })

    describe('retrieve user', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        let email, password, _id ,_token

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            await EmailWhitelist.create({ name, surname, email })

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })
            _id = user.id

            _token = await skylabInnApi.authenticateUser(email, password)
            logic.__userApiToken__ = _token

        })

        it('should succeed on correct credentials', () => {
            return logic.retrieveUser(_token)
                .then(user => {
                    expect(user.id).toEqual(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                    expect(user.__v).toBeUndefined()
                    expect(user.password).toBeUndefined()
                })
        })

        it('should fail on wrong token', async() => {
            try {
                await logic.retrieveUser('invalid-token')
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`jwt malformed`)
            }
        })
    })

    describe('update user', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        const data = { name: 'Test', email: 'test@email.com', telephone: 618610187 }
        let email, password, _id, _token

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            await EmailWhitelist.create({ name, surname, email })

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })
            _id = user.id

            _token = await skylabInnApi.authenticateUser(email, password)
            logic.__userApiToken__ = _token
        })

        it('should succeed on correct credentials', async () => {
            const user = await logic.updateUser(data)

            expect(user.id).toEqual(_id)
            expect(user.name).toBe(data.name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(data.email)
            expect(user.telephone).toBe(data.telephone)
            expect(user.__v).toBeUndefined()
            expect(user.password).toBeUndefined()
        })

        it('should fail on empty data', () =>
            expect(() => logic.updateUser()).toThrowError('data is empty'))

        it('should fail when data is a number', () =>
            expect(() => logic.updateUser(1)).toThrowError(`1 is not an object`))

        it('should fail when data is an object', () =>
            expect(() => logic.updateUser('hola')).toThrowError(`hola is not an object`))

        it('should fail when data is an array', () =>
            expect(() => logic.updateUser([1, 2, 3])).toThrowError(`1,2,3 is not an object`))

        it('should fail when data is a boolean', () =>
            expect(() => logic.updateUser(true)).toThrowError(`true is not an object`))
    })

    describe('search skylaber', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        let email, password, _id, _token
        let test = 'test'

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash2 = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash2 })

            const _name = 'Marti'
            const _surname = 'Malek'
            const _email = `marti.malek-${Math.random()}@gmail.com`
            const _password = 'p'

            const hash = await bcrypt.hash(_password, 10)
            await User.create({ name: _name, surname: _surname, email: _email, password: hash })

            const user = await User.findOne({ email })
            _id = user.id

            _token = await skylabInnApi.authenticateUser(email, password)
            logic.__userApiToken__ = _token
        })

        it('should succeed on correct search', async () => {
            const query = 'barba'

            const results = await logic.searchSkylaber(query)

            expect(results).toBeDefined()
            expect(results.resContact.length).toBe(1)
            expect(results.resContact[0].name).toBe(name)
        })

        it('should fail on not registered user', async () => {
            await User.deleteMany()
            try {
                await logic.searchSkylaber(test)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
            }
        })

        it('should succeed on correct search for two users', async () => {
            const __name = 'Martini'
            const __surname = 'Malek'
            const __email = 'marti@malekasd.com'
            const __password = 'p'

            const hash = await bcrypt.hash(__password, 10)
            await User.create({ name: __name, surname: __surname, email: __email, password: hash })
            const query = 'marti'

            const results = await logic.searchSkylaber(query)

            expect(results).toBeDefined()
            expect(results.resContact.length).toBe(2)
            expect(results.resContact[0].name).toBe('Marti')
            expect(results.resContact[1].name).toBe(__name)
        })

        it('should fail on empty query', () =>
            expect(() => logic.searchSkylaber('')).toThrowError('query is empty'))

        it('should fail when query is a number', () =>
            expect(() => logic.searchSkylaber(1)).toThrowError(`1 is not a string`))

        it('should fail when query is an object', () =>
            expect(() => logic.searchSkylaber({})).toThrowError(`[object Object] is not a string`))

        it('should fail when query is an array', () =>
            expect(() => logic.searchSkylaber([1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when query is a boolean', () =>
            expect(() => logic.searchSkylaber(true)).toThrowError(`true is not a string`))

    })

    describe('ad search skylaber', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        const _name = 'Marti'
        const _surname = 'Malek'
        let email, password, _email, _password, _id, _token
        let test = [['Contact Information', 'alex']]

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash2 = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash2 })

            _email = `marti.malek-${Math.random()}@gmail.com`
            _password = 'p'

            await EmailWhitelist.create({ name: _name, surname: _surname, email: _email })

            const hash = await bcrypt.hash(_password, 10)
            await User.create({ name: _name, surname: _surname, email: _email, password: hash })

            const user = await User.findOne({ email })
            _id = user.id

            _token = await skylabInnApi.authenticateUser(email, password)
            logic.__userApiToken__ = _token
        })

        it('should succeed on correct search', async () => {
            const results = await logic.adSearchSkylaber(test)

            expect(results).toBeDefined()
            expect(results.length).toBe(1)
            expect(results[0].name).toBe(name)
        })

        it('should succeed on correct search for two users', async () => {
            const __name = 'Martini'
            const __surname = 'Malek'
            const __email = 'marti@malekasd.com'
            const __password = 'p'

            const hash = await bcrypt.hash(__password, 10)
            await User.create({ name: __name, surname: __surname, email: __email, password: hash })
            const query = [['Contact Information', 'marti']]

            const results = await logic.adSearchSkylaber(query)

            expect(results).toBeDefined()
            expect(results.length).toBe(2)
            expect(results[0].name).toBe(_name)
            expect(results[1].name).toBe(__name)
        })

        it('should fail on not registered user', async () => {
            await User.deleteMany()
            try {
                await logic.adSearchSkylaber(test)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)

            }
        })

        it('should fail on empty param', () =>
            expect(() => logic.adSearchSkylaber([])).toThrowError('param is empty'))

        it('should fail when param is a number', () =>
            expect(() => logic.adSearchSkylaber(1)).toThrowError(`1 is not an array`))

        it('should fail when param is an object', () =>
            expect(() => logic.adSearchSkylaber({})).toThrowError(`[object Object] is not an array`))

        it('should fail when param is a string', () =>
            expect(() => logic.adSearchSkylaber('test')).toThrowError(`test is not an array`))

        it('should fail when param is a boolean', () =>
            expect(() => logic.adSearchSkylaber(true)).toThrowError(`true is not an array`))

    })

    describe('retrieve skylaber', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        let email, password, _id, _skylaberId, _token

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })
            _id = user.id
            _skylaberId = user.id

            _token = await skylabInnApi.authenticateUser(email, password)
            logic.__userApiToken__ = _token
        })

        it('should succeed on correct credentials', async () => {
            const user = await logic.retrieveSkylaber(_skylaberId)

            expect(user.id).toEqual(_id)
            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)
            expect(user.__v).toBeUndefined()
            expect(user.password).toBeUndefined()
        })

        it('should fail on not registered user', async () => {
            await User.deleteOne({ id: _id })
            try {
                await logic.retrieveSkylaber(_skylaberId)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
            }
        })

        it('should fail on not registered skylaber', async () => {
            await User.deleteOne({ id: _skylaberId })
            try {
                await logic.retrieveSkylaber(_skylaberId)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`skylaber with userId ${skylaberId} not found`)
            }
        })

        it('should fail on empty skylaberId', () =>
            expect(() => logic.retrieveSkylaber('')).toThrowError('skylaberId is empty'))

        it('should fail when skylaberId is a number', () =>
            expect(() => logic.retrieveSkylaber(1)).toThrowError(`1 is not a string`))

        it('should fail when skylaberId is an object', () =>
            expect(() => logic.retrieveSkylaber({})).toThrowError(`[object Object] is not a string`))

        it('should fail when skylaberId is an array', () =>
            expect(() => logic.retrieveSkylaber([1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when skylaberId is a boolean', () =>
            expect(() => logic.retrieveSkylaber(true)).toThrowError(`true is not a string`))
    })

    describe('add user information', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        let email, password, _id, type, data, _token

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })
            _id = user.id

            _token = await skylabInnApi.authenticateUser(email, password)
            logic.__userApiToken__ = _token
        })

        it('should succeed on correct work experience', async () => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            await logic.addUserInformation(type, data)

            const user = await User.findById(_id)

            expect(user.workExperience[0]._id).toBeDefined()
            expect(user.workExperience[0].company).toEqual('test')
            expect(user.workExperience[0].position).toEqual('test')
            expect(user.workExperience[0].current).toEqual(true)
        })

        it('should fail on wrong work information', async () => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: 'test', endDate: '', current: true }

            try {
                await logic.addUserInformation(type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe("User validation failed: workExperience.0.startDate: Path `startDate` is required.")
            }
        })

        it('should succeed on correct tech information', async () => {
            type = 'Tech'
            data = { tech: 'test', level: 'Novice' }
            await logic.addUserInformation(type, data)

            const user = await User.findById(_id)

            expect(user.technology[0]._id).toBeDefined()
            expect(user.technology[0].tech).toEqual('test')
            expect(user.technology[0].level).toEqual('Novice')
        })

        it('should fail on wrong tech information', async () => {
            type = 'Tech'
            data = { tech: 'test', level: 'test' }

            try {
                await logic.addUserInformation(type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe("User validation failed: technology.0.level: `test` is not a valid enum value for path `level`.")
            }
        })

        it('should succeed on correct language information', async () => {
            type = 'Language'
            data = { language: 'test', level: 'Elementary proficiency' }
            await logic.addUserInformation(type, data)

            const user = await User.findById(_id)

            expect(user.language[0]._id).toBeDefined()
            expect(user.language[0].language).toEqual('test')
            expect(user.language[0].level).toEqual('Elementary proficiency')
        })

        it('should fail on wrong language information', async () => {
            type = 'Language'
            data = { language: 'test', level: 'test' }

            try {
                await logic.addUserInformation(type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe("User validation failed: language.0.level: `test` is not a valid enum value for path `level`.")
            }
        })

        it('should succeed on correct education information', async () => {
            type = 'Education'
            data = { college: 'test', degree: 'test' }
            await logic.addUserInformation(type, data)

            const user = await User.findById(_id)

            expect(user.education[0]._id).toBeDefined()
            expect(user.education[0].college).toEqual('test')
            expect(user.education[0].degree).toEqual('test')
        })

        it('should fail on wrong education information', async () => {
            type = 'Education'
            data = { college: 'test', degree: null }

            try {
                await logic.addUserInformation(type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe("User validation failed: education.0.degree: Path `degree` is required.")
            }
        })

        it('should fail on not registered user', async () => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            await User.deleteMany()
            try {
                await logic.addUserInformation(type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
            }
        })

        it('should fail on empty type', () =>
            expect(() => logic.addUserInformation('', data)).toThrowError('type is empty'))

        it('should fail when type is a number', () =>
            expect(() => logic.addUserInformation(1, data)).toThrowError(`1 is not a string`))

        it('should fail when type is an object', () =>
            expect(() => logic.addUserInformation({}, data)).toThrowError(`[object Object] is not a string`))

        it('should fail when type is an array', () =>
            expect(() => logic.addUserInformation([1, 2, 3], data)).toThrowError(`1,2,3 is not a string`))

        it('should fail when type is a boolean', () =>
            expect(() => logic.addUserInformation(true, data)).toThrowError(`true is not a string`))

        it('should fail on empty data', () =>
            expect(() => logic.addUserInformation(type)).toThrowError('data is empty'))

        it('should fail when data is a number', () =>
            expect(() => logic.addUserInformation(type, 1)).toThrowError(`1 is not an object`))

        it('should fail when data is a string', () =>
            expect(() => logic.addUserInformation(type, 'hola')).toThrowError(`hola is not an object`))

        it('should fail when data is an array', () =>
            expect(() => logic.addUserInformation(type, [1, 2, 3])).toThrowError(`1,2,3 is not an object`))

        it('should fail when data is a boolean', () =>
            expect(() => logic.addUserInformation(type, true)).toThrowError(`true is not an object`))
    })

    describe('update user information', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        let email, password, _id, type, data, infoId, infoIdW, infoIdT, infoIdL, infoIdE, _data, _token

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })
            _id = user.id

            _token = await skylabInnApi.authenticateUser(email, password)
            logic.__userApiToken__ = _token

            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }

            const newWork = new Work(data)

            user.workExperience.push(newWork)

            await user.save()

            newWork.id = newWork._id.toString()
            delete newWork._id

            infoIdW = newWork.id

            infoId = infoIdW    
        })

        it('should succeed on correct work update information', async () => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            infoIdW = await skylabInnApi.addUserInformation(_token, type, data)

            _data = { company: 'test2', position: 'test2', startDate: new Date, endDate: new Date, current: false }
            await logic.updateUserInformation(infoIdW.id, type, _data)

            const user = await User.findById(_id)

            expect(user.workExperience[1]._id).toBeDefined()
            expect(user.workExperience[1].company).toEqual('test2')
            expect(user.workExperience[1].position).toEqual('test2')
            expect(user.workExperience[1].current).toEqual(false)
        })

        it('should fail on wrong work id', async () => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            infoIdW = await skylabInnApi.addUserInformation(_token, type, data)

            await skylabInnApi.removeUserInformation(_token, infoIdW.id, type)

            try {
                await logic.updateUserInformation(infoIdW.id, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`work with id ${infoIdW.id} not found`)
            }
        })

        it('should succeed on correct tech update information', async () => {
            type = 'Tech'
            data = { tech: 'test', level: 'Novice' }
            infoIdT = await skylabInnApi.addUserInformation(_token, type, data)

            _data = { tech: 'test2', level: 'Intermediate' }
            await logic.updateUserInformation(infoIdT.id, type, _data)

            const user = await User.findById(_id)

            expect(user.technology[0]._id).toBeDefined()
            expect(user.technology[0].tech).toEqual('test2')
            expect(user.technology[0].level).toEqual('Intermediate')
        })

        it('should fail on wrong tech id', async () => {
            type = 'Tech'
            data = { tech: 'test', level: 'Novice' }
            infoIdT = await skylabInnApi.addUserInformation(_token, type, data)

            await skylabInnApi.removeUserInformation(_token, infoIdT.id, type)

            try {
                await logic.updateUserInformation(infoIdT.id, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`technology with id ${infoIdT.id} not found`)
            }
        })

        it('should succeed on correct language update information', async () => {
            type = 'Language'
            data = { language: 'test', level: 'Elementary proficiency' }
            infoIdL = await skylabInnApi.addUserInformation(_token, type, data)

            _data = { language: 'test2', level: 'Limited working proficiency' }
            await logic.updateUserInformation(infoIdL.id, type, _data)

            const user = await User.findById(_id)

            expect(user.language[0]._id).toBeDefined()
            expect(user.language[0].language).toEqual('test2')
            expect(user.language[0].level).toEqual('Limited working proficiency')
        })

        it('should fail on wrong language id', async () => {
            type = 'Language'
            data = { language: 'test', level: 'Elementary proficiency' }
            infoIdL = await skylabInnApi.addUserInformation(_token, type, data)

            await skylabInnApi.removeUserInformation(_token, infoIdL.id, type)

            try {
                await logic.updateUserInformation(infoIdL.id, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`language with id ${infoIdL.id} not found`)
            }
        })

        it('should succeed on correct education update information', async () => {
            type = 'Education'
            data = { college: 'test', degree: 'test' }
            infoIdE = await skylabInnApi.addUserInformation(_token, type, data)

            _data = { college: 'test2', degree: 'test2' }
            await logic.updateUserInformation(infoIdE.id, type, _data)

            const user = await User.findById(_id)

            expect(user.education[0]._id).toBeDefined()
            expect(user.education[0].college).toEqual('test2')
            expect(user.education[0].degree).toEqual('test2')
        })

        it('should fail on wrong education id', async () => {
            type = 'Education'
            data = { college: 'test', degree: 'test' }
            infoIdE = await skylabInnApi.addUserInformation(_token, type, data)

            await skylabInnApi.removeUserInformation(_token, infoIdE.id, type)

            try {
                await logic.updateUserInformation(infoIdE.id, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`education with id ${infoIdE.id} not found`)
            }
        })

        it('should fail on not registered user', async () => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            await User.deleteMany()
            try {
                await logic.updateUserInformation(infoId, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)

            }
        })

        it('should fail on empty infoId', () =>
            expect(() => logic.updateUserInformation('', type, data)).toThrowError('infoId is empty'))

        it('should fail when infoId is a number', () =>
            expect(() => logic.updateUserInformation(1, type, data)).toThrowError(`1 is not a string`))

        it('should fail when infoId is an object', () =>
            expect(() => logic.updateUserInformation({}, type, data)).toThrowError(`[object Object] is not a string`))

        it('should fail when infoId is an array', () =>
            expect(() => logic.updateUserInformation([1, 2, 3], type, data)).toThrowError(`1,2,3 is not a string`))

        it('should fail when infoId is a boolean', () =>
            expect(() => logic.updateUserInformation(true, type, data)).toThrowError(`true is not a string`))

        it('should fail on empty type', () =>
            expect(() => logic.updateUserInformation(infoId, '', data)).toThrowError('type is empty'))

        it('should fail when type is a number', () =>
            expect(() => logic.updateUserInformation(infoId, 1, data)).toThrowError(`1 is not a string`))

        it('should fail when type is an object', () =>
            expect(() => logic.updateUserInformation(infoId, {}, data)).toThrowError(`[object Object] is not a string`))

        it('should fail when type is an array', () =>
            expect(() => logic.updateUserInformation(infoId, [1, 2, 3], data)).toThrowError(`1,2,3 is not a string`))

        it('should fail when type is a boolean', () =>
            expect(() => logic.updateUserInformation(infoId, true, data)).toThrowError(`true is not a string`))

        it('should fail on empty data', () =>
            expect(() => logic.updateUserInformation(infoId, type)).toThrowError('data is empty'))

        it('should fail when data is a number', () =>
            expect(() => logic.updateUserInformation(infoId, type, 1)).toThrowError(`1 is not an object`))

        it('should fail when data is a string', () =>
            expect(() => logic.updateUserInformation(infoId, type, 'hola')).toThrowError(`hola is not an object`))

        it('should fail when data is an array', () =>
            expect(() => logic.updateUserInformation(infoId, type, [1, 2, 3])).toThrowError(`1,2,3 is not an object`))

        it('should fail when data is a boolean', () =>
            expect(() => logic.updateUserInformation(infoId, type, true)).toThrowError(`true is not an object`))
    })

    describe('remove user information', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        let email, password, _id, type, data, infoId, infoIdW, infoIdT, infoIdL, infoIdE, _data, _token


        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })
            _id = user.id

            _token = await skylabInnApi.authenticateUser(email, password)
            logic.__userApiToken__ = _token

            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }

            const newWork = new Work(data)

            user.workExperience.push(newWork)

            await user.save()

            newWork.id = newWork._id.toString()
            delete newWork._id

            infoIdW = newWork.id

            infoId = infoIdW
        })


        it('should succeed on correct work id', async () => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            infoIdW = await skylabInnApi.addUserInformation(_token, type, data)

            const user = await User.findById(_id)

            expect(user.workExperience[1]._id).toBeDefined()
            expect(user.workExperience[1].company).toEqual('test')
            expect(user.workExperience[1].position).toEqual('test')
            expect(user.workExperience[1].current).toEqual(true)

            await logic.removeUserInformation(infoIdW.id, type)

            const _user = await User.findById(_id)

            expect(_user.workExperience[1]).toBeUndefined()
        })

        it('should fail on wrong work id', async () => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            infoIdW = await skylabInnApi.addUserInformation(_token, type, data)

            type = 'Work'
            data = { company: 'test', position: 'test', startDate: 'test', endDate: '', current: true }
            await logic.removeUserInformation(infoIdW.id, type)

            try {
                await logic.removeUserInformation(infoIdW.id, type)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`work with id ${infoIdW.id} not found`)
            }
        })

        it('should succeed on correct tech id', async () => {
            type = 'Tech'
            data = { tech: 'test', level: 'Novice' }
            infoIdT = await skylabInnApi.addUserInformation(_token, type, data)

            _data = { tech: 'test2', level: 'Intermediate' }
            await skylabInnApi.updateUserInformation(_token, infoIdT.id, type, _data)

            const user = await User.findById(_id)

            expect(user.technology[0]._id).toBeDefined()
            expect(user.technology[0].tech).toEqual('test2')
            expect(user.technology[0].level).toEqual('Intermediate')

            await logic.removeUserInformation(infoIdT.id, type)

            const _user = await User.findById(_id)

            expect(_user.technology[0]).toBeUndefined()
        })

        it('should fail on wrong tech id', async () => {
            type = 'Tech'
            data = { tech: 'test', level: 'Novice' }
            infoIdT = await skylabInnApi.addUserInformation(_token, type, data)

            await logic.removeUserInformation(infoIdT.id, type)

            try {
                await logic.removeUserInformation(infoIdT.id, type)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`technology with id ${infoIdT.id} not found`)
            }
        })

        it('should succeed on correct language id', async () => {
            type = 'Language'
            data = { language: 'test', level: 'Elementary proficiency' }
            infoIdL = await skylabInnApi.addUserInformation(_token, type, data)

            _data = { language: 'test2', level: 'Limited working proficiency' }
            await skylabInnApi.updateUserInformation(_token, infoIdL.id, type, _data)

            const user = await User.findById(_id)

            expect(user.language[0]._id).toBeDefined()
            expect(user.language[0].language).toEqual('test2')
            expect(user.language[0].level).toEqual('Limited working proficiency')

            await logic.removeUserInformation(infoIdL.id, type)

            const _user = await User.findById(_id)

            expect(_user.language[0]).toBeUndefined()
        })

        it('should fail on wrong language id', async () => {
            type = 'Language'
            data = { language: 'test', level: 'Elementary proficiency' }
            infoIdL = await skylabInnApi.addUserInformation(_token, type, data)

            await logic.removeUserInformation(infoIdL.id, type)

            try {
                await logic.removeUserInformation(infoIdL.id, type)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`language with id ${infoIdL.id} not found`)
            }
        })

        it('should succeed on correct education id', async () => {
            type = 'Education'
            data = { college: 'test', degree: 'test' }
            infoIdE = await skylabInnApi.addUserInformation(_token, type, data)

            _data = { college: 'test2', degree: 'test2' }
            await skylabInnApi.updateUserInformation(_token, infoIdE.id, type, _data)

            const user = await User.findById(_id)

            expect(user.education[0]._id).toBeDefined()
            expect(user.education[0].college).toEqual('test2')
            expect(user.education[0].degree).toEqual('test2')

            await logic.removeUserInformation(infoIdE.id, type)

            const _user = await User.findById(_id)

            expect(_user.education[0]).toBeUndefined()
        })

        it('should fail on wrong education id', async () => {
            type = 'Education'
            data = { college: 'test', degree: 'test' }
            infoIdE = await skylabInnApi.addUserInformation(_token, type, data)

            await logic.removeUserInformation(infoIdE.id, type)

            try {
                await logic.removeUserInformation(infoIdE.id, type)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`education with id ${infoIdE.id} not found`)
            }
        })

        it('should fail on not registered user', async () => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            await User.deleteMany()
            try {
                await logic.removeUserInformation(infoId, type)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)

            }
        })

        it('should fail on empty infoId', () =>
            expect(() => logic.removeUserInformation('', type)).toThrowError('infoId is empty'))

        it('should fail when infoId is a number', () =>
            expect(() => logic.removeUserInformation(1, type)).toThrowError(`1 is not a string`))

        it('should fail when infoId is an object', () =>
            expect(() => logic.removeUserInformation({}, type)).toThrowError(`[object Object] is not a string`))

        it('should fail when infoId is an array', () =>
            expect(() => logic.removeUserInformation([1, 2, 3], type)).toThrowError(`1,2,3 is not a string`))

        it('should fail when infoId is a boolean', () =>
            expect(() => logic.removeUserInformation(true, type)).toThrowError(`true is not a string`))

        it('should fail on empty type', () =>
            expect(() => logic.removeUserInformation(infoId, '')).toThrowError('type is empty'))

        it('should fail when type is a number', () =>
            expect(() => logic.removeUserInformation(infoId, 1)).toThrowError(`1 is not a string`))

        it('should fail when type is an object', () =>
            expect(() => logic.removeUserInformation(infoId, {})).toThrowError(`[object Object] is not a string`))

        it('should fail when type is an array', () =>
            expect(() => logic.removeUserInformation(infoId, [1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when type is a boolean', () =>
            expect(() => logic.removeUserInformation(infoId, true)).toThrowError(`true is not a string`))
    })
      
    describe('add skylaber', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        const role = 'Admin'
        let email, password, _id, data, _email, _token

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`
            
            data = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com` }
            
            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash, role })
            
            const user = await User.findOne({ email })
            _id = user.id

            _token = await skylabInnApi.authenticateUser(email, password)
            logic.__userApiToken__ = _token
        })

        it('should succeed on correct credentials', async () => {
            const id = await logic.addSkylaber(data)

            expect(id).toBeDefined()

            const skylaber = await EmailWhitelist.findById(id)
            
            expect(skylaber.name).toBe(data.name)
            expect(skylaber.surname).toBe(data.surname)
            expect(skylaber.email).toBe(data.email)
        })

        it('should fail on invalid userId', async () => {
            await User.deleteMany()
            try {
                await logic.addSkylaber(data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
            }
        })

        it('should fail on not valid role', async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash, role })

            const user = await User.findOne({ email })
            
            let __token = await skylabInnApi.authenticateUser(email, password)

            try {
                await skylabInnApi.addSkylaber(__token, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`Access denied`)
            }
        })

        it('should fail on already added skylaber', async () => {
            data = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com` }
            await EmailWhitelist.create(data)

            try {
                await logic.addSkylaber(data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`skylaber with email ${data.email} already added to the Whitelist`)
            }
        })

        it('should fail on already registered skylaber', async () => {
            _email = 'test@mail.com'
            data = { name: 'Test', surname: 'test', email: `${_email}` }

            await User.create({ name: 'Test', surname: 'Test`', email: `${_email}`, password: '123', passwordConfirm: '123' })

            try {
                await logic.addSkylaber(data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`skylaber with email ${data.email} already exists`)
            }
        })

        it('should fail on empty data', () =>
            expect(() => skylabInnApi.addSkylaber(_token)).toThrowError('data is empty'))

        it('should fail when data is a number', () =>
            expect(() => logic.addSkylaber(1)).toThrowError(`1 is not an object`))

        it('should fail when data is a string', () =>
            expect(() => logic.addSkylaber('hola')).toThrowError(`hola is not an object`))

        it('should fail when data is an array', () =>
            expect(() => logic.addSkylaber([1, 2, 3])).toThrowError(`1,2,3 is not an object`))

        it('should fail when data is a boolean', () =>
            expect(() => logic.addSkylaber(true)).toThrowError(`true is not an object`))
    })

    describe('retrieve pending skylabers', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        const role = 'Admin'
        let email, password, _id, _token

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`
            
            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash, role })
            
            const user = await User.findOne({ email })
            _id = user.id

            _token = await skylabInnApi.authenticateUser(email, password)
            logic.__userApiToken__ = _token
        })

        it('should succeed on correct credentials', async () => {
            const a = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, state: 'pending' }
            const b = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, state: 'pending' }
            const c = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, state: 'registered' }

            await EmailWhitelist.create(a)
            await EmailWhitelist.create(b)
            await EmailWhitelist.create(c)

            const users = await logic.retrievePendingSkylabers()

            expect(users).toBeDefined()
        })

        it('should succeed on returning only pending skylabers', async () => {
            const a = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, state: 'pending' }
            const b = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, state: 'pending' }
            const c = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, state: 'registered' }

            await EmailWhitelist.create(a)
            await EmailWhitelist.create(b)
            await EmailWhitelist.create(c)

            const users = await logic.retrievePendingSkylabers()

            expect(users).toBeDefined()
            expect(users.length).toBe(2)
        })

        it('should fail on invalid role', async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash, role })

            let __token = await skylabInnApi.authenticateUser(email, password)
            logic.__userApiToken__ = __token

            try {
                await logic.retrievePendingSkylabers(__token)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`Access denied`)
            }
        })

        it('should fail on not registered email', async () => {
            await User.deleteMany()
            try {
                await logic.retrievePendingSkylabers()
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
            }
        })
    })

    describe('retrieve unverified emails', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        const role = 'Admin'
        let email, password, _id, _token

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash, role })

            const user = await User.findOne({ email })
            _id = user.id

            _token = await skylabInnApi.authenticateUser(email, password)
            logic.__userApiToken__ = _token
        })

        it('should succeed on correct credentials', async () => {
            const users = await logic.retrieveUnverifiedEmails()

            expect(users).toBeDefined()
        })

        it('should succeed on returning only unverified emails from User roles', async () => {
            const a = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, password: '123', status: 'verified' }
            const b = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, password: '123', status: 'verfied' }
            const c = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, password: '123', status: 'not-verified' }
            const d = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, password: '123', status: 'verfied', role: 'Admin' }

            await User.create(a)
            await User.create(b)
            await User.create(c)
            await User.create(d)

            const users = await logic.retrieveUnverifiedEmails()

            expect(users).toBeDefined()
            expect(users.length).toBe(2)
        })

        it('should fail on not valid role', async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash, role })

            let __token = await skylabInnApi.authenticateUser(email, password)
            logic.__userApiToken__ = __token

            try {
                await logic.retrieveUnverifiedEmails()
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`Access denied`)
            }
        })

        it('should fail on not registered email', async () => {
            await User.deleteMany()
            try {
                await logic.retrieveUnverifiedEmails()
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
            }
        })
    })

    describe('create hashed url to share results', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        let role = 'Admin'
        let skylaberIds =[]
        let email, password, _id, _idA, _idB, _token
        
        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash2 = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash2, role })

            const user = await User.findOne({ email })
            _id = user.id

            _token = await skylabInnApi.authenticateUser(email, password)
            logic.__userApiToken__ = _token

            const a = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, password: '123' }
            const b = { name: 'Test2', surname: 'test2', email: `alex.barba-${Math.random()}@gmail.com`, password: '123' }

            await User.create(a)
            const userA = await User.findOne({ email: a.email })
            _idA = userA.id
            

            await User.create(b)
            const userB = await User.findOne({ email: b.email })
            _idB = userB.id

            skylaberIds = [_idA, _idB]
        })

        it('should succeed on correct data', async () => {
            const url = await logic.shareResults(skylaberIds)

            expect(url).toBeDefined()
            expect(typeof url === 'string').toBeTruthy()
        })

        it('should fail on not registered user', async () => {
            await User.deleteMany()
            try {
                await logic.shareResults(skylaberIds)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
            }
        })

        it('should fail if user is not an Admin', async () => {
            const noAdmin = { name: 'Test2', surname: 'test2', email: `alex.barba-${Math.random()}@gmail.com`, password: '123' }

            await User.create(noAdmin)
            const userA = await User.findOne({ email: noAdmin.email })
            let id = userA.id

            let __token = await skylabInnApi.authenticateUser(email, password)
            logic.__userApiToken__ = __token

            try {
                await logic.shareResults( skylaberIds)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`Acces denied`)
            }
        })

        it('should fail on empty skylaberIds', () =>
            expect(() => logic.shareResults([])).toThrowError('skylaberIds is empty'))

        it('should fail when skylaberIds is a number', () =>
            expect(() => logic.shareResults(1)).toThrowError(`1 is not an array`))

        it('should fail when skylaberIds is an object', () =>
            expect(() => logic.shareResults({})).toThrowError(`[object Object] is not an array`))

        it('should fail when skylaberIds is a string', () =>
            expect(() => logic.shareResults('test')).toThrowError(`test is not an array`))

        it('should fail when skylaberIds is a boolean', () =>
            expect(() => logic.shareResults(true)).toThrowError(`true is not an array`))

    })

    describe('retrieve encrypted ids', () => {
        let encryptedIds 

        beforeEach(async () => {
            const a = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, password: '123' }
            const b = { name: 'Test2', surname: 'test2', email: `alex.barba-${Math.random()}@gmail.com`, password: '123' }

            await User.create(a)
            const userA = await User.findOne({ email: a.email })
            let _idA = userA.id

            await User.create(b)
            const userB = await User.findOne({ email: b.email })
            let _idB = userB.id

            let skylaberIds = [_idA, _idB]

            encryptedIds = await createToken(skylaberIds)
        })

        it('should succeed on correct token', async () => {
            const skylabers = await logic.retrieveEncryptedIds(encryptedIds)

            expect(skylabers).toBeDefined()
            expect(skylabers.length).toBe(2)
        })

        it('should fail on worng token', async () => {
            try {
                await logic.retrieveEncryptedIds('wrong-token')
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`jwt malformed`)
            }
        })

        it('should fail on empty encryptedIds', () =>
            expect(() => logic.retrieveEncryptedIds('')).toThrowError('encryptedIds is empty'))

        it('should fail when encryptedIds is a number', () =>
            expect(() => logic.retrieveEncryptedIds(1)).toThrowError(`1 is not a string`))

        it('should fail when encryptedIds is an object', () =>
            expect(() => logic.retrieveEncryptedIds({})).toThrowError(`[object Object] is not a string`))

        it('should fail when encryptedIds is an array', () =>
            expect(() => logic.retrieveEncryptedIds([1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when encryptedIds is a boolean', () =>
            expect(() => logic.retrieveEncryptedIds(true)).toThrowError(`true is not a string`))
    })

    afterAll(() => 
        Promise.all([
            User.deleteMany(),
            EmailWhitelist.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )

})