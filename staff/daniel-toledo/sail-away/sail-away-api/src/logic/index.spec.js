require('dotenv').config()
require('isomorphic-fetch')

const jwt = require('jsonwebtoken')
const { models: { User, Journey }, data: { seas, languages, talents }, mongoose } = require('sail-away-data')
const bcrypt = require('bcrypt')
const expect = require('expect')

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
        const kind='captain'
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
            const password = function a() { }

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

    false && describe('retrieve user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on correct credentials', () =>
            logic.retrieveUser(userId)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.save).toBeUndefined()
                })
        )

        it('should fail on empty userId', function () {
            userId = ''

            expect(() => logic.retrieveUser(userId).toThrowError('userId cannot be empty'))
        })
        it('should fail on non string userId', function () {
            userId = []

            expect(() => logic.retrieveUser(userId).toThrowError(`${userId} is not a string`))
        })
    })

    false && describe('update user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on correct credentials', () => {
            let data = { name: 'Manuel2' }
            return logic.updateUser(userId, data)
                .then(() => User.findById(userId))
                .then(user => {
                    expect(user.id).toEqual(userId)
                    expect(user.name).toBe(data.name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        })

        it('should fail on empty userId', function () {
            userId = ''

            expect(() => logic.updateUser(userId, data).toThrowError('userId cannot be empty'))
        })
        it('should fail on non string userId', function () {
            userId = []

            expect(() => logic.updateUser(userId, data).toThrowError(`${userId} is not a string`))
        })

        it('should fail on non object userId', function () {
            data = 'data'

            expect(() => logic.updateUser(userId, data).toThrowError(`${data} is not an object`))
        })
    })

    false && describe('remove user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on correct credentials', () => {
            return logic.removeUser(userId)
                .then(() => User.findById(userId))
                .then(res => { expect(res).toBe(null) })
        })

        it('should fail on empty userId', function () {
            userId = ''

            expect(() => logic.updateUser(userId, data).toThrowError('userId cannot be empty'))
        })
        it('should fail on non string userId', function () {
            userId = []

            expect(() => logic.updateUser(userId, data).toThrowError(`${userId} is not a string`))
        })

    })

    false && describe('create Journeys', () => {
        const title = 'Mediterranean trip'
        const seaId = '08'
        const route = [
            { "name": "new marker", "position": { "lat": 41.98048622251079, "lng": 12.490741193558165 } },
            { "name": "new marker", "position": { "lat": 41.389753882061335, "lng": 2.295428693558165 } }
        ]
        const days = '123'
        const description = 'Amazing trip around mediterranean sea. We will not stop and we can se dolphins'
        // const boatId = 'boat-123'
        // const captain = 'captain-123'
        const lookingFor = {
            lenguages: ['it', 'en'],
            experience: 500,
            sailingTitles: [],
            talents: [talents[0].offers[1], talents[2].offers[2], talents[3].offers[3]]
        }

        beforeEach(async () => {

        })

        it('should succeed on valid data', async () => {
            const id = await logic.addJourney(title, seaId, route, days, description, boatId, captainId, lookingFor)

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            const user = await User.findOne({ email })

            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on empty query', () => {
            const query = ''

            expect(() => logic.searchArtists(query, function (error, artists) { })).toThrowError('query is empty')
        })
        it('should fail on array query', function () {
            const query = []

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on boolean query', function () {
            const query = true

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on number query', function () {
            const query = 4

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on object query', function () {
            const query = {}

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on null query', function () {
            const query = null

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on undefined query', function () {
            const query = undefined

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on function query', function () {
            const query = function a() { }

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on date query', function () {
            const query = new Date

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on error query', function () {
            const query = Error

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
    })

    false && describe('search sea', () => {
        it('should succeed on matching query', () => {
            const query = 'Mediterranean Sea'

            return logic.searchJourneys(query)
                .then(journeys => {
                    expect(journeys).toBeDefined()
                    expect(journeys instanceof Array).toBeTruthy()
                    expect(artists.length).toBeGreaterThan(0)

                    artists.forEach(({ name }) => expect(name.toLowerCase()).toContain(query))
                })
        })

        it('should fail on empty query', () => {
            const query = ''

            expect(() => logic.searchArtists(query, function (error, artists) { })).toThrowError('query is empty')
        })
        it('should fail on array query', function () {
            const query = []

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on boolean query', function () {
            const query = true

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on number query', function () {
            const query = 4

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on object query', function () {
            const query = {}

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on null query', function () {
            const query = null

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on undefined query', function () {
            const query = undefined

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on function query', function () {
            const query = function a() { }

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on date query', function () {
            const query = new Date

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
        it('should fail on error query', function () {
            const query = Error

            expect(() => logic.searchArtists(query)).toThrowError(`${query} is not a string`)
        })
    })

    false && describe('retrieve artist', () => {
        const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => {
                    userId = id
                })
                .catch((err) => {
                    if (err) throw err
                })
        )


        it('should succeed on matching query', () => {

            return logic.retrieveArtist(artistId)
                .then(madonna => {
                    expect(madonna).toBeDefined()
                    expect(madonna.name).toBe('Madonna')
                })
        })

        it('should fail on empty artistId', function () {
            const artistId = ''

            expect(() => logic.retrieveArtist(artistId)).toThrowError('artistId is empty')
        })
        it('should fail on object artistId', function () {
            const artistId = {}

            expect(() => logic.retrieveArtist(artistId)).toThrow(Error(`${artistId} is not a string`))
        })
    })


    after(() =>
        Promise.all([
            Journey.deleteMany(),
            User.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})