'use strict'

const { mongoose, models: { User, Drone, Flight, Program } } = require('flyme-data')
const bcrypt = require('bcrypt')
const { env: { REACT_APP_TEST_DB_URL } } = process
import flymeApi from './index'

describe('flymeApi', () => {
    beforeAll(() => mongoose.connect(REACT_APP_TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            Drone.deleteMany(),
            User.deleteMany(),
            Flight.deleteMany(),
            Program.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const passwordConfirmation = password

        it('should succeed on correct data', () => {
            return flymeApi.registerUser(name, surname, email, password, passwordConfirmation)
                .then(id => {
                    expect(id).toBeDefined()
                })
        })

        it('should fail on duplicate email', () => {
            return flymeApi.registerUser(name, surname, email, password, passwordConfirmation)
                .then(() => flymeApi.registerUser(name, surname, email, password, passwordConfirmation))
                .then(res => expect(res).toBeDefined())
        })

        it('should fail on undefined name', () => {
            const badName = undefined
            expect(() => {
                flymeApi.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badName} is not a string`))
        })

        it('should fail on numeric name', () => {
            const badName = 123
            expect(() => {
                flymeApi.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badName} is not a string`))
        })

        it('should fail on boolean name', () => {
            const badName = true
            expect(() => {
                flymeApi.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badName} is not a string`))
        })

        it('should fail on array name', () => {
            const badName = ['leia']
            expect(() => {
                flymeApi.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badName} is not a string`))
        })

        it('should fail on object name', () => {
            const badName = { name: 'leia' }
            expect(() => {
                flymeApi.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badName} is not a string`))
        })

        it('should fail on empty name', () => {
            const badName = ''
            expect(() => {
                flymeApi.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(Error('name is empty or blank'))
        })

        it('should fail on undefined surname', () => {
            const badSurname = undefined
            expect(() => {
                flymeApi.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badSurname} is not a string`))
        })

        it('should fail on numeric surname', () => {
            const badSurname = 123
            expect(() => {
                flymeApi.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badSurname} is not a string`))
        })

        it('should fail on boolean surname', () => {
            const badSurname = true
            expect(() => {
                flymeApi.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badSurname} is not a string`))
        })

        it('should fail on array surname', () => {
            const badSurname = ['leia']
            expect(() => {
                flymeApi.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badSurname} is not a string`))
        })

        it('should fail on object surname', () => {
            const badSurname = { name: 'leia' }
            expect(() => {
                flymeApi.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badSurname} is not a string`))
        })

        it('should fail on empty surname', () => {
            const badSurname = ''
            expect(() => {
                flymeApi.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(Error('surname is empty or blank'))
        })

        it('should fail on undefined email', () => {
            const badEmail = undefined
            expect(() => {
                flymeApi.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on numeric email', () => {
            const badEmail = 123
            expect(() => {
                flymeApi.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on boolean email', () => {
            const badEmail = true
            expect(() => {
                flymeApi.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on array email', () => {
            const badEmail = ['leia']
            expect(() => {
                flymeApi.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on object email', () => {
            const badEmail = { name: 'leia' }
            expect(() => {
                flymeApi.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on empty email', () => {
            const badEmail = ''
            expect(() => {
                flymeApi.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should fail on undefined password', () => {
            const badPassword = undefined
            expect(() => {
                flymeApi.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on numeric password', () => {
            const badPassword = 123
            expect(() => {
                flymeApi.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on boolean password', () => {
            const badPassword = true
            expect(() => {
                flymeApi.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on array password', () => {
            const badPassword = ['leia']
            expect(() => {
                flymeApi.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on object password', () => {
            const badPassword = { name: 'leia' }
            expect(() => {
                flymeApi.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on empty password', () => {
            const badPassword = ''
            expect(() => {
                flymeApi.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(Error('password is empty or blank'))
        })

        it('should fail on undefined passwordConfirmation', () => {
            const badPasswordConfirmation = undefined
            expect(() => {
                flymeApi.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(TypeError(`${badPasswordConfirmation} is not a string`))
        })

        it('should fail on numeric passwordConfirmation', () => {
            const badPasswordConfirmation = 123
            expect(() => {
                flymeApi.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(TypeError(`${badPasswordConfirmation} is not a string`))
        })

        it('should fail on boolean passwordConfirmation', () => {
            const badPasswordConfirmation = true
            expect(() => {
                flymeApi.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(TypeError(`${badPasswordConfirmation} is not a string`))
        })

        it('should fail on array passwordConfirmation', () => {
            const badPasswordConfirmation = ['leia']
            expect(() => {
                flymeApi.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(TypeError(`${badPasswordConfirmation} is not a string`))
        })

        it('should fail on object passwordConfirmation', () => {
            const badPasswordConfirmation = { name: 'leia' }
            expect(() => {
                flymeApi.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(TypeError(`${badPasswordConfirmation} is not a string`))
        })

        it('should fail on empty passwordConfirmation', () => {
            const badPasswordConfirmation = ''
            expect(() => {
                flymeApi.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(Error('passwordConfirm is empty or blank'))
        })
    })

    describe('authenticate user', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
        )

        it('should succeed on correct data', () =>
            flymeApi.authenticateUser(email, password)
                .then(res => {
                    expect(res).toBeDefined()
                    expect(typeof res).toBe('object')
                })
        )

        it('should fail on not registered email', () => {
            const badEmail = 'notregistered@mail.com'

            flymeApi.authenticateUser(badEmail, password)
                .then(res => expect(res).toBeDefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(`There is no User with this email: ${badEmail}`)
                })
        })

        it('should fail on wrong credentials', () => {
            const badPassword = 'wrongpass'

            flymeApi.authenticateUser(email, badPassword)
                .then(res => expect(res).toBeDefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('wrong credentials')
                })
        })

        it('should fail on undefined email', () => {
            const badEmail = undefined
            expect(() => {
                flymeApi.registerUser(name, surname, badEmail, password)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on numeric email', () => {
            const badEmail = 123
            expect(() => {
                flymeApi.registerUser(name, surname, badEmail, password)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on boolean email', () => {
            const badEmail = true
            expect(() => {
                flymeApi.registerUser(name, surname, badEmail, password)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on array email', () => {
            const badEmail = ['leia']
            expect(() => {
                flymeApi.registerUser(name, surname, badEmail, password)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on object email', () => {
            const badEmail = { name: 'leia' }
            expect(() => {
                flymeApi.registerUser(name, surname, badEmail, password)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on empty email', () => {
            const badEmail = ''
            expect(() => {
                flymeApi.registerUser(name, surname, badEmail, password)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should fail on undefined password', () => {
            const badPassword = undefined
            expect(() => {
                flymeApi.registerUser(name, surname, email, badPassword)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on numeric password', () => {
            const badPassword = 123
            expect(() => {
                flymeApi.registerUser(name, surname, email, badPassword)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on boolean password', () => {
            const badPassword = true
            expect(() => {
                flymeApi.registerUser(name, surname, email, badPassword)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on array password', () => {
            const badPassword = ['leia']
            expect(() => {
                flymeApi.registerUser(name, surname, email, badPassword)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on object password', () => {
            const badPassword = { name: 'leia' }
            expect(() => {
                flymeApi.registerUser(name, surname, email, badPassword)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on empty password', () => {
            const badPassword = ''
            expect(() => {
                flymeApi.registerUser(name, surname, email, badPassword)
            }).toThrow(Error('password is empty or blank'))
        })
    })

    describe('retrieve user', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        let userId, userToken

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => userToken = res.token)
        )


        it('should succeed on correct data', () =>
            flymeApi.retrieveUser(userToken)
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        )

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                flymeApi.retrieveUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                flymeApi.retrieveUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                flymeApi.retrieveUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                flymeApi.retrieveUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                flymeApi.retrieveUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

    })

    describe('update user', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const newName = 'Princess'
        const newSurname = 'Leia'
        let userId, userToken

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => userToken = res.token)
        )

        it('should succeed on correct data', () =>
            flymeApi.updateUser(userToken, { name: newName, surname: newSurname })
                .then(res => {
                    expect(res).toBeDefined()
                    expect(typeof res).toBe('object')
                    expect(res.status).toBe('OK')
                    expect(res.id).toBeDefined()
                    expect(typeof res.id).toBe('string')
                })
        )

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                flymeApi.updateUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                flymeApi.updateUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                flymeApi.updateUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                flymeApi.updateUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                flymeApi.updateUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on undefined object', () => {
            const badObject = undefined
            expect(() => {
                flymeApi.updateUser(userId, badObject)
            }).toThrow(TypeError(`${badObject} is not an Object`))
        })

        it('should fail on numeric Object', () => {
            const badObject = 123
            expect(() => {
                flymeApi.updateUser(userId, badObject)
            }).toThrow(TypeError(`${badObject} is not an Object`))
        })

        it('should fail on boolean Object', () => {
            const badObject = true
            expect(() => {
                flymeApi.updateUser(userId, badObject)
            }).toThrow(TypeError(`${badObject} is not an Object`))
        })

        it('should fail on array userId', () => {
            const badObject = ['leia']
            expect(() => {
                flymeApi.updateUser(userId, badObject)
            }).toThrow(TypeError(`${badObject} is an array`))
        })

        it('should fail on empty data', () => {
            expect(() => {
                flymeApi.updateUser(userId, {})
            }).toThrow(Error('data is empty or blank'))
        })
    })

    describe('start drone', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => {
                    userToken = res.token
                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => droneId = drone._id.toString())
        )

        it('should succed on correct data', () => {
            flymeApi.startDrone(userToken, droneId)
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('stop drone', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => {
                    userToken = res.token
                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => droneId = drone._id.toString())
        )

        it('should succed on correct data', () => {
            flymeApi.stopDrone(userToken, droneId)
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('command drone', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => {
                    userToken = res.token
                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => droneId = drone._id.toString())
        )

        it('should succed on correct data', () => {
            flymeApi.sendCommand(userToken, 'battery?', droneId)
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('add drone', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => {
                    userToken = res.token
                })
        )

        it('should succeed on correct data', () => {
            return flymeApi.addDrone(userToken, { brand, model, host, port })
                .then(id => {
                    expect(id).toBeDefined()
                })
        })

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                flymeApi.addDrone(badUserId, brand, model, host, port)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                flymeApi.addDrone(badUserId, brand, model, host, port)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                flymeApi.addDrone(badUserId, brand, model, host, port)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                flymeApi.addDrone(badUserId, brand, model, host, port)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                flymeApi.addDrone(badUserId, brand, model, host, port)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })
    })

    describe('retrieve drone from Id', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => {
                    userToken = res.token
                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => droneId = drone._id.toString())
        )

        it('should succed on correct data', () =>
            flymeApi.retrieveDrone(userToken, droneId)
                .then(drone => {
                    expect(drone).toBeDefined()
                    expect(drone._id).toBeUndefined()
                    expect(drone.id).toBe(droneId)
                })
        ),

            it('should fail on bad droneId', () => {
                const badDroneId = '5c8e2f5dd91b61ceb347b6c6'
                return flymeApi.retrieveDrone(userId, badDroneId)
                    .then(res => expect(res).toBeUndefined())
                    .catch(err => {
                        expect(err).toBeDefined()
                    })
            })

        it('should fail on bad userId', () => {
            const badUserId = '5c8e2f5dd91b61ceb347b6c6'
            return flymeApi.retrieveDrone(badUserId, droneId)
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                })
        })
    })

    describe('retrieve drones from user', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => {
                    userToken = res.token
                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => droneId = drone._id.toString())
        )


        it('should succed on correct data', () => {
            return flymeApi.retrieveDronesFromUser(userToken, userId)
                .then(drones => {
                    expect(drones).toBeDefined()
                })
        })

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                flymeApi.retrieveDronesFromUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                flymeApi.retrieveDronesFromUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                flymeApi.retrieveDronesFromUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                flymeApi.retrieveDronesFromUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                flymeApi.retrieveDronesFromUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })
    })

    describe('update Drone', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => {
                    userToken = res.token
                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => droneId = drone._id.toString())
        )

        it('should succed on correct data', () => {
            return flymeApi.updateDrone(userToken, { brand: 'Samsung', model: 'Diablo' })
                .then(res => {
                    expect(res).toBeDefined()
                })
        })

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                flymeApi.updateDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                flymeApi.updateDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                flymeApi.updateDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                flymeApi.updateDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                flymeApi.updateDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })
    })

    describe('delete Drone', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => {
                    userToken = res.token
                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => droneId = drone._id.toString())
        )

        it('should succed on correct data', () => {
            return flymeApi.deleteDrone(userToken, droneId)
                .then(res => {
                    expect(res).toBeDefined()
                    expect(res.status).toBeDefined()
                })
        })

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                flymeApi.deleteDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                flymeApi.deleteDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                flymeApi.deleteDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                flymeApi.deleteDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                flymeApi.deleteDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })
    })

    describe('create program', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId
        const orders = [{ command: 'battery?', timeOut: 3000 }]

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => {
                    userToken = res.token
                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => droneId = drone._id.toString())
        )

        it('should succed on correct data', () => {
            return flymeApi.createProgram(userToken, 'TOKEN PROGRAM', orders)
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('retrieve all flights', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId
        const orders = [{ command: 'battery?', timeOut: 3000 }]

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => {
                    userToken = res.token
                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => droneId = drone._id.toString())
        )

        it('should succed on correct data', () => {
            return flymeApi.retrieveAllFlights(userToken)
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('retrieve flights from user', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId, flightId
        const orders = [{ command: 'battery?', timeOut: 3000 }]

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => {
                    userToken = res.token
                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => {
                    droneId = drone._id.toString()
                })
        )

        it('should succed on correct data', () => {
            return flymeApi.retrieveFlightsFromUser(userToken, userId)
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('retrieve flight', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId, flightId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => {
                    userToken = res.token
                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => {
                    droneId = drone._id.toString()
                    return Flight.create({ userId, droneId, start: new Date })
                })
                .then(flight => flightId = flight._id.toString())
        )

        it('should succed on correct data', () => {
            return flymeApi.retrieveFlight(userToken, flightId)
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('retrieve all programs', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        let userId, userToken

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => {
                    userToken = res.token
                })
        )

        it('should succed on correct data', () => {
            return flymeApi.retrieveAllPrograms(userToken)
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('retrieve all programs', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        let userId, userToken

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => {
                    userToken = res.token
                })
        )

        it('should succed on correct data', () => {
            return flymeApi.retrieveAllPrograms(userToken)
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('retrieve program', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        let userId, userToken, programId
        const orders = [{ command: 'command', timeOut: 3000 }]
        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(res => {
                    userToken = res.token

                    return Program.create({ name: 'TEST REACT PROGRAM', orders, seconds: 10, userId })
                })
                .then(program => {
                    programId = program._id
                })

        )

        it('should succed on correct data', () => {
            return flymeApi.retrieveProgram(userToken, programId)
                .then(res => expect(res).toBeDefined())
        })
    })


    afterAll(() => {
        Promise.all([
            Drone.deleteMany(),
            User.deleteMany(),
            Flight.deleteMany(),
            Program.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    })
})