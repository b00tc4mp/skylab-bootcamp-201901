'use strict'

const { mongoose, models: { User, Drone, Flight, Program } } = require('flyme-data')
const bcrypt = require('bcrypt')
const { env: { REACT_APP_TEST_DB_URL } } = process
import logic from './index'
import flymeApi from '../flyme-api';

describe('logic', () => {
    beforeAll(() => mongoose.connect(REACT_APP_TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            Drone.deleteMany(),
            User.deleteMany(),
            Flight.deleteMany(),
            Program.deleteMany()
        ])
    )

    describe('register user ', () => {
        const name = 'Oriol'
        const surname = 'Bover'
        const email = 'oriol@flyme.com'
        const password = '123'
        const passwordConfirm = '123'

        it('should succeed on correct data', () =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(res => expect(res).toBeDefined())
        )

        it('should fail on bad passwordConfirm', () => {
            expect(() =>
                logic.registerUser(name, surname, email, password, '1234')
            ).toThrowError()
        })
    })

    describe('log in user', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
        )

        it('should succeed on correct data', () =>
            logic.logInUser(email, password)
                .then(res => expect(res).toBeUndefined())
        )
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
                .then(({ token }) => logic.__userApiToken__ = token)
        )

        it('should succed on correct data', () => {
            return logic.retrieveUser()
                .then(res => {
                    expect(res).toBeDefined()
                })
        })
    })

    describe('update user', () => {
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
                .then(({ token }) => logic.__userApiToken__ = token)
        )

        it('should succed on correct data', () => {
            return logic.updateUser({ name: 'Luke' })
                .then(res => {
                    expect(res).toBeDefined()
                })
        })
    })

    describe('start drone', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'TELLO'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(({ token }) => logic.__userApiToken__ = token)
                .then(() => Drone.create({ owner: userId, brand, model, host, port }))
                .then(drone => droneId = drone._id)
        )

        it('should succed on correct data', () => {
            return logic.startDrone('5c9270135341282b0a0baf00')
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('stop drone', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'TELLO'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(({ token }) => logic.__userApiToken__ = token)
                .then(() => Drone.create({ owner: userId, brand, model, host, port }))
                .then(drone => droneId = drone._id)
        )

        it('should succed on correct data', () => {
            return logic.stopDrone('5c9270135341282b0a0baf00')
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('send drone command', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'TELLO'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(({ token }) => logic.__userApiToken__ = token)
                .then(() => Drone.create({ owner: userId, brand, model, host, port }))
                .then(drone => droneId = drone._id)
        )

        it('should succed on correct data', () => {
            return logic.sendDroneCommand('command', '5c9270135341282b0a0baf00')
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('add drone', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'TELLO'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(({ token }) => logic.__userApiToken__ = token)
        )

        it('should succed on correct data', () => {
            return logic.addDrone(brand, model, host, port)
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('update drone', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'TELLO'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(({ token }) => logic.__userApiToken__ = token)
                .then(() => Drone.create({ owner: userId, brand, model, host, port }))
                .then(drone => droneId = drone._id)
        )

        it('should succed on correct data', () => {
            return logic.updateDrone('5c9270135341282b0a0baf00', brand, model, host, port)
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('delete drone', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'TELLO'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(({ token }) => logic.__userApiToken__ = token)
                .then(() => Drone.create({ owner: userId, brand, model, host, port }))
                .then(drone => droneId = drone._id)
        )

        it('should succed on correct data', () => {
            return logic.deleteDrone('5c9270135341282b0a0baf00')
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('retrieve drone', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'TELLO'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(({ token }) => logic.__userApiToken__ = token)
                .then(() => Drone.create({ owner: userId, brand, model, host, port }))
                .then(drone => droneId = drone._id)
        )

        it('should succed on correct data', () => {
            return logic.retrieveDrone('5c9270135341282b0a0baf00')
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('retrieve user drones', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'TELLO'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(({ token }) => logic.__userApiToken__ = token)
                .then(() => Drone.create({ owner: userId, brand, model, host, port }))
                .then(drone => droneId = drone._id)
        )

        it('should succed on correct data', () => {
            return logic.retrieveDrones(userId)
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('create program', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'TELLO'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(({ token }) => logic.__userApiToken__ = token)
                .then(() => Drone.create({ owner: userId, brand, model, host, port }))
                .then(drone => droneId = drone._id)
        )

        it('should succed on correct data', () => {
            return logic.createProgram(name, [{ command: 'command', timeOut: 3000 }])
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('retrieve Flgihts', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'TELLO'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId, flightId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(({ token }) => logic.__userApiToken__ = token)
                .then(() => Drone.create({ owner: userId, brand, model, host, port }))
                .then(drone => droneId = drone._id)
                .then(() => Flight.create({ userId, droneId, start: new Date }))
                .then(flight => flightId = flight._id)
        )

        it('should succed on empty userId', () => {
            return logic.retrieveFlights()
                .then(res => expect(res).toBeDefined())
        })

        it('should succed on userId', () => {
            return logic.retrieveFlights(userId)
                .then(res => expect(res).toBeDefined())
        })
    })


    describe('retrieve Flgiht', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'TELLO'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId, flightId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(({ token }) => logic.__userApiToken__ = token)
                .then(() => Drone.create({ owner: userId, brand, model, host, port }))
                .then(drone => droneId = drone._id)
                .then(() => Flight.create({ userId, droneId, start: new Date }))
                .then(flight => flightId = flight._id.toString())
        )

        it('should succed on empty userId', () => {
            return logic.retrieveFlight(flightId)
                .then(res => expect(res).toBeDefined())
        })

    })


    describe('delete Flgiht', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'TELLO'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId, flightId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(({ token }) => logic.__userApiToken__ = token)
                .then(() => Drone.create({ owner: userId, brand, model, host, port }))
                .then(drone => droneId = drone._id)
                .then(() => Flight.create({ userId, droneId, start: new Date }))
                .then(flight => flightId = flight._id.toString())
        )

        it('should succed on empty userId', () => {
            return logic.deleteFlight(flightId)
                .then(res => expect(res).toBeDefined())
        })

    })

    describe('retrieve Flgihts', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'TELLO'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, droneId, flightId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(({ token }) => logic.__userApiToken__ = token)
                .then(() => Drone.create({ owner: userId, brand, model, host, port }))
                .then(drone => droneId = drone._id)
                .then(flight => flightId = flight._id)
        )

        it('should succed on empty userId', () => {
            return logic.retrieveFlights()
                .then(res => expect(res).toBeDefined())
        })

        it('should succed on userId', () => {
            return logic.retrieveFlights(userId)
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('retrieve program', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'TELLO'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, programId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(({ token }) => logic.__userApiToken__ = token)
                .then(() => Program.create({ userId, name: 'PROGRAM', orders: [{ command: 'command', timeOut: 3000 }], seconds: 10 }))
                .then(program => programId = program._id.toString())
        )

        it('should succed on empty userId', () => {
            return logic.retrieveProgram(programId)
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('play program', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'TELLO'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, programId, droneId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(({ token }) => logic.__userApiToken__ = token)
                .then(() => Drone.create({ owner: userId, brand, model, host, port }))
                .then(drone => droneId = drone._id.toString())
        )

        it('should succed on empty userId', () => {
            return logic.playProgram(droneId, [{ command: 'command', timeOut: 3000 }])
                .then(res => expect(res).toBeDefined())
        })
    })

    describe('delete program', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const brand = 'TELLO'
        const model = 'DJI'
        const host = '192.168.10.1'
        const port = 8889
        let userId, userToken, programId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => flymeApi.authenticateUser(email, password))
                .then(({ token }) => logic.__userApiToken__ = token)
                .then(() => Program.create({ userId, name: 'PROGRAM', orders: [{ command: 'command', timeOut: 3000 }], seconds: 10 }))
                .then(program => programId = program._id.toString())
        )

        it('should succed on empty userId', () => {
            return logic.deleteProgram(programId)
                .then(res => expect(res).toBeDefined())
        })
    })


    describe('send report', () => {
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
                .then(({ token }) => logic.__userApiToken__ = token)
        )

        it('should succed on empty userId', () => {
            return logic.sendReport({ subject: 'bug drone', message: 'the drone is bugged' })
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
