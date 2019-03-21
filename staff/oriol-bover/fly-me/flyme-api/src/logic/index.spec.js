'use stric'

require('dotenv').config()
require('isomorphic-fetch')

const { mongoose, models: { User, Drone, Flight, Program } } = require('flyme-data')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')

const { env: { DB_URL } } = process

describe('logic', () => {
    before(() => mongoose.connect(DB_URL, { useNewUrlParser: true }))

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
            return logic.registerUser(name, surname, email, password, passwordConfirmation)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(typeof id).toBe('string')
                })
        })

        it('should fail on duplicate email', () => {
            return logic.registerUser(name, surname, email, password, passwordConfirmation)
                .then(() => logic.registerUser(name, surname, email, password, passwordConfirmation))
                .then(id => expect(id).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(`This email: ${email} is already used it`)
                })
        })

        it('should fail on undefined name', () => {
            const badName = undefined
            expect(() => {
                logic.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badName} is not a string`))
        })

        it('should fail on numeric name', () => {
            const badName = 123
            expect(() => {
                logic.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badName} is not a string`))
        })

        it('should fail on boolean name', () => {
            const badName = true
            expect(() => {
                logic.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badName} is not a string`))
        })

        it('should fail on array name', () => {
            const badName = ['leia']
            expect(() => {
                logic.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badName} is not a string`))
        })

        it('should fail on object name', () => {
            const badName = { name: 'leia' }
            expect(() => {
                logic.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badName} is not a string`))
        })

        it('should fail on empty name', () => {
            const badName = ''
            expect(() => {
                logic.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(Error('name is empty or blank'))
        })

        it('should fail on undefined surname', () => {
            const badSurname = undefined
            expect(() => {
                logic.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badSurname} is not a string`))
        })

        it('should fail on numeric surname', () => {
            const badSurname = 123
            expect(() => {
                logic.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badSurname} is not a string`))
        })

        it('should fail on boolean surname', () => {
            const badSurname = true
            expect(() => {
                logic.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badSurname} is not a string`))
        })

        it('should fail on array surname', () => {
            const badSurname = ['leia']
            expect(() => {
                logic.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badSurname} is not a string`))
        })

        it('should fail on object surname', () => {
            const badSurname = { name: 'leia' }
            expect(() => {
                logic.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badSurname} is not a string`))
        })

        it('should fail on empty surname', () => {
            const badSurname = ''
            expect(() => {
                logic.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(Error('surname is empty or blank'))
        })

        it('should fail on undefined email', () => {
            const badEmail = undefined
            expect(() => {
                logic.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on numeric email', () => {
            const badEmail = 123
            expect(() => {
                logic.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on boolean email', () => {
            const badEmail = true
            expect(() => {
                logic.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on array email', () => {
            const badEmail = ['leia']
            expect(() => {
                logic.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on object email', () => {
            const badEmail = { name: 'leia' }
            expect(() => {
                logic.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on empty email', () => {
            const badEmail = ''
            expect(() => {
                logic.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should fail on undefined password', () => {
            const badPassword = undefined
            expect(() => {
                logic.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on numeric password', () => {
            const badPassword = 123
            expect(() => {
                logic.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on boolean password', () => {
            const badPassword = true
            expect(() => {
                logic.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on array password', () => {
            const badPassword = ['leia']
            expect(() => {
                logic.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on object password', () => {
            const badPassword = { name: 'leia' }
            expect(() => {
                logic.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on empty password', () => {
            const badPassword = ''
            expect(() => {
                logic.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(Error('password is empty or blank'))
        })

        it('should fail on undefined passwordConfirmation', () => {
            const badPasswordConfirmation = undefined
            expect(() => {
                logic.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(TypeError(`${badPasswordConfirmation} is not a string`))
        })

        it('should fail on numeric passwordConfirmation', () => {
            const badPasswordConfirmation = 123
            expect(() => {
                logic.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(TypeError(`${badPasswordConfirmation} is not a string`))
        })

        it('should fail on boolean passwordConfirmation', () => {
            const badPasswordConfirmation = true
            expect(() => {
                logic.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(TypeError(`${badPasswordConfirmation} is not a string`))
        })

        it('should fail on array passwordConfirmation', () => {
            const badPasswordConfirmation = ['leia']
            expect(() => {
                logic.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(TypeError(`${badPasswordConfirmation} is not a string`))
        })

        it('should fail on object passwordConfirmation', () => {
            const badPasswordConfirmation = { name: 'leia' }
            expect(() => {
                logic.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(TypeError(`${badPasswordConfirmation} is not a string`))
        })

        it('should fail on empty passwordConfirmation', () => {
            const badPasswordConfirmation = ''
            expect(() => {
                logic.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(Error('passwordConfirm is empty or blank'))
        })

        it('should fail on empty passwordConfirmation', () => {
            const badPasswordConfirmation = '123'
            expect(() => {
                logic.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(Error('passwords do not match'))
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
            logic.authenticateUser(email, password)
                .then(res => {
                    expect(res).toBeDefined()
                    expect(typeof res).toBe('object')
                    expect(res.id).toBeDefined()
                })
        )

        it('should fail on not registered email', () => {
            const badEmail = 'notregistered@mail.com'

            logic.authenticateUser(badEmail, password)
                .then(res => expect(res).toBeDefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(`There is no User with this email: ${badEmail}`)
                })
        })

        it('should fail on wrong credentials', () => {
            const badPassword = 'wrongpass'

            logic.authenticateUser(email, badPassword)
                .then(res => expect(res).toBeDefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('wrong credentials')
                })
        })

        it('should fail on undefined email', () => {
            const badEmail = undefined
            expect(() => {
                logic.registerUser(name, surname, badEmail, password)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on numeric email', () => {
            const badEmail = 123
            expect(() => {
                logic.registerUser(name, surname, badEmail, password)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on boolean email', () => {
            const badEmail = true
            expect(() => {
                logic.registerUser(name, surname, badEmail, password)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on array email', () => {
            const badEmail = ['leia']
            expect(() => {
                logic.registerUser(name, surname, badEmail, password)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on object email', () => {
            const badEmail = { name: 'leia' }
            expect(() => {
                logic.registerUser(name, surname, badEmail, password)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on empty email', () => {
            const badEmail = ''
            expect(() => {
                logic.registerUser(name, surname, badEmail, password)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should fail on undefined password', () => {
            const badPassword = undefined
            expect(() => {
                logic.registerUser(name, surname, email, badPassword)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on numeric password', () => {
            const badPassword = 123
            expect(() => {
                logic.registerUser(name, surname, email, badPassword)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on boolean password', () => {
            const badPassword = true
            expect(() => {
                logic.registerUser(name, surname, email, badPassword)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on array password', () => {
            const badPassword = ['leia']
            expect(() => {
                logic.registerUser(name, surname, email, badPassword)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on object password', () => {
            const badPassword = { name: 'leia' }
            expect(() => {
                logic.registerUser(name, surname, email, badPassword)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on empty password', () => {
            const badPassword = ''
            expect(() => {
                logic.registerUser(name, surname, email, badPassword)
            }).toThrow(Error('password is empty or blank'))
        })
    })

    describe('retrieve user', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )


        it('should succeed on correct data', () =>
            logic.retrieveUser(userId)
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        )

        it('should fail on unregistered id', () =>
            logic.retrieveUser('5c864704b8fa957d61a34423')
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(`user with id 5c864704b8fa957d61a34423 does not exist`)
                })
        )

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                logic.retrieveUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                logic.retrieveUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                logic.retrieveUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                logic.retrieveUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                logic.retrieveUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on empty userId', () => {
            const badUserId = ''
            expect(() => {
                logic.retrieveUser(badUserId)
            }).toThrow(Error('userId is empty or blank'))
        })

    })

    describe('update user', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const newName = 'Princess'
        const newSurname = 'Leia'

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on correct data', () =>
            logic.updateUser(userId, { name: newName, surname: newSurname })
                .then(res => {
                    expect(res).toBeDefined()
                    expect(typeof res).toBe('object')
                    expect(res.status).toBe('OK')
                    expect(res.id).toBeDefined()
                    expect(typeof res.id).toBe('string')
                })
        )

        it('should fail on unregistered id', () =>
            logic.updateUser('5c864704b8fa957d61a34423', { name: newName, surname: newSurname })
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('user with id 5c864704b8fa957d61a34423 does not exist')
                })
        )

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                logic.updateUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                logic.updateUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                logic.updateUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                logic.updateUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                logic.updateUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on undefined object', () => {
            const badObject = undefined
            expect(() => {
                logic.updateUser(userId, badObject)
            }).toThrow(TypeError(`${badObject} is not an Object`))
        })

        it('should fail on numeric Object', () => {
            const badObject = 123
            expect(() => {
                logic.updateUser(userId, badObject)
            }).toThrow(TypeError(`${badObject} is not an Object`))
        })

        it('should fail on boolean Object', () => {
            const badObject = true
            expect(() => {
                logic.updateUser(userId, badObject)
            }).toThrow(TypeError(`${badObject} is not an Object`))
        })

        it('should fail on array userId', () => {
            const badObject = ['leia']
            expect(() => {
                logic.updateUser(userId, badObject)
            }).toThrow(TypeError(`${badObject} is an array`))
        })

        it('should fail on empty data', () => {
            expect(() => {
                logic.updateUser(userId, {})
            }).toThrow(Error('data is empty or blank'))
        })


    })

    describe('update photo', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on correct data', () =>
            logic.updateUserPhoto(userId, 'fakeUrlImage')
                .then(res => {
                    expect(res.status).toBe('OK')
                    expect(res.user).toBeDefined()
                    expect(res.user.image).toBeDefined()
                    expect(res.user.image).toBe('fakeUrlImage')
                    expect(res.user.name).toBe(name)
                    expect(res.user.surname).toBe(surname)
                    expect(res.user.email).toBe(email)
                })
        )

        it('should fail on unregistered id', () =>
            logic.updateUserPhoto('5c864704b8fa957d61a34423', 'fakeUrlImage')
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('user with id 5c864704b8fa957d61a34423 not found')
                })
        )
    })

    describe('delete user', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should succed on correct data', () =>
            logic.deleteUser(userId)
                .then(res => {
                    expect(res).toBeDefined()
                    expect(res.status).toBe('OK')

                    return User.findOne({ email })
                })
                .then(res => expect(res).toBeNull())
                .catch(err => {
                    expect(err).toBeDefined()
                })
        )

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                logic.deleteUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                logic.deleteUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                logic.deleteUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                logic.deleteUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                logic.deleteUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })
    })

    describe('add drone', () => {
        const userId = '5c7e9271c926d43423d72b28'
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889

        it('should succeed on correct data', () => {
            return logic.addDrone(userId, brand, model, host, port)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(typeof id).toBe('string')
                })
        })

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                logic.addDrone(badUserId, brand, model, host, port)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                logic.addDrone(badUserId, brand, model, host, port)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                logic.addDrone(badUserId, brand, model, host, port)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                logic.addDrone(badUserId, brand, model, host, port)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                logic.addDrone(badUserId, brand, model, host, port)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on empty userId', () => {
            const badUserId = ''
            expect(() => {
                logic.addDrone(badUserId, brand, model, host, port)
            }).toThrow(Error('userId is empty or blank'))
        })
    })

    describe('retrieve drones', () => {
        it('should return an array on correct functionlaity', () => {
            return logic.retrieveDrones()
                .then(res => {
                    expect(res).toBeDefined()
                    expect(Array.isArray(res)).toBeTruthy()
                })
        })
    })

    describe('retrieve drones from Id', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => {
                    droneId = drone._id.toString()
                })
        )

        it('should succed on correct data', () =>
            logic.retrieveDroneFromId(userId, droneId)
                .then(drone => {
                    expect(drone).toBeDefined()
                    expect(drone._id).toBeUndefined()
                    expect(drone.id).toBe(droneId)
                })
        ),

            it('should fail on bad droneId', () => {
                const badDroneId = '5c8e2f5dd91b61ceb347b6c6'
                return logic.retrieveDroneFromId(userId, badDroneId)
                    .then(res => expect(res).toBeUndefined())
                    .catch(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe('not drone found')
                    })
            })

        it('should fail on bad userId', () => {
            const badUserId = '5c8e2f5dd91b61ceb347b6c6'
            return logic.retrieveDroneFromId(badUserId, droneId)
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('user not found')
                })
        })
    })

    describe('retrieve drones from user', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Drone.create({ owner: userId, brand, model, host, port })
                })
        )

        it('should succed on correct data', () => {
            return logic.retrieveDronesFromUser(userId)
                .then(drones => {

                    expect(drones).toBeDefined()
                    expect(Array.isArray(drones)).toBeTruthy()
                    expect(drones.length).toBe(1)
                    expect(drones[0].owner.toString()).toBe(userId)
                    expect(drones[0].brand).toBe(brand)
                    expect(drones[0].model).toBe(model)
                    expect(drones[0].host).toBe(host)
                    expect(drones[0].port).toBe(port)
                })
        })

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                logic.retrieveDronesFromUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                logic.retrieveDronesFromUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                logic.retrieveDronesFromUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                logic.retrieveDronesFromUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                logic.retrieveDronesFromUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on empty userId', () => {
            const badUserId = ''
            expect(() => {
                logic.retrieveDronesFromUser(badUserId)
            }).toThrow(Error('userId is empty or blank'))
        })
    })

    describe('update Drone', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => {
                    droneId = drone.id
                })
        )

        it('should succed on correct data', () => {
            return logic.updateDrone(userId, droneId, { brand: 'Samsung', model: 'Diablo' })
                .then(res => {
                    expect(res.droneId).toBe(droneId)
                    expect(res.status).toBe('OK')

                    return Drone.findById(droneId)
                })
                .then(drone => {
                    expect(drone.brand).toBe('Samsung')
                    expect(drone.model).toBe('Diablo')
                })
        })

        it('should fail on badUserId', () => {
            const badUserId = '5c864704b8fa957d61a34423'

            return logic.updateDrone(badUserId, droneId, { brand: 'Samsung', model: 'Diablo' })
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('You dont have permissions to update this drone')
                })
        })

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                logic.updateDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                logic.updateDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                logic.updateDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                logic.updateDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                logic.updateDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on empty userId', () => {
            const badUserId = ''
            expect(() => {
                logic.updateDrone(badUserId)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should fail on undefined droneId', () => {
            const badDroneId = undefined
            expect(() => {
                logic.updateDrone(userId, badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on numeric droneId', () => {
            const badDroneId = 123
            expect(() => {
                logic.updateDrone(userId, badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on boolean droneId', () => {
            const badDroneId = true
            expect(() => {
                logic.updateDrone(userId, badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on array droneId', () => {
            const badDroneId = ['leia']
            expect(() => {
                logic.updateDrone(userId, badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on object droneId', () => {
            const badDroneId = { name: 'leia' }
            expect(() => {
                logic.updateDrone(userId, badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on empty droneId', () => {
            const badDroneId = ''
            expect(() => {
                logic.updateDrone(userId, badDroneId)
            }).toThrow(Error('droneId is empty or blank'))
        })


        it('should fail on empty object', () => {
            expect(() => {
                logic.updateDrone(userId, droneId, {})
            }).toThrow(Error('data is empty or blank'))
        })

    })

    describe('delete Drone', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => {
                    droneId = drone.id
                })
        )

        it('should succed on correct data', () => {
            return logic.deleteDrone(userId, droneId)
                .then(res => {
                    expect(res.status).toBe('OK')

                    return Drone.findById(droneId)
                })
                .then(drone => {
                    expect(drone).toBeNull()
                })
        })

        it('should fail on unregistered user Id', () => {
            const badUserId = '5c864704b8fa957d61a34423'

            return logic.deleteDrone(badUserId, droneId)
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('You dont have permissions to delete this drone')
                })
        })

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                logic.deleteDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                logic.deleteDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                logic.deleteDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                logic.deleteDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                logic.deleteDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on empty userId', () => {
            const badUserId = ''
            expect(() => {
                logic.deleteDrone(badUserId)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should fail on undefined droneId', () => {
            const badDroneId = undefined
            expect(() => {
                logic.deleteDrone(userId, badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on numeric droneId', () => {
            const badDroneId = 123
            expect(() => {
                logic.deleteDrone(userId, badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on boolean droneId', () => {
            const badDroneId = true
            expect(() => {
                logic.deleteDrone(userId, badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on array droneId', () => {
            const badDroneId = ['leia']
            expect(() => {
                logic.deleteDrone(userId, badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on object droneId', () => {
            const badDroneId = { name: 'leia' }
            expect(() => {
                logic.deleteDrone(userId, badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on empty droneId', () => {
            const badDroneId = ''
            expect(() => {
                logic.deleteDrone(userId, badDroneId)
            }).toThrow(Error('droneId is empty or blank'))
        })
    })

    describe('start Drone', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => {
                    droneId = drone.id
                })
        )

        it('should succeed on correct data', () =>
            logic.startDrone(userId, droneId)
                .then(res => {
                    expect(res).toBeDefined()
                    expect(res.start).toBe('OK')
                    expect(res.history).toBeDefined()

                    return logic.stopDrone(userId, droneId)
                })
        )

        it('should fail on trying start an started drone', () => {
            return logic.startDrone(userId, droneId)
                .then(res => {
                    expect(res).toBeDefined()

                    return logic.startDrone(userId, droneId)
                })
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(`drone ${droneId} already started`)

                    return logic.stopDrone(userId, droneId)
                })
        })

        it('should fail on bad drone Id', () => {
            const badDroneId = '5c80f001cdda345041068f1c'

            return logic.startDrone(userId, badDroneId)
                .then(res => expect(res).toBeUndefined)
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('Cannot destructure property `host` of \'undefined\' or \'null\'.')
                })
        })
    })

    describe('stop drone', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => {
                    droneId = drone.id
                })
        )

        it('should succed on correct data', () => {
            logic.startDrone(userId, droneId)
                .then(res => {
                    expect(res).toBeDefined()
                    expect(res.start).toBe('OK')
                    expect(res.history).toBeDefined()

                    return logic.stopDrone(userId, droneId)
                })
                .then(res => {
                    expect(res).toBeDefined()
                    expect(res.stop).toBe('OK')
                    expect(res.history).toBeDefined()
                })
        })

        // it('should fail on bad droneId', () => {
        //     const badDroneId = '5c80f001cdda345041068f1c'

        //     logic.startDrone(userId, droneId)
        //         .then(res => {
        //             expect(res).toBeDefined()
        //             expect(res.start).toBe('OK')
        //             expect(res.history).toBeDefined()

        //             return logic.stopDrone(userId, badDroneId)
        //         })
        //         .then(res => expect(res).toBeUndefined())
        //         .catch(err => {
        //             expect(err).toBeDefined()
        //             expect(err.message).toBe('drone not found it')
        //         })
        // })

        // it('should fail on already stopped drone', () => {
        //     logic.startDrone(userId, droneId)
        //         .then(res => {
        //             expect(res).toBeDefined()
        //             expect(res.start).toBe('OK')
        //             expect(res.history).toBeDefined()

        //             return logic.stopDrone(userId, droneId)
        //         })
        //         .then(res => {
        //             expect(res).toBeDefined()
        //             expect(res.stop).toBe('OK')
        //             expect(res.history).toBeDefined()

        //             return logic.stopDrone(userId, droneId)
        //         })
        //         .then(res => expect(res).toBeUndefined())
        //         .catch(err => {
        //             expect(err).toBeDefined()
        //             expect(err.message).toBe(`drone ${droneId} already stopped`)
        //         })
        // })
    })

    //TODO SEND COMMAND

    describe('add flight', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => {
                    droneId = drone.id
                })
        )

        it('should succeed on correct data', () => {
            return logic.addFlight(userId, droneId)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(typeof id).toBe('string')
                })
        })

        it('should fail on bad drone Id', () => {
            const badDroneId = '5c80f001cdda345041068f1c'

            return logic.addFlight(userId, badDroneId)
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(`No drone with id ${badDroneId}`)
                })
        })

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                logic.addFlight(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                logic.addFlight(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                logic.addFlight(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                logic.addFlight(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                logic.addFlight(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on empty userId', () => {
            const badUserId = ''
            expect(() => {
                logic.addFlight(badUserId)
            }).toThrow(Error('userId is empty or blank'))
        })
    })

    describe('retrieve flights', () => {
        it('should return an array on correct functionlaity', () => {
            return logic.retrieveFlights()
                .then(res => {
                    expect(res).toBeDefined()
                    expect(Array.isArray(res)).toBeTruthy()
                })
        })
    })

    describe('retrieve flights from user', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => {
                    droneId = drone.id
                })
                .then(() => {
                    return Flight.create({ userId, droneId })
                })
        )


        it('should succed on correct data', () => {
            return logic.retrieveFlightsFromUser(userId)
                .then(flights => {
                    expect(flights).toBeDefined()
                    expect(flights.length).toBe(1)
                    expect(flights[0].userId.toString()).toBe(userId)
                    expect(flights[0].droneId.toString()).toBe(droneId)
                })
        })

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                logic.retrieveFlightsFromUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                logic.retrieveFlightsFromUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                logic.retrieveFlightsFromUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                logic.retrieveFlightsFromUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                logic.retrieveFlightsFromUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on empty userId', () => {
            const badUserId = ''
            expect(() => {
                logic.retrieveFlightsFromUser(badUserId)
            }).toThrow(Error('userId is empty or blank'))
        })
    })

    describe('retrieve flights from drone', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => {
                    droneId = drone.id
                })
                .then(() => {
                    return Flight.create({ userId, droneId })
                })
        )

        it('should succed on correct data', () => {
            return logic.retrieveFlightsFromDrone(droneId)
                .then(flights => {
                    expect(flights).toBeDefined()
                    expect(flights.length).toBe(1)
                    expect(flights[0].userId.toString()).toBe(userId)
                    expect(flights[0].droneId.toString()).toBe(droneId)
                })
        })

        it('should fail on undefined droneId', () => {
            const badDroneId = undefined
            expect(() => {
                logic.retrieveFlightsFromDrone(badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on numeric droneId', () => {
            const badDroneId = 123
            expect(() => {
                logic.retrieveFlightsFromDrone(badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on boolean droneId', () => {
            const badDroneId = true
            expect(() => {
                logic.retrieveFlightsFromDrone(badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on array droneId', () => {
            const badDroneId = ['leia']
            expect(() => {
                logic.retrieveFlightsFromDrone(badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on object droneId', () => {
            const badDroneId = { name: 'leia' }
            expect(() => {
                logic.retrieveFlightsFromDrone(badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on empty droneId', () => {
            const badDroneId = ''
            expect(() => {
                logic.retrieveFlightsFromDrone(badDroneId)
            }).toThrow(Error('droneId is empty or blank'))
        })
    })

    describe('retrieve flights from user and drone', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => {
                    droneId = drone.id
                })
                .then(() => {
                    return Flight.create({ userId, droneId })
                })
        )

        it('should succed on correct data', () => {
            return logic.retrieveFlightsFromUserDrone(userId, droneId)
                .then(flights => {
                    expect(flights).toBeDefined()
                    expect(flights.length).toBe(1)
                    expect(flights[0].userId.toString()).toBe(userId)
                    expect(flights[0].droneId.toString()).toBe(droneId)
                })
        })

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                logic.retrieveFlightsFromUserDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                logic.retrieveFlightsFromUserDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                logic.retrieveFlightsFromUserDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                logic.retrieveFlightsFromUserDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                logic.retrieveFlightsFromUserDrone(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on empty userId', () => {
            const badUserId = ''
            expect(() => {
                logic.retrieveFlightsFromUserDrone(badUserId)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should fail on undefined droneId', () => {
            const badDroneId = undefined
            expect(() => {
                logic.retrieveFlightsFromUserDrone(userId, badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on numeric droneId', () => {
            const badDroneId = 123
            expect(() => {
                logic.retrieveFlightsFromUserDrone(userId, badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on boolean droneId', () => {
            const badDroneId = true
            expect(() => {
                logic.retrieveFlightsFromUserDrone(userId, badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on array droneId', () => {
            const badDroneId = ['leia']
            expect(() => {
                logic.retrieveFlightsFromUserDrone(userId, badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on object droneId', () => {
            const badDroneId = { name: 'leia' }
            expect(() => {
                logic.retrieveFlightsFromUserDrone(userId, badDroneId)
            }).toThrow(TypeError(`${badDroneId} is not a string`))
        })

        it('should fail on empty droneId', () => {
            const badDroneId = ''
            expect(() => {
                logic.retrieveFlightsFromUserDrone(userId, badDroneId)
            }).toThrow(Error('droneId is empty or blank'))
        })
    })

    describe('retrieve flight', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, droneId, flightId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => {
                    droneId = drone.id
                })
                .then(() => {
                    return Flight.create({ userId, droneId })
                })
                .then(flight => {
                    flightId = flight.id
                })
        )

        it('should succed on correct data', () => {
            logic.retrieveFlight(userId, flightId)
                .then(flight => {
                    expect(flight).toBeDefined()
                    expect(flight._id).toBe(flightId)
                })
        })

        it('should fail on unregistered user', () => {
            const badUserId = '5c864704b8fa957d61a34423'

            return logic.retrieveFlight(badUserId, flightId)
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('no authentication user')
                })
        })
    })

    describe('update flight', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        const end = new Date
        let userId, droneId, flightId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => {
                    droneId = drone.id
                })
                .then(() => {
                    return Flight.create({ userId, droneId })
                })
                .then(flight => {
                    flightId = flight.id
                })
        )

        it('should succeed on correct data', () => {
            return logic.updateFlight(userId, flightId, { end })
                .then(res => {
                    debugger
                    expect(res.flightId).toBe(flightId)
                    expect(res.status).toBe('OK')

                    return Flight.findById(flightId)
                })
                .then(flight => {
                    expect(flight).toBeDefined()
                    expect(flight.end).toBeDefined()
                    expect(flight.end.toString()).toBe(end.toString())
                })
        })

        it('should fail on badUserId', () => {
            const badUserId = '5c7e9271c926d43423d72b28'

            return logic.updateFlight(badUserId, flightId, { end })
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('You dont have permissions to update this flight')
                })
        })

        it('should fail on badFlightId', () => {
            const badFlightId = '5c7e9271c926d43423d72b28'

            return logic.updateFlight(userId, badFlightId, { end })
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('You dont have permissions to update this flight')
                })
        })

        it('should fail on badUserId and badFlightId', () => {
            const badUserId = '5c7e9271c926d43423d72b28'
            const badFlightId = '5c7e9271c926d43423d72b28'

            return logic.updateFlight(badUserId, badFlightId, { end })
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('You dont have permissions to update this flight')
                })
        })

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                logic.updateFlight(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                logic.updateFlight(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                logic.updateFlight(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                logic.updateFlight(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                logic.updateFlight(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on empty userId', () => {
            const badUserId = ''
            expect(() => {
                logic.updateFlight(badUserId)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should fail on undefined flightId', () => {
            const badFlightId = undefined
            expect(() => {
                logic.updateFlight(userId, badFlightId)
            }).toThrow(TypeError(`${badFlightId} is not a string`))
        })

        it('should fail on numeric flightId', () => {
            const badFlightId = 123
            expect(() => {
                logic.updateFlight(userId, badFlightId)
            }).toThrow(TypeError(`${badFlightId} is not a string`))
        })

        it('should fail on boolean flightId', () => {
            const badFlightId = true
            expect(() => {
                logic.updateFlight(userId, badFlightId)
            }).toThrow(TypeError(`${badFlightId} is not a string`))
        })

        it('should fail on array flightId', () => {
            const badFlightId = ['leia']
            expect(() => {
                logic.updateFlight(userId, badFlightId)
            }).toThrow(TypeError(`${badFlightId} is not a string`))
        })

        it('should fail on object flightId', () => {
            const badFlightId = { name: 'leia' }
            expect(() => {
                logic.updateFlight(userId, badFlightId)
            }).toThrow(TypeError(`${badFlightId} is not a string`))
        })

        it('should fail on empty flightId', () => {
            const badFlightId = ''
            expect(() => {
                logic.updateFlight(userId, badFlightId)
            }).toThrow(Error('flightId is empty or blank'))
        })

        it('should fail on empty data', () => {
            expect(() => {
                logic.updateFlight(userId, flightId, {})
            }).toThrow(Error('data is empty or blank'))
        })
    })

    describe('delete flight', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, droneId, flightId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => {
                    droneId = drone.id
                })
                .then(() => {
                    return Flight.create({ userId, droneId })
                })
                .then(flight => {
                    flightId = flight.id
                })
        )

        it('should delete on correct data', () => {
            return logic.deleteFlight(userId, flightId)
                .then(res => {
                    expect(res.status).toBe('OK')

                    return Flight.findById(flightId)
                })
                .then(flight => {
                    expect(flight).toBeNull()
                })
        })

        it('should fail on badUserId', () => {
            const badUserId = '5c7e9271c926d43423d72b28'

            return logic.deleteFlight(badUserId, flightId)
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('You dont have permissions to delete this flight')
                })
        })

        it('should fail on badFlightId', () => {
            const badFlightId = '5c7e9271c926d43423d72b28'

            return logic.deleteFlight(userId, badFlightId)
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('You dont have permissions to delete this flight')
                })
        })

        it('should fail on badUserId and badFlightId', () => {
            const badUserId = '5c7e9271c926d43423d72b28'
            const badFlightId = '5c7e9271c926d43423d72b28'

            return logic.deleteFlight(badUserId, badFlightId)
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('You dont have permissions to delete this flight')
                })
        })

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                logic.deleteFlight(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                logic.deleteFlight(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                logic.deleteFlight(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                logic.deleteFlight(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                logic.deleteFlight(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on empty userId', () => {
            const badUserId = ''
            expect(() => {
                logic.deleteFlight(badUserId)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should fail on undefined flightId', () => {
            const badFlightId = undefined
            expect(() => {
                logic.deleteFlight(userId, badFlightId)
            }).toThrow(TypeError(`${badFlightId} is not a string`))
        })

        it('should fail on numeric flightId', () => {
            const badFlightId = 123
            expect(() => {
                logic.deleteFlight(userId, badFlightId)
            }).toThrow(TypeError(`${badFlightId} is not a string`))
        })

        it('should fail on boolean flightId', () => {
            const badFlightId = true
            expect(() => {
                logic.deleteFlight(userId, badFlightId)
            }).toThrow(TypeError(`${badFlightId} is not a string`))
        })

        it('should fail on array flightId', () => {
            const badFlightId = ['leia']
            expect(() => {
                logic.deleteFlight(userId, badFlightId)
            }).toThrow(TypeError(`${badFlightId} is not a string`))
        })

        it('should fail on object flightId', () => {
            const badFlightId = { name: 'leia' }
            expect(() => {
                logic.deleteFlight(userId, badFlightId)
            }).toThrow(TypeError(`${badFlightId} is not a string`))
        })

        it('should fail on empty flightId', () => {
            const badFlightId = ''
            expect(() => {
                logic.deleteFlight(userId, badFlightId)
            }).toThrow(Error('flightId is empty or blank'))
        })
    })


    describe('send mail', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on correct data', () =>
            logic.sendMail(userId, { subject: "bug drone", message: "The drone is bugged and i cant take off, SOS!!" })
                .then(res => {
                    expect(res).toBeDefined()
                    expect(res.status).toBe('OK')
                })
        )

        it('should fail on unregistered user id', () =>
            logic.sendMail('5c7e9271c926d43423d72b28', { subject: "bug drone", message: "The drone is bugged and i cant take off, SOS!!" })
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('Bad user authentication')
                })
        )

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                logic.sendMail(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                logic.sendMail(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                logic.sendMail(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                logic.sendMail(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                logic.sendMail(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on empty userId', () => {
            const badUserId = ''
            expect(() => {
                logic.sendMail(badUserId)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should fail on undefined object', () => {
            const badObject = undefined
            expect(() => {
                logic.sendMail(userId, badObject)
            }).toThrow(TypeError(`${badObject} is not an Object`))
        })

        it('should fail on numeric Object', () => {
            const badObject = 123
            expect(() => {
                logic.sendMail(userId, badObject)
            }).toThrow(TypeError(`${badObject} is not an Object`))
        })

        it('should fail on boolean Object', () => {
            const badObject = true
            expect(() => {
                logic.sendMail(userId, badObject)
            }).toThrow(TypeError(`${badObject} is not an Object`))
        })

        it('should fail on array userId', () => {
            const badObject = ['leia']
            expect(() => {
                logic.sendMail(userId, badObject)
            }).toThrow(TypeError(`${badObject} is an array`))
        })

        it('should fail on empty data', () => {
            expect(() => {
                logic.sendMail(userId, {})
            }).toThrow(Error('data is empty or blank'))
        })
    })

    describe('Add program', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const Pname = 'TEST PROGRAM'
        const orders = [
            {
                "command": "battery?",
                "timeOut": 3000

            },
            {
                "command": "battery?",
                "timeOut": 3000

            }
        ]
        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id
                })
        )

        it('should succed on correct data', () =>
            logic.addProgram(userId, Pname, orders)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(typeof id).toBe('string')

                    return Program.findById(id)
                })
                .then(program => {
                    expect(program.name).toBe(Pname)
                    expect(program.seconds).toBeDefined()
                    expect(program.orders.length).toBe(2)
                })
        )

        it('should fail on bad userId', () => {
            const badUserId = '5c864704b8fa957d61a34423'

            return logic.addProgram(badUserId, Pname, orders)
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(`user with id ${badUserId} is not defined`)
                })
        })
    })

    describe('retrieve program', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const Pname = 'TEST PROGRAM'
        const seconds = 10
        const orders = [
            {
                "command": "battery?",
                "timeOut": 3000

            },
            {
                "command": "battery?",
                "timeOut": 3000

            }
        ]
        let userId, programId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Program.create({ name: Pname, userId, orders, seconds })
                })
                .then(program => {
                    programId = program._id.toString()
                })
        )

        it('should succed on correct data', () =>
            logic.retrieveProgram(userId, programId)
                .then(program => {
                    expect(program).toBeDefined()
                    expect(program.name).toBe(Pname)
                    expect(seconds).toBe(10)
                })
        )

        it('should fail on unregistered userId', () => {
            const badUserId = '5c864704b8fa957d61a34423'

            return logic.retrieveProgram(badUserId, programId)
                .then(program => expect(program).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('no authentication user')
                })
        })
    })

    describe('retrive user programs', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const Pname = 'TEST PROGRAM'
        const seconds = 10
        const orders = [
            {
                "command": "battery?",
                "timeOut": 3000

            },
            {
                "command": "battery?",
                "timeOut": 3000

            }
        ]
        let userId, programId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Program.create({ name: Pname, userId, orders, seconds })
                })
                .then(program => {
                    programId = program._id.toString()
                })
        )

        it('should succed on correct data', () =>
            logic.retrieveProgramsByUser(userId)
                .then(programs => {
                    expect(programs).toBeDefined()
                    expect(programs.length).toBe(1)
                })
        )
    })

    describe('retrieve programs', () => {
        it('should succed on correct data', () =>
            logic.retrievePrograms()
                .then(programs => {
                    expect(programs).toBeDefined()
                })
        )
    })

    describe('update program', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const Pname = 'TEST PROGRAM'
        const seconds = 10
        const orders = [
            {
                "command": "battery?",
                "timeOut": 3000

            },
            {
                "command": "battery?",
                "timeOut": 3000

            }
        ]
        const newOrders = [{ "command": "battery?" }, { "command": "battery?" }, { "command": "battery?" }]
        const newName = 'UPDATED PROGRAM'
        let userId, programId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Program.create({ name: Pname, userId, orders, seconds })
                })
                .then(program => {
                    programId = program._id.toString()
                })
        )

        it('should succed on correct data', () => {
            return logic.updateProgram(userId, programId, newName, newOrders)
                .then(res => {
                    expect(res).toBeDefined()
                    expect(res.status).toBe('OK')
                    expect(res.programId).toBe(programId)
                })
        })

        it('should fail on unregistered userId', () => {
            const badUserId = '5c864704b8fa957d61a34423'

            return logic.updateProgram(badUserId, programId, newName, newOrders)
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('auth permissions denied')
                })
        })

        it('should fail on unregistered programId', () => {
            const badProgramId = '5c864704b8fa957d61a34423'

            return logic.updateProgram(userId, badProgramId, newName, newOrders)
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('update error')
                })
        })
    })

    describe('delete program', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const Pname = 'TEST PROGRAM'
        const seconds = 10
        const orders = [
            {
                "command": "battery?",
                "timeOut": 3000

            },
            {
                "command": "battery?",
                "timeOut": 3000

            }
        ]
        let userId, programId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Program.create({ name: Pname, userId, orders, seconds })
                })
                .then(program => {
                    programId = program._id.toString()
                })
        )

        it('should succed on correct data', () =>
            logic.deleteProgram(userId, programId)
                .then(res => {
                    expect(res).toBeDefined()
                    expect(res.status).toBe('OK')
                })
        )

        it('should fail on unregistered userId', () => {
            const badUserId = '5c864704b8fa957d61a34423'

            return logic.deleteProgram(badUserId, programId)
                .then(res => expect(res).toBeUndefined())
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('auth permissions denied')
                })
        })
    })

    describe('playProgram', () => {
        const name = 'luke'
        const surname = 'skywalker'
        const email = `luke${Math.random()}@mail.com`
        const password = '123'
        const brand = 'Tello'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, droneId
        const orders = [
            { id: "task-1", content: "BATTERY", command: "battery?", timeOut: 5000 },
            { id: "task-2", content: "BATTERY", command: "battery?", timeOut: 5000 }
        ]

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => {
                    userId = user.id

                    return Drone.create({ owner: userId, brand, model, host, port })
                })
                .then(drone => {
                    droneId = drone.id
                })
        )

        it('should succed on correct data', () =>
            logic.playProgram(userId, droneId, orders)
                .then(res => {
                    expect(res).toBeDefined()
                    expect(res.status).toBe('OK')
                })
        )

    })

    after(() => {
        Promise.all([
            Drone.deleteMany(),
            User.deleteMany(),
            Flight.deleteMany(),
            Program.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    })
})