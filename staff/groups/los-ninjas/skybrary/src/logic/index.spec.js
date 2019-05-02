import logic from '.'
import { LogicError, RequirementError, ValueError, FormatError } from '../common/errors'
import userApi from '../data/user-api'
// import searchBooksApi from '../data/booksearch-api'

describe('logic', () => {
    describe('users', () => {
        const alias = 'user'
        const password = '123'
        let email

        beforeEach(() => {
            email = `skybrary.${Math.random()}@skybrary.com`

            logic.__userId__ = null
            logic.__userToken__ = null
        })

        describe('register user', () => {
            it('should succeed on correct user data', () =>
                logic.registerUser(alias, email, password)
                    .then(response => expect(response).toBeUndefined())
            )

            describe('on already existing user', () => {
                beforeEach(() => logic.registerUser(alias, email, password))

                it('should fail on retrying to register', () =>
                    logic.registerUser(alias, email, password)
                        .then(() => { throw Error('should not reach this point') })
                        .catch(error => {
                            expect(error).toBeDefined()
                            expect(error instanceof LogicError).toBeTruthy()

                            expect(error.message).toBe(`user with username \"${email}\" already exists`)
                        })
                )
            })

            it('should fail on undefined name', () => {
                const alias = undefined

                expect(() => logic.registerUser(alias, email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const alias = null

                expect(() => logic.registerUser(alias, email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const alias = ''

                expect(() => logic.registerUser(alias, email, password)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const alias = ' \t    \n'

                expect(() => logic.registerUser(alias, email, password)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(alias, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(alias, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(alias, email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(alias, email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(alias, nonEmail, password)).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
            })
        })

        describe('login user', () => {
            let id

            beforeEach(() =>
                userApi.create(email, password, { alias } )
                    .then(response => id = response.data.id)
            )

            it('should succeed on correct user credential', () =>
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
                    })
            )

            it('should fail on non-existing user', () =>
                logic.loginUser(email = 'unexisting-user@mail.com', password)
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()

                        expect(error.message).toBe(`user with username \"${email}\" does not exist`)
                    })
            )
        })

        describe('retrieve user', () => {
            let id, token

            beforeEach(() =>
                userApi.create(email, password, { alias })
                    .then(response => {
                        id = response.data.id

                        return userApi.authenticate(email, password)
                    })
                    .then(response => {
                        token = response.data.token

                        logic.__userId__ = id
                        logic.__userToken__ = token
                    })
            )

            it('should succeed on correct user id and token', () =>
                logic.retrieveUser()
                    .then(user => {
                        expect(user.alias).toBe(alias)
                        expect(user.email).toBe(email)
                        expect(user.password).toBeUndefined()
                    })
            )

            it('should fail on incorrect user id', () => {
                logic.__userId__ = '5cb9998f2e59ee0009eac02c'

                return logic.retrieveUser()
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()

                        expect(error.message).toBe(`token id \"${id}\" does not match user \"${logic.__userId__}\"`)
                    })
            })
        })

        describe('logout user', () => {
            let id, token

            beforeEach(() =>
                userApi.create(email, password, { alias })
                    .then(response => {
                        id = response.data.id

                        return userApi.authenticate(email, password)
                    })
                    .then(response => {
                        token = response.data.token

                        logic.__userId__ = id
                        logic.__userToken__ = token
                    })
            )

            it('should clear the session storage info to force user to logout', () => {

                logic.logoutUser()
            
                const sessionId = sessionStorage.userId
                const userToken = sessionStorage.userToken

                expect(sessionId).toBeUndefined()
                expect(userToken).toBeUndefined()
            })
        })
    })

    describe('books api', () => {
        it('should succeed searching books', () => {
            logic.searchBooks('Lord of the rings')
                .then(books => {
                    expect(books).toBeDefined()
                    expect(books instanceof Object).toBeTruthy()
            })
        })

        it('should fail on empty query', () => {
            const query = ' \t    \n'
            logic.searchBooks(query)
                .then(response =>{
                    expect(response).toBeDefined()
                    const { status } = response
                    expect(status).toBe('500')
                })
        })

        it('should fail if not find results', () => {
            const query = '2362836283'
            logic.searchBooks(query)
                .then(response =>{
                    expect(response).toBeDefined()
                    const {docs} = response
                    expect(docs.length).toBe(0)
                })
        })
    })
})
