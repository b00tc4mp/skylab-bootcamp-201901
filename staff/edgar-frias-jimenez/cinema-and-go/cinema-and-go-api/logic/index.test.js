const dotenv = require('dotenv')
const { mongoose, User } = require('cinema-and-go-data')
const bcrypt = require('bcrypt')
const logic = require('.')
const { RequirementError, ValueError, FormatError } = require('../common/errors')

dotenv.config()

const { env: { MONGO_URL_LOGIC_TEST: url } } = process

describe('logic', () => {
    let name, email, password

    beforeAll(() => mongoose.connect(url, { useNewUrlParser: true }))

    beforeEach(async () => {
        await User.deleteMany()

        name = `name-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
    })

    describe('register user', () => {
        it('should succeed on correct data', async () => {
            const res = await logic.registerUser(name, email, password)
            expect(res).toBeDefined()

            const users = await User.find()

            expect(users).toBeDefined()
            expect(users).toHaveLength(1)

            const [user] = users
            expect(user.name).toEqual(name)
            expect(user.email).toEqual(email)

            expect(user.password).toBeDefined()
            expect(await bcrypt.compare(password, user.password)).toBeTruthy()
        })

        it('should fail on undefined username', () => {
            const name = undefined

            expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, 'name is not optional')
        })

        it('should fail on null username', () => {
            const name = null

            expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, 'name is not optional')
        })

        it('should fail on empty username', () => {
            const name = ''

            expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'name is empty')
        })

        it('should fail on blank username', () => {
            const name = ' \t    \n'

            expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'name is empty')
        })

        it('should fail on undefined email', () => {
            const email = undefined

            expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `email is not optional`)
        })

        it('should fail on null email', () => {
            const email = null

            expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `email is not optional`)
        })

        it('should fail on empty email', () => {
            const email = ''

            expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'email is empty')
        })

        it('should fail on blank email', () => {
            const email = ' \t    \n'

            expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'email is empty')
        })

        it('should fail on non-email email', () => {
            const nonEmail = 'non-email'

            expect(() => logic.registerUser(name, nonEmail, password)).toThrowError(FormatError, `${nonEmail} is not an email`)
        })

        it('should fail on undefined username', () => {
            const password = undefined

            expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, 'password is not optional')
        })

        it('should fail on null username', () => {
            const password = null

            expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, 'password is not optional')
        })

        it('should fail on empty username', () => {
            const password = ''

            expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'password is empty')
        })

        it('should fail on blank username', () => {
            const password = ' \t    \n'

            expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'password is empty')
        })
    })

    describe('authenticate user', () => {
        let user

        beforeEach(async () => user = await User.create({ name, email, password: await bcrypt.hash(password, 10) }))

        it('should succeed on correct credentials', async () => {
            const id = await logic.authenticateUser(email, password)

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            expect(id).toEqual(user.id)
        })
    })

    describe('retrieve user', () => {
        let user

        beforeEach(async () => user = await User.create({ name, email, password: await bcrypt.hash(password, 10) }))

        it('should succeed on correct id from existing user', async () => {
            const _user = await logic.retrieveUser(user.id)

            expect(_user.id).toBeUndefined()
            expect(_user.name).toEqual(name)
            expect(_user.email).toEqual(email)

            expect(_user.password).toBeUndefined()
        })
    })

    afterAll(() => mongoose.disconnect())
})