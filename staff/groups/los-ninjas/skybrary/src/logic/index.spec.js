import logic from '.'
import { LogicError, RequirementError, ValueError, FormatError } from '../common/errors'
import userApi from '../data/user-api'
// import searchBooksApi from '../data/booksearch-api'

describe('logic', () => {
    describe('users', () => {
        let alias = 'user'
        let password = '123'
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
            it('should fail on empty password', () => {
                const nonPassword = ' \t    \n'

                expect(() => logic.registerUser(alias, email, nonPassword)).toThrowError(ValueError, 'is empty')
            })
            it('should fail on undefined password', () => {
                const password2 = undefined

                expect(() => logic.registerUser(alias, email, password2)).toThrowError(RequirementError, `password is not optional`)
            })
            it('should fail on null password', () => {
                const password3 = null

                expect(() => logic.registerUser(alias, email, password3)).toThrowError(RequirementError, `password is not optional`)
            })
            it('should fail on empty password', () => {
                const password4 = ''

                expect(() => logic.registerUser(alias, email, password4)).toThrowError(ValueError, 'password is empty')
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

            it('should fail on incorrect password', () => {
                const incorrectPassword = '777'
                return logic.loginUser(email, incorrectPassword)
                    .then(() => { throw Error('should not reach this point')})
                    .catch(error => {
                        expect(error).toBeDefined()
                    })
            })
            
            it('should fail on empty password', () => {
                const emptyPassword = ' \t    \n'
                expect(() => logic.loginUser(email, emptyPassword)).toThrowError(ValueError, 'password is empty')
            })
            it('should fail on undefined password', () => {
                const undefinedPassword = undefined
                expect(() => logic.loginUser(email, undefinedPassword)).toThrowError(Error, 'password is undefined')
            })
            it('should fail on null password', () => {
                const nullPassword = null
                expect(() => logic.loginUser(email, nullPassword)).toThrowError(Error, 'password is null')
            })
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
            it('should fail on incorrect user token', () => {
                logic.__userToken__ = '5cb9998f2e59ee0009eac02c'

                return logic.retrieveUser()
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()
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

        it('should fail on undefined query', () => {
            const undefinedQuery = undefined
            expect(() => logic.searchBooks(undefinedQuery)).toThrowError(RequirementError, 'query is not optional')
        
        })
        it('should fail on undefined query', () => {
            const nullQuery = null
            expect(() => logic.searchBooks(nullQuery)).toThrowError(RequirementError, 'query is not optional')
        
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
        it('should fail if not find results', () => {
            const query = '22638962392'
            logic.searchBooks(query)
                .then(response =>{
                    expect(response).toBeDefined()
                    const {docs} = response
                    expect(docs.length).toBe(0)
                })
        })
    })


    describe('toggle fav books', () => {
        let id, token, bookIsbn
       
        let password = '123'
        let alias = 'pepito'
        let email = `skybraryrobertoelmejor.${Math.random()}@skybrary.com`
      
        
        bookIsbn = `${Math.trunc(Math.random()*10000000)}`

        beforeAll(() => {
            return userApi.create(email, password, { alias })
                .then(response => {
                    id = response.data.id

                    return userApi.authenticate(email, password)
                })
                .then(response => {
                    token = response.data.token

                    logic.__userId__ = id
                    logic.__userToken__ = token
                })
        })

        it('should succeed adding a fav book on first time', () => {
            logic.toggleFavBook(bookIsbn)
                .then(response => expect(response).toBeUndefined())
                .then(() => userApi.retrieve(id, token))
                .then(response => {
    
                    const { data: { favs } } = response

                    expect(favs).toBeDefined()
                    expect(favs instanceof Array).toBeTruthy()
                    expect(favs.length).toBe(1)
                    expect(favs[0]).toBe(bookIsbn)
                })
        })

        it('should succeed removing fav on second time', () => {
            logic.toggleFavBook(bookIsbn)
                .then(() => logic.toggleFavBook(bookIsbn))
                .then(() => userApi.retrieve(id, token))
                .then(response => {
               
                    const { data: { favs } } = response

                    expect(favs).toBeDefined()
                    expect(favs instanceof Array).toBeTruthy()
                })
                .catch(err => {
              
                })
            }
        )

        it('should fail on null book isbn', () => {
            bookIsbn = undefined;
            expect(() => logic.toggleFavBook(bookIsbn)).toThrowError(RequirementError, 'isbn is undefined')
        })
        it('should fail on null book isbn', () => {
            bookIsbn = null;
            expect(() => logic.toggleFavBook(bookIsbn)).toThrowError(RequirementError, 'isbn is null')
        })
    })
})
