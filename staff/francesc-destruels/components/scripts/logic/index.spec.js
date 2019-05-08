'use strict'

describe('logic', () => {
    describe('users', () => {
        const name = 'Fran'
        const surname = 'Des'
        let email
        const password = '123'
        const confirmPassword = '123'

        beforeEach(() => {
            email = `fran-${Math.random()}@gmail.com`

            logic.__userId__ = null
            logic.__userToken__ = null
        })

        describe('register', () => {
            it('should succeed on correct user data', done => {
                logic.registerUser(name, surname, email, password, confirmPassword, function (error) {
                    expect(error).toBeUndefined()

                    done()
                })
            })

            describe('on already existing user', () => {
                beforeEach(done => logic.registerUser(name, surname, email, password, confirmPassword, done))

                it('should fail on retrying to register', done => {
                    logic.registerUser(name, surname, email, password, confirmPassword, function (error) {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()

                        expect(error.message).toBe(`user with username \"${email}\" already exists`)

                        done()
                    })
                })
            })

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, `Wrong field/s`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, `Wrong field/s`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, 'Wrong field/s')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, 'Wrong field/s')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, `Wrong field/s`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, `Wrong field/s`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, 'Wrong field/s')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, 'Wrong field/s')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(Error, 'incorrect email')
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(Error, 'incorrect email')
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(Error, 'incorrect email')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(Error, 'incorrect email')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, nonEmail, password, confirmPassword, () => { })).toThrowError(Error, 'incorrect email')
            })

            it('should fail on undefined password', () => {
                const password = undefined

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, 'Wrong field/s')
            })

            it('should fail on null password', () => {
                const password = null

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, 'Wrong field/s')
            })

            it('should fail on empty password', () => {
                const password = ''

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, 'Wrong field/s')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(TypeError, 'Wrong field/s')
            })
        })

        describe('login', () => {
            let id

            beforeEach(done => userApi.create(name, surname, email, password, function (error, response) {
                id = response.data.id

                done()
            }))

            true && it('should succeed on correct user credential', done => {
                logic.login(email, password, function (error) {
                    expect(error).toBeUndefined()

                    const { __userId__, __userToken__ } = logic

                    expect(typeof __userId__).toBe('string')
                    expect(__userId__.length).toBeGreaterThan(0)
                    expect(__userId__).toBe(id)

                    expect(typeof __userToken__).toBe('string')
                    expect(__userToken__.length).toBeGreaterThan(0)

                    const [, payloadB64,] = __userToken__.split('.')
                    const payloadJson = atob(payloadB64)
                    const payload = JSON.parse(payloadJson)

                    expect(payload.id).toBe(id)

                    expect(logic.isUserLoggedIn).toBeTruthy()

                    done()
                })
            })

            true && it('should fail on non-existing user', done => {
                logic.login(email = 'unexisting-user@mail.com', password, function (error) {
                    expect(error).toBeDefined()
                    expect(error instanceof LogicError).toBeTruthy()

                    expect(error.message).toBe(`user with username \"${email}\" does not exist`)

                    done()
                })
            })


            true && it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.login(email, password, () => { })).toThrowError(Error, 'incorrect email')
            })

            true && it('should fail on null email', () => {
                const email = null

                expect(() => logic.login(email, password, () => { })).toThrowError(Error, 'incorrect email')
            })

            !true && it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.login(email, password, () => { })).toThrowError(Error, "Password can't be empty")
            })

            !true && it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.login(email, password, () => { })).toThrowError(Error, "Password can't be empty")
            })

            true && it('should fail on undefined password', () => {
                const password = undefined

                expect(() => logic.login(email, password, () => { })).toThrowError(Error, "Password can't be empty")
            })

            true && it('should fail on null password', () => {
                const password = null

                expect(() => logic.login(email, password, () => { })).toThrowError(Error, "Password can't be empty")
            })

            true && it('should fail on empty password', () => {
                const password = ''

                expect(() => logic.login(email, password, () => { })).toThrowError(Error, "Password can't be empty")
            })

            true && it('should fail on blank password', () => {
                const password = ' \t    \n'

                expect(() => logic.login(email, password, () => { })).toThrowError(Error, "Password can't be empty")
            })
        })

        describe('retrieve', () => {
            let id, token

            beforeEach(done => userApi.create(name, surname, email, password, function (error, response) {
                id = response.data.id

                userApi.authUser(email, password, function (error, response) {
                    token = response.data.token

                    logic.__userId__ = id
                    logic.__userToken__ = token

                    done()
                })
            }))

            true && it('should succeed on correct user id and token', done => {
                logic.retrieveUser(function (error, user) {
                    expect(error).toBeUndefined()

                    expect(user.id).toBeUndefined()
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                    expect(user.password).toBeUndefined()

                    done()
                })
            })

            true && it('should fail on incorrect user id', done => {
                logic.__userId__ = '5cb9998f2e59ee0009eac02c'

                logic.retrieveUser(function (error) {
                    expect(error).toBeDefined()
                    expect(error instanceof LogicError).toBeTruthy()

                    expect(error.message).toBe(`token id \"${id}\" does not match user \"${logic.__userId__}\"`)

                    done()
                })
            })
        })
    })
})