'use strict'

describe('logic', () => {
    const name = 'Peter'
    const surname = 'Seller'
    const email = 'peterseller@gmail.com'
    const password = '123'

    beforeEach(() => {
        users.length = 0
    })

    describe('users', () => {
        describe('register', () => {
            it('should succeed on correct data', () => {
                const user = {
                    name: name,
                    surname: surname,
                    email: email,
                    password: password
                }

                const currentUsersCount = users.length

                logic.register(name, surname, email, password)

                expect(users.length).toBe(currentUsersCount + 1)

                const lastUser = users[users.length - 1]
                expect(lastUser).toEqual(user)
            })

            it('should fail on undefined name', () => {
                expect(() => {
                    logic.register(undefined, surname, email, password)
                }).toThrowError(TypeError, 'undefined is not a valid name')
            })
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
                logic.login(email, password)

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
                expect(_error.code).toBe(1)
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
                expect(_error.code).toBe(1)
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