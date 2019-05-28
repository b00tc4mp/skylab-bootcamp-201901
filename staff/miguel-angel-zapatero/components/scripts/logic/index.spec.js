'use strict'

describe('logic', () => {
    describe('users', () => {
        const name = 'Peter';
        const surname = 'Seller';
        let email;
        const password = '123';
        const confirmPassword = '123';

        beforeEach(() => email = `pseller-${Math.random()}@gmail.com`)
        //TODO 

        describe('register', () => {
            it('should succeed on correct user data', done => {
                logic.registerUser(name, surname, email, password, confirmPassword, function (error){
                    expect(error).toBeUndefined()

                    done()
                })  
            })

            describe('on already existing user', () => {
                beforeEach(done => logic.registerUser(name, surname, email, password, confirmPassword, done))

                it('should fail on retrying to register', done => {
                    logic.registerUser(name, surname, email, password, confirmPassword, function (error) {
                        expect(error).toBeDefined()

                        done()
                    })
                })
            })

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword,  () => { })).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword,() => { })).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password, confirmPassword, () => { })).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, nonEmail, password, confirmPassword, () => { })).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
            })

            //TODO FAIL CASES
        })

        describe('login', () => {
            let _id
            //aunque estemos testeando la logica podemos usar directamente la userApi.create para este caso ya que debe estar testeada de antes.
            beforeEach(done => userApi.create(name, surname, email, password, confirmPassword, function(error, response){
                _id = response.data.id

                done()
            }))

            it('should succeed on correct data', done => {
                logic.loginUser(email, password, response => {
                    expect(response).toBeUndefined();
                    
                    const { __userId__, userToken__ } = logic
                    //TODO 

                    done()
                })
            })

            it('should fail on wrong email (unexisting user)', done => {
                logic.loginUser('123@fas.com', password, response => {
                    expect(response).toBeDefined();
                    
                    done()
                })
            })

            it('should fail on wrong password (existing user)', done => {
                logic.loginUser('123@fas.com', password, response => {
                    expect(response).toBeDefined();
                    
                    done()
                })
            })

            // TODO fail cases
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