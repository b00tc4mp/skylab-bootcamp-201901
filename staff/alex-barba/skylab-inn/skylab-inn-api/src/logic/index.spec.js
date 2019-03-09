'use strict'

require('dotenv').config()

const { mongoose, models: { User, Work, EmailWhitelist } } = require('skylab-inn-data')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')

const { env: { TEST_DB_URL } } = process

describe('logic', () => {

    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
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

        it('should fail on not authorized email', () => {
            const _email = `alex.barba-${Math.random()}@gmail.com`

            return logic.registerUser(name, surname, _email, password, passwordConfirm)
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`The email ${_email} is not authorised to sign up`)
                })
        })

        it('should fail on duplicate email', () => {
            const _name = 'Àlex'
            const _surname = 'Barba'
            const _email = `alex.barba-${Math.random()}@gmail.com`
            const _password = `Pass-${Math.random()}`
            const _passwordConfirm = _password

            return EmailWhitelist.create({ name: _name, surname: _surname, email: _email })
                .then(() =>logic.registerUser(_name, _surname, _email, _password, _passwordConfirm))
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
        let test = [['Contact Information', 'alex']]

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
            const query= [['Contact Information', 'marti']]

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

    describe('retrieve skylaber', () => {
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

    describe('add user information', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        let email, password, _id, type, data

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })
            _id = user.id
        })

        it('should succeed on correct work information', async () => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            await logic.addUserInformation(_id, type, data)

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
                await logic.addUserInformation(_id, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe("User validation failed: workExperience.0.startDate: Path `startDate` is required.")
            } 
        })

        it('should succeed on correct tech information', async () => {
            type = 'Tech'
            data = { tech: 'test', level: 'Novice' }
            await logic.addUserInformation(_id, type, data)

            const user = await User.findById(_id)

            expect(user.technology[0]._id).toBeDefined()
            expect(user.technology[0].tech).toEqual('test')
            expect(user.technology[0].level).toEqual('Novice')
        })

        it('should fail on wrong tech information', async () => {
            type = 'Tech'
            data = { tech: 'test', level: 'test' }

            try {
                await logic.addUserInformation(_id, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe("User validation failed: technology.0.level: `test` is not a valid enum value for path `level`.")
            } 
        })

        it('should succeed on correct language information', async () => {
            type = 'Language'
            data = { language: 'test', level: 'Elementary proficiency' }
            await logic.addUserInformation(_id, type, data)

            const user = await User.findById(_id)

            expect(user.language[0]._id).toBeDefined()
            expect(user.language[0].language).toEqual('test')
            expect(user.language[0].level).toEqual('Elementary proficiency')
        })

        it('should fail on wrong language information', async () => {
            type = 'Language'
            data = { language: 'test', level: 'test' }

            try {
                await logic.addUserInformation(_id, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe("User validation failed: language.0.level: `test` is not a valid enum value for path `level`.")
            } 
        })

        it('should succeed on correct education information', async () => {
            type = 'Education'
            data = { college: 'test', degree: 'test' }
            await logic.addUserInformation(_id, type, data)

            const user = await User.findById(_id)

            expect(user.education[0]._id).toBeDefined()
            expect(user.education[0].college).toEqual('test')
            expect(user.education[0].degree).toEqual('test')
        })

        it('should fail on wrong education information', async () => {
            type = 'Education'
            data = { college: 'test', degree: null}

            try {
                await logic.addUserInformation(_id, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe("User validation failed: education.0.degree: Path `degree` is required.")
            } 
        })

        it('should fail on not registered user', async() => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            await User.deleteMany()
            try {
               await logic.addUserInformation(_id, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
                
            }
        })

        it('should fail on empty userId', () =>
            expect(() => logic.addUserInformation('', type, data)).toThrowError('userId is empty'))

        it('should fail when userId is a number', () =>
            expect(() => logic.addUserInformation(1, type, data)).toThrowError(`1 is not a string`))

        it('should fail when userId is an object', () =>
            expect(() => logic.addUserInformation({}, type, data)).toThrowError(`[object Object] is not a string`))

        it('should fail when userId is an array', () =>
            expect(() => logic.addUserInformation([1, 2, 3], type, data)).toThrowError(`1,2,3 is not a string`))

        it('should fail when userId is a boolean', () =>
            expect(() => logic.addUserInformation(true, type, data)).toThrowError(`true is not a string`))
        
        it('should fail on empty type', () =>
            expect(() => logic.addUserInformation(_id, '', data)).toThrowError('type is empty'))

        it('should fail when type is a number', () =>
            expect(() => logic.addUserInformation(_id, 1, data)).toThrowError(`1 is not a string`))

        it('should fail when type is an object', () =>
            expect(() => logic.addUserInformation(_id, {}, data)).toThrowError(`[object Object] is not a string`))

        it('should fail when type is an array', () =>
            expect(() => logic.addUserInformation(_id, [1, 2, 3], data)).toThrowError(`1,2,3 is not a string`))

        it('should fail when type is a boolean', () =>
            expect(() => logic.addUserInformation(_id, true, data)).toThrowError(`true is not a string`))
        
        it('should fail on empty data', () =>
            expect(() => logic.addUserInformation(_id, type,)).toThrowError('data is empty'))

        it('should fail when data is a number', () =>
            expect(() => logic.addUserInformation(_id, type, 1)).toThrowError(`1 is not an object`))

        it('should fail when data is a string', () =>
            expect(() => logic.addUserInformation(_id, type, 'hola')).toThrowError(`hola is not an object`))

        it('should fail when data is an array', () =>
            expect(() => logic.addUserInformation(_id, type, [1, 2, 3])).toThrowError(`1,2,3 is not an object`))

        it('should fail when data is a boolean', () =>
            expect(() => logic.addUserInformation(_id, type, true)).toThrowError(`true is not an object`))
    })

    describe('update user information', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        let email, password, _id, type, data, infoId, infoIdW, infoIdT, infoIdL, infoIdE, _data

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })
            _id = user.id

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
            infoIdW = await logic.addUserInformation(_id, type, data)

            _data = { company: 'test2', position: 'test2', startDate: new Date, endDate: new Date, current: false }
            await logic.updateUserInformation(_id, infoIdW, type, _data)

            const user = await User.findById(_id)

            expect(user.workExperience[1]._id).toBeDefined()
            expect(user.workExperience[1].company).toEqual('test2')
            expect(user.workExperience[1].position).toEqual('test2')
            expect(user.workExperience[1].current).toEqual(false)
        })

        it('should fail on wrong work id', async () => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: 'test', endDate: '', current: true }
            await logic.removeUserInformation(_id, infoIdW, type)

            try {
                await logic.updateUserInformation(_id, infoIdW, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`work with id ${infoIdW} not found`)
            } 
        })

        it('should succeed on correct tech update information', async () => {
            type = 'Tech'
            data = { tech: 'test', level: 'Novice' }
            infoIdT = await logic.addUserInformation(_id, type, data)
            
            _data = { tech: 'test2', level: 'Intermediate' }
            await logic.updateUserInformation(_id, infoIdT, type, _data)

            const user = await User.findById(_id)

            expect(user.technology[0]._id).toBeDefined()
            expect(user.technology[0].tech).toEqual('test2')
            expect(user.technology[0].level).toEqual('Intermediate')
        })

        it('should fail on wrong tech id', async () => {
            type = 'Tech'
            data = { tech: 'test', level: 'Novice' }
            infoIdT = await logic.addUserInformation(_id, type, data)

            await logic.removeUserInformation(_id, infoIdT, type)

            try {
                await logic.updateUserInformation(_id, infoIdT, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`technology with id ${infoIdT} not found`)
            } 
        })

        it('should succeed on correct language update information', async () => {
            type = 'Language'
            data = { language: 'test', level: 'Elementary proficiency' }
            infoIdL = await logic.addUserInformation(_id, type, data)

            _data = { language: 'test2', level: 'Limited working proficiency' }
            await logic.updateUserInformation(_id, infoIdL, type, _data)

            const user = await User.findById(_id)

            expect(user.language[0]._id).toBeDefined()
            expect(user.language[0].language).toEqual('test2')
            expect(user.language[0].level).toEqual('Limited working proficiency')
        })

        it('should fail on wrong language id', async () => {
            type = 'Language'
            data = { language: 'test', level: 'Elementary proficiency' }
            infoIdL = await logic.addUserInformation(_id, type, data)

            await logic.removeUserInformation(_id, infoIdL, type)

            try {
                await logic.updateUserInformation(_id, infoIdL, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`language with id ${infoIdL} not found`)
            } 
        })

        it('should succeed on correct education update information', async () => {
            type = 'Education'
            data = { college: 'test', degree: 'test' }
            infoIdE = await logic.addUserInformation(_id, type, data)

            _data = { college: 'test2', degree: 'test2' }
            await logic.updateUserInformation(_id, infoIdE, type, _data)

            const user = await User.findById(_id)

            expect(user.education[0]._id).toBeDefined()
            expect(user.education[0].college).toEqual('test2')
            expect(user.education[0].degree).toEqual('test2')
        })

        it('should fail on wrong education id', async () => {
            type = 'Education'
            data = { college: 'test', degree: 'test'}
            infoIdE = await logic.addUserInformation(_id, type, data)

            await logic.removeUserInformation(_id, infoIdE, type)

            try {
                await logic.updateUserInformation(_id, infoIdE, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`education with id ${infoIdE} not found`)
            } 
        })

        it('should fail on not registered user', async() => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            await User.deleteMany()
            try {
               await logic.updateUserInformation(_id, infoId, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
                
            }
        })

        it('should fail on empty userId', () =>
            expect(() => logic.updateUserInformation('', infoId, type, data)).toThrowError('userId is empty'))

        it('should fail when userId is a number', () =>
            expect(() => logic.updateUserInformation(1, infoId, type, data)).toThrowError(`1 is not a string`))

        it('should fail when userId is an object', () =>
            expect(() => logic.updateUserInformation({}, infoId, type, data)).toThrowError(`[object Object] is not a string`))

        it('should fail when userId is an array', () =>
            expect(() => logic.updateUserInformation([1, 2, 3], infoId, type, data)).toThrowError(`1,2,3 is not a string`))

        it('should fail when userId is a boolean', () =>
            expect(() => logic.updateUserInformation(true, infoId, type, data)).toThrowError(`true is not a string`))
        
        it('should fail on empty infoId', () =>
            expect(() => logic.updateUserInformation(_id, '', type, data)).toThrowError('infoId is empty'))

        it('should fail when infoId is a number', () =>
            expect(() => logic.updateUserInformation(_id, 1, type, data)).toThrowError(`1 is not a string`))

        it('should fail when infoId is an object', () =>
            expect(() => logic.updateUserInformation(_id, {}, type, data)).toThrowError(`[object Object] is not a string`))

        it('should fail when infoId is an array', () =>
            expect(() => logic.updateUserInformation(_id, [1, 2, 3], type, data)).toThrowError(`1,2,3 is not a string`))

        it('should fail when infoId is a boolean', () =>
            expect(() => logic.updateUserInformation(_id, true, type, data)).toThrowError(`true is not a string`))

        it('should fail on empty type', () =>
            expect(() => logic.updateUserInformation(_id, infoId,'', data)).toThrowError('type is empty'))

        it('should fail when type is a number', () =>
            expect(() => logic.updateUserInformation(_id, infoId,1, data)).toThrowError(`1 is not a string`))

        it('should fail when type is an object', () =>
            expect(() => logic.updateUserInformation(_id, infoId,{}, data)).toThrowError(`[object Object] is not a string`))

        it('should fail when type is an array', () =>
            expect(() => logic.updateUserInformation(_id, infoId,[1, 2, 3], data)).toThrowError(`1,2,3 is not a string`))

        it('should fail when type is a boolean', () =>
            expect(() => logic.updateUserInformation(_id, infoId,true, data)).toThrowError(`true is not a string`))
        
        it('should fail on empty data', () =>
            expect(() => logic.updateUserInformation(_id, infoId, type,)).toThrowError('data is empty'))

        it('should fail when data is a number', () =>
            expect(() => logic.updateUserInformation(_id, infoId, type, 1)).toThrowError(`1 is not an object`))

        it('should fail when data is a string', () =>
            expect(() => logic.updateUserInformation(_id, infoId, type, 'hola')).toThrowError(`hola is not an object`))

        it('should fail when data is an array', () =>
            expect(() => logic.updateUserInformation(_id, infoId, type, [1, 2, 3])).toThrowError(`1,2,3 is not an object`))

        it('should fail when data is a boolean', () =>
            expect(() => logic.updateUserInformation(_id, infoId, type, true)).toThrowError(`true is not an object`))
    })

    describe('remove user information', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        let email, password, _id, type, data, infoId, infoIdW, infoIdT, infoIdL, infoIdE, _data

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash })

            const user = await User.findOne({ email })
            _id = user.id

            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            infoId = await logic.addUserInformation(_id, type, data)
        })

        it('should succeed on correct work id', async () => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            infoIdW = await logic.addUserInformation(_id, type, data)

            const user = await User.findById(_id)

            expect(user.workExperience[1]._id).toBeDefined()
            expect(user.workExperience[1].company).toEqual('test')
            expect(user.workExperience[1].position).toEqual('test')
            expect(user.workExperience[1].current).toEqual(true)
        
            await logic.removeUserInformation(_id, infoIdW, type)

            const _user = await User.findById(_id)

            expect(_user.workExperience[1]).toBeUndefined()
        })

        it('should fail on wrong work id', async () => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            infoIdW = await logic.addUserInformation(_id, type, data)

            type = 'Work'
            data = { company: 'test', position: 'test', startDate: 'test', endDate: '', current: true }
            await logic.removeUserInformation(_id, infoIdW, type)

            try {
                await logic.removeUserInformation(_id, infoIdW, type)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`work with id ${infoIdW} not found`)
            } 
        })

        it('should succeed on correct tech id', async () => {
            type = 'Tech'
            data = { tech: 'test', level: 'Novice' }
            infoIdT = await logic.addUserInformation(_id, type, data)
            
            _data = { tech: 'test2', level: 'Intermediate' }
            await logic.updateUserInformation(_id, infoIdT, type, _data)

            const user = await User.findById(_id)

            expect(user.technology[0]._id).toBeDefined()
            expect(user.technology[0].tech).toEqual('test2')
            expect(user.technology[0].level).toEqual('Intermediate')

            await logic.removeUserInformation(_id, infoIdT, type)

            const _user = await User.findById(_id)

            expect(_user.technology[0]).toBeUndefined()
        })

        it('should fail on wrong tech id', async () => {
            type = 'Tech'
            data = { tech: 'test', level: 'Novice' }
            infoIdT = await logic.addUserInformation(_id, type, data)

            await logic.removeUserInformation(_id, infoIdT, type)

            try {
                await logic.removeUserInformation(_id, infoIdT, type)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`technology with id ${infoIdT} not found`)
            } 
        })

        it('should succeed on correct language id', async () => {
            type = 'Language'
            data = { language: 'test', level: 'Elementary proficiency' }
            infoIdL = await logic.addUserInformation(_id, type, data)

            _data = { language: 'test2', level: 'Limited working proficiency' }
            await logic.updateUserInformation(_id, infoIdL, type, _data)

            const user = await User.findById(_id)

            expect(user.language[0]._id).toBeDefined()
            expect(user.language[0].language).toEqual('test2')
            expect(user.language[0].level).toEqual('Limited working proficiency')

            await logic.removeUserInformation(_id, infoIdL, type)

            const _user = await User.findById(_id)

            expect(_user.language[0]).toBeUndefined()
        })

        it('should fail on wrong language id', async () => {
            type = 'Language'
            data = { language: 'test', level: 'Elementary proficiency' }
            infoIdL = await logic.addUserInformation(_id, type, data)

            await logic.removeUserInformation(_id, infoIdL, type)

            try {
                await logic.removeUserInformation(_id, infoIdL, type)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`language with id ${infoIdL} not found`)
            } 
        })

        it('should succeed on correct education id', async () => {
            type = 'Education'
            data = { college: 'test', degree: 'test' }
            infoIdE = await logic.addUserInformation(_id, type, data)

            _data = { college: 'test2', degree: 'test2' }
            await logic.updateUserInformation(_id, infoIdE, type, _data)

            const user = await User.findById(_id)

            expect(user.education[0]._id).toBeDefined()
            expect(user.education[0].college).toEqual('test2')
            expect(user.education[0].degree).toEqual('test2')

            await logic.removeUserInformation(_id, infoIdE, type)

            const _user = await User.findById(_id)

            expect(_user.education[0]).toBeUndefined()
        })

        it('should fail on wrong education id', async () => {
            type = 'Education'
            data = { college: 'test', degree: 'test'}
            infoIdE = await logic.addUserInformation(_id, type, data)

            await logic.removeUserInformation(_id, infoIdE, type)

            try {
                await logic.removeUserInformation(_id, infoIdE, type)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`education with id ${infoIdE} not found`)
            } 
        })

        it('should fail on not registered user', async() => {
            type = 'Work'
            data = { company: 'test', position: 'test', startDate: new Date, endDate: '', current: true }
            await User.deleteMany()
            try {
               await logic.updateUserInformation(_id, infoId, type, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)
                
            }
        })

        it('should fail on empty userId', () =>
            expect(() => logic.updateUserInformation('', infoId, type)).toThrowError('userId is empty'))

        it('should fail when userId is a number', () =>
            expect(() => logic.updateUserInformation(1, infoId, type)).toThrowError(`1 is not a string`))

        it('should fail when userId is an object', () =>
            expect(() => logic.updateUserInformation({}, infoId, type)).toThrowError(`[object Object] is not a string`))

        it('should fail when userId is an array', () =>
            expect(() => logic.updateUserInformation([1, 2, 3], infoId, type)).toThrowError(`1,2,3 is not a string`))

        it('should fail when userId is a boolean', () =>
            expect(() => logic.updateUserInformation(true, infoId, type)).toThrowError(`true is not a string`))
        
        it('should fail on empty infoId', () =>
            expect(() => logic.updateUserInformation(_id, '', type)).toThrowError('infoId is empty'))

        it('should fail when infoId is a number', () =>
            expect(() => logic.updateUserInformation(_id, 1, type)).toThrowError(`1 is not a string`))

        it('should fail when infoId is an object', () =>
            expect(() => logic.updateUserInformation(_id, {}, type)).toThrowError(`[object Object] is not a string`))

        it('should fail when infoId is an array', () =>
            expect(() => logic.updateUserInformation(_id, [1, 2, 3], type)).toThrowError(`1,2,3 is not a string`))

        it('should fail when infoId is a boolean', () =>
            expect(() => logic.updateUserInformation(_id, true, type)).toThrowError(`true is not a string`))

        it('should fail on empty type', () =>
            expect(() => logic.updateUserInformation(_id, infoId,'')).toThrowError('type is empty'))

        it('should fail when type is a number', () =>
            expect(() => logic.updateUserInformation(_id, infoId,1)).toThrowError(`1 is not a string`))

        it('should fail when type is an object', () =>
            expect(() => logic.updateUserInformation(_id, infoId,{})).toThrowError(`[object Object] is not a string`))

        it('should fail when type is an array', () =>
            expect(() => logic.updateUserInformation(_id, infoId,[1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when type is a boolean', () =>
            expect(() => logic.updateUserInformation(_id, infoId,true)).toThrowError(`true is not a string`))
    })

    describe('register admin', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        let role = "Admin"
        let email, password, passwordConfirm

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`
            passwordConfirm = password
        })

        it('should succeed on correct data', async () => {
            const id = await logic.registerAdmin(name, surname, email, password, passwordConfirm, role)

            expect(id).toBeDefined()
            expect(typeof id === 'string').toBeTruthy()

            const user = await User.findOne({ email })

            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)
            expect(user.role).toBe(role)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on wrong role', () => {
            role= `wrong`

            return logic.registerAdmin(name, surname, email, password, passwordConfirm, role)
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`wrong role`)
                })
        })

        it('should fail on duplicate email', () => {
            const _name = 'Àlex'
            const _surname = 'Barba'
            const _email = `alex.barba-${Math.random()}@gmail.com`
            const _password = `Pass-${Math.random()}`
            const _passwordConfirm = _password


            return logic.registerAdmin(_name, _surname, _email, _password, _passwordConfirm, role)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(typeof id === 'string').toBeTruthy()
                })
                .then(() => logic.registerAdmin(_name, _surname, _email, _password, _passwordConfirm, role))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`admin with email ${_email} already exists`)
                })
        })

        it('should fail when passwords do not match', () =>
            expect(() => logic.registerAdmin(name, surname, email, password, 'do-not-match', role)).toThrowError('passwords do not match'))

        it('should fail on empty name', () =>
            expect(() => logic.registerAdmin('', surname, email, password, passwordConfirm, role)).toThrowError('name is empty'))

        it('should fail on empty surname', () =>
            expect(() => logic.registerAdmin(name, '', email, password, passwordConfirm, role)).toThrowError('surname is empty'))

        it('should fail on empty email', () =>
            expect(() => logic.registerAdmin(name, surname, '', password, passwordConfirm, role)).toThrowError('email is empty'))

        it('should fail on empty password', () =>
            expect(() => logic.registerAdmin(name, surname, email, '', passwordConfirm, role)).toThrowError('password is empty'))

        it('should fail on empty password confirmation', () =>
            expect(() => logic.registerAdmin(name, surname, email, password, '', role)).toThrowError('password confirmation is empty'))

        it('should fail on empty role', () =>
            expect(() => logic.registerAdmin(name, surname, email, password, passwordConfirm, '')).toThrowError('role is empty'))

        it('should fail when name is a number', () =>
            expect(() => logic.registerAdmin(1, surname, email, password, passwordConfirm, role)).toThrowError(`1 is not a string`))

        it('should fail when name is an object', () =>
            expect(() => logic.registerAdmin({}, surname, email, password, passwordConfirm, role)).toThrowError(`[object Object] is not a string`))

        it('should fail when name is an array', () =>
            expect(() => logic.registerAdmin([1, 2, 3], surname, email, password, passwordConfirm, role)).toThrowError(`1,2,3 is not a string`))

        it('should fail when name is a boolean', () =>
            expect(() => logic.registerAdmin(true, surname, email, password, passwordConfirm, role)).toThrowError(`true is not a string`))

        it('should fail when surname is a number', () =>
            expect(() => logic.registerAdmin(name, 1, email, password, passwordConfirm, role)).toThrowError(`1 is not a string`))

        it('should fail when surname is an object', () =>
            expect(() => logic.registerAdmin(name, {}, email, password, passwordConfirm, role)).toThrowError(`[object Object] is not a string`))

        it('should fail when surname is an array', () =>
            expect(() => logic.registerAdmin(name, [1, 2, 3], email, password, passwordConfirm, role)).toThrowError(`1,2,3 is not a string`))

        it('should fail when surname is a boolean', () =>
            expect(() => logic.registerAdmin(name, true, email, password, passwordConfirm, role)).toThrowError(`true is not a string`))

        it('should fail when email is a number', () =>
            expect(() => logic.registerAdmin(name, surname, 1, password, passwordConfirm, role)).toThrowError(`1 is not a string`))

        it('should fail when email is an object', () =>
            expect(() => logic.registerAdmin(name, surname, {}, password, passwordConfirm, role)).toThrowError(`[object Object] is not a string`))

        it('should fail when email is an array', () =>
            expect(() => logic.registerAdmin(name, surname, [1, 2, 3], password, passwordConfirm, role)).toThrowError(`1,2,3 is not a string`))

        it('should fail when email is a boolean', () =>
            expect(() => logic.registerAdmin(name, surname, true, password, passwordConfirm, role)).toThrowError(`true is not a string`))

        it('should fail when password is a number', () =>
            expect(() => logic.registerAdmin(name, surname, email, 1, passwordConfirm, role)).toThrowError(`1 is not a string`))

        it('should fail when password is an object', () =>
            expect(() => logic.registerAdmin(name, surname, email, {}, passwordConfirm, role)).toThrowError(`[object Object] is not a string`))

        it('should fail when password is an array', () =>
            expect(() => logic.registerAdmin(name, surname, email, [1, 2, 3], passwordConfirm, role)).toThrowError(`1,2,3 is not a string`))

        it('should fail when password is a boolean', () =>
            expect(() => logic.registerAdmin(name, surname, email, true, passwordConfirm, role)).toThrowError(`true is not a string`))

        it('should fail when password confirmation is a number', () =>
            expect(() => logic.registerAdmin(name, surname, email, password, 1, role)).toThrowError(`1 is not a string`))

        it('should fail when password confirmation is an object', () =>
            expect(() => logic.registerAdmin(name, surname, email, password, {}, role)).toThrowError(`[object Object] is not a string`))

        it('should fail when password confirmation is an array', () =>
            expect(() => logic.registerAdmin(name, surname, email, password, [1, 2, 3], role)).toThrowError(`1,2,3 is not a string`))

        it('should fail when password confirmation is a boolean', () =>
            expect(() => logic.registerAdmin(name, surname, email, password, true, role)).toThrowError(`true is not a string`))

        it('should fail when role is a number', () =>
            expect(() => logic.registerAdmin(name, surname, email, password, passwordConfirm, 1)).toThrowError(`1 is not a string`))

        it('should fail when role is an object', () =>
            expect(() => logic.registerAdmin(name, surname, email, password, passwordConfirm, {})).toThrowError(`[object Object] is not a string`))

        it('should fail when role is an array', () =>
            expect(() => logic.registerAdmin(name, surname, email, password, passwordConfirm, [1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when role is a boolean', () =>
            expect(() => logic.registerAdmin(name, surname, email, password, passwordConfirm, true)).toThrowError(`true is not a string`))
    })

    describe('add skylaber', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        const role = 'Admin'
        let email, password, _id, data, _email

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            data = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`}

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash ,role})

            const user = await User.findOne({ email })
            _id = user.id
        })

        it('should succeed on correct credentials', async () => {
            const id = await logic.addSkylaber(_id, data)

            expect(id).toBeDefined()

            const skylaber = await EmailWhitelist.findById(id)

            expect(skylaber.name).toBe(data.name)
            expect(skylaber.surname).toBe(data.surname)
            expect(skylaber.email).toBe(data.email)
        })

        it('should fail on invalid userId', async() => {
            await User.deleteMany()
            try {
               await logic.addSkylaber(_id, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`) 
            }
        })

        it('should fail on not valid role', async() => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash, role })

            const user = await User.findOne({ email })

            try {
               await logic.addSkylaber(user.id, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`Access denied`)  
            }
        })

        it('should fail on already added skylaber', async() => {
            data = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`}
            await EmailWhitelist.create(data)
            
            try {
               await logic.addSkylaber(_id, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`skylaber with email ${data.email} already added to the Whitelist`) 
            }
        })

        it('should fail on already registered skylaber', async() => {
            _email = 'test@mail.com' 
            data = { name: 'Test', surname: 'test', email: `${_email}`}
            
            await User.create({name: 'Test', surname: 'Test`', email: `${_email}`, password: '123', passwordConfirm: '123'})

            try {
               await logic.addSkylaber(_id, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`skylaber with email ${data.email} already exists`) 
            }
        })

        it('should fail on empty userId', () =>
            expect(() => logic.addSkylaber('', data)).toThrowError('userId is empty'))

        it('should fail when userId is a number', () =>
            expect(() => logic.addSkylaber(1, data)).toThrowError(`1 is not a string`))

        it('should fail when userId is an object', () =>
            expect(() => logic.addSkylaber({}, data)).toThrowError(`[object Object] is not a string`))

        it('should fail when userId is an array', () =>
            expect(() => logic.addSkylaber([1, 2, 3], data)).toThrowError(`1,2,3 is not a string`))

        it('should fail when userId is a boolean', () =>
            expect(() => logic.addSkylaber(true, data)).toThrowError(`true is not a string`))

        it('should fail on empty data', () =>
            expect(() => logic.addSkylaber(_id)).toThrowError('data is empty'))

        it('should fail when data is a number', () =>
            expect(() => logic.addSkylaber(_id, 1)).toThrowError(`1 is not an object`))

        it('should fail when data is a string', () =>
            expect(() => logic.addSkylaber(_id, 'hola')).toThrowError(`hola is not an object`))

        it('should fail when data is an array', () =>
            expect(() => logic.addSkylaber(_id, [1, 2, 3])).toThrowError(`1,2,3 is not an object`))

        it('should fail when data is a boolean', () =>
            expect(() => logic.addSkylaber(_id, true)).toThrowError(`true is not an object`))
    })

    describe('retrieve pending skylabers', () => {
        const name = 'Àlex'
        const surname = 'Barba'
        const role = 'Admin'
        let email, password, _id

        beforeEach(async () => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash, role })

            const user = await User.findOne({ email })
            _id = user.id
        })

        it('should succeed on correct credentials', async () => {
            const users = await logic.retrivevePendingSkylabers(_id)

            expect(users).toBeDefined()
        })

        it('should succeed on returning only pending skylabers', async () => {
            const a = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, state: 'pending'}
            const b = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, state: 'pending'}
            const c = { name: 'Test', surname: 'test', email: `alex.barba-${Math.random()}@gmail.com`, state: 'registered'}
            
            await EmailWhitelist.create(a)
            await EmailWhitelist.create(b)
            await EmailWhitelist.create(c)

            const users = await logic.retrivevePendingSkylabers(_id)

            expect(users).toBeDefined()
            expect(users.length).toBe(2)
        })

        it('should fail on not valid role', async() => {
            email = `alex.barba-${Math.random()}@gmail.com`
            password = `Pass-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash, role })

            const user = await User.findOne({ email })

            try {
               await logic.retrivevePendingSkylabers(user.id)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`Access denied`)  
            }
        })

        it('should fail on not registered email', async() => {
            await User.deleteMany()
            try {
               await logic.retrivevePendingSkylabers(_id)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with userId ${_id} not found`)  
            }
        })

        it('should fail on empty userId', () =>
            expect(() => logic.retrivevePendingSkylabers('')).toThrowError('userId is empty'))

        it('should fail when userId is a number', () =>
            expect(() => logic.retrivevePendingSkylabers(1)).toThrowError(`1 is not a string`))

        it('should fail when userId is an object', () =>
            expect(() => logic.retrivevePendingSkylabers({})).toThrowError(`[object Object] is not a string`))

        it('should fail when userId is an array', () =>
            expect(() => logic.retrivevePendingSkylabers([1, 2, 3])).toThrowError(`1,2,3 is not a string`))

        it('should fail when userId is a boolean', () =>
            expect(() => logic.retrivevePendingSkylabers(true)).toThrowError(`true is not a string`))
    })

    after(() =>
        Promise.all([
            User.deleteMany(),
            Work.deleteMany(),
            EmailWhitelist.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})