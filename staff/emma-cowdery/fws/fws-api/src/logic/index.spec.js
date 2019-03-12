'use strict'

require ('dotenv').config()

require('isomorphic-fetch')

const { mongoose, models: { Users, Events, Chats } } = require('fws-data')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')

const  { env: { TEST_DB_URL } } = process

describe('logic', () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            Events.deleteMany(),
            Users.deleteMany(),
            Chats.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const username = `manu-${Math.random()}`
        const password = `123-${Math.random()}`
        const passwordConfirmation = password
        const howTo = true

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(name, surname, email, username, password, passwordConfirmation, howTo)

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            const user = await Users.findOne({ email })

            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)
            expect(user.howTo).toBe(howTo)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Manuel'
            const surname = undefined
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Manuel'
            const surname = 10
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'Manuel'
            const surname = false
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Manuel'
            const surname = {}
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Manuel'
            const surname = []
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email,username, password, password, howTo)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Manuel'
            const surname = ''
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(Error('surname cannot be empty'))
        })

        it('should fail on undefined email', () => {
            const name = 'Manuel'
            const surname = 'Barxi'
            const email = undefined
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const name = 'Manuel'
            const surname = 'Barxi'
            const email = 123
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(email + ' is not a string'))
        })


        it('should fail on boolean email', () => {
            const name = 'Manuel'
            const surname = 'Barxi'
            const email = true
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const name = 'Manuel'
            const surname = 'Barxi'
            const email = {}
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const name = 'Manuel'
            const surname = 'Barxi'
            const email = []
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email,username, password, password, howTo)
            }).toThrow(TypeError(email+ ' is not a string'))
        })

        it('should fail on empty email', () => {
            const name = 'Manuel'
            const surname = 'Barxi'
            const email = ''
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(Error('email cannot be empty'))
        })

        it('should fail on undefined username', () => {
            const name = 'Manuel'
            const surname = 'Barzy'
            const email = 'manuelbarzi@mail.com'
            const username = undefined
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on numeric username', () => {
            const name = 'Manuel'
            const surname = 'Barzy'
            const email = 'manuelbarzi@mail.com'
            const username = 123
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(username + ' is not a string'))
        })


        it('should fail on boolean username', () => {
            const name = 'Manuel'
            const surname = 'Barzy'
            const email = 'manuelbarzi@mail.com'
            const username = true
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on object username', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = {}
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on array username', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = []
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email,username, password, password, howTo)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on empty username', () => {
            const name = 'Manuel'
            const surname = 'Barzy'
            const email = 'manuelbarzi@mail.com'
            const username = ''
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(Error('username cannot be empty'))
        })

        it('should fail on undefined password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = undefined

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = 123

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(password + ' is not a string'))
        })


        it('should fail on boolean password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = false

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = {}

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = []

            expect(() => {
                logic.registerUser(name, surname, email,username, password, password, howTo)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = ''

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(Error('password cannot be empty'))
        })

        // it('should fail on undefined how to', () => {
        //     const name = 'Manuel'
        //     const surname = 'Barzi'
        //     const email = 'manuelbarzi@mail.com'
        //     const username = `manu-${Math.random()}`
        //     const howTo = undefined
        //     const password = 'undefined'

        //     expect(() => {
        //         logic.registerUser(name, surname, email, username, password, password, howTo)
        //     }).toThrow(TypeError(howTo + ' is not a boolean'))
        // })

        // it('should fail on numeric how to', () => {
        //     const name = 'Manuel'
        //     const surname = 'Barzi'
        //     const email = 'manuelbarzi@mail.com'
        //     const username = `manu-${Math.random()}`
        //     const howTo = 123
        //     const password = '123'

        //     expect(() => {
        //         logic.registerUser(name, surname, email, username, password, password, howTo)
        //     }).toThrow(TypeError(howTo + ' is not a boolean'))
        // })


        // it('should fail on string how to', () => {
        //     const name = 'Manuel'
        //     const surname = 'Barzi'
        //     const email = 'manuelbarzi@mail.com'
        //     const username = `manu-${Math.random()}`
        //     const howTo = 'true'
        //     const password = 'false'

        //     expect(() => {
        //         logic.registerUser(name, surname, email, username, password, password, howTo)
        //     }).toThrow(TypeError(howTo + ' is not a boolean'))
        // })

        // it('should fail on object how to', () => {
        //     const name = 'Manuel'
        //     const surname = 'Barzi'
        //     const email = 'manuelbarzi@mail.com'
        //     const username = `manu-${Math.random()}`
        //     const howTo = {}
        //     const password = '123'

        //     expect(() => {
        //         logic.registerUser(name, surname, email, username, password, password, howTo)
        //     }).toThrow(TypeError(howTo + ' is not a boolean'))
        // })

        // it('should fail on array how to', () => {
        //     const name = 'Manuel'
        //     const surname = 'Barzi'
        //     const email = 'manuelbarzi@mail.com'
        //     const username = `manu-${Math.random()}`
        //     const howTo = []
        //     const password = '123'

        //     expect(() => {
        //         logic.registerUser(name, surname, email,username, password, password, howTo)
        //     }).toThrow(TypeError(howTo + ' is not a boolean'))
        // })

        // it('should fail on empty how to', () => {
        //     const name = 'Manuel'
        //     const surname = 'Barzi'
        //     const email = 'manuelbarzi@mail.com'
        //     const username = `manu-${Math.random()}`
        //     const howTo = ''
        //     const password = '123'

        //     expect(() => {
        //         logic.registerUser(name, surname, email, username, password, password, howTo)
        //     }).toThrow(Error('howTo cannot be empty'))
        // })
    })

    describe('authenticate user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const username = `manu-${Math.random()}`
        const password = `123-${Math.random()}`
        const howTo = true

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => Users.create({ name, surname, email, username, password: hash, howTo }))
        )

        it('should succeed on correct credentials', () =>
            logic.authenticateUser(email, password)
                .then(id => {
                    expect(id).toBeDefined()
                })
        )
    })

    describe('create event', () => {
        const restaurantId = '998w9e8r90eqee'
        const userId = '23nx8d1347241sm'
        const eventTime = '13:30'
        const eventDate = '06/09/2019'
        const reservationName = 'pepito'

        it('should succeed on correct data', async () => {
            const id = await logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)

            expect(id).toBeDefined()

            const event = await Events.findOne({ restaurantId })

            expect(event.restaurantId).toBe(restaurantId)
            expect(event.eventTime).toBe(eventTime)
            expect(event.eventDate).toBe(eventDate)
            expect(event.reservationName).toBe(reservationName)
        })

        it('should fail on undefined restaurant id', () => {
            const restaurantId = undefined
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${restaurantId} is not a string`))
        })

        it('should fail on numeric restaurant id', () => {
            const restaurantId = 123
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${restaurantId} is not a string`))
        })

        it('should fail on boolean restaurant id', () => {
            const restaurantId = true
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${restaurantId} is not a string`))
        })

        it('should fail on objerct restaurant id', () => {
            const restaurantId = {}
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${restaurantId} is not a string`))
        })

        it('should fail on array restaurant id', () => {
            const restaurantId = []
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${restaurantId} is not a string`))
        })

        it('should fail on empty restaurant id', () => {
            const restaurantId = ''
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error('restaurantId is empty'))
        })

        //userId

        it('should fail on undefined user id', () => {
            const restaurantId = 'djbjadvnjsfknvsjk'
            const userId = undefined
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on numeric user id', () => {
            const restaurantId = 'dknakd32231'
            const userId = 123
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on boolean user id', () => {
            const restaurantId = 'nsmn 3j54nj3fe'
            const userId = true
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on objerct user id', () => {
            const restaurantId = 'sd3vcvs'
            const userId = {}
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on array user id', () => {
            const restaurantId = '235ng'
            const userId = []
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on empty user id', () => {
            const restaurantId = 'm2n3m1243 c'
            const userId = ''
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error('userId is empty'))
        })

        //time

        it('should fail on undefined event time', () => {
            const restaurantId = 'undefined'
            const userId = '23nx8d1347241sm'
            const eventTime = undefined
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${eventTime} is not a string`))
        })

        it('should fail on numeric event time', () => {
            const restaurantId = '23'
            const userId = '23nx8d1347241sm'
            const eventTime = 123
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${eventTime} is not a string`))
        })

        it('should fail on boolean event time', () => {
            const restaurantId = 'true'
            const userId = '23nx8d1347241sm'
            const eventTime = true
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${eventTime} is not a string`))
        })

        it('should fail on objerct event time', () => {
            const restaurantId = '12n4fj3c2'
            const userId = '23nx8d1347241sm'
            const eventTime = {}
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${eventTime} is not a string`))
        })

        it('should fail on array event time', () => {
            const restaurantId = 'ascaksc'
            const userId = '23nx8d1347241sm'
            const eventTime = []
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${eventTime} is not a string`))
        })

        it('should fail on empty event time', () => {
            const restaurantId = 'osd9d8'
            const userId = '23nx8d1347241sm'
            const eventTime = ''
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error('eventTime is empty'))
        })

        //date
        
        it('should fail on undefined event date', () => {
            const restaurantId = 'undefined'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = undefined

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${eventDate} is not a string`))
        })

        it('should fail on numeric event date', () => {
            const restaurantId = '123'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = 123

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${eventDate} is not a string`))
        })

        it('should fail on boolean event date', () => {
            const restaurantId = 'true'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = true

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${eventDate} is not a string`))
        })

        it('should fail on objerct event date', () => {
            const restaurantId = '{}'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = {}

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${eventDate} is not a string`))
        })

        it('should fail on array event date', () => {
            const restaurantId = '[]'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = []

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error(`${eventDate} is not a string`))
        })

        it('should fail on empty event date', () => {
            const restaurantId = ' cm4cm2r3'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = ''

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName)
            }).toThrow(Error('eventDate is empty'))
        })
    })

    describe('join event', () => {
        const restaurantId = '998w9aaaae8r90eqee'
        const userId = '23nx8d1347241sm'
        const eventTime = '13:30'
        const eventDate = '06/09/2019'
        const reservationName = 'pepito'

        beforeEach(() =>
            Events.create({restaurantId, userId, eventTime, eventDate, reservationName})
        )

        it('should suceed on correct data', async() => {
            const newUserId = '123456'

            const event = await Events.findOne({ restaurantId })

            const eventId = event.id

            const updatedEvent = await logic.joinEvent(eventId, newUserId)

            expect(updatedEvent.restaurantId).toBe(restaurantId)
            expect(updatedEvent.eventTime).toBe(eventTime)
            expect(updatedEvent.eventDate).toBe(eventDate)
        })

        it('should fail on undefined event id', () => {
            const eventId = undefined
            const userId = 'kdksfmdsknfjsdfnc'

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on numeric event id', () => {
            const eventId = 123
            const userId = 'kdksfmdsknfjsdfnc'

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on boolean event id', () => {
            const eventId = true
            const userId = 'kdksfmdsknfjsdfnc'

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on object event id', () => {
            const eventId = {}
            const userId = 'kdksfmdsknfjsdfnc'

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on array event id', () => {
            const eventId = []
            const userId = 'kdksfmdsknfjsdfnc'

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on empty event id', () => {
            const eventId = ''
            const userId = 'kdksfmdsknfjsdfnc'

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error('eventId is empty'))
        })

        it('should fail on undefined user id', () => {
            const eventId = 'undefined'
            const userId = undefined

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on numeric event id', () => {
            const eventId = '123'
            const userId = 123

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on boolean event id', () => {
            const eventId = 'true'
            const userId = true

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on object event id', () => {
            const eventId = '{}'
            const userId = {}

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on array event id', () => {
            const eventId = '[]'
            const userId = []

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on empty event id', () => {
            const eventId = 'asjndjafnad'
            const userId = ''

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error('userId is empty'))
        })
    })

    // describe('user events' () => {

    // })

    describe('create chat', ()  => {
        const userId = 'dnjkdafnjkanfd'
        const chatName = 'lalala'
        const eventId = 'skmkasm22332'

        it('should suceed on correct data', async () => {
            const id = await logic.createChat(userId, chatName, eventId)

            expect(id).toBeDefined()

            const chat = await Chats.findOne({ eventId })

            console.log(chat)

            expect(chat.eventId).toBe(eventId)
            expect(chat.chatName).toBe(chatName)
        })

        it('should fail on undefined user id', () => {
            const userId = undefined
            const chatName = 'lalalalalala'
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on numeric user id', () => {
            const userId = 123
            const chatName = 'lalalalalala'
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on boolean user id', () => {
            const userId = true
            const chatName = 'lalalalalala'
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on objerct user id', () => {
            const userId = {}
            const chatName = 'lalalalalala'
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on array user id', () => {
            const userId = []
            const chatName = 'lalalalalala'
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on empty user id', () => {
            const userId = ''
            const chatName = 'lalalalalala'
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error('userId is empty'))
        })

        it('should fail on undefined chat name', () => {
            const userId = 'undefined'
            const chatName = undefined
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${chatName} is not a string`))
        })

        it('should fail on numeric chat name', () => {
            const userId = '123'
            const chatName = 123
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${chatName} is not a string`))
        })

        it('should fail on boolean chat name', () => {
            const userId = 'true'
            const chatName = true
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${chatName} is not a string`))
        })

        it('should fail on objerct chat name', () => {
            const userId = '{}'
            const chatName = {}
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${chatName} is not a string`))
        })

        it('should fail on array chat name', () => {
            const userId = '[]'
            const chatName = []
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${chatName} is not a string`))
        })

        it('should fail on empty chat name', () => {
            const userId = 'sknjkaefn'
            const chatName = ''
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error('chatName is empty'))
        })

        it('should fail on undefined event id', () => {
            const userId = 'undefined'
            const chatName = 'lalalalalala'
            const eventId = undefined

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on numeric event id', () => {
            const userId = '123'
            const chatName = 'lalalalalala'
            const eventId = 123

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on boolean event id', () => {
            const userId = 'true'
            const chatName = 'lalalalalala'
            const eventId = true

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on objerct event id', () => {
            const userId = '{}'
            const chatName = 'lalalalalala'
            const eventId = {}

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on array event id', () => {
            const userId = '[]'
            const chatName = 'lalalalalala'
            const eventId = []

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on empty event id', () => {
            const userId = 'cmls,<csl'
            const chatName = 'lalalalalala'
            const eventId = ''

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error('eventId is empty'))
        })
    })

    describe('join chat' , () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const username = `manu-${Math.random()}`
        const password = `123-${Math.random()}`
        const howTo = true

        let userId 
        let chatId

        const eventId = '1mn3jk4ncjwe'
        const chatName = 'chat'

        beforeEach(async () => {
            bcrypt.hash(password, 10)
                .then(hash => Users.create({ name, surname, email, username, password: hash, howTo}))

            Users.findOne( {email} )
                .then(user => {
                    return userId = user.id
                })

            Chats.create({ chatName, eventId })

            Chats.findOne({ eventId })
            .then(chat => {return chatId = chat.id})

            const userId = await logic.registerUser(name, surname, email, suername, password, howTo)

            const chatId = await logic.createChat(userId, chatName, eventId)
        })

        it('should succeed on correct data', async () => {
            const chat = await logic.joinChat(chatId, userId)

            expect(chat).toBeDefined()

            expect(chat.chatName).toBe(chatName)
            expect(chat.eventId).toBe(eventId)
        })

        it('should fail on undefined user id', () => {
            const userId = undefined
            const chatId = 'lalalalalala'

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on numeric user id', () => {
            const userId = 123
            const chatId = 'lalalalalala'

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on boolean user id', () => {
            const userId = true
            const chatId = 'lalalalalala'

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on objerct user id', () => {
            const userId = {}
            const chatId = 'lalalalalala'

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on array user id', () => {
            const userId = []
            const chatId = 'lalalalalala'

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on empty user id', () => {
            const userId = ''
            const chatId = 'lalalalalala'

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error('userId is empty'))
        })

        //chatId

        it('should fail on undefined chat id', () => {
            const userId = 'undefined'
            const chatId = undefined

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on numeric chat id', () => {
            const userId = '123'
            const chatId = 123

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on boolean chat id', () => {
            const userId = 'ksamask'
            const chatId = true

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on objerct chat id', () => {
            const userId = '{}'
            const chatId = {}

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on array chat id', () => {
            const userId = '[]'
            const chatId = []

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on empty chat id', () => {
            const userId = 'mmmm'
            const chatId = ''

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error('chatId is empty'))
        })
    })

    // describe('user chats', () => {

    // })

    
})

after(() =>
    Promise.all([
        Events.deleteMany(),
        Users.deleteMany(),
        Chats.deleteMany()
    ])
    .then(() => mongoose.disconnect())
)