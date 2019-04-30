import logic from '.'
import { LogicError, RequirementError, ValueError, FormatError } from '../common/errors'
import userApi from '../data/user-api'
import searchBooksApi from '../data/booksearch-api'

describe('logic', () => {
    describe('users', () => {
        const alias = 'user'
        const password = '123'
        let email

        beforeEach(() => {
            email = `skybrary${Math.random()}@skybrary.com`

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
                const username = undefined

                expect(() => logic.registerUser(username,  email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const username = null

                expect(() => logic.registerUser(username,  email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const username = ''

                expect(() => logic.registerUser(username,  email, password)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const username = ' \t    \n'

                expect(() => logic.registerUser(username,  email, password)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(username,  email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(username,  email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(username,  email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(username,  email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(username,  nonEmail, password)).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
            })
        })

        describe('login user', () => {
            let id

            beforeEach(() =>
                userApi.create(email, password, username )
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
                        expect(error instanceof LogicError).toBeTruthy()

                        expect(error.message).toBe(`username with username \"${email}\" does not exist`)
                    })
            )
        })

        describe('retrieve user', () => {
            let id, token

            beforeEach(() => {
                userApi.create(username, email)
                    .then(response => {
                        id = response.data.id

                        return userApi.authenticate(email, password)
                    })
                    .then(response => {
                        toke = response.data.token

                        logic.__userId__ = id
                        logic.__userToken__ = token
                    })
            })

            it('should succceed on retrieving data from a valid user', () => {
                logic.registerUser(id, token)
                    .then(user =>{
                        expect(user).toBeDefined
                        expect(user.alias).toBe(alias)
                        expect(user.relatedBooks).toBe(relatedBooks)
                        expect(user.password).toBeUndefined()
                    })
            })

            it('should fail if id is not correct', () => {
                logic.__userId__ = '2535235lkh5lh3k532l532'

                return logic.retrieveUser()
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()

                        expect(error.message).toBe(`token id \"${id}\" does not match user \"${logic.__userId__}\"`)
                    })
            })
        })
    })
})