
'use strict'

describe('logic', () => {
    describe('users', () => {
        const name = 'Lila'
        const surname = 'Petri'
        let email
        const password = '123'

        beforeEach(() => email = `marialilapetri-${Math.random()}@gmail.com`)

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
            beforeEach((done) => {logic.registerUser(name, surname, email, password,done)
                
            })
            it('should succeed on correct data', done => {
                logic.loginUser(email, password, function (response) {
                     console.log(response)   
                    expect(response).toBeDefined();

                    done()
                })
            })
            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.loginUser( email, password, () => { })).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.loginUser(email, password, () => { })).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.loginUser(email, password, () => { })).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.loginUser(email, password, () => { })).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.loginUser(nonEmail, password, () => { })).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
            })
            !true && it('should fail on no registed email', () => {
                const email = 'some-no-registered@gmail.com'

                expect(() => logic.loginUser( email, password, () => { })).toThrowError(RequirementError, `email is not optional`)
            })
            it('should fail on undefined password', () => {
                const password = undefined

                expect(() => logic.loginUser( email, password, () => { })).toThrowError(RequirementError, `password is not optional`)
            })

            it('should fail on null password', () => {
                const password = null

                expect(() => logic.loginUser(email, password, () => { })).toThrowError(RequirementError, `password is not optional`)
            })

            it('should fail on empty password', () => {
                const password = ''

                expect(() => logic.loginUser(email, password, () => { })).toThrowError(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'

                expect(() => logic.loginUser(email, password, () => { })).toThrowError(ValueError, 'password is empty')
            })
            
            
        })

        describe('retrieve', () => {
            let id
            let token
            beforeEach(done => {
                logic.registerUser(name, surname, email, password, ()=> {
                    logic.loginUser(email, password, response =>{
                            id=response.data.id
                            token=response.data.token
                            done()
                    })
                })
            })

            it('should succeed on existing user and correct email', done => {
                logic.retrieveUser(id, token, response=>{
                    expect(response).toBeDefined();
                    expect(response.name).toBe(name)
                    
                    done()
                })

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