require("dotenv").config()

import bcrypt from 'bcrypt'
// const path = require("path")
// const fs = require("fs")

import tokenHelper from '../token-helper'

const { mongoose, models: { User, Exercise, Invitation, Historical } } = require('startlab-data')
import skylabApi from '.'

const { env: { DB_URL }, JWT_SECRET } = process

describe("skylabApi", () => {
    beforeAll(() => mongoose.connect(DB_URL, { useNewUrlParser: true }))

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

        it('should succeed on register user', () => {
            return skylabApi.registerUser(name, surname, email, password, passwordConfirm)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(typeof id).toBe('string')
                })
                .catch(error => console.log('it not should passed over here', error))
        })

        it('should fail not valid name', () => {
            expect(() => {
                return skylabApi.registerUser([], surname, email, password, passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty name', () => {
            expect(() => {
                return skylabApi.registerUser('', surname, email, password, passwordConfirm)
            }).toThrow('name cannot be empty')
        })

        it('should fail on empty surname', () => {
            expect(() => {
                return skylabApi.registerUser(name, '', email, password, passwordConfirm)
            }).toThrow('surname cannot be empty')
        })

        it('should fail with different passwords', () => {
            expect(() => {
                return skylabApi.registerUser(name, surname, email, '123', '1234')
            }).toThrow(Error('passwords do not match'))
        })

        it('should fail on empty email', () => {
            expect(() => {
                return skylabApi.registerUser(name, surname, '', password, passwordConfirm)
            }).toThrow('email cannot be empty')
        })

        it('should fail on empty password', () => {
            expect(() => {
                return skylabApi.registerUser(name, surname, email, '', passwordConfirm)
            }).toThrow('password cannot be empty')
        })

        it('should fail on empty passwordConfirm', () => {
            expect(() => {
                return skylabApi.registerUser(name, surname, email, password, '')
            }).toThrow('password confirm cannot be empty')
        })

        it('should fail not valid surname', () => {
            expect(() => {
                return skylabApi.registerUser(name, [], email, password, passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail not valid email', () => {
            expect(() => {
                return skylabApi.registerUser(name, surname, [], password, passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail not valid password', () => {
            expect(() => {
                return skylabApi.registerUser(name, surname, email, [], passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail not valid passwordConfirm', () => {
            expect(() => {
                return skylabApi.registerUser(name, surname, email, password, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })



    })

    describe('authenticate user', () => {
        const inventedEmail = `nico-${Math.random()}@mail.com`
        const inventedPassword = `456-${Math.random()}`

        // creates user
        const name = 'Nico'
        const surname = 'Nico'
        const email = `nico-${Math.random()}@mail.com`
        const password = `456-${Math.random()}`
        const passwordConfirm = password

        // set userid - no admin
        let userId_NoAdmin
        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(user => userId_NoAdmin = user._id.toString())
        )

        //**auth user and get token */
        tokenHelper.jwtSecret = 'a secret phrase to cipher json web tokens'
        const _token = tokenHelper.createToken(userId_NoAdmin)

        it('should succeed on authenticate an user', () => {
            return skylabApi.authenticateUser(email, password)
                .then(({ token, isAdmin }) => {
                    expect(token).toBeDefined
                    expect(typeof _token).toBe('string')

                    // return Userid
                    const sub = tokenHelper.verifyToken(token)
                    expect(sub).to(userId_NoAdmin)
                    expect(isAdmin).toBe(false)
                })
                .catch(error => console.log('it not should passed over here', error))
        })

        it('should fail on wrong credential', () => {
            return skylabApi.authenticateUser(email, password + '123')
                .then(({ error }) => {
                    expect(error).toBeDefined()
                })
                .catch(({ message }) => {
                    expect(message).toBeDefined()
                    expect(typeof message).toBe('string')
                    expect(message).toBe('wrong credentials')
                })
        })

        it('should fail on empty email', () => {
            expect(() => {
                return skylabApi.authenticateUser('', inventedPassword)
            }).toThrow('email cannot be empty')
        })

        it('should fail on not valid email', () => {
            expect(() => {
                return skylabApi.authenticateUser([], inventedPassword)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty password', () => {
            expect(() => {
                return skylabApi.authenticateUser(inventedEmail, '')
            }).toThrow('password cannot be empty')
        })

        it('should fail on not valid password', () => {
            expect(() => {
                return skylabApi.authenticateUser(inventedEmail, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })
    })

    describe('list exercises', () => {
        const name = 'Nico'
        const surname = 'Nico'
        const email = `nico-${Math.random()}@mail.com`
        const password = `456-${Math.random()}`
        const passwordConfirm = password

        beforeEach(() => {
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
        })

        let tokenAdmin
        beforeEach(() => {
            return skylabApi.authenticateUser(email, password)
                .then(({ token }) => tokenAdmin = token)
        })

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

        it('should list all exercises', () => {
            return skylabApi.exerciseList(tokenAdmin)
                .then(exercises => {
                    expect(exercises).toBeDefined()
                    expect(exercises.length).toBe(1)

                    expect(exercises.constructor).toBe(Array)
                })
                .catch(error => expect(error).not.toBeDefined())
        })

        it('should fail on empty token', () => {
            expect(() => {
                return skylabApi.exerciseList('')
            }).toThrow('token cannot be empty')
        })

        it('should fail on not valid token', () => {
            expect(() => {
                return skylabApi.exerciseList({})
            }).toThrow(TypeError(`${{}} is not a string`))
        })
    })

    describe('delete exercise', () => {

        //exercise data
        let inventedExerciseId = '5c8d089ccc9ca724f6c68e4f'

        //user data
        const userId = '5c8d089ccc9ca724f6c68e4f'

        //creates user
        const name = 'Nico'
        const surname = 'Nico'
        const email = `nico-${Math.random()}@mail.com`
        const password = `456-${Math.random()}`
        const passwordConfirm = password

        beforeEach(() => {
            const invitation = { email, status: 'sent' }
            return Invitation.create(invitation)
        })


        //authenticate user
        let token_Admin
        beforeEach(() => {
            return skylabApi.authenticateUser(email, password)
                .then(({ token }) => {
                    console.log('tokeeeeeen', token)
                    token_Admin = token
                })
                .catch(error => console.log(error))
        })

        console.log('token_Admin', token_Admin)


        const title = 'Exercise Title'
        const summary = 'Exercise Summary'
        const test = 'Exercise Test'
        const theme = 34
        const order = 3

        let exerciseId
        beforeEach(() => {
            return Exercise.create({ title, summary, test, theme, order })
                .then(({ id }) => exerciseId = id)
                .catch(error => console.log(error))
        })
        console.log('exerciseId', exerciseId)

        // it('should succeed on delete an exercise by Id', () => {
        //     return skylabApi.deleteExercise(exerciseId, token_Admin)
        //         .then(result => console.log(result))
        //         .catch(error => console.log(error))
        // })

        it('should fail on empty userId', () => {
            expect(() => {
                return skylabApi.deleteExercise('', inventedExerciseId)
            }).toThrow('id cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                return skylabApi.deleteExercise([], inventedExerciseId)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty token', () => {
            expect(() => {
                return skylabApi.deleteExercise(userId, '')
            }).toThrow('token cannot be empty')
        })

        it('should fail on not valid token', () => {
            expect(() => {
                return skylabApi.deleteExercise(userId, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })
    })

    describe('retrieve exercise', () => {
        let inventedExerciseId = '5c8d089ccc9ca724f6c68e4f'

        it('should fail on empty userId', () => {
            expect(() => {
                return skylabApi.retrieveExercise('', inventedExerciseId)
            }).toThrow('exerciseId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                return skylabApi.retrieveExercise([], inventedExerciseId)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty exerciseId', () => {
            expect(() => {
                return skylabApi.retrieveExercise('12123123', '')
            }).toThrow('token cannot be empty')
        })

        it('should fail on not valid exerciseId', () => {
            expect(() => {
                return skylabApi.retrieveExercise('12312312312', [])
            }).toThrow(TypeError([] + ' is not a string'))
        })
    })

    describe('update exercise', () => {

        it('should fail on non valid exercise', () => {
            expect(() => {
                return skylabApi.updateExercise('', '123')
            }).toThrow(`${''} is not an object`)
        })

        it('should fail on empty token', () => {
            expect(() => {
                return skylabApi.updateExercise({}, '')
            }).toThrow('token cannot be empty')
        })

        it('should fail on not valid token', () => {
            expect(() => {
                return skylabApi.updateExercise({}, [])
            }).toThrow(TypeError(`${[]} is not a string`))
        })
    })

    describe('create exercise', () => {

        it('should fail on non valid exercise', () => {
            expect(() => {
                return skylabApi.createExercise('', '123')
            }).toThrow(`${''} is not an object`)
        })

        it('should fail on empty token', () => {
            expect(() => {
                return skylabApi.createExercise({}, '')
            }).toThrow('token cannot be empty')
        })

        it('should fail on not valid token', () => {
            expect(() => {
                return skylabApi.createExercise({}, [])
            }).toThrow(TypeError(`${[]} is not a string`))
        })

    })

    describe('check code', () => {
        const inventedAnswer = 'console.log(name)'
        const inventedExerciseId = '1234'
        const inventedToken = '1234'


        it('should fail on not valid answer', () => {
            expect(() => {
                return skylabApi.checkCode([], inventedExerciseId, inventedToken)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty answer', () => {
            expect(() => {
                return skylabApi.checkCode('', inventedExerciseId, inventedToken)
            }).toThrow('answer cannot be empty')
        })

        it('should fail on not valid exerciseId', () => {
            expect(() => {
                return skylabApi.checkCode(inventedAnswer, [], inventedToken)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty exerciseId', () => {
            expect(() => {
                return skylabApi.checkCode(inventedAnswer, '', inventedToken)
            }).toThrow('exerciseId cannot be empty')
        })

        it('should fail on not valid token', () => {
            expect(() => {
                return skylabApi.checkCode(inventedAnswer, inventedExerciseId, [])
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty token', () => {
            expect(() => {
                return skylabApi.checkCode(inventedAnswer, inventedExerciseId, '')
            }).toThrow('token cannot be empty')
        })


    })

    describe('update exercise from user', () => {
        const inventedHistoricalId = `historicalId-${Math.random()}`
        const inventedAnswer = 'console.log("7")'
        const inventedToken = `1234`

        it('should fail on not valid historicalId', () => {
            expect(() => {
                return skylabApi.updateExerciseFromUser([], inventedAnswer, inventedToken)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty historicalId', () => {
            expect(() => {
                return skylabApi.updateExerciseFromUser('', inventedAnswer, inventedToken)
            }).toThrow('historicalId cannot be empty')
        })

        it('should fail on not valid answer', () => {
            expect(() => {
                return skylabApi.updateExerciseFromUser(inventedHistoricalId, [], inventedToken)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty answer', () => {
            expect(() => {
                return skylabApi.updateExerciseFromUser(inventedHistoricalId, '', inventedToken)
            }).toThrow('answer cannot be empty')
        })

        it('should fail on not valid token', () => {
            expect(() => {
                return skylabApi.updateExerciseFromUser(inventedHistoricalId, inventedAnswer, [])
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty token', () => {
            expect(() => {
                return skylabApi.updateExerciseFromUser(inventedHistoricalId, inventedAnswer, '')
            }).toThrow('token cannot be empty')
        })


    })

    describe('invitation List', () => {

        it('should fail on not valid token', () => {
            expect(() => {
                return skylabApi.invitationList([])
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty token', () => {
            expect(() => {
                return skylabApi.invitationList('  ')
            }).toThrow('token cannot be empty')
        })
    })

    describe('delete invitation', () => {
        const inventedInventedId = '123123'
        const inventedToken = '123123'

        it('should fail on not valid token', () => {
            expect(() => {
                return skylabApi.deleteInvitation([], inventedToken)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty token', () => {
            expect(() => {
                return skylabApi.deleteInvitation('', inventedToken)
            }).toThrow('invitationId cannot be empty')
        })

        it('should fail on not valid token', () => {
            expect(() => {
                return skylabApi.deleteInvitation(inventedInventedId, [])
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty token', () => {
            expect(() => {
                return skylabApi.deleteInvitation(inventedInventedId, '')
            }).toThrow('token cannot be empty')
        })
    })

    describe('exercises from user', () => {

        it('should fail on not valid token', () => {
            expect(() => {
                return skylabApi.exerciseFromUser([])
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty token', () => {
            expect(() => {
                return skylabApi.exerciseFromUser('')
            }).toThrow('token cannot be empty')
        })

    })

    describe('get invitation', () => {
        const inventedInventedId = '123123'
        const inventedToken = '123123'

        const name = 'Nico'
        const surname = 'Nico'
        const email = `nico-${Math.random()}@mail.com`
        const password = `456-${Math.random()}`
        const passwordConfirm = password

        let invitationId
        beforeEach(() => {
            const invitation = { email, status: 'sent' }
            return Invitation.create(invitation)
                .then(({ _id }) => invitationId = _id.toString())
        })

        // set userid - Admin
        let userId_Admin
        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash, isAdmin: true }))
                .then(user => userId_Admin = user._id.toString())
        )

        //**auth user and get token */
        // tokenHelper.jwtSecret = 'a secret phrase to cipher json web tokens'
        // const _token = tokenHelper.createToken(userId_Admin)

        let _tokenAuth
        beforeEach(() => {
            return skylabApi.authenticateUser(email, password)
                .then(({ token }) => _tokenAuth = token)
                .catch(error => console.log(error))
        })

        // it('should succeed on get invitation', () => {
        //     return skylabApi.getInvitation(invitationId, _tokenAuth)
        //         .then((result) => {
        //             console.log('Resuuullssss: ', result)

        //         })
        //         .catch(error => console.log(error))
        // })

        it('should fail on not valid token', () => {
            expect(() => {
                return skylabApi.getInvitation([], inventedToken)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty token', () => {
            expect(() => {
                return skylabApi.getInvitation('', inventedToken)
            }).toThrow('invitationId cannot be empty')
        })

        it('should fail on not valid token', () => {
            expect(() => {
                return skylabApi.getInvitation(inventedInventedId, [])
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty token', () => {
            expect(() => {
                return skylabApi.getInvitation(inventedInventedId, '')
            }).toThrow('token cannot be empty')
        })
    })

    describe('update invitation', () => {
        const inventedInvitation = {}
        const inventedToken = '123123'

        it('should fail on non valid invitation', () => {
            expect(() => {
                return skylabApi.updateInvitation('', inventedToken)
            }).toThrow(`${''} is not an object`)
        })

        it('should fail on not valid token', () => {
            expect(() => {
                return skylabApi.updateInvitation(inventedInvitation, [])
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty token', () => {
            expect(() => {
                return skylabApi.updateInvitation(inventedInvitation, '   ')
            }).toThrow('token cannot be empty')
        })
    })

    describe('create invitation', () => {
        const inventedInvitation = {}
        const inventedToken = '123123'

        it('should fail on non valid invitation', () => {
            expect(() => {
                return skylabApi.createInvitation('', inventedToken)
            }).toThrow(`${''} is not an object`)
        })

        it('should fail on not valid token', () => {
            expect(() => {
                return skylabApi.createInvitation(inventedInvitation, [])
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty token', () => {
            expect(() => {
                return skylabApi.createInvitation(inventedInvitation, '   ')
            }).toThrow('token cannot be empty')
        })
    })

    describe('send invitation email', () => {
        const inventedInvitation = {}
        const inventedToken = '123123'

        it('should fail on non valid invitation', () => {
            expect(() => {
                return skylabApi.sendEmailInvitation(inventedToken, '')
            }).toThrow(`${''} is not an object`)
        })

        it('should fail on not valid token', () => {
            expect(() => {
                return skylabApi.sendEmailInvitation([], inventedInvitation)
            }).toThrow(TypeError(`${[]} is not a string`))
        })

        it('should fail on empty token', () => {
            expect(() => {
                return skylabApi.sendEmailInvitation('', inventedInvitation)
            }).toThrow('token cannot be empty')
        })
    })

    afterAll(() =>
        Promise.all([User.deleteMany(), Exercise.deleteMany(), Invitation.deleteMany(), Historical.deleteMany()])
            .then(() => mongoose.disconnect()))
})