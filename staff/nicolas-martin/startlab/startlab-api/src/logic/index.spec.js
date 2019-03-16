require("dotenv").config()
const expect = require("expect")
const bcrypt = require("bcrypt")

const { mongoose, models: { User, Exercise, Invitation, Historical } } = require('startlab-data')
const logic = require('.')
const { env: { DB_URL } } = process


describe("logic", () => {
    before(() => mongoose.connect(DB_URL, { useNewUrlParser: true }))

    // beforeEach => Runs a function before each of the tests in this file runs. 
    // If the function returns a promise or is a generator, Jest waits 
    // for that promise to resolve before running the test
    beforeEach(() =>Promise.all([User.deleteMany(), Exercise.deleteMany(), Invitation.deleteMany(), Historical.deleteMany()]))

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

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
        )

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
                logic.authenticateUser([])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty password', () => {
            expect(() => {
                logic.authenticateUser('123', '')
            }).toThrow('password cannot be empty')
        })

        it('should fail on not valid password', () => {
            expect(() => {
                logic.authenticateUser([])
            }).toThrow(TypeError([] + ' is not a string'))
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

        //exercise data
        const title = 'Exercise Title'
        const summary = 'Exercise Summary'
        const test = 'Exercise Test'
        const theme = 34
        const order = 3


        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash =>
                    User.create({ name, surname, email, password: hash, isAdmin })
                        .then(({ id }) => userId = id))
        )

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
        let userId 

        //exercise data
        const title = 'Exercise Title'
        const summary = 'Exercise Summary'
        const test = 'Exercise Test'
        const theme = 34
        const order = 3
        let exerciseId

        // beforeEach(() => {
        //     debugger
        //     bcrypt.hash(password, 10)
        //         .then(hash => User.create({ name, surname, email_, password: hash, isAdmin })
        //                 .then(({ id }) => userId = id))
        //         .catch(error => console.log('should not passed over here', error))

        //     Exercise.create({ title, summary, test, theme, order })
        //                 .then(({ id }) => exerciseId = id)
        // })

        // false && it('should succeed on retrieve exercise on correct data', () => {
        //     debugger // aquí me llega siempre userid y exerciseId undefined
        //     return logic.retrieveExercise(userId, exerciseId)
        //             .then(exercise => {
        //                 expect(exercise).toBeDefined()
        //                 expect(exercise.title).toBe(title)
        //                 expect(exercise.summary).toBe(summary)
        //                 expect(exercise.test).toBe(test)
        //                 expect(exercise.theme).toBe(theme)
        //                 expect(exercise.order).toBe(order)
        //             })
        // })

        it('should fail on empty userId', () => {
            expect(() => {
                logic.retrieveExercise('', exerciseId)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.retrieveExercise([], exerciseId)
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
        const exerciseId = `exerciseId-${Math.random()}`
        const userId = `userId-${Math.random()}`

        it('should fail on empty userId', () => {
            expect(() => {
                logic.deleteExercise('', exerciseId)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.deleteExercise([], exerciseId)
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
        const exercise = {}
        const userId = `userId-${Math.random()}`

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
        const email = `email-${Math.random()}@mail.com`

        beforeEach(() => {
            const invitation = { email, status: 'sent' }
            return Invitation.create(invitation)
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
        const invitationId = `invitationId-${Math.random()}`

        it('should fail on empty userId', () => {
            expect(() => {
                logic.__changeStatusInvitation__('', invitationId)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.__changeStatusInvitation__([], invitationId)
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

    describe('change status invitation', () => {
        const userId = `userId-${Math.random()}`
        const invitationId = `invitationId-${Math.random()}`
        const email = `email-${Math.random()}@mail.com`

        it('should fail on empty userId', () => {
            expect(() => {
                logic.sendInvitationEmail('', email, invitationId)
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.sendInvitationEmail([], email, invitationId)
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
                logic.sendInvitationEmail(userId, email, '')
            }).toThrow('invitationId cannot be empty')
        })

        it('should fail on not valid invitationId', () => {
            expect(() => {
                logic.sendInvitationEmail(userId, email, {})
            }).toThrow(TypeError(`${{}} is not a string`))
        })
    })

    describe('delete invitation', () => {
        const userId = `userId-${Math.random()}`
        const invitationId = `invitationId-${Math.random()}`

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
        Promise.all([
            User.deleteMany(), Exercise.deleteMany(), Invitation.deleteMany(), Historical.deleteMany()]).then(() =>
                mongoose.disconnect()
            )
    )

})

        // it('should fail on undefined name', () => {
        //     const name = undefined
        //     const surname = "Barzi"
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(name + " is not a string"))
        // })

        // it("should fail on numeric name", () => {
        //     const name = 10
        //     const surname = "Barzi"
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(name + " is not a string"))
        // })

        // it("should fail on boolean name", () => {
        //     const name = true
        //     const surname = "Barzi"
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(name + " is not a string"))
        // })

        // it("should fail on object name", () => {
        //     const name = {}
        //     const surname = "Barzi"
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(name + " is not a string"))
        // })

        // it("should fail on array name", () => {
        //     const name = []
        //     const surname = "Barzi"
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(name + " is not a string"))
        // })

        // it("should fail on empty name", () => {
        //     const name = ""
        //     const surname = "Barzi"
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(Error("name is empty or blank"))
        // })

        // it("should fail on undefined surname", () => {
        //     const name = "Manuel"
        //     const surname = undefined
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(surname + " is not a string"))
        // })

        // it("should fail on numeric surname", () => {
        //     const name = "Manuel"
        //     const surname = 10
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(surname + " is not a string"))
        // })

        // it("should fail on boolean surname", () => {
        //     const name = "Manuel"
        //     const surname = false
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(surname + " is not a string"))
        // })

        // it("should fail on object surname", () => {
        //     const name = "Manuel"
        //     const surname = {}
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(surname + " is not a string"))
        // })

        // it("should fail on array surname", () => {
        //     const name = "Manuel"
        //     const surname = []
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(surname + " is not a string"))
        // })

        // it("should fail on empty surname", () => {
        //     const name = "Manuel"
        //     const surname = ""
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(Error("surname is empty or blank"))
        // })



    // describe("authenticate user", () => {
    //     const name = "Manuel"
    //     const surname = "Barzi"
    //     const email = `manuelbarzi-${Math.random()}@mail.com`
    //     const password = `123-${Math.random()}`

    //     beforeEach(() =>
    //         bcrypt
    //             .hash(password, 10)
    //             .then(hash => User.create({ name, surname, email, password: hash }))
    //     )

    //     it("should succeed on correct credentials", () =>
    //         logic
    //             .authenticateUser(email, password)
    //             .then(id => expect(id).toBeDefined()))
    // })




