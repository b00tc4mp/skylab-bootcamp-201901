'use strict'

import expect from 'expect'
import logic from '.'
import sailAwayApi from '../sail-away-api'

const { mongoose, models: { User, Journey } } = require('sail-away-data')
const { env: { REACT_APP_TEST_DB_URL } } = process

describe('logic', () => {

    beforeAll(() => mongoose.connect(REACT_APP_TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            Journey.deleteMany(),
            User.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const password = '123'
        const passwordConfirm = password
        const kind = 'captain'
        let email

        it('should succeed on valid data', async () => {
            email = `ritamedina-${Math.random()}@mail.com`
            const id = await logic.register(name, surname, email, password, passwordConfirm, kind)

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')
        })

        false && it('should fail on already existing user', async () => {
            await sailAwayApi.registerUser(name, surname, email, password, passwordConfirm, kind)
            return logic.register(name, surname, email, password, passwordConfirm, kind)
                .catch(error => {
                    expect(error instanceof Error).toBe(true)
                    expect(error.message).toBe(`user with email ${email} already exists`)
                })
        })

        it('should fail on empty name', function () {
            let name = ''

            expect(() => logic.register(name, surname, email, password, passwordConfirm, kind)).toThrowError('name cannot be empty')
        })
        it('should fail on non string name', function () {
            let name = 123
            expect(() => logic.register(name, surname, email, password, passwordConfirm, kind)).toThrowError(`${name} is not a string`)
        })

        it('should fail on empty surname', function () {
            let surname = ''

            expect(() => logic.register(name, surname, email, password, passwordConfirm, kind))
                .toThrowError('surname cannot be empty')
        })
        it('should fail on non string surname', function () {
            let surname = 123
            expect(() => logic.register(name, surname, email, password, passwordConfirm, kind))
                .toThrowError(`${surname} is not a string`)
        })

        it('should fail on empty email', function () {
            let email = ''

            expect(() => logic.register(name, surname, email, password, passwordConfirm, kind))
                .toThrowError('email cannot be empty')
        })
        it('should fail on non string email', function () {
            let email = 123
            expect(() => logic.register(name, surname, email, password, passwordConfirm, kind))
                .toThrowError(`${email} is not a string`)
        })

        it('should fail on empty password', function () {
            let password = ''

            expect(() => logic.register(name, surname, email, password, passwordConfirm, kind))
                .toThrowError('password cannot be empty')
        })
        it('should fail on non string password', function () {
            let password = 123
            expect(() => logic.register(name, surname, email, password, passwordConfirm, kind))
                .toThrowError(`${password} is not a string`)
        })

        it('should fail on empty passwordConfirm', function () {
            let passwordConfirm = ''

            expect(() => logic.register(name, surname, email, password, passwordConfirm, kind))
                .toThrowError('password confirmation cannot be empty')
        })
        it('should fail on non string passwordConfirm', function () {
            let passwordConfirm = 123
            expect(() => logic.register(name, surname, email, password, passwordConfirm, kind))
                .toThrowError(`${passwordConfirm} is not a string`)
        })

        it('should fail on empty kind', function () {
            let kind = ''

            expect(() => logic.register(name, surname, email, password, passwordConfirm, kind))
                .toThrowError('kind cannot be empty')
        })
        it('should fail on non string kind', function () {
            let kind = 123
            expect(() => logic.register(name, surname, email, password, passwordConfirm, kind))
                .toThrowError(`${kind} is not a string`)
        })

    })

    describe('login user', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const password = '123'
        const passwordConfirm = password
        const kind = 'captain'
        let email

        beforeEach(async () => {
            email = `ritamedina-${Math.random()}@mail.com`
            await logic.register(name, surname, email, password, passwordConfirm, kind)
        })

        it('should succeed on valid data', async () => {
            await logic.login(email, password)

            expect(logic.__userToken__).toBeDefined()
        })

        false && it('should fail on non existing user', async () => {
            await sailAwayApi.registerUser(name, surname, 'danieltoledo@mail.com', password, passwordConfirm, kind)
            return logic.login(email, password)
                .catch(error => {
                    expect(error instanceof Error).toBe(true)
                    expect(error.message).toBe(`user with email ${email} already exists`)
                })
        })


        it('should fail on empty email', function () {
            let email = ''

            expect(() => logic.register(name, surname, email, password, passwordConfirm, kind))
                .toThrowError('email cannot be empty')
        })
        it('should fail on non string email', function () {
            let email = 123
            expect(() => logic.register(name, surname, email, password, passwordConfirm, kind))
                .toThrow(TypeError, `${email} is not a string`)
        })

        it('should fail on empty password', function () {
            let password = ''

            expect(() => logic.register(name, surname, email, password, passwordConfirm, kind))
                .toThrowError('password cannot be empty')
        })
        it('should fail on non string password', function () {
            let password = 123
            expect(() => logic.register(name, surname, email, password, passwordConfirm, kind))
                .toThrowError(`${password} is not a string`)
        })

    })

    describe('retrieve user logged', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const password = '123'
        const passwordConfirm = password
        const kind = 'captain'
        let email, token

        beforeEach(async () => {
            email = `ritamedina-${Math.random()}@mail.com`
            await logic.register(name, surname, email, password, passwordConfirm, kind)
            await logic.login(email, password)
            token = logic.__userToken__
        })

        it('should succeed on valid data', async () => {
            let user = await logic.retrieveUserLogged()

            expect(user).toBeDefined()
            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)
            expect(user.kind).toBe(kind)

        })

        false && it('should fail on non existing user', async () => {
            await logic.retrieveUserLogged(token)
                .catch(error => {
                    expect(error instanceof Error).toBe(true)
                    expect(error.message).toBe(`user with email ${email} already exists`)
                })
        })


        it('should fail on empty token', function () {
            logic.__userToken__ = ''

            expect(() => logic.retrieveUserLogged())
                .toThrowError('token cannot be empty')
        })
        it('should fail on non string token', function () {
            logic.__userToken__ = 123
            expect(() => logic.retrieveUserLogged())
                .toThrowError(`${logic.__userToken__} is not a string`)
        })

    })

    describe('retrieve user', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const password = '123'
        const passwordConfirm = password
        const kind = 'captain'
        let email, userId

        beforeEach(async () => {
            email = `ritamedina-${Math.random()}@mail.com`
            userId = await logic.register(name, surname, email, password, passwordConfirm, kind)
        })

        it('should succeed on valid data', async () => {
            let user = await logic.retrieveUser(userId)

            expect(user).toBeDefined()
            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)
            expect(user.kind).toBe(kind)

        })

        false && it('should fail on non existing user', async () => {
            await logic.retrieveUser(userId)
                .catch(error => {
                    expect(error instanceof Error).toBe(true)
                    expect(error.message).toBe(`user with email ${email} already exists`)
                })
        })


        it('should fail on empty token', function () {
            let userId = ''

            expect(() => logic.retrieveUser(userId))
                .toThrowError('id cannot be empty')
        })
        it('should fail on non string token', function () {
            let userId = 123
            expect(() => logic.retrieveUser(userId))
                .toThrowError(`${userId} is not a string`)
        })

    })

    describe('search users', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const password = '123'
        const passwordConfirm = password
        const kind = 'captain'

        let email1, userId1
        let email2, userId2

        beforeEach(async () => {
            email1 = `ritamedina-${Math.random()}@mail.com`
            let talents1 = ['music', 'photographer']
            let languages1 = ['English', 'Arabic']

            userId1 = await User.create({ name, surname, email: email1, password, passwordConfirm, kind, talents: talents1, langugaes: languages1 })


            email2 = `ritamedina-${Math.random()}@mail.com`
            let talents2 = ['music', 'cleaning']
            let languages2 = ['Spanish', 'Arabic']

            userId2 = await User.create({ name, surname, email: email2, password, passwordConfirm, kind, talents: talents2, langugaes: languages2 })


        })

        false && it('should succeed on valid data', async () => {
            let users = await logic.searchUsers(['music'], ['Spanish'])

            expect(users).toBeDefined()
            expect(users.length).toBe(1)
            expect(users[0].name).toBe(name)
            expect(users[0].surname).toBe(surname)
            expect(users[0].email).toBe(email2)
            expect(users[0].kind).toBe(kind)

        })

        it('should fail on non array talens', function () {
            let talents = 123
            expect(() => logic.searchUsers(talents, ['Spanish']))
                .toThrow(TypeError, `${talents} is not an array`)
        })

        it('should fail on non array languages', function () {
            let languages = 123
            expect(() => logic.searchUsers([], languages))
                .toThrow(TypeError, `${languages} is not an array`)
        })

    })


    describe('update User', () => {
        const name = 'Rita'
        const surname = 'Medina'
        const password = '123'
        const passwordConfirm = password
        const kind = 'captain'

        let email, userId

        const gender = 'Feminine'
        const nationality = 'Portuguese'
        const description = 'I am a nice girl willing to travel'
        const talents = ['art', 'musician', 'writter']
        const boats = [{
            name: 'saphiro',
            type: 'Yacht',
            model: 416,
            description: 'amazing vessel'
        }]
        const experience = 200
        const languages = ['pt', 'en']

        beforeEach(async () => {
        })
        
        it('should succeed on valid data', async () => {
            email = `ritamedina-${Math.random()}@mail.com`
            userId = await User.create({ name, surname, email, password, passwordConfirm, kind }) 
            await sailAwayApi.authenticateUser(email, password)
            let userUpdated = await logic.updateUser(name, surname, gender, nationality, '9', description, boats, talents, experience, languages)

            expect(userUpdated).toBeDefined()
            expect(userUpdated.name).toBe(name)
            expect(userUpdated.surname).toBe(surname)
            expect(userUpdated.gender).toBe(gender)
            expect(userUpdated.nationality).toBe(nationality)
            expect(userUpdated.description).toBe(description)
            expect(userUpdated.talents.toString()).toBe(talents.toString())
            expect(userUpdated.boats.toStirng()).toBe(boats.toStirng())
            expect(userUpdated.languages.toString()).toBe(languages.toString())
            expect(userUpdated.experience).toBe(experience)

        })

    })

    afterAll(() =>
        Promise.all([
            Journey.deleteMany(),
            User.deleteMany(),
        ])
            .then(() => mongoose.disconnect())
    )

})