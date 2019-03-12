'use strict'

require('dotenv').config()

import cleanUpApi from '.'

const { mongoose, models: { User, Comment } } = require('cleanup-data')

import bcrypt from 'bcrypt'

jest.setTimeout(10000)

const { env: { TEST_DB_URL } } = process

describe('Clean api', () => {
    beforeAll(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            Comment.deleteMany(),
            User.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'test'
        const surname = 'test'
        const email = `test-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`
        const passwordConfirmation = password

        it('should succeed on valid data', async () => {
            const id = await cleanUpApi.registerUser(name, surname, email, password, passwordConfirmation)


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
            await User.create({ name, surname, email, password })

            await cleanUpApi.registerUser(name, surname, email, password, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with email ${email} already exists`)
                })
        })

        it('should fail on non-matching password and its confirmation', () =>
            cleanUpApi.registerUser(name, surname, email, password, `non-matching ${password}`)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe('passwords do not match')
                })
        )

        //         // TODO more unit test cases
    })

    describe('authenticate user', () => {
        const name = 'test'
        const surname = 'test'
        const email = `test-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        beforeEach(() =>
            cleanUpApi.registerUser(name, surname, email, password, password)
        )

        it('should succeed on correct data', () =>
            cleanUpApi.authenticateUser(email, password)
                .then(token => expect(token).toBeDefined())
        )

        // TODO more unit test cases
    })

    describe('retrieve user', () => {
        const name = 'test'
        const surname = 'test'
        const email = `test-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        let userId, token

        beforeEach(() =>
            cleanUpApi.registerUser(name, surname, email, password, password)
                .then(id => userId = id)
                .then(() => cleanUpApi.authenticateUser(email, password))
                .then(_token => token = _token)
        )

        it('should succeed on correct data', () =>
            cleanUpApi.retrieveUser(token)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        )

        // TODO more unit test cases
    })


    // TODO build endpoint for this in API first! (it does not exist yet)
    false && describe('update user', () => {
        const name = 'test'
        const surname = 'test'
        const email = `test-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        let userId, token

        beforeEach(() =>
            cleanUpApi.registerUser(name, surname, email, password, password)
                .then(id => userId = id)
                .then(() => cleanUpApi.authenticateUser(email, password))
                .then(_token => token = _token)
        )

        it('should succeed on correct data', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

            return cleanUpApi.updateUser(token, data)
                .then(() => cleanUpApi.retrieveUser(token))
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.name).toBe(data.name)
                    expect(user.surname).toBe(data.surname)
                    expect(user.age).toBe(data.age)
                    expect(user.email).toBe(email)
                })
        })

        // TODO more unit test cases
    })

    // TODO build endpoint for this in API first! (it does not exist yet)
    false && describe('remove user', () => {
        const name = 'test'
        const surname = 'test'
        const email = `test-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        let userId, token

        beforeEach(() =>
            cleanUpApi.registerUser(name, surname, email, password, passwordConfirmation)
                .then(id => userId = id)
                .then(() => cleanUpApi.authenticateUser(email, password))
                .then(_token => token = _token)
        )

        it('should succeed on correct data', () => {
            return cleanUpApi.remove(token, email, password, passwordConfirmation)
                .then(() => cleanUpApi.retrieveUser(token))
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(({ message }) => expect(message).toBe(`user with id \"${userId}\" does not exist`))
        })

        // TODO more unit test cases
    })



    afterAll(() =>
        Promise.all([
            Comment.deleteMany(),
            User.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})