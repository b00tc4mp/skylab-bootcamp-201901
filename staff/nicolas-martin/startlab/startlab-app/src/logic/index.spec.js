import logic from '.'
import skylabApi from '../skylab-api'

const { mongoose, models: { User, Exercise, Invitation, Historical } } = require('startlab-data')

describe("logic", () => {
    const name = 'Nico'
    const surname = 'Nico'
    const email = `nico-${Math.random()}@mail.com`
    const password = `456-${Math.random()}`
    const passwordConfirm = password

    describe('register', () => {

        const name = 'Nico'
        const surname = 'Nico'
        const email = `nico-${Math.random()}@mail.com`
        const password = `456-${Math.random()}`
        const passwordConfirm = password


        it('should fail not valid name', () => {
            expect(() => {
                return logic.registerUser([], surname, email, password, passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty name', () => {
            expect(() => {
                return logic.registerUser('', surname, email, password, passwordConfirm)
            }).toThrow('name cannot be empty')
        })

        it('should fail not valid surname', () => {
            expect(() => {
                return logic.registerUser(name, [], email, password, passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            expect(() => {
                return logic.registerUser(name, '', email, password, passwordConfirm)
            }).toThrow('surname cannot be empty')
        })

        it('should fail not valid email', () => {
            expect(() => {
                return logic.registerUser(name, surname, [], password, passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty email', () => {
            expect(() => {
                return logic.registerUser(name, surname, '', password, passwordConfirm)
            }).toThrow('email cannot be empty')
        })

        it('should fail not valid password', () => {
            expect(() => {
                return logic.registerUser(name, surname, email, [], passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty password', () => {
            expect(() => {
                return logic.registerUser(name, surname, email, '', passwordConfirm)
            }).toThrow('password cannot be empty')
        })

        it('should fail not valid passwordConfirm', () => {
            expect(() => {
                return logic.registerUser(name, surname, email, [], passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty passwordConfirm', () => {
            expect(() => {
                return logic.registerUser(name, surname, email, '', passwordConfirm)
            }).toThrow('password cannot be empty')
        })

        it('should fail on different password', () => {
            expect(() => {
                return logic.registerUser(name, surname, email, '123', '1234')
            }).toThrow('passwords do not match')
        })


    })

    describe('login user', () => {

        const name = 'User Name'
        const surname = 'User Surname'
        const email = `useremail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        beforeEach(() => {
            const invitation = { email, status: 'sent' }
            return Invitation.create(invitation)
        })

        it('should login user', (done) => {
            const invitation = { email, status: 'sent' }
            return Invitation.create(invitation)
                .then(result => {
                    skylabApi.registerUser(name, surname, email, password, passwordConfirm)
                        .then(() => {
                            return logic.logInUser(email, password)
                                .then(response => {
                                    expect(token).toBe('string')
                                    expect(isAdmin).toBe(false)
                                    done()
                                })
                        })
                })
        })

        it('should fail not valid email', () => {
            expect(() => {
                return logic.logInUser([], password)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty email', () => {
            expect(() => {
                return logic.logInUser('', password)
            }).toThrow('email cannot be empty')
        })

        it('should fail not valid password', () => {
            expect(() => {
                return logic.logInUser(email, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty password', () => {
            expect(() => {
                return logic.logInUser(email, '')
            }).toThrow('password cannot be empty')
        })
    })

    describe('isUserLoggedIn', () => {

        it('should return true in isUserLoggedIn', () => {
            expect(logic.isUserLoggedIn).toBe(false)
        })
    })

    describe('isAdmin', () => {
        it('should return true if is admin', () => {
            expect(logic.isAdmin).toBe(false)
        })
    })

    describe('delete exercise', () => {

        it('should fail not valid id', () => {
            expect(() => {
                return logic.deleteExercise([])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty id', () => {
            expect(() => {
                return logic.deleteExercise('')
            }).toThrow('id cannot be empty')
        })
    })

    describe('retrieve exercise', () => {

        it('should fail not valid exerciseId', () => {
            expect(() => {
                return logic.retrieveExercise([])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty exerciseId', () => {
            expect(() => {
                return logic.retrieveExercise('')
            }).toThrow('exerciseId cannot be empty')
        })
    })

    describe('update exercise', () => {

        it('should fail not valid exerciseId', () => {
            expect(() => {
                return logic.updateExercise([])
            }).toThrow(TypeError([] + ' is not an object'))
        })
    })

    describe('new exercise', () => {

        it('should fail not valid exerciseId', () => {
            expect(() => {
                return logic.newExercise([])
            }).toThrow(TypeError([] + ' is not an object'))
        })
    })

    describe('check code', () => {
        const answer = 'console.log(4)'
        const exerciseId = '5c8d089ccc9ca724f6c68e4f'

        it('should fail not valid answer', () => {
            expect(() => {
                return logic.checkCode([], exerciseId)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty answer', () => {
            expect(() => {
                return logic.checkCode('', exerciseId)
            }).toThrow('answer cannot be empty')
        })


        it('should fail not valid exerciseId', () => {
            expect(() => {
                return logic.checkCode(answer, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty exerciseId', () => {
            expect(() => {
                return logic.checkCode(answer, '')
            }).toThrow('exerciseId cannot be empty')
        })


    })

    describe('update exercise from user', () => {
        const historicalId = '5c8d089ccc9ca724f6c68e4f'
        const answer = 'console.log(4)'

        it('should fail not valid historicalId', () => {
            expect(() => {
                return logic.updateExerciseFromUser([], answer)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty historicalId', () => {
            expect(() => {
                return logic.updateExerciseFromUser('', answer)
            }).toThrow('historicalId cannot be empty')
        })

        it('should fail not valid answer', () => {
            expect(() => {
                return logic.updateExerciseFromUser(historicalId, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty answer', () => {
            expect(() => {
                return logic.updateExerciseFromUser(historicalId, '')
            }).toThrow('answer cannot be empty')
        })


    })

    describe('delete invitation', () => {

        it('should fail not valid id', () => {
            expect(() => {
                return logic.deleteInvitation([])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty id', () => {
            expect(() => {
                return logic.deleteInvitation('')
            }).toThrow('id cannot be empty')
        })
    })

    describe('retrieve invitation', () => {

        it('should fail not valid id', () => {
            expect(() => {
                return logic.retrieveInvitation([])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty id', () => {
            expect(() => {
                return logic.retrieveInvitation('')
            }).toThrow('id cannot be empty')
        })
    })

    describe('update invitation', () => {

        it('should fail not valid invitation', () => {
            expect(() => {
                return logic.updateInvitation([])
            }).toThrow(TypeError([] + ' is not an object'))
        })
    })

    describe('new invitation', () => {

        it('should fail not valid invitation', () => {
            expect(() => {
                return logic.newInvitation([])
            }).toThrow(TypeError([] + ' is not an object'))
        })
    })

    describe('send email invitation', () => {

        it('should fail not valid invitation', () => {
            expect(() => {
                return logic.sendEmailInvitation([])
            }).toThrow(TypeError([] + ' is not an object'))
        })
    })

})