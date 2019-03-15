require("dotenv").config()
const expect = require("expect")
const bcrypt = require("bcrypt")

const { mongoose, models: { User, Exercise, Invitation, Historical } } = require('startlab-data')
const logic = require('.')
const { env: { DB_URL } } = process


describe("logic", () => {
    before(() => mongoose.connect(DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Exercise.deleteMany(), Invitation.deleteMany(), Historical.deleteMany()])
    )

    describe('register user', () => {
        const name = 'Nico'
        const surname = 'Nico'
        const email = `nico-${Math.random()}@mail.com`
        const password = `456-${Math.random()}`
        const passwordConfirm = password

        beforeEach(() => {
            const invitation = { email, status: 'sent' }
            return Invitation.create(invitation)
        })

        it('should succeed on valid data', () => {
            return logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(id => {
                    expect(id).toBeDefined()
                    return User.findOne({ email })
                        .then(user => {
                            expect(user.name).toBe(name)
                            expect(user.surname).toBe(surname)
                            expect(user.email).toBe(email)
                            bcrypt.compare(password, user.password)
                                .then(match => {
                                    expect(match).toBeTruthy()
                                })
                        })
                        .catch(error => {
                            expect(error).not.toBeDefined()
                        })
                })
        })

        it('should fail not valid name', () => {
            expect(() => {
                logic.registerUser([], surname, email, password, passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty name', () => {
            expect(() => {
                logic.registerUser('', surname, email, password, passwordConfirm)
            }).toThrow('name cannot be empty')
        })

        it('should fail on empty surname', () => {
            expect(() => {
                logic.registerUser(name, '', email, password, passwordConfirm)
            }).toThrow('surname cannot be empty')
        })

        it('should fail on empty email', () => {
            expect(() => {
                logic.registerUser(name, surname, '', password, passwordConfirm)
            }).toThrow('email cannot be empty')
        })

        it('should fail on empty password', () => {
            expect(() => {
                logic.registerUser(name, surname, email, '', passwordConfirm)
            }).toThrow('password cannot be empty')
        })

        it('should fail on empty passwordConfirm', () => {
            expect(() => {
                logic.registerUser(name, surname, email, password, '')
            }).toThrow('password confirmation cannot be empty')
        })

        it('should fail not valid surname', () => {
            expect(() => {
                logic.registerUser(name, [], email, password, passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail not valid email', () => {
            expect(() => {
                logic.registerUser(name, surname, [], password, passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail not valid password', () => {
            expect(() => {
                logic.registerUser(name, surname, email, [], passwordConfirm)
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail not valid passwordConfirm', () => {
            expect(() => {
                logic.registerUser(name, surname, email, password, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail with different passwords', () => {
            expect(() => {
                logic.registerUser(name, surname, email, '123', '1234')
            }).toThrow(Error('passwords do not match'))
        })

        it('should fail with non-invited user', () => {
            return logic.registerUser(name, surname, 'non-invited-user@gmail.com', password, passwordConfirm)
                .then(() => {
                    console.log('should fail with non-invited user - it should not passed over here')
                })
                .catch(({ message }) => expect(message).toBe('only invited users can registered'))
        })

        it('should fail on existing user', () => {
            return logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(id => {
                    return logic.registerUser(name, surname, email, password, passwordConfirm)
                        .then(() => {

                        })
                        .catch(error => {
                            expect(error).toBeDefined()
                            expect(error.message).toBe(`user with email ${email} already exists`)
                        })
                })
                .catch(error => {
                    expect(error).not.toBeDefined()
                })
        })
    })

    describe('fill exercises to user', () => {
        
        it('should fail on empty email', () => {
            expect(() => {
                logic.__fillExercisesToUser__('')
            }).toThrow('userId cannot be empty')
        })

        it('should fail on not valid userId', () => {
            expect(() => {
                logic.__fillExercisesToUser__([])
            }).toThrow([] + ' is not a string')
        })
    })


    describe('is email invited', () => {
        
        it('should fail on empty email', () => {
            expect(() => {
                logic.__isEmailInvited__('')
            }).toThrow('email cannot be empty')
        })

        it('should fail on not valid email', () => {
            expect(() => {
                logic.__isEmailInvited__([])
            }).toThrow( [] + ' is not a string')
        })
    })


    after(() =>
        Promise.all([
            User.deleteMany(), Exercise.deleteMany(), Invitation.deleteMany(), Historical.deleteMany()]).then(() =>
                mongoose.disconnect()
            )
    )

})

        // it('should fail on undefined name', () => {
        //     const name = undefined
        //     const surname = "Barzi"
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(name + " is not a string"))
        // })

        // it("should fail on numeric name", () => {
        //     const name = 10
        //     const surname = "Barzi"
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(name + " is not a string"))
        // })

        // it("should fail on boolean name", () => {
        //     const name = true
        //     const surname = "Barzi"
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(name + " is not a string"))
        // })

        // it("should fail on object name", () => {
        //     const name = {}
        //     const surname = "Barzi"
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(name + " is not a string"))
        // })

        // it("should fail on array name", () => {
        //     const name = []
        //     const surname = "Barzi"
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(name + " is not a string"))
        // })

        // it("should fail on empty name", () => {
        //     const name = ""
        //     const surname = "Barzi"
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(Error("name is empty or blank"))
        // })

        // it("should fail on undefined surname", () => {
        //     const name = "Manuel"
        //     const surname = undefined
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(surname + " is not a string"))
        // })

        // it("should fail on numeric surname", () => {
        //     const name = "Manuel"
        //     const surname = 10
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(surname + " is not a string"))
        // })

        // it("should fail on boolean surname", () => {
        //     const name = "Manuel"
        //     const surname = false
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(surname + " is not a string"))
        // })

        // it("should fail on object surname", () => {
        //     const name = "Manuel"
        //     const surname = {}
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(surname + " is not a string"))
        // })

        // it("should fail on array surname", () => {
        //     const name = "Manuel"
        //     const surname = []
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(surname + " is not a string"))
        // })

        // it("should fail on empty surname", () => {
        //     const name = "Manuel"
        //     const surname = ""
        //     const email = "manuelbarzi@mail.com"
        //     const password = `123-${Math.random()}`

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(Error("surname is empty or blank"))
        // })



    // describe("authenticate user", () => {
    //     const name = "Manuel"
    //     const surname = "Barzi"
    //     const email = `manuelbarzi-${Math.random()}@mail.com`
    //     const password = `123-${Math.random()}`

    //     beforeEach(() =>
    //         bcrypt
    //             .hash(password, 10)
    //             .then(hash => User.create({ name, surname, email, password: hash }))
    //     )

    //     it("should succeed on correct credentials", () =>
    //         logic
    //             .authenticateUser(email, password)
    //             .then(id => expect(id).toBeDefined()))
    // })

    // describe("retrieve user", () => {
    //     const name = "Manuel"
    //     const surname = "Barzi"
    //     const email = `manuelbarzi-${Math.random()}@mail.com`
    //     const password = `123-${Math.random()}`

    //     let userId

    //     beforeEach(() =>
    //         bcrypt
    //             .hash(password, 10)
    //             .then(hash => User.create({ name, surname, email, password: hash }))
    //             .then(({ id }) => (userId = id))
    //     )

    //     it("should succeed on correct credentials", () =>
    //         logic.retrieveUser(userId).then(user => {
    //             expect(user.id).toBe(userId)
    //             expect(user.name).toBe(name)
    //             expect(user.surname).toBe(surname)
    //             expect(user.email).toBe(email)

    //             expect(user.save).toBeUndefined()
    //         }))
    // })


