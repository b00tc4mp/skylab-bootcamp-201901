import logic from '.'
import ticketmasterApi from '../ticketmaster-api/'

describe('logic', () => {
    describe('register user', () => {
        const name = 'Manolo'
        const surname = 'Skywalker'
        const email = `register@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', () =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(result => expect(result).toBeUndefined())
        )

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Skywalker'
            const email = 'manoloskywalker@mail.com'
            const password = '123'
            debugger
            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Skywalker'
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Skywalker'
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Skywalker'
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Skywalker'
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Skywalker'
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Manolo'
            const surname = undefined
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Manolo'
            const surname = 10
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'Manolo'
            const surname = false
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Manolo'
            const surname = {}
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Manolo'
            const surname = []
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Manolo'
            const surname = ''
            const email = 'manoloskywalker@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('surname cannot be empty'))
        })


    })

    describe('retrieve user', () => {
        const name = 'Manolo'
        const surname = 'Skywalker'
        const password = '123'
        const passwordConfirm = password
        let email

        beforeEach(() => {
            email = `retrieve@mail.com-${Math.random()}`
            return logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.loginUser(email, password))
        })

        it('should succeed on correct credentials', () =>
            logic.retrieveUser()
                .then(user => {
                    expect(user.id).toBe(logic.__userId__)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        )
    })


    describe('login user', () => {

        const name = 'Manolo'
        const surname = 'Skywalker'
        const password = '123'
        const passwordConfirm = password
        let email

        beforeEach(() => {
            email = `retrieve@mail.com-${Math.random()}`
            return logic.registerUser(name, surname, email, password, passwordConfirm)
        })

        it('login should succeed on correct credentials', () => {

            return logic.loginUser(email, password)
                .then(() => {
                    expect(logic.__userId__).toBeDefined()
                    expect(logic.__userApiToken__).toBeDefined()
                })
        })

        it('should fail on a wrong email', () => {

            const em = `login@fake.com`
            const pass = '123'

            return logic.loginUser(em, pass).catch(error => {
                expect(error).toBeDefined()
            })


        })

        it('should fail on undefined', () => {

            try {
                logic.loginUser()

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })


        it('should fail if email is empty', () => {

            const email = ''
            const password = '123'

            try {
                logic.loginUser(email, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('email cannot be empty')
            }
        })

        it('should fail if password is empty', () => {

            const email = `login@fake.com`
            const password = ''

            try {
                logic.loginUser(email, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('password cannot be empty')
            }
        })
    })

    describe('retrieveEvents', () => {

        const query = 'barcelona'
        const startDate = '2019-06-01'
        const endDate = '2019-08-01'

        it('should be defined', () =>
            logic.retrieveEvents(query, startDate, endDate)
                .then(events => {
                    expect(events).toBeDefined()
                })
        )

        it('should succeed without dates', () => {
            const query = 'barcelona'
            const startDate = null
            const endDate = null
            logic.retrieveEvents(query, startDate, endDate)
                .then(events => {
                    expect(events).toBeDefined()
                })
        })

        it('should succeed with only  starDate field', () => {
            const query = 'barcelona'
            const startDate = '2019-06-01'
            const endDate = null
            logic.retrieveEvents(query, startDate, endDate)
                .then(events => {
                    expect(events).toBeDefined()
                })
        })

        it('should succeed with only  endDate field', () => {
            const query = 'barcelona'
            const startDate = null
            const endDate = '2019-06-01'
            logic.retrieveEvents(query, startDate, endDate)
                .then(events => {
                    expect(events).toBeDefined()
                })
        })

        it('should fail on undefined', () => {

            try {
                logic.retrieveEvents(query, startDate, endDate)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)

            }
        })


        it('should fail without query (city)', () => {
            const query = null
            const startDate = '2019-06-01'
            const endDate = '2019-08-01'
            try {
                logic.retrieveEvents(query, startDate, endDate)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`-->${query}<-- query introduced is not a string`)
            }
        })

        it('should fail with a made up query (city)', () => {
            const query = 'Capital City the one from the Simpsons'
            const startDate = null
            const endDate = null
            try {
                logic.retrieveEvents(query, startDate, endDate)
            } catch (error) {
                expect(error).toBeDefined()
            }
        })

        it('should succeed in returning a degined error', () => {
            const query = 'Capital City the one from the Simpsons'
            const startDate = null
            const endDate = null
            try {
                logic.retrieveEvents(query, startDate, endDate)
                    .then(events => events)
                    .catch(err => console.log(err))
            } catch (error) {
                expect(error).toBeDefined()
            }
        })
    })

    describe('retrieveEvent', () => {

        it('should be defined (response & event)', () => {

            const id = 'Z698xZ2qZad5g'

            logic.retrieveEvent(id)
                .then(response => {
                    expect(response).toBeDefined()
                })
        })

        it('should fail without id', () => {
            const id = null
            try {
                logic.retrieveEvent(id)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`-->${id} <-- id introduced is not a string`)
            }
        })

        it('should fail with a made up id', () => {
            const id = 'nonsense'
            try {
                logic.retrieveEvent(id)
            } catch (error) {
                expect(error).toBeDefined()
            }
        })
    })

    describe('toggleFavourite', () => {

        let name = 'Manolo'
        let surname = 'Skywalker'
        let email
        let password = '123'
        let passwordConfirm = '123'
        let favouriteId
        let favouriteId2

        beforeEach(() => {

            email = `toggle@favourite.com-${Math.random()}`
            favouriteId = `nicememe-${Math.random()}`

            return logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.loginUser(email, password))
        })



        it('should succed on toggling a fave', () => {
            return logic.toggleFavourite(favouriteId)
                .then(response => {
                    expect(response).toBe(true)
                })
        })

        it('should succed on toggling 2 diferent faves', () => {
            favouriteId2 = `nicememe2 - ${Math.random()} `

            return logic.toggleFavourite(favouriteId)
                .then(() => logic.toggleFavourite(favouriteId2))
                .then(response => { expect(response).toBe(true) })
        })

        it('should succed on dissable toogle', () => {

            return logic.toggleFavourite(favouriteId)
                .then(() => logic.toggleFavourite(favouriteId))
                .then(response => { expect(response).toBe(false) })
        })

        it('should fail on dissable toogle', () => {
            favouriteId2 = `nicememe2 - ${Math.random()} `

            return logic.toggleFavourite(favouriteId)
                .then(() => logic.toggleFavourite(favouriteId2))
                .then(response => { expect(response).toBe(true) })
        })
        it('should fail on undefined', () => {

            try {
                logic.toggleFavourite()
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)

            }
        })



    })

    describe('checkFavourite', () => {

        let name = 'Manolo'
        let surname = 'Skywalker'
        let email
        let password = '123'
        let passwordConfirm = '123'
        let favouriteId
        let favouriteId2

        beforeEach(() => {

            email = `check@favourite.com-${Math.random()} `
            favouriteId = `favIdToggle - ${Math.random()} `

            return logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.loginUser(email, password).then(() => logic.toggleFavourite(favouriteId)))

        })

        it('should succed on checking a fave', () => {
            return logic.checkFavourite(favouriteId)
                .then(response => {
                    expect(response).toBe(true)
                })
        })


        it('should fail on checking a fave', () => {
            favouriteId2 = `nicememe2 - ${Math.random()} `

            return logic.checkFavourite(favouriteId2)
                .then(response => {
                    expect(response).toBe(false)
                })
        })

        it('should fail on undefined', () => {

            try {
                logic.toggleFavourite()
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)

            }
        })

    })



    // TODO; updateUser, removeUser (métodos no creados?)
})


