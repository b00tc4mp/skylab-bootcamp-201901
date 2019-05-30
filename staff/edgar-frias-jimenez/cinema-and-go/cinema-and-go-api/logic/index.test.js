const dotenv = require('dotenv')
const { mongoose, User, Movie, MovieSessions } = require('cinema-and-go-data')
const {Types:{ObjectId}} = mongoose
const bcrypt = require('bcrypt')
const logic = require('.')
// const scrapper = require('../lib/scrapper')
const { RequirementError, ValueError, FormatError } = require('../common/errors')

dotenv.config()

const { env: { MONGO_URL_LOGIC_TEST: url } } = process

jest.setTimeout(1000000)

describe('logic', () => {
    let name, email, password

    beforeAll(() => mongoose.connect(url, { useNewUrlParser: true }))

    beforeEach(async () => {
        await User.deleteMany()
        await Movie.deleteMany()
        await MovieSessions.deleteMany()

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

    describe('scrap a movie', () => {
        fit('should insert a movie into de database', async () => {
            const img = 'https://www.ecartelera.com/carteles/15000/15032/002-th.jpg'
            const title = 'El Hijo'
            const info = [ '90 min.', 'EE.UU.', 'Ciencia ficción', '+16' ]
            const cast = 'Elizabeth Banks, Jackson A. Dunn, David Denman Dir. David Yarovesky'
            const inserted = await logic.registerMovie(title, img, info, cast)
            expect(inserted).toBeDefined()
        })
    })

    describe('get movie sessions', () => {
        let inserted

        beforeEach(async () => {
            const img = 'https://www.ecartelera.com/carteles/15000/15032/002-th.jpg'
            const title = 'El Hijo'
            const info = [ '90 min.', 'EE.UU.', 'Ciencia ficción', '+16' ]
            const cast = 'Elizabeth Banks, Jackson A. Dunn, David Denman Dir. David Yarovesky'
            inserted = await logic.registerMovie(title, img, info, cast)
        })

        it('should insert all movie sessions from a given cinema', async () => {
            const movieSession = ['12:00', '16:30', '19:15', '22:00', '12:00', '20:00', '12:30', '17:15', '20:00', '18:00', '20:45' ]
            const sessions = await logic.registerSessions(ObjectId(inserted), movieSession)
            expect(sessions).toBeDefined()
        })
    })

    describe('Scrap an entire city', () => {
        fit('should get all cinemas from a given city', async () => {
            const cityCinemas = await logic.scrapperCinemaMovies()
            debugger
            expect(cityCinemas).toBeDefined()
        })
    })

    afterAll(() => mongoose.disconnect())
})