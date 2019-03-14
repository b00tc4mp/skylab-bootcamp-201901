'use strict'

require('dotenv').config()

import skylabInnApi from '.'
import bcrypt from 'bcrypt'
const { mongoose, models: { User, Admin, Work } } = require('skylab-inn-data')

const { env: { DB_URL } } = process

describe('skylab inn api', () => {

    beforeAll(() => mongoose.connect(DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            Admin.deleteMany(),
            User.deleteMany(),
            Work.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        const email = `alex.barba-${Math.random()}@gmail.com`
        const password = `Pass-${Math.random()}`
        const passwordConfirm = password

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
        const email = `alex.barba-${Math.random()}@gmail.com`
        const password = `Pass-${Math.random()}`

        beforeEach(async() => {
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

    afterAll(() =>
        Promise.all([
            Admin.deleteMany(),
            User.deleteMany(),
            Work.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )

})