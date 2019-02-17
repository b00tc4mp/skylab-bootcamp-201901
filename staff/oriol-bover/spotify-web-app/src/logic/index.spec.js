const Logic = require('.')
const { expect } = require('chai')

describe('logic', () => {
    describe('register user', () => {
        const name = 'Manolo'
        const surname = 'Skywalker'
        const email = `register@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password
        const logic = new Logic

        it('should succeed on valid data', () =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(result => expect(result).not.to.exist)
        )

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Skywalker'
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.Throw(TypeError, name + ' is not a string')
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Skywalker'
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.Throw(TypeError, name + ' is not a string')
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Skywalker'
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.Throw(TypeError, name + ' is not a string')
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Skywalker'
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.Throw(TypeError, name + ' is not a string')
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Skywalker'
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.Throw(TypeError, name + ' is not a string')
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Skywalker'
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.Throw(Error, 'name cannot be empty')
        })

        it('should fail on undefined surname', () => {
            const name = 'Manolo'
            const surname = undefined
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.Throw(TypeError, surname + ' is not a string')
        })

        it('should fail on numeric surname', () => {
            const name = 'Manolo'
            const surname = 10
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.Throw(TypeError, surname + ' is not a string')
        })


        it('should fail on boolean surname', () => {
            const name = 'Manolo'
            const surname = false
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.Throw(TypeError, surname + ' is not a string')
        })

        it('should fail on object surname', () => {
            const name = 'Manolo'
            const surname = {}
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.Throw(TypeError, surname + ' is not a string')
        })

        it('should fail on array surname', () => {
            const name = 'Manolo'
            const surname = []
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.Throw(TypeError, surname + ' is not a string')
        })

        it('should fail on empty surname', () => {
            const name = 'Manolo'
            const surname = ''
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.Throw(Error, 'surname cannot be empty')
        })


    })

    describe('retrieve user', () => {
        const name = 'Manolo'
        const surname = 'Skywalker'
        const password = '123'
        const passwordConfirm = password
        const logic = new Logic
        let email

        beforeEach(() => {
            email = `retrieve@mail.com-${Math.random()}`
            return logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.loginUser(email, password))
        })

        it('should succeed on correct credentials', () =>
            logic.retrieveUser()
                .then(user => {
                    expect(user.id).to.equal(logic.__storage__.userId)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                })
        )

        it('should fail on undefined', () => {

            try {
                logic.retrieveUser()

            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`undefined is not a string`)
            }
        })

        it('should fail on empty string', () => {

            try {
                logic.retrieveUser('')

            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`undefined is not a string`)
            }
        })
    })



    describe('login user', () => {

        const name = 'Manolo'
        const surname = 'Skywalker'
        const password = '123'
        const passwordConfirm = password
        const logic = new Logic
        let email

        beforeEach(() => {
            email = `retrieve@mail.com-${Math.random()}`
            return logic.registerUser(name, surname, email, password, passwordConfirm)
        })

        it('login should succeed on correct credentials', () => {

            return logic.loginUser(email, password)
                .then(() => {
                    expect(logic.__storage__.userId).to.exist
                    expect(logic.__storage__.userApiToken).to.exist
                    expect(logic.isUserLoggedIn).to.equal(true)
                })
        })

        it('should fail on a wrong email', () => {

            const em = `login@fake.com`
            const pass = '123'

            return logic.loginUser(em, pass).catch(error => {
                expect(error).to.exist
            })


        })

        it('should fail on undefined', () => {

            try {
                logic.loginUser()

            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`undefined is not a string`)
            }
        })


        it('should fail if email is empty', () => {

            const email = ''
            const password = '123'

            try {
                logic.loginUser(email, password)

            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal('email cannot be empty')
            }
        })

        it('should fail if password is empty', () => {

            const email = `login@fake.com`
            const password = ''

            try {
                logic.loginUser(email, password)

            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal('password cannot be empty')
            }
        })
    })

    describe('updateUser', () => {

        let name = 'Manolo'
        let surname = 'Skywalker'
        let email
        let password = '123'
        let passwordConfirm = '123'
        const logic = new Logic
        let data = { data: 'data' }

        beforeEach(() => {

            email = `check@favourite.com-${Math.random()} `
            return logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.loginUser(email, password))

        })


        it(`should be undefined with { data: 'data' } as a variable`, () => {
            try {
                logic.updateUser(data)
            } catch (error) {
                expect(error).to.exist
            }
        }
        )


        it('should fail on empty string', () => {

            try {
                logic.updateUser('')
            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal('is not an Object')

            }
        })

        it('should fail on undefined', () => {

            try {
                logic.updateUser()
            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`Cannot read property 'constructor' of undefined`)

            }
        })
    })
})