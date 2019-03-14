'use strict'

require('dotenv').config()

const { mongoose, models: { User, Admin, Work } } = require('skylab-inn-data')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')

const { env: { TEST_DB_URL } } = process

describe('logic', () => {

    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

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
            const _name = 'Àlex'
            const _surname = 'Barba'
            const _email = `alex.barba-${Math.random()}@gmail.com`
            const _password = `Pass-${Math.random()}`
            const _passwordConfirm = _password

            logic.registerUser(_name, _surname, _email, _password, _passwordConfirm)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(typeof id === 'string').toBeTruthy()
                })
                .then(() => logic.registerUser(_name, _surname, _email, _password, _passwordConfirm))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with email ${_email} already exists`)
                })
        })

        it('should fail when passwords do not match', () =>
            expect(() => logic.registerUser(name, surname, email, password, 'do-not-match')).toThrowError('passwords do not match'))

        it('should fail on empty name', () =>
            expect(() => logic.registerUser('', surname, email, password, passwordConfirm)).toThrowError('name is empty'))

        it('should fail on empty surname', () =>
            expect(() => logic.registerUser(name, '', email, password, passwordConfirm)).toThrowError('surname is empty'))

        it('should fail on empty email', () =>
            expect(() => logic.registerUser(name, surname, '', password, passwordConfirm)).toThrowError('email is empty'))

        it('should fail on empty password', () =>
            expect(() => logic.registerUser(name, surname, email, '', passwordConfirm)).toThrowError('password is empty'))

        it('should fail on empty password confirmation', () =>
            expect(() => logic.registerUser(name, surname, email, password, '')).toThrowError('password confirmation is empty'))

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
            const hash = await bcrypt.hash(password, 11)
            return User.create({ name, surname, email, password: hash })
        })

        it('should succeed on correct data', async () => {
            const id = await logic.authenticateUser(email, password)

            expect(id).toBeDefined()
            expect(typeof id === 'string').toBeTruthy()

            const user = await User.findOne({ email })

            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)
        })

        it('should fail on not registered email', () => {
            (async () => {
                return await logic.authenticateUser('not-previously-registered@mail.com', password)

            })()
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with email not-previously-registered@mail.com not found`)
                })
        })

        it('should fail on wrong credentials', () => {
            (async () => {
                return await logic.authenticateUser(email, 'not-a-matching-password')
            })()
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`wrong credentials`)
                })
        })

        it('should fail on empty email', () =>
            expect(() => logic.authenticateUser('', password)).toThrowError('email is empty'))

        it('should fail on empty password', () =>
            expect(() => logic.authenticateUser(email, '')).toThrowError('password is empty'))

        it('should fail when email is a number', () =>
            expect(() => logic.authenticateUser(1, password)).toThrowError(`1 is not a string`))

        it('should fail when email is an object', () =>
            expect(() => logic.authenticateUser({}, password)).toThrowError(`[object Object] is not a string`))

        it('should fail when email is an array', () =>
            expect(() => logic.authenticateUser([1, 2, 3], password)).toThrowError(`1,2,3 is not a string`))

        it('should fail when email is a boolean', () =>
            expect(() => logic.authenticateUser(true, password)).toThrowError(`true is not a string`))

        it('should fail when password is a number', () =>
            expect(() => logic.authenticateUser(email, 1)).toThrowError(`1 is not a string`))

        it('should fail when password is an object', () =>
            expect(() => logic.authenticateUser(email, {})).toThrowError(`[object Object] is not a string`))

        it('should fail when password is an array', () =>
            expect(() => logic.authenticateUser(email, [1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when password is a boolean', () =>
            expect(() => logic.authenticateUser(email, true)).toThrowError(`true is not a string`))
    })

    describe('retrieve user', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        let email, password, _id

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })
            _id = user.id
        })

        it('should succeed on correct credentials', async () => {
            const user = await logic.retrieveUser(_id)

            expect(user.id).toEqual(_id)
            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)
            expect(user.__v).toBeUndefined()
            expect(user.password).toBeUndefined()
        })

        it('should fail on not registered email', async() => {
            await User.deleteMany()
            try {
               await logic.retrieveUser(_id)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
                
            }
        })

        it('should fail on empty userId', () =>
            expect(() => logic.retrieveUser('')).toThrowError('userId is empty'))

        it('should fail when userId is a number', () =>
            expect(() => logic.retrieveUser(1)).toThrowError(`1 is not a string`))

        it('should fail when userId is an object', () =>
            expect(() => logic.retrieveUser({})).toThrowError(`[object Object] is not a string`))

        it('should fail when userId is an array', () =>
            expect(() => logic.retrieveUser([1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when userId is a boolean', () =>
            expect(() => logic.retrieveUser(true)).toThrowError(`true is not a string`))
    })

    describe('update user', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        const data = { name: 'Test', email: 'test@email.com', telephone: 618610187 }
        let email, password, _id

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })
            _id = user.id
        })

        it('should succeed on correct credentials', async () => {
            const user = await logic.updateUser(_id, data)

            expect(user.id).toEqual(_id)
            expect(user.name).toBe(data.name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(data.email)
            expect(user.telephone).toBe(data.telephone)
            expect(user.__v).toBeUndefined()
            expect(user.password).toBeUndefined()
        })

        it('should fail on empty userId', () =>
            expect(() => logic.updateUser('', data)).toThrowError('userId is empty'))

        it('should fail when userId is a number', () =>
            expect(() => logic.updateUser(1, data)).toThrowError(`1 is not a string`))

        it('should fail when userId is an object', () =>
            expect(() => logic.updateUser({}, data)).toThrowError(`[object Object] is not a string`))

        it('should fail when userId is an array', () =>
            expect(() => logic.updateUser([1, 2, 3], data)).toThrowError(`1,2,3 is not a string`))

        it('should fail when userId is a boolean', () =>
            expect(() => logic.updateUser(true, data)).toThrowError(`true is not a string`))

        it('should fail on empty data', () =>
            expect(() => logic.updateUser(_id)).toThrowError('data is empty'))

        it('should fail when data is a number', () =>
            expect(() => logic.updateUser(_id, 1)).toThrowError(`1 is not an object`))

        it('should fail when data is an object', () =>
            expect(() => logic.updateUser(_id, 'hola')).toThrowError(`hola is not an object`))

        it('should fail when data is an array', () =>
            expect(() => logic.updateUser(_id, [1, 2, 3])).toThrowError(`1,2,3 is not an object`))

        it('should fail when data is a boolean', () =>
            expect(() => logic.updateUser(_id, true)).toThrowError(`true is not an object`))
    })

    after(() =>
        Promise.all([
            Admin.deleteMany(),
            User.deleteMany(),
            Work.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})