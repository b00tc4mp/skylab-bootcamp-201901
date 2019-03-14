import coworkingApi from '../coworking-api'
import logic from '.'

require('dotenv').config()

const { mongoose, models: { User, Workspace, Service } } = require('coworking-data')
const { env: { TEST_DB_URL } } = process
import bcrypt from 'bcrypt'

jest.setTimeout(10000)

describe('logic', () => {
    beforeAll(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    afterEach(() =>
        Promise.all([
            Workspace.deleteMany(),
            User.deleteMany(),
            Service.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password
        const isAdmin = false

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)

            expect(id).toBeUndefined()

            const user = await User.findOne({ email })

            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)
            expect(user.isAdmin).toBe(isAdmin)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on password and passwordConfirm not matching', () => {
            const name = 'juan'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = `1234-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(TypeError('passwords do not match'))

        })

        it('should fail on already existing user', () => {
            const name = 'juan'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`

            return logic.registerUser(name, surname, email, password, password)
                .then(() => logic.registerUser(name, surname, email, password, password))
                .catch(({ message }) => {
                    expect(message).toBe(`user with email ${email} already exists`)
                }
                )
        })

        it('should fail on undefined name', () => {
            const name = undefined

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(undefined + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(Error('name is empty or blank'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Josepet'
            const surname = undefined
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Josepet'
            const surname = 10
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on boolean surname', () => {
            const name = 'Josepet'
            const surname = false
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Josepet'
            const surname = {}
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Josepet'
            const surname = []
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Josepet'
            const surname = ''
            const email = 'josepet@mail.com'
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(Error('surname is empty or blank'))
        })

        it('should fail on undefined email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = undefined
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 10
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on boolean email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = false
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = {}
            const password = `123-${Math.random()}`
            const isAdmin = 'false'


            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = []
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = ''
            const password = `123-${Math.random()}`
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should fail on undefined password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = undefined
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = 123
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on boolean password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = true
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = {}
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = []
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const name = 'Josepet'
            const surname = 'Pepet'
            const email = 'josepet@mail.com'
            const password = ''
            const isAdmin = 'false'

            expect(() => {
                logic.registerUser(name, surname, email, password, password, isAdmin)
            }).toThrow(Error('password is empty or blank'))
        })
    })






    describe('retrieve user', () => {
        const name = 'Josepet'
        const surname = 'Pepet'
        const email = `josepet-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const isAdmin = 'false'


        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
                .then(() => logic.logInUser(email, password))
        )

        it('should succeed on correct credentials', () =>
            logic.retrieveUser()
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.save).toBeUndefined()
                    expect(user.password).toBeUndefined()
                    expect(user.__v).toBeUndefined()
                })
        )

        it('should fail on user not found', () => {
            return logic.retrieveUser('5c87d27a6a6e780f3f7c40f4')
                .catch(({ message }) => expect(message).toBe('id is not defined'))
        })

        it('should fail on undefined userId', () => {
            const token = undefined

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on object password', () => {
            const userId = {}

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on array password', () => {
            const userId = []

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const userId = ''

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(TypeError('userId is empty or blank'))
        })
    })

    afterAll(() =>
        Promise.all([
            Product.deleteMany(),
            User.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})