'use strict'

describe('logic', () => {
    describe('users', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let email
        const password = '123'

        beforeEach(() => email = `manuelbarzi-${Math.random()}@gmail.com`)

        describe('register', () => {
            it('should succeed on correct user data', done => {
                logic.registerUser(name, surname, email, password, function (error) {
                    expect(error).toBeUndefined()

                    done()
                })
            })

            describe('on already existing user', () => {
                beforeEach(done => logic.registerUser(name, surname, email, password, done))

                it('should fail on retrying to register', done => {
                    logic.registerUser(name, surname, email, password, function (error) {
                        expect(error).toBeDefined()
                        expect(error instanceof Error).toBeTruthy()

                        expect(error.message).toBe(`user with username \"${email}\" already exists`)

                        done()
                    })
                })
            })

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, () => { })).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, nonEmail, password, () => { })).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
            })

            // TODO password fail cases
        })

        describe('login', () => {
            beforeEach(() => {
                users.push({
                    name: name,
                    surname: surname,
                    email: email,
                    password: password
                })
            })

            it('should succeed on correct data', () => {
                logic.loginUser(email, password)

                expect(logic.__userEmail__).toBe(email)
                expect(logic.__accessTime__ / 1000).toBeCloseTo(Date.now() / 1000, 1)
            })

            it('should fail on wrong email (unexisting user)', () => {
                // expect(()=> {
                //     logic.login('pepitogrillo@gmail.com', password)
                // }).toThrowError(Error, 'wrong credentials')

                let _error

                try {
                    logic.login('pepitogrillo@gmail.com', password)
                } catch (error) {
                    _error = error
                }

                expect(_error).toBeDefined()
                // expect(_error.code).toBe(1)
            })

            it('should fail on wrong password (existing user)', () => {
                // expect(()=> {
                //     logic.login(email, '456')
                // }).toThrowError(Error, 'wrong credentials')

                let _error

                try {
                    logic.login(email, '456')
                } catch (error) {
                    _error = error
                }

                expect(_error).toBeDefined()
                // expect(_error.code).toBe(1)
            })

            // TODO fail cases
        })

        describe('retrieve user', () => {
            beforeEach(() => {
                users.push({
                    name: name,
                    surname: surname,
                    email: email,
                    password: password
                })

                logic.__userEmail__ = email
            })

            it('should succeed on existing user and corect email', () => {
                const user = logic.retrieveUser()

                expect(user).toBeDefined()
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)
                expect(user.password).toBeUndefined()
            })
        })
    })

    describe('ducks', () => {
        describe('search ducks', () => {
            it('should succeed on correct query', (done) => {
                logic.searchDucks('yellow', (ducks) => {
                    expect(ducks).toBeDefined()
                    expect(ducks instanceof Array).toBeTruthy()
                    expect(ducks.length).toBe(13)

                    done()
                })

                // TODO fail cases
            })
        })
    })
})