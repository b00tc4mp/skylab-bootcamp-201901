require('dotenv').config()
require('isomorphic-fetch')
require('moment')

const jwt = require('jsonwebtoken')
const { models: { User, Journey },  mongoose: { Types: { ObjectId } }, mongoose } = require('sail-away-data')
const bcrypt = require('bcrypt')
const expect = require('expect')
const moment = require('moment')

const logic = require('.')


const { env: { TEST_DB_URL } } = process

describe('logic', () => {

    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))


    beforeEach(() =>
        Promise.all([
            Journey.deleteMany(),
            User.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const email = `ritamedina-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password
        const kind = 'captain'

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm, kind)

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            const user = await User.findOne({ email })

            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on already existing user', async () => {
            await User.create({ name, surname, email, password, passwordConfirm, kind })
            return logic.registerUser(name, surname, email, password, passwordConfirm, kind)
                .catch(error => {
                    expect(error instanceof Error).toBe(true)
                    expect(error.message).toBe(`user with email ${email} already exists`)
                })
        })

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Manuel'
            const surname = undefined
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Manuel'
            const surname = 10
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'Manuel'
            const surname = false
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Manuel'
            const surname = {}
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Manuel'
            const surname = []
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Manuel'
            const surname = ''
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('surname cannot be empty'))
        })
        it('should fail on object email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = {}
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(email + ' is not a string'))
        })
        it('should fail on boolean email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = true
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(email + ' is not a string'))
        })
        it('should fail on number email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 4
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(email + ' is not a string'))
        })
        it('should fail on undefined email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = undefined
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(email + ' is not a string'))
        })
        it('should fail on null email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = null
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(email + ' is not a string'))
        })
        it('should fail on error email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = Error
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(email + ' is not a string'))
        })
        it('should fail on function email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = function a() { }
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(email + ' is not a string'))
        })
        it('should fail on empty email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = ''
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('email cannot be empty'))
        })
        it('should fail on object password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = {}

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(password + ' is not a string'))
        })
        it('should fail on boolean password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = true

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(password + ' is not a string'))
        })
        it('should fail on number password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = 4

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(password + ' is not a string'))
        })
        it('should fail on undefined password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = undefined

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(password + ' is not a string'))
        })
        it('should fail on null password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = null

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(password + ' is not a string'))
        })
        it('should fail on error password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = Error

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(password + ' is not a string'))
        })
        it('should fail on date password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = Date

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(password + ' is not a string'))
        })
        it('should fail on empty password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('password cannot be empty'))
        })
        it('should fail on empty password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = ''
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('email cannot be empty'))
        })
        it('should fail on non-matching passwords', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = '1234'

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error('passwords do not match'))
        })
        it('should fail on empty passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error('password confirmation cannot be empty'))
        })
        it('should fail on object passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = {}

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm + ' is not a string'))
        })
        it('should fail on boolean passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = true

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm + ' is not a string'))
        })
        it('should fail on undefined passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = undefined

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm + ' is not a string'))
        })
        it('should fail on null passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = null

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm + ' is not a string'))
        })
        it('should fail on number passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = 4

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm + ' is not a string'))
        })
        it('should fail on error passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = Error

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm + ' is not a string'))
        })
        it('should fail on date passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = Date

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm + ' is not a string'))
        })
        it('should fail on function passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = function a() { }

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm + ' is not a string'))
        })
    })

    describe('authenticate user', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const kind = 'captain'
        let email, password, hash

        beforeEach(async () => {
            password = '123'
            email = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            return User.create({ name, surname, email, password: hash, kind })
        })

        it('should succeed on correct credentials', () =>
            logic.authenticateUser(email, password)
                .then((id) => {
                    expect(id).toBeDefined()
                })
        )

        it('should fail on incorrect credentials', () => {
            password = 'fail'
            return logic.authenticateUser(email, password)
                .catch(error => {
                    expect(error instanceof Error).toBe(true)
                    expect(error.message).toBe('wrong credentials')
                })
        })


        it('should fail on not found user', () => {
            email = 'fail@mail.com'
            return logic.authenticateUser(email, password)
                .catch(error => {
                    expect(error instanceof Error).toBe(true)
                    expect(error.message).toBe(`user with email ${email} not found`)
                })
        })


        it('should fail on empty email', function () {
            email = ''

            expect(() => logic.authenticateUser(email, password)).toThrowError('email cannot be empty')
        })
        it('should fail on array email', function () {
            email = []

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        it('should fail on boolean email', function () {
            const email = true

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        it('should fail on number email', function () {
            const email = 4

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        it('should fail on object email', function () {
            const email = {}

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        it('should fail on null email', function () {
            const email = null

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        it('should fail on undefined email', function () {
            const email = undefined

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        it('should fail on function email', function () {
            const email = function a() { }

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        it('should fail on date email', function () {
            const email = new Date

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        it('should fail on error email', function () {
            const email = Error

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${email} is not a string`)
        })
        /*----*/
        it('should fail on empty password', function () {
            password = ''

            expect(() => logic.authenticateUser(email, password)).toThrowError('password cannot be empty')
        })
        it('should fail on array password', function () {
            password = []

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
        it('should fail on boolean password', function () {
            const password = true

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
        it('should fail on number password', function () {
            const password = 4

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
        it('should fail on object password', function () {
            const password = {}

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
        it('should fail on null password', function () {
            const password = null

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
        it('should fail on undefined password', function () {
            const password = undefined

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
        it('should fail on function password', function () {
            const password = function () { }

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
        it('should fail on date password', function () {
            const password = new Date

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
        it('should fail on error password', function () {
            const password = Error

            expect(() => logic.authenticateUser(email, password)).toThrowError(`${password} is not a string`)
        })
    })

    describe('retrieve user', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const kind = 'captain'
        let email, password, hash, userId

        beforeEach(async () => {
            password = '123'
            email = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            user = await User.create({ name, surname, email, password: hash, kind })
            userId = user.id.toString()
            return userId
        })

        it('should succeed on correct credentials', async () => {

            let user = await logic.retrieveUser(userId)

            expect(user.id).toBe(userId)
            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)

            expect(user.save).toBeUndefined()
        }

        )

        it('should succeed fail on not found user', () => {
            const userId = 'randomId'
            return logic.retrieveUser(userId)
                .catch(error => {
                    expect(error instanceof Error).toBe(true)
                    expect(error.message).toBe(`user with id ${userId} not found`)
                })
        })

        it('should fail on empty userId', function () {
            userId = ''

            expect(() => logic.retrieveUser(userId)).toThrowError('userId cannot be empty')
        })
        it('should fail on non string userId', function () {
            userId = []

            expect(() => logic.retrieveUser(userId)).toThrowError(`${userId} is not a string`)
        })
    })

    describe('update user', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const kind = 'captain'
        let email, password, hash, userId

        let data = {
            name: 'Rita',
            surname: 'Medina-updated',
            gender: 'Feminine',
            nationality: 'Portuguese',
            description: 'I am a nice girl willing to travel',
            talents: ['art', 'musician', 'writter'],
            boats: [{
                name: 'saphiro',
                type: 'Yacht',
                model: 416,
                description: 'amazing vessel'
            }],
            experience: 200,
            languages: ['pt', 'en']
        }

        beforeEach(async () => {
            password = '123'
            email = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            user = await User.create({ name, surname, email, password: hash, kind })
            userId = user.id.toString()
            return userId
        })

        it('should succeed on correct credentials', () => {

            return logic.updateUser(userId, data)
                .then(() => User.findById(userId))
                .then(user => {
                    expect(user.id).toEqual(userId)
                    expect(user.name).toBe(data.name)
                    expect(user.surname).toBe(data.surname)
                    expect(user.email).toBe(email)
                    expect(user.gender).toEqual('Feminine')
                    expect(user.nationality).toEqual('Portuguese')
                    expect(user.description).toEqual('I am a nice girl willing to travel')
                    expect(user.talents.toString()).toEqual(['art', 'musician', 'writter'].toString())
                    expect(user.boats[0].toString()).toEqual({
                        name: 'saphiro',
                        type: 'Yacht',
                        model: 416,
                        description: 'amazing vessel'
                    }.toString())
                    expect(user.experience).toEqual(200)
                    expect(user.languages.toString()).toEqual(['pt', 'en'].toString())
                })
        })

        it('should succeed adding boat to captain', () => {
            let data = {
                name: 'Rita',
                surname: 'Medina-updated',
                gender: 'Feminine',
                nationality: 'Portuguese',
                description: 'I am a nice girl willing to travel',
                talents: ['art', 'musician', 'writter'],
                boats: [],
                experience: 200,
                languages: ['pt', 'en']
            }
            return logic.updateUser(userId, data)
                .then(() => User.findById(userId))
                .then(user => {
                    expect(user.id).toEqual(userId)
                    expect(user.name).toBe(data.name)
                    expect(user.surname).toBe(data.surname)
                    expect(user.email).toBe(email)
                    expect(user.gender).toEqual('Feminine')
                    expect(user.nationality).toEqual('Portuguese')
                    expect(user.description).toEqual('I am a nice girl willing to travel')
                    expect(user.talents.toString()).toEqual(['art', 'musician', 'writter'].toString())
                    expect(user.experience).toEqual(200)
                    expect(user.languages.toString()).toEqual(['pt', 'en'].toString())
                })
        })

        it('should fail in user not found', () => {

            let failUserId = '123456789'

            logic.updateUser(failUserId, data)
                .catch(error => expect(error).toEqual(Error(`user with userId ${failUserId} not found`)))

        })

        it('should fail on empty userId', function () {
            userId = ''

            expect(() => logic.updateUser(userId, data)).toThrowError('userId cannot be empty')
        })
        it('should fail on non string userId', function () {
            userId = []

            expect(() => logic.updateUser(userId, data)).toThrowError(`${userId} is not a string`)
        })

        it('should fail on non object data', function () {
            data = 'data'

            expect(() => logic.updateUser(userId, data)).toThrowError(`${data} is not an object`)
        })

        it('should fail on non data userId', function () {

            expect(() => logic.updateUser(userId)).toThrowError('data should be defined')
        })
    })

    describe('update user picture', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const kind = 'captain'
        let email, password, hash, userId

        const url = 'https://i.pinimg.com/originals/24/3c/e9/243ce978cc67ff88acfa7bec6315c9ff.png'

        beforeEach(async () => {
            password = '123'
            email = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            user = await User.create({ name, surname, email, password: hash, kind })
            userId = user.id.toString()
            return userId
        })

        it('should succeed on correct credentials', () => {

            return logic.updateUserPicture(userId, url)
                .then(() => User.findById(userId))
                .then(user => {
                    expect(user.id).toEqual(userId)
                    expect(user.pictures.length).toBe(1)
                    expect(user.pictures[0]).toBe(url)
                })
        })

        it('should fail in user not autorized', () => {

            let failUserId = '123456789'

            logic.updateUserPicture(failUserId, url)
                .catch(error => expect(error).toEqual(Error(`user with userId ${failUserId} not found`)))

        })

        it('should fail on empty userId', function () {
            let userId = ''

            expect(() => {
                logic.updateUserPicture(userId, url)
            }).toThrow(Error('userId cannot be empty'))

        })
        it('should fail on non string userId', () => {
            let userId = 123

            expect(() => {
                logic.updateUserPicture(userId, url)
            }).toThrow(TypeError(`${userId} is not a string`))

        })

        it('should fail on empty url', function () {
            let url = ''

            expect(() => {
                logic.updateUserPicture(userId, url)
            }).toThrow(Error('url cannot be empty'))

        })
        it('should fail on non string url', () => {
            let url = 123

            expect(() => {
                logic.updateUserPicture(userId, url)
            }).toThrow(TypeError(`${url} is not a string`))
        })
    })

    describe('update boat', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const kind = 'captain'
        let email, password, hash, userId

        let boats = [{
            id: "boat-40485",
            pictures: [
                "https://res.cloudinary.com/sail-away/image/upload/v1552866742/l0qmzljnhocggsw0kfrh.png",
                "https://res.cloudinary.com/sail-away/image/upload/v1552866772/s2rgsv2aynwagi8vckkt.jpg",
                "https://res.cloudinary.com/sail-away/image/upload/v1552866955/dcryfjmle5eskxhwdgu6.jpg"
            ],
            name: "olive",
            type: "carbon",
            model: "blue",
            boatLength: "large",
            crew: "3",
            age: "6 years",
            description: "Popeye's boat"
        }]

        let newBoat = {
            id: "boat-500000",
            pictures: [],
            name: "olive",
            type: "carbon",
            model: "blue",
            boatLength: "large",
            crew: "3",
            age: "6 years",
            description: "Popeye's boat"
        }

        beforeEach(async () => {
            password = '123'
            email = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            user = await User.create({ name, surname, email, password: hash, kind, boats })
            userId = user.id.toString()
            return userId
        })

        it('should succeed on adding Boat', () => {

            return logic.updateBoat(userId, newBoat)
                .then(() => User.findById(userId))
                .then(user => {
                    expect(user.boats.length).toEqual(2)
                    expect(user.boats[1].toString()).toEqual(newBoat.toString())
                })
        })

        it('should succeed on Edditing boat', () => {
            let boatToEdit = {
                id: "boat-40485",
                pictures: [
                    "https://res.cloudinary.com/sail-away/image/upload/v1552866742/l0qmzljnhocggsw0kfrh.png",
                ],
                name: "olive-let",
                type: "csail",
                model: "red",
                boatLength: "large",
                crew: "3",
                age: "7 years",
                description: "Popeye's boat"
            }
            return logic.updateBoat(userId, boatToEdit)
                .then(() => User.findById(userId))
                .then(user => {
                    expect(user.boats.length).toEqual(1)
                    expect(user.boats[0].toString()).toEqual(boatToEdit.toString())
                })
        })

        it('should fail on not found user', () => {

            let failUserId = '123456789'

            logic.updateBoat(failUserId, newBoat)
                .catch(error => expect(error).toEqual(Error(`user with userId ${failUserId} not found`)))

        })


        it('should fail on empty userId', function () {
            userId = ''

            expect(() => logic.updateBoat(userId, newBoat)).toThrowError('userId cannot be empty')
        })
        it('should fail on non string userId', function () {
            userId = []

            expect(() => logic.updateBoat(userId, newBoat)).toThrowError(`${userId} is not a string`)
        })

        it('should fail on non object boat', function () {
            let boat = 'boat'

            expect(() => logic.updateBoat(userId, boat)).toThrow(TypeError, `${boat} is not an object`)
        })

        it('should fail on empty boat', function () {
            let boat = {}

            expect(() => logic.updateBoat(userId, boat)).toThrow(Error, 'boat should be defined')
        })

    })

    describe('update boat picture', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const kind = 'captain'
        let email, password, hash, userId

        let boats = [{
            id: "boat-40485",
            pictures: [],
            name: "olive",
            type: "carbon",
            model: "blue",
            boatLength: "large",
            crew: "3",
            age: "6 years",
            description: "Popeye's boat"
        }]

        let boatId = boats[0].id

        let url = "https://res.cloudinary.com/sail-away/image/upload/v1552866742/l0qmzljnhocggsw0kfrh.png"
        let url2 = "https://res.cloudinary.com/sail-away/image/upload/v123343556/lsdtregegbgfrhhjh.png"

        beforeEach(async () => {
            password = '123'
            email = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            user = await User.create({ name, surname, email, password: hash, kind, boats })
            userId = user.id.toString()
            return userId
        })

        it('should succeed on adding urls', () => {

            return logic.updateBoatPicture(userId, boatId, url)
                .then(() => logic.updateBoatPicture(userId, boatId, url2))
                .then(() => User.findById(userId))
                .then(user => {
                    expect(user.id).toEqual(userId)
                    expect(user.boats[0].pictures.length).toBe(2)
                    expect(user.boats[0].pictures[0]).toBe(url)
                    expect(user.boats[0].pictures[1]).toBe(url2)
                })
        })

        it('should fail in user not autorized', () => {

            let failUserId = '123456789'

            logic.updateBoatPicture(failUserId, boatId, url)
                .catch(error => expect(error).toEqual(Error(`user with id ${failUserId} not found`)))

        })

        it('should fail on boat npt found', () => {

            let failBoatId = '123456789'


            logic.updateBoatPicture(userId, failBoatId, url)
                .catch(error => expect(error).toEqual(Error(`boat with id ${failBoatId} not found`)))

        })

        it('should fail on empty userId', function () {
            let userId = ''

            expect(() => {
                logic.updateBoatPicture(userId, boatId, url)
            }).toThrow(Error('userId cannot be empty'))

        })
        it('should fail on non string userId', () => {
            let userId = 123

            expect(() => {
                logic.updateBoatPicture(userId, boatId, url)
            }).toThrow(TypeError(`${userId} is not a string`))

        })

        it('should fail on empty boatId', function () {
            let boatId = ''

            expect(() => {
                logic.updateBoatPicture(userId, boatId, url)
            }).toThrow(Error('boatId cannot be empty'))

        })
        it('should fail on non string boatId', () => {
            let boatId = 123

            expect(() => {
                logic.updateBoatPicture(userId, boatId, url)
            }).toThrow(TypeError(`${boatId} is not a string`))

        })

        it('should fail on empty url', function () {
            let url = ''

            expect(() => {
                logic.updateBoatPicture(userId, boatId, url)
            }).toThrow(Error('url cannot be empty'))

        })
        it('should fail on non string url', () => {
            let url = 123

            expect(() => {
                logic.updateBoatPicture(userId, boatId, url)
            }).toThrow(TypeError(`${url} is not a string`))
        })
    })

    describe('search user', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const kind = 'captain'
        const password = '123'


        beforeEach(async () => {
            email1 = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            user1 = await User.create({ name, surname, email: email1, password: hash, kind, talents: ['music', 'photographer'], languages: ['English', 'Arabic'] })
            userId1 = user1._id.toString()

            email2 = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            user2 = await User.create({ name, surname, email: email2, password: hash, kind, talents: ['music', 'cleaning'], languages: ['Spanish', 'Arabic'] })
            userId2 = user2._id.toString()

            email3 = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            user3 = await User.create({ name, surname, email: email3, password: hash, kind, talents: ['music', 'cleaning', 'teacher'], languages: ['Catalan'] })
            userId3 = user3._id.toString()

            email4 = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            user4 = await User.create({ name, surname, email: email4, password: hash, kind, talents: ['cleaning', 'teacher'], language: ['Spanish', 'English'] })
            userId4 = user4._id.toString()


        })

        it('should succeed on valid data', async () => {
            let talents = ['music']
            let languages = ['Spanish', 'English']

            const users = await logic.searchUsers(talents, languages)

            expect(users.length).toEqual(2)
            expect(users.find(user => user.email === user1.email)).toBeTruthy
            expect(users.find(user => user.email === user2.email)).toBeTruthy

        })

        it('should succeed on valid data', async () => {
            let talents = ['teacher', 'cleaning']
            let languages = ['Catalan']

            const users = await logic.searchUsers(talents, languages)

            expect(users.length).toEqual(1)
            expect(users.find(user => user.email === user3.email)).toBeTruthy

        })

        it('should succeed on valid data', async () => {
            let talents = ['teacher', 'cleaning']
            let languages = ['Spanish']

            const users = await logic.searchUsers(talents, languages)

            expect(users.length).toEqual(1)
            expect(users.find(user => user.email === user4.email)).toBeTruthy
            expect(users.find(user => user.email === user2.email)).toBeTruthy
        })


        it('should succeed on empty talents and langugaes', async () => {
            let talents = []
            let languages = []

            const users = await logic.searchUsers(talents, languages)

            expect(users.length).toEqual(4)
            expect(users.find(user => user.email === user1.email)).toBeTruthy
            expect(users.find(user => user.email === user2.email)).toBeTruthy
            expect(users.find(user => user.email === user3.email)).toBeTruthy
            expect(users.find(user => user.email === user4.email)).toBeTruthy
        })

        it('should succeed on empty talents', async () => {
            let talents = []
            let languages = ['Catalan']

            const users = await logic.searchUsers(talents, languages)

            expect(users.length).toEqual(1)
            expect(users.find(user => user.email === user3.email)).toBeTruthy

        })

        it('should succeed on empty langugaes', async () => {
            let talents = ['teacher']
            let languages = []

            const users = await logic.searchUsers(talents, languages)

            expect(users.length).toEqual(2)
            expect(users.find(user => user.email === user3.email)).toBeTruthy
            expect(users.find(user => user.email === user4.email)).toBeTruthy
        })

        it('should fail on non talents array', () => {
            let talents = 123
            let languages = ['Spanish']

            expect(() => {
                logic.searchUsers(talents, languages)
            }).toThrow(TypeError(`${talents} is not an array`))

        })

        it('should fail on non lenguages array', () => {
            let talents = ['teacher', 'cleaning']
            let languages = 123

            expect(() => {
                logic.searchUsers(talents, languages)
            }).toThrow(TypeError(`${languages} is not an array`))

        })

    })

    describe('remove user', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const kind = 'captain'
        let email, password, hash, userId

        beforeEach(async () => {
            password = '123'
            email = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            user = await User.create({ name, surname, email, password: hash, kind })
            userId = user.id.toString()
            return userId
        })

        it('should succeed on correct credentials', () => {
            return logic.removeUser(userId)
                .then(() => User.findById(userId))
                .then(res => { expect(res).toBe(null) })
        })

        it('should fail on empty userId', function () {
            userId = ''

            expect(() => logic.removeUser(userId)).toThrowError('userId cannot be empty')
        })
        it('should fail on non string userId', function () {
            userId = []

            expect(() => logic.removeUser(userId)).toThrowError(`${userId} is not a string`)
        })

    })

    describe('create Journeys', () => {
        let title = 'Mediterranean trip'
        let seaId = '08'
        let route = [
            { "name": "new marker", "position": { "lat": 41.98048622251079, "lng": 12.490741193558165 } },
            { "name": "new marker", "position": { "lat": 41.389753882061335, "lng": 2.295428693558165 } }
        ]
        let dates = [moment("2019-03-25"), moment("2019-04-25")]
        let description = 'Amazing trip around mediterranean sea. We will not stop and we can se dolphins'
        let lookingFor = {
            lenguages: ['it', 'en'],
            experience: 500,
            sailingTitles: [],
            talents: ['general mantenence', 'children care', 'body balance']
        }

        let name = 'Rita'
        let surname = 'Medina'
        let kind = 'captain'
        let gender = 'Feminine'
        let nationality = 'Portuguese'
        let boats = [{
            id: "boat-40485",
            pictures: [
                "https://res.cloudinary.com/sail-away/image/upload/v1552866742/l0qmzljnhocggsw0kfrh.png",
                "https://res.cloudinary.com/sail-away/image/upload/v1552866772/s2rgsv2aynwagi8vckkt.jpg",
                "https://res.cloudinary.com/sail-away/image/upload/v1552866955/dcryfjmle5eskxhwdgu6.jpg"
            ],
            name: "olive",
            type: "carbon",
            model: "blue",
            boatLength: "large",
            crew: "3",
            age: "6 years",
            description: "Popeye's boat"
        }]
        let boat = boats[0]
        let email, password, hash, user, userId

        beforeEach(async () => {
            password = '123'
            email = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            let { id } = await User.create({ name, surname, email, password: hash, kind, gender, nationality, boats })
            userId = ObjectId(id)

        })

        it('should succeed on valid data', async () => {

            const id = await logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor)

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            let journey = await Journey.findById(id).select('-__v').lean()

            expect(journey.title).toEqual(title)
            expect(journey.seaId).toEqual(seaId)
            expect(journey.route.toString()).toEqual(route.toString())
            expect(journey.description).toEqual(description)
            expect(journey.lookingFor.toString()).toEqual(lookingFor.toString())
            expect(journey.userId.toString()).toEqual(userId.toString())
            expect(journey.boat.toString()).toEqual(boat.toString())
        })

        it('should fail in user not autorized', () => {

            let boat = {
                id: 'boat-40495',
                name: 'saphiro-2',
                type: 'Yacht',
                model: 416,
                description: 'amazing vessel'
            }

            logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor)
                .catch(error => expect(error).toEqual(Error('boat does not belong to user')))

        })

        it('should fail on empty title', function () {
            let title = ''

            expect(() => logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor))
                .toThrowError('title cannot be empty')
        })

        it('should fail on title not being string', function () {
            let title = 123

            expect(() => logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor))
                .toThrow(TypeError, ` ${title} is not a string`)
        })

        it('should fail on empty seaId', function () {
            let seaId = ''

            expect(() => logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor))
                .toThrowError('seaId cannot be empty')
        })

        it('should fail on seaId not being string', function () {
            let seaId = 123

            expect(() => logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor))
                .toThrow(TypeError, ` ${seaId} is not a string`)
        })

        it('should fail on empty route', function () {
            let route = []

            expect(() => logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor))
                .toThrowError('route cannot be empty')
        })

        it('should fail on route not being string', function () {
            let route = 123

            expect(() => logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor))
                .toThrow(TypeError, ` ${route} is not an Array`)
        })


        it('should fail on empty dates', function () {
            let dates = []

            expect(() => logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor))
                .toThrowError('dates cannot be empty')
        })

        it('should fail on dates not being string', function () {
            let dates = 123

            expect(() => logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor))
                .toThrow(TypeError, ` ${dates} is not an Array`)
        })

        it('should fail on empty description', function () {
            let description = ''

            expect(() => logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor))
                .toThrowError('description cannot be empty')
        })

        it('should fail on description not being string', function () {
            let description = 123

            expect(() => logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor))
                .toThrow(TypeError, ` ${description} is not a string`)
        })

        it('should fail on userId not being string', function () {
            let userId = 123

            expect(() => logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor))
                .toThrow(TypeError, ` ${userId} is not an ObjectId`)
        })

        it('should fail on empty boat', function () {
            let boat = {}

            expect(() => logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor))
                .toThrowError('boat cannot be empty')
        })

        it('should fail on boat not being string', function () {
            let boat = 123

            expect(() => logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor))
                .toThrow(TypeError, ` ${boat} is not an Object`)
        })

        it('should fail on empty lookingFor', function () {
            let lookingFor = {}

            expect(() => logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor))
                .toThrowError('lookingFor cannot be empty')
        })

        it('should fail on lookingFor not being string', function () {
            let lookingFor = 123

            expect(() => logic.addJourney(title, seaId, route, dates, description, userId, boat, lookingFor))
                .toThrow(TypeError, ` ${lookingFor} is not an Object`)
        })


    })

    describe('search by sea', () => {
        const title = 'Mediterranean trip'
        const route = [
            { "name": "new marker", "position": { "lat": 41.98048622251079, "lng": 12.490741193558165 } },
            { "name": "new marker", "position": { "lat": 41.389753882061335, "lng": 2.295428693558165 } }
        ]
        const dates = [moment("2019-03-25"), moment("2019-04-25")]
        const description = 'Amazing trip around mediterranean sea. We will not stop and we can se dolphins'
        const lookingFor = {
            lenguages: ['it', 'en'],
            experience: 500,
            sailingTitles: [],
            talents: ['general mantenence', 'children care', 'body balance']
        }

        const name = 'Rita'
        const surname = 'Medina'
        const kind = 'captain'
        let email, password, hash, user, userId, seaId

        beforeEach(async () => {
            password = '123'
            email = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            let { id } = await User.create({ name, surname, email, password: hash, kind })
            userId = ObjectId(id)
            let data = {
                name: 'Rita',
                surname: 'Medina-updated',
                gender: 'Feminine',
                nationality: 'Portuguese',
                description: 'I am a nice girl willing to travel',
                talents: ['art', 'musician', 'writter'],
                boats: [{
                    name: 'saphiro',
                    type: 'Yacht',
                    model: 416,
                    description: 'amazing vessel'
                }],
                experience: 200,
                languages: ['pt', 'en']
            }

            user = await User.findByIdAndUpdate(id, { $set: data }, { new: true }).select('-__v').lean()

            let boat = user.boats[0]

            seaId = '08'
            await Journey.create({ title, seaId, route, dates, description, userId, boat, lookingFor })

            seaId = '08'
            await Journey.create({ title, seaId, route, dates, description, userId, boat, lookingFor })

            seaId = '10'
            await Journey.create({ title, seaId, route, dates, description, userId, boat, lookingFor })
        })

        it('should succeed on matching query', () => {
            const query = '08'

            return logic.searchJourneys(query)
                .then(journeys => {
                    expect(journeys).toBeDefined()
                    expect(journeys instanceof Array).toBeTruthy()
                    expect(journeys.length).toBe(2)
                })
        })


        it('should return empty array on not results', () => {
            const query = '09'

            return logic.searchJourneys(query)
                .then(journeys => {
                    expect(journeys).toBeDefined()
                    expect(journeys instanceof Array).toBeTruthy()
                    expect(journeys.length).toBe(0)
                })
        })

        it('should fail on empty query', () => {
            const query = ''

            expect(() => logic.searchJourneys(query)).toThrowError('query cannot be empty')
        })
        it('should fail on array query', function () {
            const query = []

            expect(() => logic.searchJourneys(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on boolean query', function () {
            const query = true

            expect(() => logic.searchJourneys(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on number query', function () {
            const query = 4

            expect(() => logic.searchJourneys(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on object query', function () {
            const query = {}

            expect(() => logic.searchJourneys(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on null query', function () {
            const query = null

            expect(() => logic.searchJourneys(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on undefined query', function () {
            const query = undefined

            expect(() => logic.searchJourneys(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on function query', function () {
            const query = function a() { }

            expect(() => logic.searchJourneys(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on date query', function () {
            const query = new Date

            expect(() => logic.searchJourneys(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on error query', function () {
            const query = Error

            expect(() => logic.searchJourneys(query)).toThrowError(`${query} is not a string`)
        })
    })

    describe('retrieve Journey', () => {
        const title = 'Mediterranean trip'
        const seaId = '08'
        const route = [
            { "name": "new marker", "position": { "lat": 41.98048622251079, "lng": 12.490741193558165 } },
            { "name": "new marker", "position": { "lat": 41.389753882061335, "lng": 2.295428693558165 } }
        ]
        const dates = [moment("2019-03-25"), moment("2019-04-25")]
        const description = 'Amazing trip around mediterranean sea. We will not stop and we can se dolphins'
        const lookingFor = {
            lenguages: ['it', 'en'],
            experience: 500,
            sailingTitles: [],
            talents: ['general mantenence', 'children care', 'body balance']
        }

        const name = 'Rita'
        const surname = 'Medina'
        const kind = 'captain'
        const data = {
            name: 'Rita',
            surname: 'Medina-updated',
            gender: 'Feminine',
            nationality: 'Portuguese',
            description: 'I am a nice girl willing to travel',
            talents: ['art', 'musician', 'writter'],
            boats: [{
                name: 'saphiro',
                type: 'Yacht',
                model: 416,
                description: 'amazing vessel'
            }],
            experience: 200,
            languages: ['pt', 'en']
        }
        let email, password, hash, user, boat, userId

        beforeEach(async () => {
            password = '123'
            email = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            let { id } = await User.create({ name, surname, email, password: hash, kind })
            userId = ObjectId(id)

            user = await User.findByIdAndUpdate(id, { $set: data }, { new: true }).select('-__v').lean()
            boat = user.boats[0]

        })

        it('should succeed on matching journeyId', async () => {

            let journey = await Journey.create({ title, seaId, route, dates, description, userId, boat, lookingFor })
            journeyId = journey._id.toString()

            const expectJourney = await logic.retrieveJourney(journeyId)

            expect(expectJourney.title).toEqual(title)
            expect(expectJourney.seaId).toEqual(seaId)
            expect(expectJourney.route.toString()).toEqual(route.toString())
            // expect(expectJourney.dates.toString()).toEqual(dates.toString())
            expect(expectJourney.description).toEqual(description)
            expect(expectJourney.lookingFor.toString()).toEqual(lookingFor.toString())
            expect(expectJourney.userId.toString()).toEqual(userId.toString())
            expect(expectJourney.boat.toString()).toEqual(boat.toString())
        })

        it('should return error in not found journey', async () => {
            let journeyId = '5c8246a6b504e92cf41906b1'
            const expectJourney = await logic.retrieveJourney(journeyId)

            expect(expectJourney.error).toBeDefined()
            expect(expectJourney.error).toEqual('journey not found')
            expect(expectJourney.journey).toBeUndefined()
        })

        it('should fail on empty id', () => {
            const id = ''

            expect(() => logic.retrieveJourney(id)).toThrowError('id cannot be empty')
        })
        it('should fail on array id', function () {
            const id = []

            expect(() => logic.retrieveJourney(id)).toThrowError(`${id} is not a string`)
        })
        it('should fail on boolean id', function () {
            const id = true

            expect(() => logic.retrieveJourney(id)).toThrowError(`${id} is not a string`)
        })
        it('should fail on number id', function () {
            const id = 4

            expect(() => logic.retrieveJourney(id)).toThrowError(`${id} is not a string`)
        })
        it('should fail on object id', function () {
            const id = {}

            expect(() => logic.retrieveJourney(id)).toThrowError(`${id} is not a string`)
        })
        it('should fail on null id', function () {
            const id = null

            expect(() => logic.retrieveJourney(id)).toThrowError(`${id} is not a string`)
        })
        it('should fail on undefined id', function () {
            const id = undefined

            expect(() => logic.retrieveJourney(id)).toThrowError(`${id} is not a string`)
        })
        it('should fail on function id', function () {
            const id = function a() { }

            expect(() => logic.retrieveJourney(id)).toThrowError(`${id} is not a string`)
        })
        it('should fail on date id', function () {
            const id = new Date

            expect(() => logic.retrieveJourney(id)).toThrowError(`${id} is not a string`)
        })
        it('should fail on error id', function () {
            const id = Error

            expect(() => logic.retrieveJourney(id)).toThrowError(`${id} is not a string`)
        })
    })

    describe('update Journey', () => {
        const title = 'Mediterranean trip'
        const seaId = '08'
        const route = [
            { "name": "new marker", "position": { "lat": 41.98048622251079, "lng": 12.490741193558165 } },
            { "name": "new marker", "position": { "lat": 41.389753882061335, "lng": 2.295428693558165 } }
        ]
        const dates = [moment("2019-03-25"), moment("2019-04-25")]
        const description = 'Amazing trip around mediterranean sea. We will not stop and we can se dolphins'
        const lookingFor = {
            lenguages: ['it', 'en'],
            experience: 500,
            sailingTitles: [],
            talents: ['general mantenence', 'children care', 'body balance']
        }

        const name = 'Rita'
        const surname = 'Medina'
        const kind = 'captain'
        const data = {
            name: 'Rita',
            surname: 'Medina-updated',
            gender: 'Feminine',
            nationality: 'Portuguese',
            description: 'I am a nice girl willing to travel',
            talents: ['art', 'musician', 'writter'],
            boats: [{
                name: 'saphiro',
                type: 'Yacht',
                model: 416,
                description: 'amazing vessel'
            }],
            experience: 200,
            languages: ['pt', 'en']
        }
        let email, password, hash, user, boat, userId, journeyId

        beforeEach(async () => {
            password = '123'
            email = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            let { id } = await User.create({ name, surname, email, password: hash, kind })
            userId = ObjectId(id)

            user = await User.findByIdAndUpdate(id, { $set: data }, { new: true }).select('-__v').lean()
            boat = user.boats[0]

            let journey = await Journey.create({ title, seaId, route, dates, description, userId, boat, lookingFor })
            journeyId = journey._id.toString()
        })

        it('should succeed on correct data', async () => {
            let newData = {
                title: 'Mediterranean trip version 2',
                seaId: '09',
                route: [
                    { "name": "first position", "position": { "lat": 41.98048622251079, "lng": 12.490741193558165 } },
                    { "name": "last position", "position": { "lat": 41.389753882061335, "lng": 2.295428693558165 } }
                ],
                dates: [moment("2019-04-25"), moment("2019-05-25")],
                description: 'Amazing trip around mediterranean sea- verion 2. We will not stop and we can se dolphins',
                lookingFor: {
                    lenguages: ['it', 'en', 'cat'],
                    experience: 550,
                    sailingTitles: [],
                    talents: ['animal care', 'barmen', 'children care']
                }
            }

            let newJourney = await logic.updateJourney(journeyId, newData)

            expect(newJourney.title).toEqual(newData.title)
            expect(newJourney.seaId).toEqual(newData.seaId)
            expect(newJourney.route.toString()).toEqual(newData.route.toString())
            // expect(newJourney.dates.toString()).toEqual(newData.dates.toString())
            expect(newJourney.description).toEqual(newData.description)
            expect(newJourney.lookingFor.toString()).toEqual(newData.lookingFor.toString())
        })

        it('should return error in not found journey', async () => {
            let journeyId = '5c8246a6b504e92cf41906b1'
            const expectJourney = await logic.updateJourney(journeyId, { title: 'not title' })

            expect(expectJourney.error).toBeDefined()
            expect(expectJourney.error).toEqual('journey could not be updated')
            expect(expectJourney.journey).toBeUndefined()
        })

        it('should fail on empty id', () => {
            const id = ''

            expect(() => logic.updateJourney(id, { title: 'new title' })).toThrowError('id cannot be empty')
        })
        it('should fail on array id', function () {
            const id = []

            expect(() => logic.updateJourney(id, { title: 'new title' })).toThrowError(`${id} is not a string`)
        })
        it('should fail on boolean id', function () {
            const id = true

            expect(() => logic.updateJourney(id, { title: 'new title' })).toThrowError(`${id} is not a string`)
        })
        it('should fail on number id', function () {
            const id = 4

            expect(() => logic.updateJourney(id, { title: 'new title' })).toThrowError(`${id} is not a string`)
        })
        it('should fail on object id', function () {
            const id = {}

            expect(() => logic.updateJourney(id, { title: 'new title' })).toThrowError(`${id} is not a string`)
        })
        it('should fail on null id', function () {
            const id = null

            expect(() => logic.updateJourney(id, { title: 'new title' })).toThrowError(`${id} is not a string`)
        })
        it('should fail on undefined id', function () {
            const id = undefined

            expect(() => logic.updateJourney(id, { title: 'new title' })).toThrowError(`${id} is not a string`)
        })
        it('should fail on function id', function () {
            const id = function () { }

            expect(() => logic.updateJourney(id, { title: 'new title' })).toThrowError(`${id} is not a string`)
        })
        it('should fail on date id', function () {
            const id = new Date

            expect(() => logic.updateJourney(id, { title: 'new title' })).toThrowError(`${id} is not a string`)
        })
        it('should fail on error id', function () {
            const id = Error

            expect(() => logic.updateJourney(id, { title: 'new title' })).toThrowError(`${id} is not a string`)
        })

        it('should fail on empty data', () => {
            const data = {}

            expect(() => logic.updateJourney(journeyId, data)).toThrowError('data cannot be empty')
        })
        it('should fail on string data', function () {
            const data = ''

            expect(() => logic.updateJourney(journeyId, data)).toThrowError(`${data} is not an Object`)
        })
        it('should fail on boolean data', function () {
            const data = true

            expect(() => logic.updateJourney(journeyId, data)).toThrowError(`${data} is not an Object`)
        })
        it('should fail on number data', function () {
            const data = 4

            expect(() => logic.updateJourney(journeyId, data)).toThrowError(`${data} is not an Object`)
        })
        it('should fail on array data', function () {
            const data = []

            expect(() => logic.updateJourney(journeyId, data)).toThrowError(`${data} is not an Object`)
        })
        // it('should fail on null data', function () {
        //     const data = null

        //     expect(() => logic.updateJourney(journeyId, data)).toThrowError(`${data} is not an Object`)
        // })
        // it('should fail on undefined data', function () {
        //     const data = undefined

        //     expect(() => logic.updateJourney(journeyId, data)).toThrowError(`${data} is not an Object`)
        // })
        it('should fail on function data', function () {
            const data = function a() { }

            expect(() => logic.updateJourney(journeyId, data)).toThrowError(`${data} is not an Object`)
        })
        it('should fail on date data', function () {
            const data = new Date

            expect(() => logic.updateJourney(journeyId, data)).toThrowError(`${data} is not an Object`)
        })
        it('should fail on error data', function () {
            const data = Error

            expect(() => logic.updateJourney(journeyId, data)).toThrowError(`${data} is not an Object`)
        })
    })

    describe('retrieve my journeys', ()=>{
        let title = 'Mediterranean trip'
        let seaId = '08'
        let route = [
            { "name": "new marker", "position": { "lat": 41.98048622251079, "lng": 12.490741193558165 } },
            { "name": "new marker", "position": { "lat": 41.389753882061335, "lng": 2.295428693558165 } }
        ]
        let dates = [moment("2019-03-25"), moment("2019-04-25")]
        let description = 'Amazing trip around mediterranean sea. We will not stop and we can se dolphins'
        let lookingFor = {
            lenguages: ['it', 'en'],
            experience: 500,
            sailingTitles: [],
            talents: ['general mantenence', 'children care', 'body balance']
        }

        let name = 'Rita'
        let surname = 'Medina'
        let kind = 'captain'
        let gender = 'Feminine'
        let nationality = 'Portuguese'
        let boats = [{
            id: "boat-40485",
            pictures: [
                "https://res.cloudinary.com/sail-away/image/upload/v1552866742/l0qmzljnhocggsw0kfrh.png",
                "https://res.cloudinary.com/sail-away/image/upload/v1552866772/s2rgsv2aynwagi8vckkt.jpg",
                "https://res.cloudinary.com/sail-away/image/upload/v1552866955/dcryfjmle5eskxhwdgu6.jpg"
            ],
            name: "olive",
            type: "carbon",
            model: "blue",
            boatLength: "large",
            crew: "3",
            age: "6 years",
            description: "Popeye's boat"
        }]
        let boat = boats[0]
        let email, password, hash, user, userId

        beforeEach(async () => {
            password = '123'
            email = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            let { id } = await User.create({ name, surname, email, password: hash, kind, gender, nationality, boats })
            userId = ObjectId(id)
            await Journey.create({ title, seaId, route, dates, description, userId, boat, lookingFor })

        })

        it('should succeed on valid data', async () => {

            const journeys = await logic.myJourneys(userId.toString())

            expect(journeys[0].title).toEqual(title)
            expect(journeys[0].seaId).toEqual(seaId)
            expect(journeys[0].route.toString()).toEqual(route.toString())
            expect(journeys[0].description).toEqual(description)
            expect(journeys[0].lookingFor.toString()).toEqual(lookingFor.toString())
            expect(journeys[0].userId.toString()).toEqual(userId.toString())
            expect(journeys[0].boat.toString()).toEqual(boat.toString())
        })
        
        it('should fail on empty userId', function () {
            let userId = ''

            expect(() => {
                logic.myJourneys(userId)
            }).toThrow(Error('userId cannot be empty'))

        })
        it('should fail on non string userId', () => {
            let userId = 123

            expect(() => {
                logic.myJourneys(userId)
            }).toThrow(TypeError(`${userId} is not a string`))

        })
    })

    describe('delete Journey', () => { })

    describe('toggle journey favorite', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const kind = 'captain'
        let email, password, hash, userId

        beforeEach(async () => {
            password = '123'
            email = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            user = await User.create({ name, surname, email, password: hash, kind })
            userId = user.id.toString()
            return userId
        })

        it('should succeed on adding favorite', () => {
            let journeyId = '123456789'
            return logic.toggleFavoriteJourney(userId, journeyId)
                .then(() => User.findById(userId))
                .then(user => {
                    expect(user.id).toEqual(userId)
                    expect(user.favoriteJourneys.length).toBe(1)
                    expect(user.favoriteJourneys[0]).toBe(journeyId)

                })
        })

        it('should succeed on deleting favorite', () => {
            let journeyId = '123456789'
            return logic.toggleFavoriteJourney(userId, journeyId)
                .then(() => logic.toggleFavoriteJourney(userId, journeyId))
                .then(() => User.findById(userId))
                .then(user => {
                    expect(user.id).toEqual(userId)
                    expect(user.favoriteJourneys.length).toBe(0)
                    expect(user.favoriteJourneys[0]).toBeUndefined

                })
        })

        it('should fail in user not found', () => {
            let journeyId = '123456789'
            let failUserId = '123456789'

            logic.toggleFavoriteJourney(failUserId, journeyId)
                .catch(error => expect(error).toEqual(Error(`user with id ${failUserId} not found`)))

        })

        it('should fail on empty userId', function () {
            let userId = ''
            let journeyId = '123456789'

            expect(() => logic.toggleFavoriteJourney(userId, journeyId)).toThrowError('userId cannot be empty')
        })
        it('should fail on non string userId', function () {
            let userId = 123
            let journeyId = '123456789'
            expect(() => logic.toggleFavoriteJourney(userId, journeyId)).toThrowError(`${userId} is not a string`)
        })

        it('should fail on empty journeyId', function () {
            let userId = '123456789'
            let journeyId = ''

            expect(() => logic.toggleFavoriteJourney(userId, journeyId)).toThrowError('journeyId cannot be empty')
        })
        it('should fail on non string userId', function () {
            let userId = '123456789'
            let journeyId =  123
            expect(() => logic.toggleFavoriteJourney(userId, journeyId)).toThrowError(`${journeyId} is not a string`)
        })
    })

    describe('toggle crew favorite', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const kind = 'captain'
        let email, password, hash, userId

        beforeEach(async () => {
            password = '123'
            email = `ritamedina-${Math.random()}@mail.com`
            hash = await bcrypt.hash(password, 10)
            user = await User.create({ name, surname, email, password: hash, kind })
            userId = user.id.toString()
            return userId
        })

        it('should succeed on adding favorite', () => {
            let crewId = '123456789'
            return logic.toggleFavoriteCrew(userId, crewId)
                .then(() => User.findById(userId))
                .then(user => {
                    expect(user.id).toEqual(userId)
                    expect(user.favoriteCrew.length).toBe(1)
                    expect(user.favoriteCrew[0]).toBe(crewId)

                })
        })

        it('should succeed on deleting favorite', () => {
            let crewId = '123456789'
            return logic.toggleFavoriteCrew(userId, crewId)
                .then(() => logic.toggleFavoriteCrew(userId, crewId))
                .then(() => User.findById(userId))
                .then(user => {
                    expect(user.id).toEqual(userId)
                    expect(user.favoriteCrew.length).toBe(0)
                    expect(user.favoriteCrew[0]).toBeUndefined

                })
        })

        it('should fail in user not found', () => {
            let crewId = '123456789'
            let failUserId = '123456789'

            logic.toggleFavoriteCrew(failUserId, crewId)
                .catch(error => expect(error).toEqual(Error(`user with id ${failUserId} not found`)))

        })

        
        it('should fail on empty userId', function () {
            let userId = ''
            let crewId = '123456789'

            expect(() => logic.toggleFavoriteCrew(userId, crewId)).toThrowError('userId cannot be empty')
        })
        it('should fail on non string userId', function () {
            let userId = 123
            let crewId = '123456789'
            expect(() => logic.toggleFavoriteCrew(userId, crewId)).toThrowError(`${userId} is not a string`)
        })

        it('should fail on empty crewId', function () {
            let userId = '123456789'
            let crewId = ''

            expect(() => logic.toggleFavoriteCrew(userId, crewId)).toThrowError('crewId cannot be empty')
        })
        it('should fail on non string crewId', function () {
            let userId = '123456789'
            let crewId =  123
            expect(() => logic.toggleFavoriteCrew(userId, crewId)).toThrowError(`${crewId} is not a string`)
        })
    })


    after(() =>
        Promise.all([
            Journey.deleteMany(),
            User.deleteMany(),
            // Journey.collection.drop(),
            // User.collection.drop()
        ])
            .then(() => mongoose.disconnect())
    )
})