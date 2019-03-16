'use strict'

require('dotenv').config()

import skylabInnApi from '.'
import bcrypt from 'bcrypt'
import {createToken} from '../token-helper'

const { mongoose, models: { User, Work, EmailWhitelist } } = require('skylab-inn-data')

const { env: { DB_URL } } = process

describe('skylab inn api', () => {

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
        const role = 'Admin'
        let email, password, passwordConfirm

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`
            passwordConfirm = password

            return EmailWhitelist.create({ name, surname, email })
        })

        it('should succeed on correct data', async () => {
            const id = await skylabInnApi.registerUser(name, surname, email, password, passwordConfirm)

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
                return await skylabInnApi.registerUser(_name, _surname, _email, _password, _passwordConfirm)
            })()
                .catch(error => {
                    expect(error).toBeDefined();
                })
        })
        
        it('should fail on empty name', () =>
            expect(() => skylabInnApi.registerUser('', surname, email, password, passwordConfirm)).toThrowError('name is empty'))

        it('should fail on empty surname', () =>
            expect(() => skylabInnApi.registerUser(name, '', email, password, passwordConfirm)).toThrowError('surname is empty'))

        it('should fail on empty email', () =>
            expect(() => skylabInnApi.registerUser(name, surname, '', password, passwordConfirm)).toThrowError('email is empty'))

        it('should fail on empty password', () =>
            expect(() => skylabInnApi.registerUser(name, surname, email, '', passwordConfirm)).toThrowError('password is empty'))

        it('should fail on empty password confirmation', () =>
            expect(() => skylabInnApi.registerUser(name, surname, email, password, '')).toThrowError('password confirmation is empty'))

        it('should fail when name is a number', () =>
            expect(() => skylabInnApi.registerUser(1, surname, email, password, passwordConfirm)).toThrowError(`1 is not a string`))

        it('should fail when name is an object', () =>
            expect(() => skylabInnApi.registerUser({}, surname, email, password, passwordConfirm)).toThrowError(`[object Object] is not a string`))

        it('should fail when name is an array', () =>
            expect(() => skylabInnApi.registerUser([1, 2, 3], surname, email, password, passwordConfirm)).toThrowError(`1,2,3 is not a string`))

        it('should fail when name is a boolean', () =>
            expect(() => skylabInnApi.registerUser(true, surname, email, password, passwordConfirm)).toThrowError(`true is not a string`))

        it('should fail when surname is a number', () =>
            expect(() => skylabInnApi.registerUser(name, 1, email, password, passwordConfirm)).toThrowError(`1 is not a string`))

        it('should fail when surname is an object', () =>
            expect(() => skylabInnApi.registerUser(name, {}, email, password, passwordConfirm)).toThrowError(`[object Object] is not a string`))

        it('should fail when surname is an array', () =>
            expect(() => skylabInnApi.registerUser(name, [1, 2, 3], email, password, passwordConfirm)).toThrowError(`1,2,3 is not a string`))

        it('should fail when surname is a boolean', () =>
            expect(() => skylabInnApi.registerUser(name, true, email, password, passwordConfirm)).toThrowError(`true is not a string`))

        it('should fail when email is a number', () =>
            expect(() => skylabInnApi.registerUser(name, surname, 1, password, passwordConfirm)).toThrowError(`1 is not a string`))

        it('should fail when email is an object', () =>
            expect(() => skylabInnApi.registerUser(name, surname, {}, password, passwordConfirm)).toThrowError(`[object Object] is not a string`))

        it('should fail when email is an array', () =>
            expect(() => skylabInnApi.registerUser(name, surname, [1, 2, 3], password, passwordConfirm)).toThrowError(`1,2,3 is not a string`))

        it('should fail when email is a boolean', () =>
            expect(() => skylabInnApi.registerUser(name, surname, true, password, passwordConfirm)).toThrowError(`true is not a string`))

        it('should fail when password is a number', () =>
            expect(() => skylabInnApi.registerUser(name, surname, email, 1, passwordConfirm)).toThrowError(`1 is not a string`))

        it('should fail when password is an object', () =>
            expect(() => skylabInnApi.registerUser(name, surname, email, {}, passwordConfirm)).toThrowError(`[object Object] is not a string`))

        it('should fail when password is an array', () =>
            expect(() => skylabInnApi.registerUser(name, surname, email, [1, 2, 3], passwordConfirm)).toThrowError(`1,2,3 is not a string`))

        it('should fail when password is a boolean', () =>
            expect(() => skylabInnApi.registerUser(name, surname, email, true, passwordConfirm)).toThrowError(`true is not a string`))

        it('should fail when password confirmation is a number', () =>
            expect(() => skylabInnApi.registerUser(name, surname, email, password, 1)).toThrowError(`1 is not a string`))

        it('should fail when password confirmation is an object', () =>
            expect(() => skylabInnApi.registerUser(name, surname, email, password, {})).toThrowError(`[object Object] is not a string`))

        it('should fail when password confirmation is an array', () =>
            expect(() => skylabInnApi.registerUser(name, surname, email, password, [1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when password confirmation is a boolean', () =>
            expect(() => skylabInnApi.registerUser(name, surname, email, password, true)).toThrowError(`true is not a string`))
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
            const token = await skylabInnApi.authenticateUser(email, password)

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
            return skylabInnApi.authenticateUser('not-previously-registered@mail.com', password)
                .catch(error => {
                    expect(error).toBeDefined();
                    expect(error.message).toBe(`user with email not-previously-registered@mail.com not found`)
                })
        })

        it('should fail on wrong credentials', () => {
            return skylabInnApi.authenticateUser(email, 'not-a-matching-password')
                .catch(error => {
                    expect(error).toBeDefined();
                    expect(error.message).toBe(`wrong credentials`)
                })
        })

        it('should fail on empty email', () =>
            expect(() => skylabInnApi.authenticateUser('', password)).toThrowError('email is empty'))

        it('should fail on empty password', () =>
            expect(() => skylabInnApi.authenticateUser(email, '')).toThrowError('password is empty'))

        it('should fail when email is a number', () =>
            expect(() => skylabInnApi.authenticateUser(1, password)).toThrowError(`1 is not a string`))

        it('should fail when email is an object', () =>
            expect(() => skylabInnApi.authenticateUser({}, password)).toThrowError(`[object Object] is not a string`))

        it('should fail when email is an array', () =>
            expect(() => skylabInnApi.authenticateUser([1, 2, 3], password)).toThrowError(`1,2,3 is not a string`))

        it('should fail when email is a boolean', () =>
            expect(() => skylabInnApi.authenticateUser(true, password)).toThrowError(`true is not a string`))

        it('should fail when password is a number', () =>
            expect(() => skylabInnApi.authenticateUser(email, 1)).toThrowError(`1 is not a string`))

        it('should fail when password is an object', () =>
            expect(() => skylabInnApi.authenticateUser(email, {})).toThrowError(`[object Object] is not a string`))

        it('should fail when password is an array', () =>
            expect(() => skylabInnApi.authenticateUser(email, [1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when password is a boolean', () =>
            expect(() => skylabInnApi.authenticateUser(email, true)).toThrowError(`true is not a string`))
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

        })

        it('should succeed on correct credentials', () => {
            return skylabInnApi.retrieveUser(_token)
                .then(({user}) => {
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
                await skylabInnApi.retrieveUser('invalid-token')
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`jwt malformed`)
            }
        })

        it('should fail on empty token', () =>
            expect(() => skylabInnApi.retrieveUser('')).toThrowError('token is empty'))

        it('should fail when token is a number', () =>
            expect(() => skylabInnApi.retrieveUser(1)).toThrowError(`1 is not a string`))

        it('should fail when token is an object', () =>
            expect(() => skylabInnApi.retrieveUser({})).toThrowError(`[object Object] is not a string`))

        it('should fail when token is an array', () =>
            expect(() => skylabInnApi.retrieveUser([1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when token is a boolean', () =>
            expect(() => skylabInnApi.retrieveUser(true)).toThrowError(`true is not a string`))
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
        })

        it('should succeed on correct credentials', async () => {
            const {user} = await skylabInnApi.updateUser(_token, data)

            expect(user.id).toEqual(_id)
            expect(user.name).toBe(data.name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(data.email)
            expect(user.telephone).toBe(data.telephone)
            expect(user.__v).toBeUndefined()
            expect(user.password).toBeUndefined()
        })

        it('should fail on empty token', () =>
            expect(() => skylabInnApi.updateUser('')).toThrowError('token is empty'))

        it('should fail when token is a number', () =>
            expect(() => skylabInnApi.updateUser(1)).toThrowError(`1 is not a string`))

        it('should fail when token is an object', () =>
            expect(() => skylabInnApi.updateUser({})).toThrowError(`[object Object] is not a string`))

        it('should fail when token is an array', () =>
            expect(() => skylabInnApi.updateUser([1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when token is a boolean', () =>
            expect(() => skylabInnApi.updateUser(true)).toThrowError(`true is not a string`))

        it('should fail on empty data', () =>
            expect(() => skylabInnApi.updateUser(_id)).toThrowError('data is empty'))

        it('should fail when data is a number', () =>
            expect(() => skylabInnApi.updateUser(_id, 1)).toThrowError(`1 is not an object`))

        it('should fail when data is an object', () =>
            expect(() => skylabInnApi.updateUser(_id, 'hola')).toThrowError(`hola is not an object`))

        it('should fail when data is an array', () =>
            expect(() => skylabInnApi.updateUser(_id, [1, 2, 3])).toThrowError(`1,2,3 is not an object`))

        it('should fail when data is a boolean', () =>
            expect(() => skylabInnApi.updateUser(_id, true)).toThrowError(`true is not an object`))
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
        })

        it('should succeed on correct search', async () => {
            const query = 'barba'

            const results = await skylabInnApi.searchSkylaber(_token, query)

            expect(results.user).toBeDefined()
            expect(results.user.resContact.length).toBe(1)
            expect(results.user.resContact[0].name).toBe(name)
        })

        it('should fail on not registered user', async () => {
            await User.deleteMany()
            try {
                await skylabInnApi.searchSkylaber(_token, test)
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

            const results = await skylabInnApi.searchSkylaber(_token, query)

            expect(results.user).toBeDefined()
            expect(results.user.resContact.length).toBe(2)
            expect(results.user.resContact[0].name).toBe('Marti')
            expect(results.user.resContact[1].name).toBe(__name)
        })

        it('should fail on empty token', () =>
            expect(() => skylabInnApi.searchSkylaber('')).toThrowError('token is empty'))

        it('should fail when token is a number', () =>
            expect(() => skylabInnApi.searchSkylaber(1, test)).toThrowError(`1 is not a string`))

        it('should fail when token is an object', () =>
            expect(() => skylabInnApi.searchSkylaber({}, test)).toThrowError(`[object Object] is not a string`))

        it('should fail when token is an array', () =>
            expect(() => skylabInnApi.searchSkylaber([1, 2, 3], test)).toThrowError(`1,2,3 is not a string`))

        it('should fail when token is a boolean', () =>
            expect(() => skylabInnApi.searchSkylaber(true, test)).toThrowError(`true is not a string`))

        it('should fail on empty query', () =>
            expect(() => skylabInnApi.searchSkylaber(_token, '')).toThrowError('query is empty'))

        it('should fail when query is a number', () =>
            expect(() => skylabInnApi.searchSkylaber(_token, 1)).toThrowError(`1 is not a string`))

        it('should fail when query is an object', () =>
            expect(() => skylabInnApi.searchSkylaber(_token, {})).toThrowError(`[object Object] is not a string`))

        it('should fail when query is an array', () =>
            expect(() => skylabInnApi.searchSkylaber(_token, [1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when query is a boolean', () =>
            expect(() => skylabInnApi.searchSkylaber(_token, true)).toThrowError(`true is not a string`))

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
        })

        it('should succeed on correct search', async () => {
            const results = await skylabInnApi.adSearchSkylaber(_token, test)

            expect(results.user).toBeDefined()
            expect(results.user.length).toBe(1)
            expect(results.user[0].name).toBe(name)
        })

        it('should succeed on correct search for two users', async () => {
            const __name = 'Martini'
            const __surname = 'Malek'
            const __email = 'marti@malekasd.com'
            const __password = 'p'

            const hash = await bcrypt.hash(__password, 10)
            await User.create({ name: __name, surname: __surname, email: __email, password: hash })
            const query = [['Contact Information', 'marti']]

            const results = await skylabInnApi.adSearchSkylaber(_token, query)

            expect(results.user).toBeDefined()
            expect(results.user.length).toBe(2)
            expect(results.user[0].name).toBe(_name)
            expect(results.user[1].name).toBe(__name)
        })

        it('should fail on not registered user', async () => {
            await User.deleteMany()
            try {
                await skylabInnApi.adSearchSkylaber(_token, test)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)

            }
        })

        it('should fail on empty token', () =>
            expect(() => skylabInnApi.adSearchSkylaber('')).toThrowError('token is empty'))

        it('should fail when token is a number', () =>
            expect(() => skylabInnApi.adSearchSkylaber(1, test)).toThrowError(`1 is not a string`))

        it('should fail when token is an object', () =>
            expect(() => skylabInnApi.adSearchSkylaber({}, test)).toThrowError(`[object Object] is not a string`))

        it('should fail when token is an array', () =>
            expect(() => skylabInnApi.adSearchSkylaber([1, 2, 3], test)).toThrowError(`1,2,3 is not a string`))

        it('should fail when token is a boolean', () =>
            expect(() => skylabInnApi.adSearchSkylaber(true, test)).toThrowError(`true is not a string`))

        it('should fail on empty param', () =>
            expect(() => skylabInnApi.adSearchSkylaber(_id, [])).toThrowError('param is empty'))

        it('should fail when param is a number', () =>
            expect(() => skylabInnApi.adSearchSkylaber(_id, 1)).toThrowError(`1 is not an array`))

        it('should fail when param is an object', () =>
            expect(() => skylabInnApi.adSearchSkylaber(_id, {})).toThrowError(`[object Object] is not an array`))

        it('should fail when param is a string', () =>
            expect(() => skylabInnApi.adSearchSkylaber(_id, 'test')).toThrowError(`test is not an array`))

        it('should fail when param is a boolean', () =>
            expect(() => skylabInnApi.adSearchSkylaber(_id, true)).toThrowError(`true is not an array`))

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
        })

        it('should succeed on correct credentials', async () => {
            const {user} = await skylabInnApi.retrieveSkylaber(_token, _skylaberId)

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
                await skylabInnApi.retrieveSkylaber(_token, _skylaberId)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
            }
        })

        it('should fail on not registered skylaber', async () => {
            await User.deleteOne({ id: _skylaberId })
            try {
                await skylabInnApi.retrieveSkylaber(_token, _skylaberId)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`skylaber with userId ${skylaberId} not found`)
            }
        })

        it('should fail on empty token', () =>
            expect(() => skylabInnApi.retrieveSkylaber('', _skylaberId)).toThrowError('token is empty'))

        it('should fail when token is a number', () =>
            expect(() => skylabInnApi.retrieveSkylaber(1, _skylaberId)).toThrowError(`1 is not a string`))

        it('should fail when token is an object', () =>
            expect(() => skylabInnApi.retrieveSkylaber({}, _skylaberId)).toThrowError(`[object Object] is not a string`))

        it('should fail when token is an array', () =>
            expect(() => skylabInnApi.retrieveSkylaber([1, 2, 3], _skylaberId)).toThrowError(`1,2,3 is not a string`))

        it('should fail when token is a boolean', () =>
            expect(() => skylabInnApi.retrieveSkylaber(true, _skylaberId)).toThrowError(`true is not a string`))

        it('should fail on empty skylaberId', () =>
            expect(() => skylabInnApi.retrieveSkylaber(_token, '')).toThrowError('skylaberId is empty'))

        it('should fail when skylaberId is a number', () =>
            expect(() => skylabInnApi.retrieveSkylaber(_token, 1)).toThrowError(`1 is not a string`))

        it('should fail when skylaberId is an object', () =>
            expect(() => skylabInnApi.retrieveSkylaber(_token, {})).toThrowError(`[object Object] is not a string`))

        it('should fail when skylaberId is an array', () =>
            expect(() => skylabInnApi.retrieveSkylaber(_token, [1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when skylaberId is a boolean', () =>
            expect(() => skylabInnApi.retrieveSkylaber(_token, true)).toThrowError(`true is not a string`))
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
        })

        it('should succeed on correct work experience', async () => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            await skylabInnApi.addUserInformation(_token, type, data)

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
                await skylabInnApi.addUserInformation(_token, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe("User validation failed: workExperience.0.startDate: Path `startDate` is required.")
            }
        })

        it('should succeed on correct tech information', async () => {
            type = 'Tech'
            data = { tech: 'test', level: 'Novice' }
            await skylabInnApi.addUserInformation(_token, type, data)

            const user = await User.findById(_id)

            expect(user.technology[0]._id).toBeDefined()
            expect(user.technology[0].tech).toEqual('test')
            expect(user.technology[0].level).toEqual('Novice')
        })

        it('should fail on wrong tech information', async () => {
            type = 'Tech'
            data = { tech: 'test', level: 'test' }

            try {
                await skylabInnApi.addUserInformation(_token, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe("User validation failed: technology.0.level: `test` is not a valid enum value for path `level`.")
            }
        })

        it('should succeed on correct language information', async () => {
            type = 'Language'
            data = { language: 'test', level: 'Elementary proficiency' }
            await skylabInnApi.addUserInformation(_token, type, data)

            const user = await User.findById(_id)

            expect(user.language[0]._id).toBeDefined()
            expect(user.language[0].language).toEqual('test')
            expect(user.language[0].level).toEqual('Elementary proficiency')
        })

        it('should fail on wrong language information', async () => {
            type = 'Language'
            data = { language: 'test', level: 'test' }

            try {
                await skylabInnApi.addUserInformation(_token, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe("User validation failed: language.0.level: `test` is not a valid enum value for path `level`.")
            }
        })

        it('should succeed on correct education information', async () => {
            type = 'Education'
            data = { college: 'test', degree: 'test' }
            await skylabInnApi.addUserInformation(_token, type, data)

            const user = await User.findById(_id)

            expect(user.education[0]._id).toBeDefined()
            expect(user.education[0].college).toEqual('test')
            expect(user.education[0].degree).toEqual('test')
        })

        it('should fail on wrong education information', async () => {
            type = 'Education'
            data = { college: 'test', degree: null }

            try {
                await skylabInnApi.addUserInformation(_token, type, data)
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
                await skylabInnApi.addUserInformation(_token, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
            }
        })

        it('should fail on empty token', () =>
            expect(() => skylabInnApi.addUserInformation('', type, data)).toThrowError('token is empty'))

        it('should fail when token is a number', () =>
            expect(() => skylabInnApi.addUserInformation(1, type, data)).toThrowError(`1 is not a string`))

        it('should fail when token is an object', () =>
            expect(() => skylabInnApi.addUserInformation({}, type, data)).toThrowError(`[object Object] is not a string`))

        it('should fail when token is an array', () =>
            expect(() => skylabInnApi.addUserInformation([1, 2, 3], type, data)).toThrowError(`1,2,3 is not a string`))

        it('should fail when token is a boolean', () =>
            expect(() => skylabInnApi.addUserInformation(true, type, data)).toThrowError(`true is not a string`))

        it('should fail on empty type', () =>
            expect(() => skylabInnApi.addUserInformation(_token, '', data)).toThrowError('type is empty'))

        it('should fail when type is a number', () =>
            expect(() => skylabInnApi.addUserInformation(_token, 1, data)).toThrowError(`1 is not a string`))

        it('should fail when type is an object', () =>
            expect(() => skylabInnApi.addUserInformation(_token, {}, data)).toThrowError(`[object Object] is not a string`))

        it('should fail when type is an array', () =>
            expect(() => skylabInnApi.addUserInformation(_token, [1, 2, 3], data)).toThrowError(`1,2,3 is not a string`))

        it('should fail when type is a boolean', () =>
            expect(() => skylabInnApi.addUserInformation(_token, true, data)).toThrowError(`true is not a string`))

        it('should fail on empty data', () =>
            expect(() => skylabInnApi.addUserInformation(_token, type)).toThrowError('data is empty'))

        it('should fail when data is a number', () =>
            expect(() => skylabInnApi.addUserInformation(_token, type, 1)).toThrowError(`1 is not an object`))

        it('should fail when data is a string', () =>
            expect(() => skylabInnApi.addUserInformation(_token, type, 'hola')).toThrowError(`hola is not an object`))

        it('should fail when data is an array', () =>
            expect(() => skylabInnApi.addUserInformation(_token, type, [1, 2, 3])).toThrowError(`1,2,3 is not an object`))

        it('should fail when data is a boolean', () =>
            expect(() => skylabInnApi.addUserInformation(_token, type, true)).toThrowError(`true is not an object`))
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
            await skylabInnApi.updateUserInformation(_token, infoIdW.id, type, _data)

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
                await skylabInnApi.updateUserInformation(_token, infoIdW.id, type, data)
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
            await skylabInnApi.updateUserInformation(_token, infoIdT.id, type, _data)

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
                await skylabInnApi.updateUserInformation(_token, infoIdT.id, type, data)
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
            await skylabInnApi.updateUserInformation(_token, infoIdL.id, type, _data)

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
                await skylabInnApi.updateUserInformation(_token, infoIdL.id, type, data)
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
            await skylabInnApi.updateUserInformation(_token, infoIdE.id, type, _data)

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
                await skylabInnApi.updateUserInformation(_token, infoIdE.id, type, data)
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
                await skylabInnApi.updateUserInformation(_token, infoId, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)

            }
        })

        it('should fail on empty token', () =>
            expect(() => skylabInnApi.updateUserInformation('', infoId, type, data)).toThrowError('token is empty'))

        it('should fail when token is a number', () =>
            expect(() => skylabInnApi.updateUserInformation(1, infoId, type, data)).toThrowError(`1 is not a string`))

        it('should fail when token is an object', () =>
            expect(() => skylabInnApi.updateUserInformation({}, infoId, type, data)).toThrowError(`[object Object] is not a string`))

        it('should fail when token is an array', () =>
            expect(() => skylabInnApi.updateUserInformation([1, 2, 3], infoId, type, data)).toThrowError(`1,2,3 is not a string`))

        it('should fail when token is a boolean', () =>
            expect(() => skylabInnApi.updateUserInformation(true, infoId, type, data)).toThrowError(`true is not a string`))

        it('should fail on empty infoId', () =>
            expect(() => skylabInnApi.updateUserInformation(_id, '', type, data)).toThrowError('infoId is empty'))

        it('should fail when infoId is a number', () =>
            expect(() => skylabInnApi.updateUserInformation(_id, 1, type, data)).toThrowError(`1 is not a string`))

        it('should fail when infoId is an object', () =>
            expect(() => skylabInnApi.updateUserInformation(_id, {}, type, data)).toThrowError(`[object Object] is not a string`))

        it('should fail when infoId is an array', () =>
            expect(() => skylabInnApi.updateUserInformation(_id, [1, 2, 3], type, data)).toThrowError(`1,2,3 is not a string`))

        it('should fail when infoId is a boolean', () =>
            expect(() => skylabInnApi.updateUserInformation(_id, true, type, data)).toThrowError(`true is not a string`))

        it('should fail on empty type', () =>
            expect(() => skylabInnApi.updateUserInformation(_id, infoId, '', data)).toThrowError('type is empty'))

        it('should fail when type is a number', () =>
            expect(() => skylabInnApi.updateUserInformation(_id, infoId, 1, data)).toThrowError(`1 is not a string`))

        it('should fail when type is an object', () =>
            expect(() => skylabInnApi.updateUserInformation(_id, infoId, {}, data)).toThrowError(`[object Object] is not a string`))

        it('should fail when type is an array', () =>
            expect(() => skylabInnApi.updateUserInformation(_id, infoId, [1, 2, 3], data)).toThrowError(`1,2,3 is not a string`))

        it('should fail when type is a boolean', () =>
            expect(() => skylabInnApi.updateUserInformation(_id, infoId, true, data)).toThrowError(`true is not a string`))

        it('should fail on empty data', () =>
            expect(() => skylabInnApi.updateUserInformation(_id, infoId, type)).toThrowError('data is empty'))

        it('should fail when data is a number', () =>
            expect(() => skylabInnApi.updateUserInformation(_id, infoId, type, 1)).toThrowError(`1 is not an object`))

        it('should fail when data is a string', () =>
            expect(() => skylabInnApi.updateUserInformation(_id, infoId, type, 'hola')).toThrowError(`hola is not an object`))

        it('should fail when data is an array', () =>
            expect(() => skylabInnApi.updateUserInformation(_id, infoId, type, [1, 2, 3])).toThrowError(`1,2,3 is not an object`))

        it('should fail when data is a boolean', () =>
            expect(() => skylabInnApi.updateUserInformation(_id, infoId, type, true)).toThrowError(`true is not an object`))
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

            await skylabInnApi.removeUserInformation(_token, infoIdW.id, type)

            const _user = await User.findById(_id)

            expect(_user.workExperience[1]).toBeUndefined()
        })

        it('should fail on wrong work id', async () => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            infoIdW = await skylabInnApi.addUserInformation(_token, type, data)

            type = 'Work'
            data = { company: 'test', position: 'test', startDate: 'test', endDate: '', current: true }
            await skylabInnApi.removeUserInformation(_token, infoIdW.id, type)

            try {
                await skylabInnApi.removeUserInformation(_token, infoIdW.id, type)
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

            await skylabInnApi.removeUserInformation(_token, infoIdT.id, type)

            const _user = await User.findById(_id)

            expect(_user.technology[0]).toBeUndefined()
        })

        it('should fail on wrong tech id', async () => {
            type = 'Tech'
            data = { tech: 'test', level: 'Novice' }
            infoIdT = await skylabInnApi.addUserInformation(_token, type, data)

            await skylabInnApi.removeUserInformation(_token, infoIdT.id, type)

            try {
                await skylabInnApi.removeUserInformation(_token, infoIdT.id, type)
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

            await skylabInnApi.removeUserInformation(_token, infoIdL.id, type)

            const _user = await User.findById(_id)

            expect(_user.language[0]).toBeUndefined()
        })

        it('should fail on wrong language id', async () => {
            type = 'Language'
            data = { language: 'test', level: 'Elementary proficiency' }
            infoIdL = await skylabInnApi.addUserInformation(_token, type, data)

            await skylabInnApi.removeUserInformation(_token, infoIdL.id, type)

            try {
                await skylabInnApi.removeUserInformation(_token, infoIdL.id, type)
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

            await skylabInnApi.removeUserInformation(_token, infoIdE.id, type)

            const _user = await User.findById(_id)

            expect(_user.education[0]).toBeUndefined()
        })

        it('should fail on wrong education id', async () => {
            type = 'Education'
            data = { college: 'test', degree: 'test' }
            infoIdE = await skylabInnApi.addUserInformation(_token, type, data)

            await skylabInnApi.removeUserInformation(_token, infoIdE.id, type)

            try {
                await skylabInnApi.removeUserInformation(_token, infoIdE.id, type)
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
                await skylabInnApi.removeUserInformation(_token, infoId, type)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)

            }
        })

        it('should fail on empty token', () =>
            expect(() => skylabInnApi.removeUserInformation('', infoId, type)).toThrowError('token is empty'))

        it('should fail when token is a number', () =>
            expect(() => skylabInnApi.removeUserInformation(1, infoId, type)).toThrowError(`1 is not a string`))

        it('should fail when token is an object', () =>
            expect(() => skylabInnApi.removeUserInformation({}, infoId, type)).toThrowError(`[object Object] is not a string`))

        it('should fail when token is an array', () =>
            expect(() => skylabInnApi.removeUserInformation([1, 2, 3], infoId, type)).toThrowError(`1,2,3 is not a string`))

        it('should fail when token is a boolean', () =>
            expect(() => skylabInnApi.removeUserInformation(true, infoId, type)).toThrowError(`true is not a string`))

        it('should fail on empty infoId', () =>
            expect(() => skylabInnApi.removeUserInformation(_token, '', type)).toThrowError('infoId is empty'))

        it('should fail when infoId is a number', () =>
            expect(() => skylabInnApi.removeUserInformation(_token, 1, type)).toThrowError(`1 is not a string`))

        it('should fail when infoId is an object', () =>
            expect(() => skylabInnApi.removeUserInformation(_token, {}, type)).toThrowError(`[object Object] is not a string`))

        it('should fail when infoId is an array', () =>
            expect(() => skylabInnApi.removeUserInformation(_token, [1, 2, 3], type)).toThrowError(`1,2,3 is not a string`))

        it('should fail when infoId is a boolean', () =>
            expect(() => skylabInnApi.removeUserInformation(_token, true, type)).toThrowError(`true is not a string`))

        it('should fail on empty type', () =>
            expect(() => skylabInnApi.removeUserInformation(_token, infoId, '')).toThrowError('type is empty'))

        it('should fail when type is a number', () =>
            expect(() => skylabInnApi.removeUserInformation(_token, infoId, 1)).toThrowError(`1 is not a string`))

        it('should fail when type is an object', () =>
            expect(() => skylabInnApi.removeUserInformation(_token, infoId, {})).toThrowError(`[object Object] is not a string`))

        it('should fail when type is an array', () =>
            expect(() => skylabInnApi.removeUserInformation(_token, infoId, [1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when type is a boolean', () =>
            expect(() => skylabInnApi.removeUserInformation(_token, infoId, true)).toThrowError(`true is not a string`))
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
        })

        it('should succeed on correct credentials', async () => {
            const user = await skylabInnApi.addSkylaber(_token, data)

            expect(user).toBeDefined()

            const skylaber = await EmailWhitelist.findById(user.id)

            expect(skylaber.name).toBe(data.name)
            expect(skylaber.surname).toBe(data.surname)
            expect(skylaber.email).toBe(data.email)
        })

        it('should fail on invalid userId', async () => {
            await User.deleteMany()
            try {
                await skylabInnApi.addSkylaber(_token, data)
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
                await skylabInnApi.addSkylaber(_token, data)
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
                await skylabInnApi.addSkylaber(_token, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`skylaber with email ${data.email} already exists`)
            }
        })

        it('should fail on empty token', () =>
            expect(() => skylabInnApi.addSkylaber('', data)).toThrowError('token is empty'))

        it('should fail when token is a number', () =>
            expect(() => skylabInnApi.addSkylaber(1, data)).toThrowError(`1 is not a string`))

        it('should fail when token is an object', () =>
            expect(() => skylabInnApi.addSkylaber({}, data)).toThrowError(`[object Object] is not a string`))

        it('should fail when token is an array', () =>
            expect(() => skylabInnApi.addSkylaber([1, 2, 3], data)).toThrowError(`1,2,3 is not a string`))

        it('should fail when token is a boolean', () =>
            expect(() => skylabInnApi.addSkylaber(true, data)).toThrowError(`true is not a string`))

        it('should fail on empty data', () =>
            expect(() => skylabInnApi.addSkylaber(_token)).toThrowError('data is empty'))

        it('should fail when data is a number', () =>
            expect(() => skylabInnApi.addSkylaber(_token, 1)).toThrowError(`1 is not an object`))

        it('should fail when data is a string', () =>
            expect(() => skylabInnApi.addSkylaber(_token, 'hola')).toThrowError(`hola is not an object`))

        it('should fail when data is an array', () =>
            expect(() => skylabInnApi.addSkylaber(_token, [1, 2, 3])).toThrowError(`1,2,3 is not an object`))

        it('should fail when data is a boolean', () =>
            expect(() => skylabInnApi.addSkylaber(_token, true)).toThrowError(`true is not an object`))
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
        })

        it('should succeed on correct credentials', async () => {
            const a = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, state: 'pending' }
            const b = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, state: 'pending' }
            const c = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, state: 'registered' }

            await EmailWhitelist.create(a)
            await EmailWhitelist.create(b)
            await EmailWhitelist.create(c)

            const users = await skylabInnApi.retrievePendingSkylabers(_token)

            expect(users).toBeDefined()
        })

        it('should succeed on returning only pending skylabers', async () => {
            const a = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, state: 'pending' }
            const b = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, state: 'pending' }
            const c = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, state: 'registered' }

            await EmailWhitelist.create(a)
            await EmailWhitelist.create(b)
            await EmailWhitelist.create(c)

            const users = await skylabInnApi.retrievePendingSkylabers(_token)

            expect(users).toBeDefined()
            expect(users.preUsers.length).toBe(2)
        })

        it('should fail on invalid role', async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash, role })

            let __token = await skylabInnApi.authenticateUser(email, password)

            try {
                await skylabInnApi.retrievePendingSkylabers(__token)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`Access denied`)
            }
        })

        it('should fail on not registered email', async () => {
            await User.deleteMany()
            try {
                await skylabInnApi.retrievePendingSkylabers(_token)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
            }
        })

        it('should fail on empty token', () =>
            expect(() => skylabInnApi.retrievePendingSkylabers('')).toThrowError('token is empty'))

        it('should fail when token is a number', () =>
            expect(() => skylabInnApi.retrievePendingSkylabers(1)).toThrowError(`1 is not a string`))

        it('should fail when token is an object', () =>
            expect(() => skylabInnApi.retrievePendingSkylabers({})).toThrowError(`[object Object] is not a string`))

        it('should fail when token is an array', () =>
            expect(() => skylabInnApi.retrievePendingSkylabers([1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when token is a boolean', () =>
            expect(() => skylabInnApi.retrievePendingSkylabers(true)).toThrowError(`true is not a string`))
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
        })

        it('should succeed on correct credentials', async () => {
            const users = await skylabInnApi.retrieveUnverifiedEmails(_token)

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

            const users = await skylabInnApi.retrieveUnverifiedEmails(_token)

            expect(users).toBeDefined()
            expect(users.unverified.length).toBe(2)
        })

        it('should fail on not valid role', async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash, role })

            let __token = await skylabInnApi.authenticateUser(email, password)

            try {
                await skylabInnApi.retrieveUnverifiedEmails(__token)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`Access denied`)
            }
        })

        it('should fail on not registered email', async () => {
            await User.deleteMany()
            try {
                await skylabInnApi.retrieveUnverifiedEmails(_token)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
            }
        })

        it('should fail on empty token', () =>
            expect(() => skylabInnApi.retrieveUnverifiedEmails('')).toThrowError('token is empty'))

        it('should fail when token is a number', () =>
            expect(() => skylabInnApi.retrieveUnverifiedEmails(1)).toThrowError(`1 is not a string`))

        it('should fail when token is an object', () =>
            expect(() => skylabInnApi.retrieveUnverifiedEmails({})).toThrowError(`[object Object] is not a string`))

        it('should fail when token is an array', () =>
            expect(() => skylabInnApi.retrieveUnverifiedEmails([1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when token is a boolean', () =>
            expect(() => skylabInnApi.retrieveUnverifiedEmails(true)).toThrowError(`true is not a string`))
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
            const url = await skylabInnApi.shareResults(_token, skylaberIds)

            expect(url.hashedUrl).toBeDefined()
            expect(typeof url.hashedUrl === 'string').toBeTruthy()
        })

        it('should fail on not registered user', async () => {
            await User.deleteMany()
            try {
                await skylabInnApi.shareResults(_token, skylaberIds)
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

            try {
                await skylabInnApi.shareResults(__token, skylaberIds)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`Acces denied`)
            }
        })

        it('should fail on empty token', () =>
            expect(() => skylabInnApi.shareResults('')).toThrowError('token is empty'))

        it('should fail when token is a number', () =>
            expect(() => skylabInnApi.shareResults(1, skylaberIds)).toThrowError(`1 is not a string`))

        it('should fail when token is an object', () =>
            expect(() => skylabInnApi.shareResults({}, skylaberIds)).toThrowError(`[object Object] is not a string`))

        it('should fail when token is an array', () =>
            expect(() => skylabInnApi.shareResults([1, 2, 3], skylaberIds)).toThrowError(`1,2,3 is not a string`))

        it('should fail when token is a boolean', () =>
            expect(() => skylabInnApi.shareResults(true, skylaberIds)).toThrowError(`true is not a string`))

        it('should fail on empty skylaberIds', () =>
            expect(() => skylabInnApi.shareResults(_token, [])).toThrowError('skylaberIds is empty'))

        it('should fail when skylaberIds is a number', () =>
            expect(() => skylabInnApi.shareResults(_token, 1)).toThrowError(`1 is not an array`))

        it('should fail when skylaberIds is an object', () =>
            expect(() => skylabInnApi.shareResults(_token, {})).toThrowError(`[object Object] is not an array`))

        it('should fail when skylaberIds is a string', () =>
            expect(() => skylabInnApi.shareResults(_token, 'test')).toThrowError(`test is not an array`))

        it('should fail when skylaberIds is a boolean', () =>
            expect(() => skylabInnApi.shareResults(_token, true)).toThrowError(`true is not an array`))

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
            const {skylabers} = await skylabInnApi.retrieveEncryptedIds(encryptedIds)

            expect(skylabers).toBeDefined()
            expect(skylabers.length).toBe(2)
        })

        it('should fail on worng token', async () => {
            try {
                await skylabInnApi.retrieveEncryptedIds('wrong-token')
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`jwt malformed`)
            }
        })

        it('should fail on empty encryptedIds', () =>
            expect(() => skylabInnApi.retrieveEncryptedIds('')).toThrowError('encryptedIds is empty'))

        it('should fail when encryptedIds is a number', () =>
            expect(() => skylabInnApi.retrieveEncryptedIds(1)).toThrowError(`1 is not a string`))

        it('should fail when encryptedIds is an object', () =>
            expect(() => skylabInnApi.retrieveEncryptedIds({})).toThrowError(`[object Object] is not a string`))

        it('should fail when encryptedIds is an array', () =>
            expect(() => skylabInnApi.retrieveEncryptedIds([1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when encryptedIds is a boolean', () =>
            expect(() => skylabInnApi.retrieveEncryptedIds(true)).toThrowError(`true is not a string`))
    })

    afterAll(() =>
        Promise.all([
            User.deleteMany(),
            Work.deleteMany(),
            EmailWhitelist.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )

})