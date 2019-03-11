'use strict'

require('dotenv').config()

require('isomorphic-fetch')

const { mongoose, models: { User, Message } } = require('datify')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')

const { env: { TEST_DB_URL } } = process

describe('logic', () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            Message.deleteMany(),
            User.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            const user = await User.findOne({ email })

            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('name is empty or blank'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Manuel'
            const surname = undefined
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError('undefined is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Manuel'
            const surname = 10
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError('10 is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'Manuel'
            const surname = false
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Manuel'
            const surname = {}
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Manuel'
            const surname = []
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Manuel'
            const surname = ''
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('surname is empty or blank'))
        })

        it('should fail on undefined password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = undefined

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = 123

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })


        it('should fail on boolean password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = true

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = {}

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = []

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = ``

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('password is empty or blank'))
        })
        // init password check

        it('should fail on different password and passwordConfirm', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = `manuelbarzi@mail.com`
            const password = `123`
            const passwordConfirm = '456'

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error('passwords do not match'))
        })

        // end password check

        it('should fail on existing user', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = `manuelbarzi@mail.com`
            const password = `123`
            const passwordConfirm = password

            return logic.registerUser(name, surname, email, password, password)
                    .then(() => logic.registerUser(name, surname, email, password, password))
                        .catch(({message}) => {
                            expect(message).toBe(`user with email ${email} already exists`)
                        })  
        })
    })

    describe('authenticate user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let pass = password
        let mail = email

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
        )

        it('should succeed on correct credentials', () =>
            logic.authenticateUser(email, password)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on undefined email', () => {
            const email = undefined
            const password = pass

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const email = 123
            const password = pass

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })


        it('should fail on boolean email', () => {
            const email = true
            const password = pass

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const email = {}
            const password = pass

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const email = []
            const password = pass

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const email = ''
            const password = pass

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should fail on undefined password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = undefined

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = 123

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })


        it('should fail on boolean password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = true

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = {}

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = []

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = ``

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error('password is empty or blank'))
        })

        it('should fail on incorrect email', () => {
            const email = 'test666@mail.com'
            const password = pass

            logic.authenticateUser(email, password)
                .catch(({message}) => {
                    expect(message).toBe(`user with email ${email} not found`)
                })
        })

        it('should fail on incorrect password', () => {
            const email = mail
            const password = '456'

            logic.authenticateUser(email, password)
                .catch(({message}) => {
                    expect(message).toBe('wrong credentials')
                })
        })
    })

    describe('retrieve user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should fail on undefined userId', () => {
            const userId = undefined

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

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ``

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should succeed on correct credentials', () =>
            logic.retrieveUser(userId)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.save).toBeUndefined()
                })
        )

        it('should fail on wrong userId', () => {
            logic.retrieveUser('5c83d5ab667269067002ce97')
                .catch(({ message }) => {
                    expect(message).toBe(`user with id 5c83d5ab667269067002ce97 not found`)
                })
        })
    })

    describe('retrieve users', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.retrieveUsers(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.retrieveUsers(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })


        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.retrieveUsers(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.retrieveUsers(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.retrieveUsers(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ``

            expect(() => {
                logic.retrieveUsers(userId)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should succeed on correct credentials', () =>
            logic.retrieveUsers(userId)
                .then(users => {
                            users.map(user => {
                            expect(user.id).toBe(userId)
                            expect(user.name).toBe(name)
                            expect(user.surname).toBe(surname)
                            expect(user.email).toBe(email)
                            
                            expect(user.save).toBeUndefined()
                        })
                })
        )

        it('should fail on wrong userId', () => 
            logic.retrieveUsers('5c83d5ab667269067002ce97')
                .catch(({ message }) => {
                    expect(message).toBe(`user with id 5c83d5ab667269067002ce97 not found, no permission to perform query`)
                })
        )
    })

    describe('update user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        const _name = 'Jaume'
        const _surname = 'Pujol'
        const _email = `jaumepujol-${Math.random()}@mail.com`

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(userId + ' is not a string'))
        })


        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ``

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should fail on undefined email', () => {
            const _email = undefined

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const _email = 123

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_email + ' is not a string'))
        })


        it('should fail on boolean email', () => {
            const _email = true

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const _email = {}

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const _email = []

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const _email = ''

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(Error('email is empty or blank'))
        })

        it('should fail on undefined surname', () => {
            const _surname = undefined

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const _surname = 123

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const _surname = true

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const _surname = {}

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const _surname = []

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const _surname = ''

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(Error('surname is empty or blank'))
        })

        it('should fail on undefined name', () => {
            const _name = undefined

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const _name = 123

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const _name = true

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const _name = {}

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const _name = []

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(TypeError(_name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const _name = ''

            expect(() => {
                logic.updateUser(userId, _name, _surname, _email)
            }).toThrow(Error('name is empty or blank'))
        })
        
        it('should work with correct credentials', () => 
            logic.updateUser(userId, _name, _surname, _email)
                .then(user => {
                    expect(user.name).toBe(_name)
                    expect(user.surname).toBe(_surname)
                    expect(user.email).toBe(_email)
                })
        )

        it('should fail with incorrect credentials', () => 
            logic.updateUser('5c83d64f667269067002ce99', _name, _surname, _email)
                .catch(({ message }) => expect(message).toBe(`user with id 5c83d64f667269067002ce99 not found`))
        )
    })

    describe('remove user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should fail on undefined userId', () => {
            const userId = undefined

            expect(() => {
                logic.removeUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on numeric userId', () => {
            const userId = 123

            expect(() => {
                logic.removeUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })


        it('should fail on boolean userId', () => {
            const userId = true

            expect(() => {
                logic.removeUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on object userId', () => {
            const userId = {}

            expect(() => {
                logic.removeUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on array userId', () => {
            const userId = []

            expect(() => {
                logic.removeUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ``

            expect(() => {
                logic.removeUser(userId)
            }).toThrow(Error('userId is empty or blank'))
        })

        it('should succeed on correct userId', () => 
            logic.removeUser(userId)
                .then((user) => {
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        )

        it('should fail on incorrect userId', () =>
                logic.removeUser('5c83d64f667269067002ce99')
                    .catch(({ message }) => expect(message).toBe(`user with id 5c83d64f667269067002ce99 not found`))
        )
    })

    describe('create message', () => {
        const nameFrom = 'Peter'
        const surnameFrom = 'McGregor'
        const emailFrom = `peter-mc-greg-${Math.random()}@mail.com`
        const passwordFrom = `123-${Math.random()}`

        const nameTo = 'Peter'
        const surnameTo = 'McGregor'
        const emailTo = `peter-mc-greg-${Math.random()}@mail.com`
        const passwordTo = `123-${Math.random()}`

        let date = new Date
        let launchDate = new Date
        let position = [41.234, 2.897]
        let text = 'kwjhfwef lifwelfiu 3loiru2pdoje'
        let userIdFrom
        let userIdTo

        bcrypt.hash(passwordFrom, 10)
            .then(hash => User.create({ nameFrom, surnameFrom, emailFrom, passwordFrom: hash }))
            .then(({ id }) => userIdFrom = id)
            
        bcrypt.hash(passwordTo, 10)
            .then(hash => User.create({ nameTo, surnameTo, emailTo, passwordTo: hash }))
            .then(({ id }) => userIdTo = id)
        

        it('should succeed on correct credentials', () => {
            logic.createMessage(userIdFrom, userIdTo, date, launchDate, position, text)
                .then(message => {
                    expect(message.userIdFrom).toBe(userIdFrom)
                    expect(message.userIdTo).toBe(userIdTo)
                    expect(message.date).toBeDefined()
                    expect(message.launchDate).toBeDefined()
                    expect(message.position).toBe(position)
                    expect(message.text).toBe(text)
                })
        })
    })

    after(() =>
        Promise.all([
            Message.deleteMany(),
            User.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})