'use strict'

describe('logic', () => {
    describe('users', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let email
        const password = '123'

        beforeEach(() => {
            email = `manuelbarzi-${Math.random()}@gmail.com`

            logic.__userId__ = null
            logic.__userToken__ = null
        })

        describe('register', () => {
            it('should succeed on correct user data', done => {
                logic.registerUser(name, surname, email, password)
                    .then(response => {
                        expect(response).toBeUndefined()

                        done()
                    })
                    .catch(done)
            })

            describe('on already existing user', () => {
                beforeEach(done =>
                    logic.registerUser(name, surname, email, password)
                        .then(done)
                        .catch(done)
                )

                it('should fail on retrying to register', done => {
                    logic.registerUser(name, surname, email, password)
                        .then(() => done(Error('should not reach this point')))
                        .catch(error => {
                            expect(error).toBeDefined()
                            expect(error instanceof LogicError).toBeTruthy()

                            expect(error.message).toBe(`user with username \"${email}\" already exists`)

                            done()
                        })
                })
            })

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, nonEmail, password)).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
            })

            // TODO password fail cases
        })

        describe('login', () => {
            let id

            beforeEach(done =>
                userApi.create(name, surname, email, password)
                    .then(response => {
                        id = response.data.id

                        done()
                    })
                    .catch(done)
            )

            it('should succeed on correct user credential', done =>
                logic.loginUser(email, password)
                    .then(() => {
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
                    .catch(done)
            )

            it('should fail on non-existing user', done =>
                logic.loginUser(email = 'unexisting-user@mail.com', password)
                    .then(() => done(Error('should not reach this point')))
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()

                        expect(error.message).toBe(`user with username \"${email}\" does not exist`)

                        done()
                    })
            )
        })

        describe('retrieve', () => {
            let id, token

            beforeEach(done =>
                userApi.create(name, surname, email, password)
                    // .then(response => {
                    //     id = response.data.id

                    //     return userApi.authenticate(email, password)
                    //         .then(response => {
                    //             token = response.data.token

                    //             logic.__userId__ = id
                    //             logic.__userToken__ = token

                    //             done()
                    //         })
                    // })
                    .then(response => {
                        id = response.data.id

                        return userApi.authenticate(email, password)
                    })
                    .then(response => {
                        token = response.data.token

                        logic.__userId__ = id
                        logic.__userToken__ = token

                        done()
                    })
                    .catch(done)
            )

            it('should succeed on correct user id and token', done =>
                logic.retrieveUser()
                    .then(user => {
                        expect(user.id).toBeUndefined()
                        expect(user.name).toBe(name)
                        expect(user.surname).toBe(surname)
                        expect(user.email).toBe(email)
                        expect(user.password).toBeUndefined()

                        done()
                    })
                    .catch(done)
            )

            it('should fail on incorrect user id', done => {
                logic.__userId__ = '5cb9998f2e59ee0009eac02c'

                logic.retrieveUser()
                    .then(() => done(Error('should not reach this point')))
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()

                        expect(error.message).toBe(`token id \"${id}\" does not match user \"${logic.__userId__}\"`)

                        done()
                    })
            })
        })
    })

    describe('ducks', () => {
        describe('search ducks', () => {
            it('should succeed on correct query', (done) => {
                logic.searchDucks('yellow')
                    .then(ducks => {
                        expect(ducks).toBeDefined()
                        expect(ducks instanceof Array).toBeTruthy()
                        expect(ducks.length).toBe(13)

                        done()
                    })
                    .catch(done)

                // TODO fail cases
            })
        })
    })
})