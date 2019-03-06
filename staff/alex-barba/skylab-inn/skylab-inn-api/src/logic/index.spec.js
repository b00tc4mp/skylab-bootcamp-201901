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

        it('should fail on not registered user', async() => {
            await User.deleteMany()
            try {
               await logic.updateUser(_id, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
                
            }
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

        it('should fail when data is a string', () =>
            expect(() => logic.updateUser(_id, 'hola')).toThrowError(`hola is not an object`))

        it('should fail when data is an array', () =>
            expect(() => logic.updateUser(_id, [1, 2, 3])).toThrowError(`1,2,3 is not an object`))

        it('should fail when data is a boolean', () =>
            expect(() => logic.updateUser(_id, true)).toThrowError(`true is not an object`))
    })

    describe('search skylaber', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        let email, password, _id
        let test = 'test'

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash2 = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash2 })

            const _name= 'Marti'
            const _surname='Malek'
            const _email= `marti.malek-${Math.random()}@gmail.com`
            const _password= 'p'

            const hash = await bcrypt.hash(_password, 10)
            await User.create({ name: _name, surname: _surname, email: _email, password: hash })

            const user = await User.findOne({ email })
            _id = user.id
        })

        it('should succeed on correct search', async () => {
            const query= 'barba'

            const results = await logic.searchSkylaber(_id, query)

            expect(results).toBeDefined()
            expect(results.resContact.length).toBe(1)
            expect(results.resContact[0].name).toBe(name)
        })

        it('should fail on not registered user', async() => {
            await User.deleteMany()
            try {
               await logic.searchSkylaber(_id, test)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
                
            }
        })

        it('should succeed on correct search for two users', async () => {
            const __name= 'Martini'
            const __surname='Malek'
            const __email= 'marti@malekasd.com'
            const __password= 'p'

            const hash = await bcrypt.hash(__password, 10)
            await User.create({ name: __name, surname: __surname, email: __email, password: hash })
            const query= 'marti'

            const results = await logic.searchSkylaber(_id, query)

            expect(results).toBeDefined()
            expect(results.resContact.length).toBe(2)
            expect(results.resContact[0].name).toBe('Marti')
            expect(results.resContact[1].name).toBe(__name)
        })

        it('should fail on empty userId', () =>
            expect(() => logic.searchSkylaber('', )).toThrowError('userId is empty'))

        it('should fail when userId is a number', () =>
            expect(() => logic.searchSkylaber(1, test)).toThrowError(`1 is not a string`))

        it('should fail when userId is an object', () =>
            expect(() => logic.searchSkylaber({}, test)).toThrowError(`[object Object] is not a string`))

        it('should fail when userId is an array', () =>
            expect(() => logic.searchSkylaber([1, 2, 3], test)).toThrowError(`1,2,3 is not a string`))

        it('should fail when userId is a boolean', () =>
            expect(() => logic.searchSkylaber(true, test)).toThrowError(`true is not a string`))

        it('should fail on empty query', () =>
            expect(() => logic.searchSkylaber(_id, '')).toThrowError('query is empty'))

        it('should fail when query is a number', () =>
            expect(() => logic.searchSkylaber(_id, 1)).toThrowError(`1 is not a string`))

        it('should fail when query is an object', () =>
            expect(() => logic.searchSkylaber(_id, {})).toThrowError(`[object Object] is not a string`))

        it('should fail when query is an array', () =>
            expect(() => logic.searchSkylaber(_id, [1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when query is a boolean', () =>
            expect(() => logic.searchSkylaber(_id, true)).toThrowError(`true is not a string`))

    })

    describe('ad search skylaber', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        const _name = 'Marti'
        const _surname ='Malek'
        let email, password, _email, _password, _id
        let test = [['Personal info', 'alex']]

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash2 = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash2 })

            _email= `marti.malek-${Math.random()}@gmail.com`
            _password= 'p'

            const hash = await bcrypt.hash(_password, 10)
            await User.create({ name: _name, surname: _surname, email: _email, password: hash })

            const user = await User.findOne({ email })
            _id = user.id
        })

        it('should succeed on correct search', async () => {

            const results = await logic.adSearchSkylaber(_id, test)

            expect(results).toBeDefined()
            expect(results.length).toBe(1)
            expect(results[0].name).toBe(name)
        })

        it('should succeed on correct search for two users', async () => {
            const __name= 'Martini'
            const __surname='Malek'
            const __email= 'marti@malekasd.com'
            const __password= 'p'

            const hash = await bcrypt.hash(__password, 10)
            await User.create({ name: __name, surname: __surname, email: __email, password: hash })
            const query= [['Personal info', 'marti']]

            const results = await logic.adSearchSkylaber(_id, query)

            expect(results).toBeDefined()
            expect(results.length).toBe(2)
            expect(results[0].name).toBe(_name)
            expect(results[1].name).toBe(__name)
        })

        it('should fail on not registered user', async() => {
            await User.deleteMany()
            try {
               await logic.adSearchSkylaber(_id, test)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
                
            }
        })

        it('should fail on empty userId', () =>
            expect(() => logic.adSearchSkylaber('', )).toThrowError('userId is empty'))

        it('should fail when userId is a number', () =>
            expect(() => logic.adSearchSkylaber(1, test)).toThrowError(`1 is not a string`))

        it('should fail when userId is an object', () =>
            expect(() => logic.adSearchSkylaber({}, test)).toThrowError(`[object Object] is not a string`))

        it('should fail when userId is an array', () =>
            expect(() => logic.adSearchSkylaber([1, 2, 3], test)).toThrowError(`1,2,3 is not a string`))

        it('should fail when userId is a boolean', () =>
            expect(() => logic.adSearchSkylaber(true, test)).toThrowError(`true is not a string`))

        it('should fail on empty param', () =>
            expect(() => logic.adSearchSkylaber(_id,[])).toThrowError('param is empty'))

        it('should fail when param is a number', () =>
            expect(() => logic.adSearchSkylaber(_id, 1)).toThrowError(`1 is not an array`))

        it('should fail when param is an object', () =>
            expect(() => logic.adSearchSkylaber(_id, {})).toThrowError(`[object Object] is not an array`))

        it('should fail when param is a string', () =>
            expect(() => logic.adSearchSkylaber(_id, 'test')).toThrowError(`test is not an array`))

        it('should fail when param is a boolean', () =>
            expect(() => logic.adSearchSkylaber(_id, true)).toThrowError(`true is not an array`))

    })

    describe('retrieve user', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        let email, password, _id, _skylaberId

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })
            _id = user.id
            _skylaberId = user.id
        })

        it('should succeed on correct credentials', async () => {
            const user = await logic.retrieveSkylaber(_id, _skylaberId)

            expect(user.id).toEqual(_id)
            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)
            expect(user.__v).toBeUndefined()
            expect(user.password).toBeUndefined()
        })

        it('should fail on not registered user', async() => {
            await User.deleteOne({id: _id})
            try {
               await logic.retrieveSkylaber(_id, _skylaberId)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
                
            }
        })

        it('should fail on not registered skylaber', async() => {
            await User.deleteOne({id: _skylaberId})
            try {
               await logic.retrieveSkylaber(_id, _skylaberId)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`skylaber with userId ${skylaberId} not found`)
                
            }
        })

        it('should fail on empty userId', () =>
            expect(() => logic.retrieveSkylaber('', _skylaberId)).toThrowError('userId is empty'))

        it('should fail when userId is a number', () =>
            expect(() => logic.retrieveSkylaber(1, _skylaberId)).toThrowError(`1 is not a string`))

        it('should fail when userId is an object', () =>
            expect(() => logic.retrieveSkylaber({}, _skylaberId)).toThrowError(`[object Object] is not a string`))

        it('should fail when userId is an array', () =>
            expect(() => logic.retrieveSkylaber([1, 2, 3], _skylaberId)).toThrowError(`1,2,3 is not a string`))

        it('should fail when userId is a boolean', () =>
            expect(() => logic.retrieveSkylaber(true, _skylaberId)).toThrowError(`true is not a string`))

        it('should fail on empty skylaberId', () =>
            expect(() => logic.retrieveSkylaber(_id, '')).toThrowError('skylaberId is empty'))

        it('should fail when skylaberId is a number', () =>
            expect(() => logic.retrieveSkylaber(_id, 1)).toThrowError(`1 is not a string`))

        it('should fail when skylaberId is an object', () =>
            expect(() => logic.retrieveSkylaber(_id, {})).toThrowError(`[object Object] is not a string`))

        it('should fail when skylaberId is an array', () =>
            expect(() => logic.retrieveSkylaber(_id, [1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when skylaberId is a boolean', () =>
            expect(() => logic.retrieveSkylaber(_id, true)).toThrowError(`true is not a string`))
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