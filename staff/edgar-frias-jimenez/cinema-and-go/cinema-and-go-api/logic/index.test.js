const dotenv = require('dotenv')
const { mongoose, User, Movie, MovieSessions } = require('cinema-and-go-data')
const {Types:{ObjectId}} = mongoose
const bcrypt = require('bcrypt')
const logic = require('.')
// const scrapper = require('../lib/scrapper')
const { RequirementError, ValueError, FormatError, LogicError } = require('../common/errors')

dotenv.config()

const { env: { MONGO_URL_LOGIC_TEST: url } } = process

jest.setTimeout(1000000)

describe('logic', () => {
    let name, email, password

    beforeAll(() => mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, }))

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

    describe('update user', () => {
        let user, _name, _email, userUpdated, id

        beforeEach(async () => {
            user = await User.create({ name, email, password: await bcrypt.hash(password, 10) })
            id = user.id
            _name = user.name + '_updated'
            _email = user.email + '_updated'
            userUpdated = { name: _name, email: _email }
        })

        it('should succeed on update user', async () => {
            await logic.updateUser(id, userUpdated)

            const userChange = logic.retrieveUser(id)

            expect(userChange.name).toEqual(userUpdated._name)
            expect(userChange.surname).toEqual(userUpdated._surname)
            expect(userChange.email).toEqual(userUpdated._email)
            expect(userChange.avatar).toEqual(userUpdated._avatar)
            expect(userChange.language).toEqual(userUpdated._language)
            expect(userChange.password).toBeUndefined()
        })

        // it('should fail on incorrect user id', async () => {
        //     const id = 'aslkfjhsdlkafhjldksjhf'

        //     try {
        //         await logic.updateUser(id, userUpdated)
        //         throw Error('should not reach this point')
        //     } catch (error) { // ????
        //         expect(error).toThrowError(LogicError, `user with id ${id} doesn't exists`)
        //         expect(error).toBeInstanceOf(TypeError)
        //         expect(error.message).toEqual(`user with id ${id} doesn't exists`)
        //     }
        // })

        it('should fail on undefined id', () => {
            expect(() => logic.updateUser(undefined, userUpdated)).toThrowError(RequirementError, `id is not optional`)
        })

        it('should fail on null id', () => {
            expect(() => logic.updateUser(null, userUpdated)).toThrowError(RequirementError, `id is not optional`)
        })

        it('should fail on empty id', () => {
            expect(() => logic.updateUser('', userUpdated)).toThrowError(ValueError, 'id is empty')
        })

        it('should fail on blank id', () => {
            expect(() => logic.updateUser(' \t    \n', userUpdated)).toThrowError(ValueError, 'id is empty')
        })

        it('should fail on a not string id', () => {
            expect(() => logic.updateUser(123, userUpdated)).toThrowError(TypeError, `id 123 is not a string`)
        })

        it('should fail on undefined user data', () => {
            expect(() => logic.updateUser(id, undefined)).toThrowError(RequirementError, `data is not optional`)
        })

        it('should fail on null user data', () => {
            expect(() => logic.updateUser(id, null)).toThrowError(RequirementError, `data is not optional`)
        })

        it('should fail on a not object data', () => {
            expect(() => logic.updateUser(id, 'data')).toThrowError(TypeError, 'data data is not a object')
        })
    })

    describe('remove user', () => {
        let user, id

        beforeEach(async () => {
            user = await User.create({ name, email, password: await bcrypt.hash(password, 10) })
            id = user.id
        })

        it('should succeed on correct credentials', async () => {
            try {
                debugger
                await logic.removeUser(id, password)
            }
            catch(error) {
                debugger
                throw Error('should not reach this point')
            }

            let _user
            try {
                debugger
                _user = logic.retrieveUser(id)
            }
            catch(error) {
                debugger
                expect(_user).toBeUndefined
            }
        })

        // it('should fail on incorrect user id', async () => {
        //     const id = 'aslkfjhsdlkafhjldksjhf'

        //     try {
        //         await logic.removeUser(id, password)
        //         throw Error('should not reach this point')
        //     } catch (error) {

        //         expect(error).toThrowError(LogicError, `user with id ${id} doesn't exists`)
        //         expect(error).toBeInstanceOf(LogicError)
        //         expect(error.message).toEqual(`user with id ${id} doesn't exists`)
        //     }
        // })

        it('should fail on undefined id', () => {
            expect(() => logic.removeUser(undefined, password)).toThrowError(RequirementError, `id is not optional`)
        })

        it('should fail on null id', () => {
            expect(() => logic.removeUser(null, password)).toThrowError(RequirementError, `id is not optional`)
        })

        it('should fail on empty id', () => {
            expect(() => logic.removeUser('', password)).toThrowError(ValueError, 'id is empty')
        })

        it('should fail on blank id', () => {
            expect(() => logic.removeUser(' \t    \n', password)).toThrowError(ValueError, 'id is empty')
        })
    })

    describe('scrap a movie', () => {
        it('should insert a movie into de database', async () => {
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
        it('should get all cinemas from a given city', async () => {
            const cityCinemas = await logic.scrapperCinemaMovies()
            expect(cityCinemas).toBeUndefined()
        })
    })

    afterAll(() => mongoose.disconnect())
})