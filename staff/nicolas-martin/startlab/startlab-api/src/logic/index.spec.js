require("dotenv").config()
const expect = require("expect")
const bcrypt = require("bcrypt")
const path = require("path")
const fs = require("fs")

const { mongoose, models: { User, Exercise, Invitation, Historical } } = require('startlab-data')
const logic = require('.')
const { env: { DB_URL } } = process


describe("logic", () => {
    before(() => mongoose.connect(DB_URL, { useNewUrlParser: true }))

    beforeEach(() => Promise.all([User.deleteMany(), Exercise.deleteMany(), Invitation.deleteMany(), Historical.deleteMany()]))

    describe('register user', () => {
        const name = 'Nico'
        const surname = 'Nico'
        const email = `nico-${Math.random()}@mail.com`
        const password = `456-${Math.random()}`
        const passwordConfirm = password

        beforeEach(() => {
            const invitation = { email, status: 'sent' }
            return Invitation.create(invitation)
        })

        it('should succeed on valid data', () => {
            return logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(id => {
                    expect(id).toBeDefined()
                    return User.findOne({ email })
                        .then(user => {
                            expect(user.name).toBe(name)
                            expect(user.surname).toBe(surname)
                            expect(user.email).toBe(email)
                            bcrypt.compare(password, user.password)
                                .then(match => {
                                    expect(match).toBeTruthy()
                                })
                        })
                        .catch(error => {
                            expect(error).not.toBeDefined()
                        })
                })
        })

        it('should fail not valid name', () => {
            expect(() => {
                logic.registerUser([], surname, email, password, passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty name', () => {
            expect(() => {
                logic.registerUser('', surname, email, password, passwordConfirm)
            }).toThrow('name cannot be empty')
        })

        it('should fail on empty surname', () => {
            expect(() => {
                logic.registerUser(name, '', email, password, passwordConfirm)
            }).toThrow('surname cannot be empty')
        })

        it('should fail on empty email', () => {
            expect(() => {
                logic.registerUser(name, surname, '', password, passwordConfirm)
            }).toThrow('email cannot be empty')
        })

        it('should fail on empty password', () => {
            expect(() => {
                logic.registerUser(name, surname, email, '', passwordConfirm)
            }).toThrow('password cannot be empty')
        })

        it('should fail on empty passwordConfirm', () => {
            expect(() => {
                logic.registerUser(name, surname, email, password, '')
            }).toThrow('password confirmation cannot be empty')
        })

        it('should fail not valid surname', () => {
            expect(() => {
                logic.registerUser(name, [], email, password, passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail not valid email', () => {
            expect(() => {
                logic.registerUser(name, surname, [], password, passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail not valid password', () => {
            expect(() => {
                logic.registerUser(name, surname, email, [], passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail not valid passwordConfirm', () => {
            expect(() => {
                logic.registerUser(name, surname, email, password, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail with different passwords', () => {
            expect(() => {
                logic.registerUser(name, surname, email, '123', '1234')
            }).toThrow(Error('passwords do not match'))
        })

        it('should fail with non-invited user', () => {
            return logic.registerUser(name, surname, 'non-invited-user@gmail.com', password, passwordConfirm)
                .then(() => {
                    console.log('should fail with non-invited user - it should not passed over here')
                })
                .catch(({ message }) => expect(message).toBe('only invited users can registered'))
        })

        it('should fail on existing user', () => {
            return logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(id => {
                    return logic.registerUser(name, surname, email, password, passwordConfirm)
                        .then(() => {

                        })
                        .catch(error => {
                            expect(error).toBeDefined()
                            expect(error.message).toBe(`user with email ${email} already exists`)
                        })
                })
                .catch(error => {
                    expect(error).not.toBeDefined()
                })
        })
    })

    describe('authenticate user', () => {
        const name = 'Nico'
        const surname = 'Nico'
        const email = `nico-${Math.random()}@mail.com`
        const password = `456-${Math.random()}`
        const inventedEmail = `non-existing-email@mail.com`

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
        )

        it('should fail on wrong password', () => {
            return logic.authenticateUser(email, password + '123')
                .then(user => console.log('it should not passed over here', user))
                .catch(({ message }) => {
                    expect(message).toBe('wrong credentials')
                })
        })

        it('should fail on non existing email', () => {
            logic.authenticateUser(inventedEmail, password)
                .then(user => {
                    expect(user).not.toBeDefined()
                    console.log('it should not passed over here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with email ${inventedEmail} not found`)
                })
        })

        it("should succeed on correct credentials", () =>
            logic.authenticateUser(email, password)
                .then(id => expect(id).toBeDefined()))

        it('should fail on empty email', () => {
            expect(() => {
                logic.authenticateUser('', '123')
            }).toThrow('email cannot be empty')
        })

        it('should fail on not valid email', () => {
            expect(() => {
                logic.authenticateUser([], password)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty password', () => {
            expect(() => {
                logic.authenticateUser(email, '')
            }).toThrow('password cannot be empty')
        })

        it('should fail on not valid password', () => {
            expect(() => {
                logic.authenticateUser(email, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })
    })

    describe('__create user folder', () => {

        it('should fail on empty userId', () => {
            expect(() => {
                logic.__createUserFolder__('')
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.__createUserFolder__([])
            }).toThrow(TypeError(`${[]} is not a string`))
        })
    })

    describe('__fill exercises to user', () => {

        it('should fail on empty email', () => {
            expect(() => {
                logic.__fillExercisesToUser__('')
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.__fillExercisesToUser__([])
            }).toThrow([] + ' is not a string')
        })

        it('should fail on non existing user', () => {
            let inventedUserId = '5c8d089ccc9ca724f6c68e4f'
            logic.__fillExercisesToUser__(inventedUserId)
                .then(result => console.log('should not passed over here', result))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${inventedUserId} not found`)
                })
        })
    })

    describe('__is email invited', () => {

        it('should fail on empty email', () => {
            expect(() => {
                logic.__isEmailInvited__('')
            }).toThrow('email cannot be empty')
        })

        it('should fail on not valid email', () => {
            expect(() => {
                logic.__isEmailInvited__([])
            }).toThrow([] + ' is not a string')
        })
    })

    describe('retrieve user', () => {

        const name = 'User Name'
        const surname = 'User Surname'
        const email = `useremail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const inventedUserId = '5c8d089ccc9ca724f6c68e4f'

        let userId

        beforeEach(() =>
            bcrypt
                .hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => (userId = id))
        )


        it('should succeed on correct credentials', () =>
            logic.retrieveUser(userId).then(user => {
                expect(user.id.toString()).toBe(userId)
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)
            }))


        it('should fail on non existing userId', () => {
            logic.retrieveUser(inventedUserId)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${inventedUserId} not found`)
                })
        })


        it('should fail on empty userId', () => {
            expect(() => {
                logic.retrieveUser('')
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.retrieveUser([])
            }).toThrow(TypeError([] + ' is not a string'))
        })

    })

    describe('create exercise', () => {
        //user data
        const name = 'Nico'
        const surname = 'Nico'
        const email = `nico-${Math.random()}@mail.com`
        const password = `456-${Math.random()}`
        const isAdmin = true
        let userId
        const inventedUserId = '5c8d089ccc9ca724f6c68e4f'

        const nonAdmin_email = `nico-${Math.random()}@mail.com`
        let nonAdmin_userId

        //exercise data
        const title = 'Exercise Title'
        const summary = 'Exercise Summary'
        const test = 'Exercise Test'
        const theme = 34
        const order = 3

        // admin
        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash =>
                    User.create({ name, surname, email, password: hash, isAdmin })
                        .then(({ id }) => userId = id))
        )

        // no admin
        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash =>
                    User.create({ name, surname, email: nonAdmin_email, password: hash })
                        .then(({ id }) => nonAdmin_userId = id))
        )

        it('should fail on non admin user', () => {
            return logic.createExercise(nonAdmin_userId, title, summary, test, theme, order)
                .then(result => console.log('it should not passed over here', result))
                .catch(({ message }) => expect(message).toBe(`user with id ${nonAdmin_userId} has not privileges`))
        })

        it('should fail on non existing userId', () => {
            logic.createExercise(inventedUserId, title, summary, test, theme, order)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${inventedUserId} not found`)
                })
        })

        it('should succeed on create a new exercise', () => {
            return logic.createExercise(userId, title, summary, test, theme, order)
                .then(({ id }) => {
                    return Exercise.findById(id).select('-__v').lean()
                        .then(exercise => {
                            expect(exercise.title).toBe(title)
                            expect(exercise.summary).toBe(summary)
                            expect(exercise.test).toBe(test)
                            expect(exercise.theme).toBe(theme)
                            expect(exercise.order).toBe(order)
                        })
                })
                .catch(error => {
                    expect(error).not.toBeDefined()
                })
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.createExercise('', title, summary, test, theme, order)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.createExercise([], title, summary, test, theme, order)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty title', () => {
            expect(() => {
                logic.createExercise(userId, '', summary, test, theme, order)
            }).toThrow('title cannot be empty')
        })

        it('should fail on not valid title', () => {
            expect(() => {
                logic.createExercise(userId, [], summary, test, theme, order)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty summary', () => {
            expect(() => {
                logic.createExercise(userId, title, '', test, theme, order)
            }).toThrow('summary cannot be empty')
        })

        it('should fail on not valid summary', () => {
            expect(() => {
                logic.createExercise(userId, title, [], test, theme, order)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty test', () => {
            expect(() => {
                logic.createExercise(userId, title, summary, '', theme, order)
            }).toThrow('test cannot be empty')
        })

        it('should fail on not valid test', () => {
            expect(() => {
                logic.createExercise(userId, title, summary, [], theme, order)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on not valid theme', () => {
            expect(() => {
                logic.createExercise(userId, title, summary, test, '', order)
            }).toThrow(TypeError(' is not a number'))
        })

        it('should fail on negative theme', () => {
            expect(() => {
                logic.createExercise(userId, title, summary, test, Number(-7), order)
            }).toThrow('theme cannot be negative')
        })

        it('should fail on not valid order', () => {
            expect(() => {
                logic.createExercise(userId, title, summary, test, theme, '')
            }).toThrow(TypeError(' is not a number'))
        })

        it('should fail on negative order', () => {
            expect(() => {
                logic.createExercise(userId, title, summary, test, theme, Number(-7))
            }).toThrow('order cannot be negative')
        })
    })

    describe('retrieve exercise', () => {
        //user data
        const name = 'Nico'
        const surname = 'Nico'
        const email_ = `nico-${Math.random()}@mail.com`
        //const email = `nico-test@gmail.com`
        const password = `456-${Math.random()}`
        const isAdmin = true
        const inventedUserId = '5c8d089ccc9ca724f6c68e4f'
        let userId

        //exercise data
        const title = 'Exercise Title'
        const summary = 'Exercise Summary'
        const test = 'Exercise Test'
        const theme = 34
        const order = 3
        let inventedExerciseId = '5c8d089ccc9ca724f6c68e4f'

        beforeEach(() => {
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email: email_, password: hash, isAdmin })
                    .then(({ id }) => userId = id)
                )
                .catch(error => console.log('should not passed over here', error))
        })

        let exerciseId

        beforeEach(() => {
            return bcrypt.hash(password, 10)
                .then(hash => Exercise.create({ title, summary, test, theme, order }))
                .then(({ id }) => exerciseId = id)
                .catch(error => console.log('should not passed over here', error))
        })

        it('should succeed on retrieve exercise on correct data', () => {
            return logic.retrieveExercise(userId, exerciseId)
                .then(exercise => {
                    expect(exercise).toBeDefined()
                    expect(exercise._id).not.toBeDefined()
                    expect(exercise.title).toBe(title)
                    expect(exercise.summary).toBe(summary)
                    expect(exercise.test).toBe(test)
                    expect(exercise.theme).toBe(theme)
                    expect(exercise.order).toBe(order)
                })
        })

        it('should fail on non existing userId', () => {
            logic.retrieveExercise(inventedUserId, inventedExerciseId)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${inventedUserId} not found`)
                })
        })


        it('should fail on non existing exerciseId', () => {
            logic.retrieveExercise(userId, inventedExerciseId)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`exercise with id ${inventedExerciseId} not found`)
                })
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.retrieveExercise('', inventedExerciseId)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.retrieveExercise([], inventedExerciseId)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty exerciseId', () => {
            expect(() => {
                logic.retrieveExercise('12123123', '')
            }).toThrow('exerciseId cannot be empty')
        })

        it('should fail on not valid exerciseId', () => {
            expect(() => {
                logic.retrieveExercise('12312312312', [])
            }).toThrow(TypeError([] + ' is not a string'))
        })
    })

    describe('delete exercise', () => {

        //user data
        const name = 'Nico'
        const surname = 'Nico'
        const email_ = `nico-${Math.random()}@mail.com`
        const password = `456-${Math.random()}`
        const isAdmin = true
        const inventedUserId = '5c8d089ccc9ca724f6c68e4f'
        let userId
        let userId_noAdmin

        //exercise data
        let inventedExerciseId = '5c8d089ccc9ca724f6c68e4f'

        beforeEach(() => {
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email: email_, password: hash, isAdmin })
                    .then(({ id }) => userId = id)
                )
                .catch(error => console.log('should not passed over here', error))

        })

        const email_2 = `nico-${Math.random()}@mail.com`

        beforeEach(() => {
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email: email_2, password: hash, isAdmin: false })
                    .then(({ id }) => userId_noAdmin = id)
                )
                .catch(error => console.log('should not passed over here', error))

        })

        //create exercise
        const title = 'Exercise Title'
        const summary = 'Exercise Summary'
        const test = 'Exercise Test'
        const theme = 34
        const order = 3

        let exerciseId

        beforeEach(() => {
            return bcrypt.hash(password, 10)
                .then(hash => Exercise.create({ title, summary, test, theme, order }))
                .then(({ id }) => {

                    // create file
                    var unitFile = path.join(process.cwd(), 'src', 'test-files', `${id}.js`)

                    fs.appendFile(unitFile, test.toString(), function (err) {
                        if (err) throw Error('file not created')
                    })

                    exerciseId = id
                })
                .catch(error => console.log('should not passed over here', error))
        })


        it('should succeed on delete exercise', () => {
            return logic.deleteExercise(userId, exerciseId)
                .then(({ status, message }) => {
                    expect(status).toBe('ok')
                    expect(message).toBe('Exercise deleted')
                })
                .catch(({ message }) => expect(message).not.toBeDefined())
        })

        it('should fail on non existing exerciseId', () => {
            logic.deleteExercise(userId, inventedExerciseId)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`exercise with id ${inventedExerciseId} not found`)
                })
        })

        it('should fail on non admin user', () => {

            return logic.deleteExercise(userId_noAdmin, inventedExerciseId)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${userId_noAdmin} has not privileges`)
                })
        })

        it('should fail on non existing userId', () => {
            logic.deleteExercise(inventedUserId, inventedExerciseId)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${inventedUserId} not found`)
                })
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.deleteExercise('', inventedExerciseId)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.deleteExercise([], inventedExerciseId)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty exerciseId', () => {
            expect(() => {
                logic.deleteExercise(userId, '')
            }).toThrow('exerciseId cannot be empty')
        })

        it('should fail on not valid exerciseId', () => {
            expect(() => {
                logic.deleteExercise(userId, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })
    })

    describe('update exercise', () => {

        //exercise data
        const exercise = {}
        const userId = `userId-${Math.random()}`
        const inventedUserId = '5c8d089ccc9ca724f6c68e4f'
        let inventedExerciseId = '5c8d089ccc9ca724f6c68e4f'

        //user data
        const name = 'Nico'
        const surname = 'Nico'
        const email = `nico-${Math.random()}@mail.com`
        const password = `456-${Math.random()}`

        let userId_Admin

        let userId_noAdmin
        const email_2 = `nico-${Math.random()}@mail.com`

        beforeEach(() => {
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email: email_2, password: hash, isAdmin: true })
                    .then(({ id }) => userId_Admin = id)
                )
                .catch(error => console.log('should not passed over here', error))
        })

        beforeEach(() => {
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin: false })
                    .then(({ id }) => userId_noAdmin = id)
                )
                .catch(error => console.log('should not passed over here', error))
        })

        it('should fail on non existing exerciseId', () => {
            logic.updateExercise(userId_Admin, { id: inventedExerciseId, title: 'Exercise not found' })
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`exercise with id ${inventedExerciseId} not found`)
                })
        })

        it('should fail on non admin user', () => {
            return logic.updateExercise(userId_noAdmin, exercise)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${userId_noAdmin} has not privileges`)
                })
        })

        it('should fail on non existing userId', () => {
            logic.updateExercise(inventedUserId, exercise)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${inventedUserId} not found`)
                })
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.updateExercise('', exercise)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.updateExercise([], exercise)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on not valid exercise Object', () => {
            expect(() => {
                logic.updateExercise(userId, '')
            }).toThrow(TypeError(` is not an object`))
        })
    })

    describe('list exercises', () => {
        //create exercise
        const title = 'Exercise Title'
        const summary = 'Exercise Summary'
        const test = 'Exercise Test'
        const theme = 34
        const order = 3

        let ExerciseId

        beforeEach(() => {
            //create 1 exercise
            return Exercise.create({ title, summary, test, theme, order })
                .then(({ id }) => ExerciseId = id)
        })

        const name = 'User Name'
        const surname = 'User Surname'
        const email = `useremail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId_Admin
        beforeEach(() =>
            bcrypt
                .hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin: true }))
                .then(({ id }) => (userId_Admin = id))
        )

        it('should list all exercises', () => {
            return logic.listExercises(userId_Admin)
                .then(exercises => {
                    expect(exercises).toBeDefined()
                    expect(exercises.length).toBe(1)

                    expect(exercises.constructor).toBe(Array)
                })
                .catch(error => expect(error).not.toBeDefined())
        })


        it('should fail on empty userId', () => {
            expect(() => {
                logic.listExercises('')
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.listExercises({})
            }).toThrow(TypeError(`${{}} is not a string`))
        })
    })

    describe('get exercises from user', () => {
        const inventedUserId = '5c8d089ccc9ca724f6c68e4f'

        it('should fail on non existing userId', () => {
            logic.getExercisesFromUser(inventedUserId)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${inventedUserId} not found`)
                })
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.getExercisesFromUser('')
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.getExercisesFromUser({})
            }).toThrow(TypeError(`${{}} is not a string`))
        })
    })

    describe('list invitations', () => {
        const inventedUserId = '5c8d089ccc9ca724f6c68e4f'

        const name = 'User Name'
        const surname = 'User Surname'
        const email = `useremail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId_NoAdmin

        beforeEach(() =>
            bcrypt
                .hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => (userId_NoAdmin = id))
        )

        it('should fail on non existing userId', () => {
            logic.listInvitations(inventedUserId)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${inventedUserId} not found`)
                })
        })

        it('should fail on not Admin user', () => {
            logic.listInvitations(userId_NoAdmin)
                    .then(result => console.log('not should passed over here', result))
                    .catch(({message}) => expect(message).toBe(`user with id ${userId_NoAdmin} has not privileges`))
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.listInvitations('')
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.listInvitations({})
            }).toThrow(TypeError(`${{}} is not a string`))
        })
    })

    describe('retrieve invitation', () => {
        const userId = `userId-${Math.random()}`
        const invitationId = `invitationId-${Math.random()}`
        const inventedUserId = '5c8d089ccc9ca724f6c68e4f'

        const inventedInvitationId = '5c8d089ccc9ca724f6c68e4f'

        let invitationId_

        const name = 'User Name'
        const surname = 'User Surname'
        const email = `useremail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId_NoAdmin

        beforeEach(() =>
            bcrypt
                .hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => (userId_NoAdmin = id))
        )

        const email_2 = `useremail-${Math.random()}@mail.com`
        let userId_Admin

        beforeEach(() =>
            bcrypt
                .hash(password, 10)
                .then(hash => User.create({ name, surname, email: email_2, password: hash, isAdmin: true }))
                .then(({ id }) => (userId_Admin = id))
        )

        beforeEach(() => {
            const invitation = { email, status: 'sent' }
            return Invitation.create(invitation)
        })

        beforeEach(() => {
            const invitation = { email: 'inventendemail@mail.com', status: 'sent' }
            return Invitation.create(invitation)
                .then(({ id }) => invitationId_ = id)
        })

        it('should fail on non existing invitationId', () => {
            logic.retrieveInvitation(userId_Admin, inventedInvitationId)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`invitation with id ${inventedInvitationId} not found`)
                })
        })

        it('should fail on non existing userId', () => {
            logic.retrieveInvitation(inventedUserId, invitationId)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${inventedUserId} not found`)
                })
        })

        it('should fail on non admin user', () => {
            logic.retrieveInvitation(userId_NoAdmin, invitationId_)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${userId_NoAdmin} has not privileges`)
                })
        })

        it('should succeed on retrieve invitation', () => {
            return Invitation.findOne({ email })
                .then(invitation => {
                    expect(invitation.status).toBe('sent')
                    expect(invitation.email).toBe(email)
                })
                .catch(error => {
                    expect(error).not.toBeDefined()
                })
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.retrieveInvitation('', invitationId)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.retrieveInvitation([], invitationId)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.retrieveInvitation(userId, '')
            }).toThrow('invitationId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.retrieveInvitation(userId, {})
            }).toThrow(TypeError(`${{}} is not a string`))
        })
    })

    describe('update exercise from user', () => {
        const userId = `userId-${Math.random()}`
        const historicalId = `historicalId-${Math.random()}`
        const answer = 'console.log("7")'
        const inventedUserId = '5c8d089ccc9ca724f6c68e4f'

        it('should fail on non existing userId', () => {
            logic.updateExerciseFromUser(inventedUserId, historicalId, answer)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${inventedUserId} not found`)
                })
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.updateExerciseFromUser('', historicalId, answer)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.updateExerciseFromUser([], historicalId, answer)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.updateExerciseFromUser(userId, '', answer)
            }).toThrow('historicalId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.updateExerciseFromUser(userId, [], answer)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.updateExerciseFromUser(userId, historicalId, '')
            }).toThrow('answer cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.updateExerciseFromUser(userId, historicalId, [])
            }).toThrow(TypeError(`${[]} is not a string`))
        })


    })

    describe('create invitation', () => {
        const userId = `userId-${Math.random()}`
        const invitedEmail = `invitedEmail-${Math.random()}@mail.com`
        const inventedUserId = '5c8d089ccc9ca724f6c68e4f'

        const name = 'User Name'
        const surname = 'User Surname'
        const email = `useremail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId_NoAdmin

        beforeEach(() =>
            bcrypt
                .hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin: false }))
                .then(({ id }) => (userId_NoAdmin = id))
        )

        it('should fail on non admin user', () => {
            logic.createInvitation(userId_NoAdmin, invitedEmail)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${userId_NoAdmin} has not privileges`)
                })
        })

        it('should fail on non existing userId', () => {
            logic.createInvitation(inventedUserId, invitedEmail)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${inventedUserId} not found`)
                })
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.createInvitation('', invitedEmail)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.createInvitation([], invitedEmail)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty email', () => {
            expect(() => {
                logic.createInvitation(userId, '')
            }).toThrow('email cannot be empty')
        })

        it('should fail on not valid email', () => {
            expect(() => {
                logic.createInvitation(userId, {})
            }).toThrow(TypeError(`${{}} is not a string`))
        })
    })

    describe('update invitation', () => {
        const userId = `userId-${Math.random()}`
        const invitation = {}

        const inventedUserId = '5c8d089ccc9ca724f6c68e4f'

        it('should fail on non existing userId', () => {
            logic.updateInvitation(inventedUserId, invitation)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${inventedUserId} not found`)
                })
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.updateInvitation('', invitation)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.updateInvitation([], invitation)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on not valid invitation', () => {
            expect(() => {
                logic.updateInvitation(userId, '')
            }).toThrow('is not an object')
        })

    })

    describe('check answer', () => {
        const userId = `userId-${Math.random()}`
        const exerciseId = `exerciseId-${Math.random()}`
        const historicalId = `historicalId-${Math.random()}`
        const answer = 'console.log("7")'
        const callback = () => { }

        it('should fail on empty userId', () => {
            expect(() => {
                logic.checkAnswer('', answer, exerciseId, callback)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.checkAnswer([], answer, exerciseId, callback)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty answer', () => {
            expect(() => {
                logic.checkAnswer(userId, '', exerciseId, callback)
            }).toThrow('answer cannot be empty')
        })

        it('should fail on not valid answer', () => {
            expect(() => {
                logic.checkAnswer(userId, [], exerciseId, callback)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty exerciseId', () => {
            expect(() => {
                logic.checkAnswer(userId, answer, '', callback)
            }).toThrow('exerciseId cannot be empty')
        })

        it('should fail on not valid exerciseId', () => {
            expect(() => {
                logic.checkAnswer(userId, answer, [], callback)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on non valid callback', () => {
            expect(() => {
                logic.checkAnswer(userId, answer, exerciseId, [])
            }).toThrow(TypeError(`${[]} is not a function`))
        })

    })

    describe('change status exercise from user', () => {
        const userId = `userId-${Math.random()}`
        const answer = 'console.log("7")'
        const exerciseId = `exerciseId-${Math.random()}`
        const inventedUserId = '5c8d089ccc9ca724f6c68e4f'

        it('should fail on non existing userId', () => {
            logic.__changeStatusExerciseFromUser__(inventedUserId, answer, exerciseId)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${inventedUserId} not found`)
                })
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.__changeStatusExerciseFromUser__('', answer, exerciseId)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.__changeStatusExerciseFromUser__([], answer, exerciseId)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty answer', () => {
            expect(() => {
                logic.__changeStatusExerciseFromUser__(userId, '', exerciseId)
            }).toThrow('answer cannot be empty')
        })

        it('should fail on not valid answer', () => {
            expect(() => {
                logic.__changeStatusExerciseFromUser__(userId, [], exerciseId)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on exerciseId answer', () => {
            expect(() => {
                logic.__changeStatusExerciseFromUser__(userId, answer, '')
            }).toThrow('exerciseId cannot be empty')
        })

        it('should fail on not valid answer', () => {
            expect(() => {
                logic.__changeStatusExerciseFromUser__(userId, answer, [])
            }).toThrow(TypeError(`${[]} is not a string`))
        })


    })

    describe('change status invitation', () => {
        const userId = `userId-${Math.random()}`
        const invented_invitationId = `invitationId-${Math.random()}`

        const invitationEmail = `invitedEmail-${Math.random()}@mail.com`
        let invitationId

        beforeEach(() => {
            return Invitation.create({ email: invitationEmail })
                .then(({ id }) => invitationId = id)
        })

        //user data
        const name = 'Nico'
        const surname = 'Nico'
        const email = `nico-${Math.random()}@mail.com`
        const password = `456-${Math.random()}`

        let userId_Admin

        beforeEach(() => {
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin: true })
                    .then(({ id }) => userId_Admin = id)
                )
                .catch(error => console.log('should not passed over here', error))
        })

        it('should suceed on change the status invitation on sending email', () => {
            return logic.__changeStatusInvitation__(userId_Admin, invitationId)
                .then(status => {
                    expect(status).toBe('ok')
                })
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.__changeStatusInvitation__('', invented_invitationId)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.__changeStatusInvitation__([], invented_invitationId)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.__changeStatusInvitation__(userId, '')
            }).toThrow('invitationId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.__changeStatusInvitation__(userId, {})
            }).toThrow(TypeError(`${{}} is not a string`))
        })
    })

    describe('send email invitation', () => {
        const userId = `userId-${Math.random()}`
        const invitationId = `invitationId-${Math.random()}`
        const inventedEmail = `email-${Math.random()}@mail.com`
        let inventedUserId = '5c8d089ccc9ca724f6c68e4f'

        //user data
        const name = 'Nico'
        const surname = 'Nico'
        const email = `nico-${Math.random()}@mail.com`
        const password = `456-${Math.random()}`

        let userId_NoAdmin

        beforeEach(() => {
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash })
                    .then(({ id }) => userId_NoAdmin = id)
                )
                .catch(error => console.log('should not passed over here', error))
        })

        it('should fail on non admin user', () => {
            return logic.sendInvitationEmail(userId_NoAdmin, email, invitationId)
                .then(status => console.log('it should not passed over here', status))
                .catch(({ message }) => {
                    expect(message).toBe(`user with id ${userId_NoAdmin} has not privileges`)
                })
        })

        it('should fail on non existing userId', () => {
            logic.sendInvitationEmail(inventedUserId, inventedEmail, invitationId)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${inventedUserId} not found`)
                })
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.sendInvitationEmail('', inventedEmail, invitationId)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.sendInvitationEmail([], inventedEmail, invitationId)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty email', () => {
            expect(() => {
                logic.sendInvitationEmail(userId, '', invitationId)
            }).toThrow('email cannot be empty')
        })

        it('should fail on not valid email', () => {
            expect(() => {
                logic.sendInvitationEmail(userId, {}, invitationId)
            }).toThrow(TypeError(`${{}} is not a string`))
        })

        it('should fail on empty invitationId', () => {
            expect(() => {
                logic.sendInvitationEmail(userId, inventedEmail, '')
            }).toThrow('invitationId cannot be empty')
        })

        it('should fail on not valid invitationId', () => {
            expect(() => {
                logic.sendInvitationEmail(userId, inventedEmail, {})
            }).toThrow(TypeError(`${{}} is not a string`))
        })
    })

    describe('delete invitation', () => {
        const userId = `userId-${Math.random()}`
        const invitationId = `invitationId-${Math.random()}`
        const inventedUserId = '5c8d089ccc9ca724f6c68e4f'

        it('should fail on non existing userId', () => {
            logic.deleteInvitation(inventedUserId, invitationId)
                .then(result => console.log('it should not passed over here'))
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with id ${inventedUserId} not found`)
                })
        })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.deleteInvitation('', invitationId)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.deleteInvitation([], invitationId)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty invitationId', () => {
            expect(() => {
                logic.deleteInvitation(userId, '')
            }).toThrow('invitationId cannot be empty')
        })

        it('should fail on not valid invitationId', () => {
            expect(() => {
                logic.deleteInvitation(userId, [])
            }).toThrow(TypeError(`${[]} is not a string`))
        })

    })

    after(() =>
        Promise.all([User.deleteMany(), Exercise.deleteMany(), Invitation.deleteMany(), Historical.deleteMany()]).then(() =>
        mongoose.disconnect())
    )

})