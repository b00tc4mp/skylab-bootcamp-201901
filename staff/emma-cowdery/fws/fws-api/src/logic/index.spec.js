'use strict'

require ('dotenv').config()

require('isomorphic-fetch')

const { mongoose, models: { Users, Events, Chats } } = require('fws-data')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')

const  { env: { TEST_DB_URL } } = process

describe('logic', () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            Events.deleteMany(),
            Users.deleteMany(),
            Chats.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const username = `manu-${Math.random()}`
        const password = `123-${Math.random()}`
        const passwordConfirmation = password
        const howTo = true

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(name, surname, email, username, password, passwordConfirmation, howTo)

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            const user = await Users.findOne({ email })

            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)
            expect(user.howTo).toBe(howTo)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on repeated username or email', async () => {
            expect(() => {
                logic.registerUser(name, surname, email, username, password, passwordConfirmation, howTo)
            }).toThrow(Error(`user with email ${email} already exists`))
        })

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Manuel'
            const surname = undefined
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Manuel'
            const surname = 10
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'Manuel'
            const surname = false
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Manuel'
            const surname = {}
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Manuel'
            const surname = []
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email,username, password, password, howTo)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Manuel'
            const surname = ''
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(Error('surname cannot be empty'))
        })

        it('should fail on undefined email', () => {
            const name = 'Manuel'
            const surname = 'Barxi'
            const email = undefined
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const name = 'Manuel'
            const surname = 'Barxi'
            const email = 123
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(email + ' is not a string'))
        })


        it('should fail on boolean email', () => {
            const name = 'Manuel'
            const surname = 'Barxi'
            const email = true
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const name = 'Manuel'
            const surname = 'Barxi'
            const email = {}
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const name = 'Manuel'
            const surname = 'Barxi'
            const email = []
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email,username, password, password, howTo)
            }).toThrow(TypeError(email+ ' is not a string'))
        })

        it('should fail on empty email', () => {
            const name = 'Manuel'
            const surname = 'Barxi'
            const email = ''
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(Error('email cannot be empty'))
        })

        it('should fail on undefined username', () => {
            const name = 'Manuel'
            const surname = 'Barzy'
            const email = 'manuelbarzi@mail.com'
            const username = undefined
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on numeric username', () => {
            const name = 'Manuel'
            const surname = 'Barzy'
            const email = 'manuelbarzi@mail.com'
            const username = 123
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(username + ' is not a string'))
        })


        it('should fail on boolean username', () => {
            const name = 'Manuel'
            const surname = 'Barzy'
            const email = 'manuelbarzi@mail.com'
            const username = true
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on object username', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = {}
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on array username', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = []
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email,username, password, password, howTo)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on empty username', () => {
            const name = 'Manuel'
            const surname = 'Barzy'
            const email = 'manuelbarzi@mail.com'
            const username = ''
            const howTo = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(Error('username cannot be empty'))
        })

        it('should fail on undefined password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = undefined

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = 123

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(password + ' is not a string'))
        })


        it('should fail on boolean password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = false

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = {}

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = []

            expect(() => {
                logic.registerUser(name, surname, email,username, password, password, howTo)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const username = `manu-${Math.random()}`
            const howTo = true
            const password = ''

            expect(() => {
                logic.registerUser(name, surname, email, username, password, password, howTo)
            }).toThrow(Error('password cannot be empty'))
        })

        // it('should fail on undefined how to', () => {
        //     const name = 'Manuel'
        //     const surname = 'Barzi'
        //     const email = 'manuelbarzi@mail.com'
        //     const username = `manu-${Math.random()}`
        //     const howTo = undefined
        //     const password = 'undefined'

        //     expect(() => {
        //         logic.registerUser(name, surname, email, username, password, password, howTo)
        //     }).toThrow(TypeError(howTo + ' is not a boolean'))
        // })

        // it('should fail on numeric how to', () => {
        //     const name = 'Manuel'
        //     const surname = 'Barzi'
        //     const email = 'manuelbarzi@mail.com'
        //     const username = `manu-${Math.random()}`
        //     const howTo = 123
        //     const password = '123'

        //     expect(() => {
        //         logic.registerUser(name, surname, email, username, password, password, howTo)
        //     }).toThrow(TypeError(howTo + ' is not a boolean'))
        // })


        // it('should fail on string how to', () => {
        //     const name = 'Manuel'
        //     const surname = 'Barzi'
        //     const email = 'manuelbarzi@mail.com'
        //     const username = `manu-${Math.random()}`
        //     const howTo = 'true'
        //     const password = 'false'

        //     expect(() => {
        //         logic.registerUser(name, surname, email, username, password, password, howTo)
        //     }).toThrow(TypeError(howTo + ' is not a boolean'))
        // })

        // it('should fail on object how to', () => {
        //     const name = 'Manuel'
        //     const surname = 'Barzi'
        //     const email = 'manuelbarzi@mail.com'
        //     const username = `manu-${Math.random()}`
        //     const howTo = {}
        //     const password = '123'

        //     expect(() => {
        //         logic.registerUser(name, surname, email, username, password, password, howTo)
        //     }).toThrow(TypeError(howTo + ' is not a boolean'))
        // })

        // it('should fail on array how to', () => {
        //     const name = 'Manuel'
        //     const surname = 'Barzi'
        //     const email = 'manuelbarzi@mail.com'
        //     const username = `manu-${Math.random()}`
        //     const howTo = []
        //     const password = '123'

        //     expect(() => {
        //         logic.registerUser(name, surname, email,username, password, password, howTo)
        //     }).toThrow(TypeError(howTo + ' is not a boolean'))
        // })

        // it('should fail on empty how to', () => {
        //     const name = 'Manuel'
        //     const surname = 'Barzi'
        //     const email = 'manuelbarzi@mail.com'
        //     const username = `manu-${Math.random()}`
        //     const howTo = ''
        //     const password = '123'

        //     expect(() => {
        //         logic.registerUser(name, surname, email, username, password, password, howTo)
        //     }).toThrow(Error('howTo cannot be empty'))
        // })
    })

    describe('authenticate user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const username = `manu-${Math.random()}`
        const password = `123-${Math.random()}`
        const howTo = true

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => Users.create({ name, surname, email, username, password: hash, howTo }))
        )

        it('should succeed on correct credentials', () =>
            logic.authenticateUser(email, password)
                .then(id => {
                    expect(id).toBeDefined()
                })
        )

        it('should fail on undefined email', () => {
            const email = undefined
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const email = 123
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })


        it('should fail on boolean email', () => {
            const email = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const email = {}
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const email = []
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(email+ ' is not a string'))
        })

        it('should fail on empty email', () => {
            const email = ''
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error('email or username cannot be empty'))
        })

        it('should fail on undefined username', () => {
            const username = undefined
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(username, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on numeric username', () => {
            const username = 123
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(username, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })


        it('should fail on boolean username', () => {
            const username = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(username, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on object username', () => {
            const username = {}
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(username, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on array username', () => {
            const username = []
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(username, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on empty username', () => {
            const username = ''
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(username, password)
            }).toThrow(Error('email or username cannot be empty'))
        })

        it('should fail on undefined password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = undefined

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = 123

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })


        it('should fail on boolean password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = false

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = {}

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = []

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = ''

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error('password cannot be empty'))
        })
    })

    describe('retrieve user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const username = `manu-${Math.random()}`
        const password = `123-${Math.random()}`
        const howTo = true

        it('should suceed on correct data', () => {

            return bcrypt.hash(password, 10)
                .then(hash => Users.create({ name, surname, email, username, password: hash, howTo }))
                .then(() => {
                    return Users.findOne({ email })
                        .then((res) => logic.retrieveUser(res._id.toString()))
                        .then((user) => {
                            expect(user).toBeDefined()
                            expect(user.name).toBe(name)
                            expect(user.surname).toBe(surname)
                            expect(user.email).toBe(email)
                            expect(user.username).toBe(username)
                            expect(user.howTo).toBe(howTo)
                        })
                }) 
            
        })

        it('should fail on undefined user id', () => {
            const userId = undefined

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on numeric user id', () => {
            const userId = 123

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on boolean user id', () => {
            const userId = true

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on object user id', () => {
            const userId = {}

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on array user id', () => {
            const userId = []

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on empty user id', () => {
            const userId = ''

            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(TypeError('userId is empty'))
        })
    })

    // describe('remove user', () => {
    //     const name = 'Manuel'
    //     const surname = 'Barzio'
    //     const email = `manuelbarzi-${Math.random()}@mail.com`
    //     const username = `manu-${Math.random()}`
    //     const password = `123-${Math.random()}`
    //     const howTo = true

    //     // beforeEach(() => 
    //     //     bcrypt.hash(password, 10)
    //     //         .then(hash => Users.create({ name, surname, email, username, password: hash, howTo }))
    //     //         .then(() => {
    //     //             Users.findOne({email})
    //     //                 .then(({id}) => id = id)
    //     //         })

    //     //     // Users.findOne({ email })
    //     //     //     .then(() => console.log('mm'))
    //     //     //     .then(({id}) => id = id)
    //     //     //     .catch(() => console.log('errrrror'))
    //     // )

    //     it('should suceed on correct data', () => {
    //         return bcrypt.hash(password, 10)
    //             .then(hash => Users.create({ name, surname, email, username, password: hash, howTo }))
    //             .then(() => {
    //                 return Users.findOne({email})
    //                     .then((res) => logic.removeUser(res._id.toString(), password))
    //                     .then(() => Users.findOne({email})
    //                         .then(user => {
    //                             console.log(user)
    //                             expect(user).toBeUndefined()
    //                             expect(user.name).toBeUndefined()
    //                             expect(user.surname).toBeUndefined()
    //                             expect(user.email).toBeUndefined()
    //                             expect(user.username).toBeUndefined()
    //                             expect(user.howTo).toBeUndefined()
    //                         })
    //                     )
    //                 })
    //             })

    //     it('should fail on undefined user id', () => {
    //         const userId = undefined
    //         const password = `123-${Math.random()}`

    //         expect(() => {
    //             logic.removeUser(userId, password)
    //         }).toThrow(TypeError(userId + ' is not a string'))
    //     })

    //     it('should fail on numeric user id', () => {
    //         const userId = 123
    //         const password = `123-${Math.random()}`

    //         expect(() => {
    //             logic.removeUser(userId, password)
    //         }).toThrow(TypeError(userId + ' is not a string'))
    //     })

    //     it('should fail on boolean user id', () => {
    //         const userId = true
    //         const password = `123-${Math.random()}`

    //         expect(() => {
    //             logic.removeUser(userId, password)
    //         }).toThrow(TypeError(userId + ' is not a string'))
    //     })

    //     it('should fail on object user id', () => {
    //         const userId = {}
    //         const password = `123-${Math.random()}`

    //         expect(() => {
    //             logic.removeUser(userId, password)
    //         }).toThrow(TypeError(userId + ' is not a string'))
    //     })

    //     it('should fail on array user id', () => {
    //         const userId = []
    //         const password = `123-${Math.random()}`

    //         expect(() => {
    //             logic.removeUser(userId, password)
    //         }).toThrow(TypeError(userId + ' is not a string'))
    //     })

    //     it('should fail on empty user id', () => {
    //         const userId = ''
    //         const password = `123-${Math.random()}`

    //         expect(() => {
    //             logic.removeUser(userId, password)
    //         }).toThrow(TypeError(userId + ' is not a string'))
    //     })

    //     it('should fail on undefined password', () => {
    //         const userId = 'mksmdkdmkemdaskmda'
    //         const password = undefined

    //         expect(() => {
    //             logic.removeUser(userId, password)
    //         }).toThrow(TypeError(password + ' is not a string'))
    //     })

    //     it('should fail on numeric password', () => {
    //         const userId = 'mksmdkdmkemdaskmda'
    //         const password = 123

    //         expect(() => {
    //             logic.removeUser(userId, password)
    //         }).toThrow(TypeError(password + ' is not a string'))
    //     })


    //     it('should fail on boolean password', () => {
    //         const userId = 'mksmdkdmkemdaskmda'
    //         const password = false

    //         expect(() => {
    //             logic.removeUser(userId, password)
    //         }).toThrow(TypeError(password + ' is not a string'))
    //     })

    //     it('should fail on object password', () => {
    //         const userId = 'mksmdkdmkemdaskmda'
    //         const password = {}

    //         expect(() => {
    //             logic.removeUser(userId, password)
    //         }).toThrow(TypeError(password + ' is not a string'))
    //     })

    //     it('should fail on array password', () => {
    //         const userId = 'mksmdkdmkemdaskmda'
    //         const password = []

    //         expect(() => {
    //             logic.removeUser(userId, password)
    //         }).toThrow(TypeError(password + ' is not a string'))
    //     })

    //     it('should fail on empty password', () => {
    //         const userId = 'mksmdkdmkemdaskmda'
    //         const password = ''

    //         expect(() => {
    //             logic.removeUser(userId, password)
    //         }).toThrow(Error('password cannot be empty'))
    //     })
    // })
    describe('update profile picture', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const username = `manu-${Math.random()}`
        const password = `123-${Math.random()}`
        const howTo = true

        const url = 'lalalalallalalalalalala.com'

        it('should succeed on correct data', () => {
            return bcrypt.hash(password, 10)
                .then(hash => Users.create({ name, surname, email, username, password: hash, howTo }))
                .then(() => {
                    return Users.findOne({email})
                        .then((res) => logic.updateProfilePicture(res._id.toString(), url))
                        .then((user) => {
                            expect(user).toBeDefined()
                            expect(user.name).toBe(name)
                            expect(user.surname).toBe(surname)
                            expect(user.email).toBe(email)
                            expect(user.username).toBe(username)
                            expect(user.howTo).toBe(howTo)
                        })
                })
        })

        //should fail
    })

    describe('create event', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const username = `manu-${Math.random()}`
        const password = `123-${Math.random()}`
        const howTo = true

        const restaurantId = '998w9e8r90eqee'
        const eventTime = '13:30'
        const eventDate = '06/09/2019'
        const reservationName = 'pepito'
        const restaurantCategory = 'Tapas'
        const eventLocation = [222222, 222222]
        const priceLevel = 2
        const rating = 3
        const restaurantName = 'mimi'

        it('should succeed on correct data', () => {
            return bcrypt.hash(password, 10)
                .then(hash => Users.create({ name, surname, email, username, password: hash, howTo }))
                .then(() => {
                    return Users.findOne({email})
                        .then((res) => logic.createEvent(restaurantId, res._id.toString(), eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating, restaurantName))
                        .then((id) => {
                            expect(id).toBeDefined()
                        })
                        .then(() => Events.findOne({restaurantId}))
                        .then((event) => {
                            expect(event.restaurantId).toBe(restaurantId)
                            expect(event.eventTime).toBe(eventTime)
                            expect(event.reservationName).toBe(reservationName)
                            expect(event.restaurantCategory).toBe(restaurantCategory)
                            expect(event.eventLocation[0]).toBe(eventLocation[0])
                            expect(event.eventLocation[1]).toBe(eventLocation[1])
                            expect(event.priceLevel).toBe(priceLevel)
                            expect(event.rating).toBe(rating)
                        })
                })
        })

        it('should fail on undefined restaurant id', () => {
            const restaurantId = undefined
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${restaurantId} is not a string`))
        })

        it('should fail on numeric restaurant id', () => {
            const restaurantId = 123
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${restaurantId} is not a string`))
        })

        it('should fail on boolean restaurant id', () => {
            const restaurantId = true
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${restaurantId} is not a string`))
        })

        it('should fail on object restaurant id', () => {
            const restaurantId = {}
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`[object Object] is not a string`))
        })

        it('should fail on array restaurant id', () => {
            const restaurantId = []
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${restaurantId} is not a string`))
        })

        it('should fail on empty restaurant id', () => {
            const restaurantId = ''
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error('restaurantId is empty'))
        })

        //userId

        it('should fail on undefined user id', () => {
            const restaurantId = 'djbjadvnjsfknvsjk'
            const userId = undefined
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on numeric user id', () => {
            const restaurantId = 'dknakd32231'
            const userId = 123
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on boolean user id', () => {
            const restaurantId = 'nsmn 3j54nj3fe'
            const userId = true
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on objerct user id', () => {
            const restaurantId = 'sd3vcvs'
            const userId = {}
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on array user id', () => {
            const restaurantId = '235ng'
            const userId = []
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on empty user id', () => {
            const restaurantId = 'm2n3m1243 c'
            const userId = ''
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error('userId is empty'))
        })

        //time

        it('should fail on undefined event time', () => {
            const restaurantId = 'undefined'
            const userId = '23nx8d1347241sm'
            const eventTime = undefined
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${eventTime} is not a string`))
        })

        it('should fail on numeric event time', () => {
            const restaurantId = '23'
            const userId = '23nx8d1347241sm'
            const eventTime = 123
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${eventTime} is not a string`))
        })

        it('should fail on boolean event time', () => {
            const restaurantId = 'true'
            const userId = '23nx8d1347241sm'
            const eventTime = true
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${eventTime} is not a string`))
        })

        it('should fail on objerct event time', () => {
            const restaurantId = '12n4fj3c2'
            const userId = '23nx8d1347241sm'
            const eventTime = {}
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${eventTime} is not a string`))
        })

        it('should fail on array event time', () => {
            const restaurantId = 'ascaksc'
            const userId = '23nx8d1347241sm'
            const eventTime = []
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${eventTime} is not a string`))
        })

        it('should fail on empty event time', () => {
            const restaurantId = 'osd9d8'
            const userId = '23nx8d1347241sm'
            const eventTime = ''
            const reservationName = 'pepito'
            const eventDate = '06/09/2019'
            const restaurantCategory = 'Tapas'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error('eventTime is empty'))
        })

        //date
        
        // it('should fail on undefined event date', () => {
        //     const restaurantId = 'undefined'
        //     const userId = '23nx8d1347241sm'
        //     const eventTime = '13:30'
        //     const reservationName = 'pepito'
        //     const eventDate = undefined
        //     const restaurantCategory = 'Tapas'
        //     const eventLocation = [222222, 222222]
        //     const priceLevel = 2
        //     const rating = 3

        //     expect(() => {
        //         logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
        //     }).toThrow(Error(`${eventDate} is not a string`))
        // })

        // it('should fail on numeric event date', () => {
        //     const restaurantId = '123'
        //     const userId = '23nx8d1347241sm'
        //     const eventTime = '13:30'
        //     const reservationName = 'pepito'
        //     const eventDate = 123
        //     const restaurantCategory = 'Tapas'
        //     const eventLocation = [222222, 222222]
        //     const priceLevel = 2
        //     const rating = 3

        //     expect(() => {
        //         logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
        //     }).toThrow(Error(`${eventDate} is not a string`))
        // })

        // it('should fail on boolean event date', () => {
        //     const restaurantId = 'true'
        //     const userId = '23nx8d1347241sm'
        //     const eventTime = '13:30'
        //     const reservationName = 'pepito'
        //     const eventDate = true
        //     const restaurantCategory = 'Tapas'
        //     const eventLocation = [222222, 222222]
        //     const priceLevel = 2
        //     const rating = 3

        //     expect(() => {
        //         logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
        //     }).toThrow(Error(`${eventDate} is not a string`))
        // })

        // it('should fail on objerct event date', () => {
        //     const restaurantId = '{}'
        //     const userId = '23nx8d1347241sm'
        //     const eventTime = '13:30'
        //     const reservationName = 'pepito'
        //     const eventDate = {}
        //     const restaurantCategory = 'Tapas'
        //     const eventLocation = [222222, 222222]
        //     const priceLevel = 2
        //     const rating = 3

        //     expect(() => {
        //         logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
        //     }).toThrow(Error(`${eventDate} is not a string`))
        // })

        // it('should fail on array event date', () => {
        //     const restaurantId = '[]'
        //     const userId = '23nx8d1347241sm'
        //     const eventTime = '13:30'
        //     const reservationName = 'pepito'
        //     const eventDate = []
        //     const restaurantCategory = 'Tapas'
        //     const eventLocation = [222222, 222222]
        //     const priceLevel = 2
        //     const rating = 3

        //     expect(() => {
        //         logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
        //     }).toThrow(Error(`${eventDate} is not a string`))
        // })

        // it('should fail on empty event date', () => {
        //     const restaurantId = ' cm4cm2r3'
        //     const userId = '23nx8d1347241sm'
        //     const eventTime = '13:30'
        //     const reservationName = 'pepito'
        //     const eventDate = ''
        //     const restaurantCategory = 'Tapas'
        //     const eventLocation = [222222, 222222]
        //     const priceLevel = 2
        //     const rating = 3

        //     expect(() => {
        //         logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
        //     }).toThrow(Error('eventDate is empty'))
        // })

        // restaurant category

        it('should fail on undefined restaurant category', () => {
            const restaurantId = 'undefined'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = 'undefined'
            const restaurantCategory = undefined
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${restaurantCategory} is not a string`))
        })

        it('should fail on numeric restaurant category', () => {
            const restaurantId = '123'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '123'
            const restaurantCategory = 123
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${restaurantCategory} is not a string`))
        })

        it('should fail on boolean restaurant category', () => {
            const restaurantId = 'true'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = 'true'
            const restaurantCategory = true
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${restaurantCategory} is not a string`))
        })

        it('should fail on objerct restaurant category', () => {
            const restaurantId = '{}'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '{}'
            const restaurantCategory = {}
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${restaurantCategory} is not a string`))
        })

        it('should fail on array restaurant category', () => {
            const restaurantId = '[]'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '[]'
            const restaurantCategory = []
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${restaurantCategory} is not a string`))
        })

        it('should fail on empty restaurant category', () => {
            const restaurantId = ' cm4cm2r3'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = 'lslasl'
            const restaurantCategory = ''
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error('restaurantCategory cannot be empty'))
        })

        // event location

        it('should fail on undefined event Location', () => {
            const restaurantId = 'undefined'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = 'undefined'
            const restaurantCategory = 'undefined'
            const eventLocation = undefined
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error("Cannot read property 'constructor' of undefined"))
        })

        it('should fail on numeric event Location', () => {
            const restaurantId = '123'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '123'
            const restaurantCategory = '123'
            const eventLocation = 123
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${eventLocation} is not an array`))
        })

        it('should fail on boolean event Location', () => {
            const restaurantId = 'true'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = 'true'
            const restaurantCategory = 'true'
            const eventLocation = true
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${eventLocation} is not an array`))
        })

        it('should fail on objerct event Location', () => {
            const restaurantId = '{}'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '{}'
            const restaurantCategory = '{}'
            const eventLocation = {}
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${eventLocation} is not an array`))
        })

        it('should fail on string for event Location', () => {
            const restaurantId = '[]'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '[]'
            const restaurantCategory = '[]'
            const eventLocation = 'smsmsm'
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${eventLocation} is not an array`))
        })

        it('should fail on empty event Location', () => {
            const restaurantId = ' cm4cm2r3'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = 'lslasl'
            const restaurantCategory = 'sdmsad'
            const eventLocation = ''
            const priceLevel = 2
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(eventLocation + ' is not an array'))
        })

        // price Level

        it('should fail on undefined price level', () => {
            const restaurantId = 'undefined'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = 'undefined'
            const restaurantCategory = 'undefined'
            const eventLocation = [222222, 222222]
            const priceLevel = undefined
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${priceLevel} is not a number`))
        })

        it('should fail on string for price level', () => {
            const restaurantId = '123'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '123'
            const restaurantCategory = '123'
            const eventLocation = [222222, 222222]
            const priceLevel = 'dksdmksm'
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${priceLevel} is not a number`))
        })

        it('should fail on boolean price level', () => {
            const restaurantId = 'true'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = 'true'
            const restaurantCategory = 'true'
            const eventLocation = [222222, 222222]
            const priceLevel = true
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${priceLevel} is not a number`))
        })

        it('should fail on object price level', () => {
            const restaurantId = '{}'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '{}'
            const restaurantCategory = '{}'
            const eventLocation = [222222, 222222]
            const priceLevel = {}
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${priceLevel} is not a number`))
        })

        it('should fail on srray for price level', () => {
            const restaurantId = '[]'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '[]'
            const restaurantCategory = '[]'
            const eventLocation = [222222, 222222]
            const priceLevel = []
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${priceLevel} is not a number`))
        })

        it('should fail on empty price level', () => {
            const restaurantId = ' cm4cm2r3'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = 'lslasl'
            const restaurantCategory = 'sdmsad'
            const eventLocation = [222222, 222222]
            const priceLevel = ''
            const rating = 3

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${priceLevel} is not a number`))
        })

        // rating

        it('should fail on undefined rating', () => {
            const restaurantId = 'undefined'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = 'undefined'
            const restaurantCategory = 'undefined'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = undefined

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${rating} is not a number`))
        })

        it('should fail on string for rating', () => {
            const restaurantId = '123'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '123'
            const restaurantCategory = '123'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = 'dkmsdkm'

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${rating} is not a number`))
        })

        it('should fail on boolean rating', () => {
            const restaurantId = 'true'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = 'true'
            const restaurantCategory = 'true'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = true

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${rating} is not a number`))
        })

        it('should fail on object rating', () => {
            const restaurantId = '{}'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '{}'
            const restaurantCategory = '{}'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = {}

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${rating} is not a number`))
        })

        it('should fail on srray for rating', () => {
            const restaurantId = '[]'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = '[]'
            const restaurantCategory = '[]'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = []

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${rating} is not a number`))
        })

        it('should fail on empty rating', () => {
            const restaurantId = ' cm4cm2r3'
            const userId = '23nx8d1347241sm'
            const eventTime = '13:30'
            const reservationName = 'pepito'
            const eventDate = 'lslasl'
            const restaurantCategory = 'sdmsad'
            const eventLocation = [222222, 222222]
            const priceLevel = 2
            const rating = ''

            expect(() => {
                logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating)
            }).toThrow(Error(`${rating} is not a number`))
        })
    })

    describe('join event', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const username = `manu-${Math.random()}`
        const password = `123-${Math.random()}`
        const howTo = true

        const restaurantId = '998w9e8r90eqee'
        const eventTime = '13:30'
        const eventDate = '06/09/2019'
        const reservationName = 'pepito'
        const restaurantCategory = 'Tapas'
        const eventLocation = [222222, 222222]
        const priceLevel = 2
        const rating = 3
        const restaurantName = 'mimi'

        it('should suceed on correct data', () => {
            let userId
            let eventId
            return bcrypt.hash(password, 10)
                .then(hash => Users.create({ name, surname, email, username, password: hash, howTo }))
                .then(() => {
                    return Users.findOne({email})
                        .then((res) => userId = res._id.toString())
                        .then(() => Events.create({ restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating, restaurantName, participants: [userId] }))
                        .then(({id}) => eventId = id)
                        .then(() => logic.joinEvent(eventId, userId))
                        .then((event) => {
                            expect(event.restaurantId).toBe(restaurantId)
                            expect(event.eventTime).toBe(eventTime)
                            expect(event.reservationName).toBe(reservationName)
                            expect(event.restaurantCategory).toBe(restaurantCategory)
                            expect(event.eventLocation[0]).toBe(eventLocation[0])
                            expect(event.eventLocation[1]).toBe(eventLocation[1])
                            expect(event.priceLevel).toBe(priceLevel)
                            expect(event.rating).toBe(rating)
                        })
                })
        })

        it('should fail on undefined event id', () => {
            const eventId = undefined
            const userId = 'kdksfmdsknfjsdfnc'

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on numeric event id', () => {
            const eventId = 123
            const userId = 'kdksfmdsknfjsdfnc'

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on boolean event id', () => {
            const eventId = true
            const userId = 'kdksfmdsknfjsdfnc'

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on object event id', () => {
            const eventId = {}
            const userId = 'kdksfmdsknfjsdfnc'

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on array event id', () => {
            const eventId = []
            const userId = 'kdksfmdsknfjsdfnc'

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on empty event id', () => {
            const eventId = ''
            const userId = 'kdksfmdsknfjsdfnc'

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error('eventId is empty'))
        })

        it('should fail on undefined user id', () => {
            const eventId = 'undefined'
            const userId = undefined

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on numeric user id', () => {
            const eventId = '123'
            const userId = 123

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on boolean user id', () => {
            const eventId = 'true'
            const userId = true

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on object user id', () => {
            const eventId = '{}'
            const userId = {}

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on array user id', () => {
            const eventId = '[]'
            const userId = []

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on empty user id', () => {
            const eventId = 'asjndjafnad'
            const userId = ''

            expect(() => {
                logic.joinEvent(eventId, userId)
            }).toThrow(Error('userId is empty'))
        })
    })

    describe('user events', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const username = `manu-${Math.random()}`
        const password = `123-${Math.random()}`
        const howTo = true

        const restaurantId = '998w9e8r90eqee'
        const eventTime = '13:30'
        const eventDate = '06/09/2019'
        const reservationName = 'pepito'
        const restaurantCategory = 'Tapas'
        const eventLocation = [222222, 222222]
        const priceLevel = 2
        const rating = 3
        const restaurantName = 'mimi'

        it('shound succeed on correct date', () => {
            let userId
            let eventId
            return bcrypt.hash(password, 10)
                .then(hash => Users.create({ name, surname, email, username, password: hash, howTo }))
                .then(() => {
                    return Users.findOne({email})
                        .then((res) => userId = res._id.toString())
                        .then(() => Events.create({ restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating, restaurantName, participants: [userId] }))
                        .then(({id}) => eventId = id)
                        .then(() => Users.findByIdAndUpdate(userId, {events: [eventId]}))
                        .then(() => logic.userEvents(userId))
                        .then(event => {
                            expect(event[0].restaurantId).toBe(restaurantId)
                            expect(event[0].eventTime).toBe(eventTime)
                            expect(event[0].reservationName).toBe(reservationName)
                            expect(event[0].restaurantCategory).toBe(restaurantCategory)
                            expect(event[0].eventLocation[0]).toBe(eventLocation[0])
                            expect(event[0].eventLocation[1]).toBe(eventLocation[1])
                            expect(event[0].priceLevel).toBe(priceLevel)
                            expect(event[0].rating).toBe(rating)
                        })
                })
        })

        it('should fail on undefined user id', () => {
            const userId = undefined

            expect(() => {
                logic.userEvents(userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on numeric user id', () => {
            const userId = 123

            expect(() => {
                logic.userEvents(userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on boolean user id', () => {
            const userId = true

            expect(() => {
                logic.userEvents(userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on object user id', () => {
            const userId = {}

            expect(() => {
                logic.userEvents(userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on array user id', () => {
            const userId = []

            expect(() => {
                logic.userEvents(userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on empty user id', () => {
            const userId = ''

            expect(() => {
                logic.userEvents(userId)
            }).toThrow(Error('userId is empty'))
        })
    })

    describe('find events by category', () => {
        //before each register user, create events 

        it('should fail on undefined user id', () => {
            const restaurantCategory = 'Tapas'
            const userId = undefined

            expect(() => {
                logic.findEventByCategory(userId, restaurantCategory)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on numeric user id', () => {
            const restaurantCategory = 'Tapas'
            const userId = 123

            expect(() => {
                logic.findEventByCategory(userId, restaurantCategory)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on boolean user id', () => {
            const restaurantCategory = 'Tapas'
            const userId = true

            expect(() => {
                logic.findEventByCategory(userId, restaurantCategory)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on object user id', () => {
            const restaurantCategory = 'Tapas'
            const userId = {}

            expect(() => {
                logic.findEventByCategory(userId, restaurantCategory)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on array user id', () => {
            const restaurantCategory = 'Tapas'
            const userId = []

            expect(() => {
                logic.findEventByCategory(userId, restaurantCategory)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on empty user id', () => {
            const restaurantCategory = 'Tapas'
            const userId = ''

            expect(() => {
                logic.findEventByCategory(userId, restaurantCategory)
            }).toThrow(Error('userId is empty'))
        })

        //event category

        it('should fail on undefined user id', () => {
            const restaurantCategory = undefined
            const userId = 'undefined'

            expect(() => {
                logic.findEventByCategory(userId, restaurantCategory)
            }).toThrow(Error(`${restaurantCategory} is not a string`))
        })

        it('should fail on numeric user id', () => {
            const restaurantCategory = 123
            const userId = '123'

            expect(() => {
                logic.findEventByCategory(userId, restaurantCategory)
            }).toThrow(Error(`${restaurantCategory} is not a string`))
        })

        it('should fail on boolean user id', () => {
            const restaurantCategory = true
            const userId = 'true'

            expect(() => {
                logic.findEventByCategory(userId, restaurantCategory)
            }).toThrow(Error(`${restaurantCategory} is not a string`))
        })

        it('should fail on object user id', () => {
            const restaurantCategory = {}
            const userId = '{}'

            expect(() => {
                logic.findEventByCategory(userId, restaurantCategory)
            }).toThrow(Error(`${restaurantCategory} is not a string`))
        })

        it('should fail on array user id', () => {
            const restaurantCategory = []
            const userId = '[]'

            expect(() => {
                logic.findEventByCategory(userId, restaurantCategory)
            }).toThrow(Error(`${restaurantCategory} is not a string`))
        })

        it('should fail on empty user id', () => {
            const restaurantCategory = ''
            const userId = 'mmmmm'

            expect(() => {
                logic.findEventByCategory(userId, restaurantCategory)
            }).toThrow(Error('restaurantCategory is empty'))
        })
    })

    describe('find events near me', () => {

        it('should fail on undefined user id', () => {
            const distance = 4
            const userId = undefined

            expect(() => {
                logic.findEventsNearMe(userId, distance)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on numeric user id', () => {
            const distance = 4
            const userId = 123

            expect(() => {
                logic.findEventsNearMe(userId, distance)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on boolean user id', () => {
            const distance = 4
            const userId = true

            expect(() => {
                logic.findEventsNearMe(userId, distance)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on object user id', () => {
            const distance = 4
            const userId = {}

            expect(() => {
                logic.findEventsNearMe(userId, distance)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on array user id', () => {
            const distance = 4
            const userId = []

            expect(() => {
                logic.findEventsNearMe(userId, distance)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on empty user id', () => {
            const distance = 4
            const userId = ''

            expect(() => {
                logic.findEventsNearMe(userId, distance)
            }).toThrow(Error('userId is empty'))
        })

        //distance

        it('should fail on undefined user id', () => {
            const distance = undefined
            const userId = 'undefined'

            expect(() => {
                logic.findEventsNearMe(userId, distance)
            }).toThrow(Error(`${distance} is not a number`))
        })

        it('should fail on string user id', () => {
            const distance = '123'
            const userId = '123'

            expect(() => {
                logic.findEventsNearMe(userId, distance)
            }).toThrow(Error(`${distance} is not a number`))
        })

        it('should fail on boolean user id', () => {
            const distance = true
            const userId = 'true'

            expect(() => {
                logic.findEventsNearMe(userId, distance)
            }).toThrow(Error(`${distance} is not a number`))
        })

        it('should fail on object user id', () => {
            const distance = {}
            const userId = '{}'

            expect(() => {
                logic.findEventsNearMe(userId, distance)
            }).toThrow(Error(`${distance} is not a number`))
        })

        it('should fail on array user id', () => {
            const distance = []
            const userId = '[]'

            expect(() => {
                logic.findEventsNearMe(userId, distance)
            }).toThrow(Error(`${distance} is not a number`))
        })

        it('should fail on empty user id', () => {
            const distance = ''
            const userId = 'mmmmm'

            expect(() => {
                logic.findEventsNearMe(userId, distance)
            }).toThrow(Error(`${distance} is not a number`))
        })
    })

    describe('create chat', ()  => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const username = `manu-${Math.random()}`
        const password = `123-${Math.random()}`
        const howTo = true

        const restaurantId = '998w9e8r90eqee'
        const eventTime = '13:30'
        const eventDate = '06/09/2019'
        const reservationName = 'pepito'
        const restaurantCategory = 'Tapas'
        const eventLocation = [222222, 222222]
        const priceLevel = 2
        const rating = 3
        const restaurantName = 'mimi'

        const chatName = 'lalala'

        it('should suceed on correct data', async () => {
            let userId
            let eventId
            return bcrypt.hash(password, 10)
                .then(hash => Users.create({ name, surname, email, username, password: hash, howTo }))
                .then(() => {
                    return Users.findOne({email})
                        .then((res) => userId = res._id.toString())
                        .then(() => Events.create({ restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating, restaurantName, participants: [userId] }))
                        .then(({id}) => eventId = id)
                        .then(() => logic.createChat(userId, chatName, eventId))
                        .then((id) => {
                            expect(id).toBeDefined
                        })
                })
        })

        it('should fail on undefined user id', () => {
            const userId = undefined
            const chatName = 'lalalalalala'
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on numeric user id', () => {
            const userId = 123
            const chatName = 'lalalalalala'
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on boolean user id', () => {
            const userId = true
            const chatName = 'lalalalalala'
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on objerct user id', () => {
            const userId = {}
            const chatName = 'lalalalalala'
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on array user id', () => {
            const userId = []
            const chatName = 'lalalalalala'
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on empty user id', () => {
            const userId = ''
            const chatName = 'lalalalalala'
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error('userId is empty'))
        })

        it('should fail on undefined chat name', () => {
            const userId = 'undefined'
            const chatName = undefined
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${chatName} is not a string`))
        })

        it('should fail on numeric chat name', () => {
            const userId = '123'
            const chatName = 123
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${chatName} is not a string`))
        })

        it('should fail on boolean chat name', () => {
            const userId = 'true'
            const chatName = true
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${chatName} is not a string`))
        })

        it('should fail on objerct chat name', () => {
            const userId = '{}'
            const chatName = {}
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${chatName} is not a string`))
        })

        it('should fail on array chat name', () => {
            const userId = '[]'
            const chatName = []
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${chatName} is not a string`))
        })

        it('should fail on empty chat name', () => {
            const userId = 'sknjkaefn'
            const chatName = ''
            const eventId = '233j3m21msm2mr5m9'

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error('chatName is empty'))
        })

        it('should fail on undefined event id', () => {
            const userId = 'undefined'
            const chatName = 'lalalalalala'
            const eventId = undefined

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on numeric event id', () => {
            const userId = '123'
            const chatName = 'lalalalalala'
            const eventId = 123

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on boolean event id', () => {
            const userId = 'true'
            const chatName = 'lalalalalala'
            const eventId = true

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on objerct event id', () => {
            const userId = '{}'
            const chatName = 'lalalalalala'
            const eventId = {}

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on array event id', () => {
            const userId = '[]'
            const chatName = 'lalalalalala'
            const eventId = []

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error(`${eventId} is not a string`))
        })

        it('should fail on empty event id', () => {
            const userId = 'cmls,<csl'
            const chatName = 'lalalalalala'
            const eventId = ''

            expect(() => {
                logic.createChat(userId, chatName, eventId)
            }).toThrow(Error('eventId is empty'))
        })
    })

    describe('join chat' , () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const username = `manu-${Math.random()}`
        const password = `123-${Math.random()}`
        const howTo = true

        const restaurantId = '998w9e8r90eqee'
        const eventTime = '13:30'
        const eventDate = '06/09/2019'
        const reservationName = 'pepito'
        const restaurantCategory = 'Tapas'
        const eventLocation = [222222, 222222]
        const priceLevel = 2
        const rating = 3
        const restaurantName = 'mimi'

        const chatName = 'lalala'

        it('should suceed on correct data', async () => {
            let userId
            let eventId
            return bcrypt.hash(password, 10)
                .then(hash => Users.create({ name, surname, email, username, password: hash, howTo }))
                .then(() => {
                    return Users.findOne({email})
                        .then((res) => userId = res._id.toString())
                        .then(() => Events.create({ restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating, restaurantName, participants: [userId] }))
                        .then(({id}) => eventId = id)
                        .then(() => logic.createChat(userId, chatName, eventId))
                        .then((id) => logic.joinChat(id, userId))
                        .then(chat => {
                            expect(chat).toBeDefined()
                            expect(chat.chatName).toBe(chatName)
                        })
                })
        })

        it('should fail on undefined user id', () => {
            const userId = undefined
            const chatId = 'lalalalalala'

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on numeric user id', () => {
            const userId = 123
            const chatId = 'lalalalalala'

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on boolean user id', () => {
            const userId = true
            const chatId = 'lalalalalala'

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on objerct user id', () => {
            const userId = {}
            const chatId = 'lalalalalala'

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on array user id', () => {
            const userId = []
            const chatId = 'lalalalalala'

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on empty user id', () => {
            const userId = ''
            const chatId = 'lalalalalala'

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error('userId is empty'))
        })

        //chatId

        it('should fail on undefined chat id', () => {
            const userId = 'undefined'
            const chatId = undefined

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on numeric chat id', () => {
            const userId = '123'
            const chatId = 123

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on boolean chat id', () => {
            const userId = 'ksamask'
            const chatId = true

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on objerct chat id', () => {
            const userId = '{}'
            const chatId = {}

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on array chat id', () => {
            const userId = '[]'
            const chatId = []

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on empty chat id', () => {
            const userId = 'mmmm'
            const chatId = ''

            expect(() => {
                logic.joinChat(chatId, userId)
            }).toThrow(Error('chatId is empty'))
        })
    })

    describe('user chats', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const username = `manu-${Math.random()}`
        const password = `123-${Math.random()}`
        const howTo = true

        const restaurantId = '998w9e8r90eqee'
        const eventTime = '13:30'
        const eventDate = '06/09/2019'
        const reservationName = 'pepito'
        const restaurantCategory = 'Tapas'
        const eventLocation = [222222, 222222]
        const priceLevel = 2
        const rating = 3
        const restaurantName = 'mimi'

        const chatName = 'lalala'

        it('shound succeed on correct date', () => {
            let userId
            let eventId
            return bcrypt.hash(password, 10)
                .then(hash => Users.create({ name, surname, email, username, password: hash, howTo }))
                .then(() => {
                    return Users.findOne({email})
                        .then((res) => userId = res._id.toString())
                        .then(() => Events.create({ restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating, restaurantName, participants: [userId] }))
                        .then(({id}) => eventId = id)
                        .then(() => logic.createChat(userId, chatName, eventId))
                        .then((id) => Users.findByIdAndUpdate(userId, {chatRooms: [id]}))
                        .then(() => logic.userChats(userId))
                        .then(chat => {
                            expect(chat[0].chatName).toBe(chatName)
                        })
                })
        })

        it('should fail on undefined user id', () => {
            const userId = undefined

            expect(() => {
                logic.userChats(userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on numeric user id', () => {
            const userId = 123

            expect(() => {
                logic.userChats(userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on boolean user id', () => {
            const userId = true

            expect(() => {
                logic.userChats(userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on object user id', () => {
            const userId = {}

            expect(() => {
                logic.userChats(userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on array user id', () => {
            const userId = []

            expect(() => {
                logic.userChats(userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on empty user id', () => {
            const userId = ''

            expect(() => {
                logic.userChats(userId)
            }).toThrow(Error('userId is empty'))
        })
    })

    describe('add message to chat', () => {
        //before each register user, ger user id, create chat

        it('should fail on undefined user id', () => {
            const chatId = 'kdmdksmskd'
            const text = 'msmssmsm'
            const userId = undefined

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on numeric user id', () => {
            const chatId = 'kdmdksmskd'
            const text = 'msmssmsm'
            const userId = 123

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on boolean user id', () => {
            const chatId = 'kdmdksmskd'
            const text = 'msmssmsm'
            const userId = true

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on object user id', () => {
            const chatId = 'kdmdksmskd'
            const text = 'msmssmsm'
            const userId = {}

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on array user id', () => {
            const chatId = 'kdmdksmskd'
            const text = 'msmssmsm'
            const userId = []

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on empty user id', () => {
            const chatId = 'kdmdksmskd'
            const text = 'msmssmsm'
            const userId = ''

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error('userId is empty'))
        })

        //chatId

        it('should fail on undefined chat id', () => {
            const chatId = undefined
            const text = 'msmssmsm'
            const userId = 'undefined'

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on numeric chat id', () => {
            const chatId = 123
            const text = 'msmssmsm'
            const userId = '123'

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on boolean chat id', () => {
            const chatId = true
            const text = 'msmssmsm'
            const userId = 'true'

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on object chat id', () => {
            const chatId = {}
            const text = 'msmssmsm'
            const userId = '{}'

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on array chat id', () => {
            const chatId = []
            const text = 'msmssmsm'
            const userId = '[]'

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on empty chat id', () => {
            const chatId = ''
            const text = 'msmssmsm'
            const userId = 'msmsms'

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error('chatId is empty'))
        })

        //text

        it('should fail on undefined text id', () => {
            const chatId = 'kdmdksmskd'
            const text = undefined
            const userId = 'undefined'

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error(`${text} is not a string`))
        })

        it('should fail on numeric text id', () => {
            const chatId = 'kdmdksmskd'
            const text = 123
            const userId = '123'

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error(`${text} is not a string`))
        })

        it('should fail on boolean text id', () => {
            const chatId = 'kdmdksmskd'
            const text = true
            const userId = 'ddd'

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error(`${text} is not a string`))
        })

        it('should fail on object text id', () => {
            const chatId = 'kdmdksmskd'
            const text = {}
            const userId = '{}'

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error(`${text} is not a string`))
        })

        it('should fail on array text id', () => {
            const chatId = 'kdmdksmskd'
            const text = []
            const userId = '[]'

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error(`${text} is not a string`))
        })

        it('should fail on empty text id', () => {
            const chatId = 'kdmdksmskd'
            const text = ''
            const userId = 'ld,edewd'

            expect(() => {
                logic.userEvents(userId, chatId, text)
            }).toThrow(Error('text is empty'))
        })
    }) 
    
    describe('messages from chat', () => {
        //before each regis...

        it('should fail on undefined user id', () => {
            const chatId = 'kdmdksmskd'
            const userId = undefined

            expect(() => {
                logic.messagesFromChat(userId, chatId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on numeric user id', () => {
            const chatId = 'kdmdksmskd'
            const userId = 123

            expect(() => {
                logic.messagesFromChat(userId, chatId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on boolean user id', () => {
            const chatId = 'kdmdksmskd'
            const userId = true

            expect(() => {
                logic.messagesFromChat(userId, chatId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on object user id', () => {
            const chatId = 'kdmdksmskd'
            const userId = {}

            expect(() => {
                logic.messagesFromChat(userId, chatId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on array user id', () => {
            const chatId = 'kdmdksmskd'
            const userId = []

            expect(() => {
                logic.messagesFromChat(userId, chatId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on empty user id', () => {
            const chatId = 'kdmdksmskd'
            const userId = ''

            expect(() => {
                logic.messagesFromChat(userId, chatId)
            }).toThrow(Error('userId is empty'))
        })

        //chatId

        it('should fail on undefined chat id', () => {
            const chatId = undefined
            const userId = 'undefined'

            expect(() => {
                logic.messagesFromChat(userId, chatId)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on numeric chat id', () => {
            const chatId = 123
            const userId = '123'

            expect(() => {
                logic.messagesFromChat(userId, chatId)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on boolean chat id', () => {
            const chatId = true
            const userId = 'true'

            expect(() => {
                logic.messagesFromChat(userId, chatId)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on object chat id', () => {
            const chatId = {}
            const userId = '{}'

            expect(() => {
                logic.messagesFromChat(userId, chatId)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on array chat id', () => {
            const chatId = []
            const userId = '[]'

            expect(() => {
                logic.messagesFromChat(userId, chatId)
            }).toThrow(Error(`${chatId} is not a string`))
        })

        it('should fail on empty chat id', () => {
            const chatId = ''
            const userId = 'msmssmsm'

            expect(() => {
                logic.messagesFromChat(userId, chatId)
            }).toThrow(Error('chatId is empty'))
        })
    })

    describe('search restaurants', () => {
        //before each...

        it('should fail on undefined user id', () => {
            const query = 'kdmdksmskd'
            const userId = undefined

            expect(() => {
                logic.searchRestaurants(query, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on numeric user id', () => {
            const query = 'kdmdksmskd'
            const userId = 123

            expect(() => {
                logic.searchRestaurants(query, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on boolean user id', () => {
            const query = 'kdmdksmskd'
            const userId = true

            expect(() => {
                logic.searchRestaurants(query, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on object user id', () => {
            const query = 'kdmdksmskd'
            const userId = {}

            expect(() => {
                logic.searchRestaurants(query, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on array user id', () => {
            const query = 'kdmdksmskd'
            const userId = []

            expect(() => {
                logic.searchRestaurants(query, userId)
            }).toThrow(Error(`${userId} is not a string`))
        })

        it('should fail on empty user id', () => {
            const query = 'kdmdksmskd'
            const userId = ''

            expect(() => {
                logic.searchRestaurants(query, userId)
            }).toThrow(Error('userId is empty'))
        })

        //query

        it('should fail on undefined query', () => {
            const query = undefined
            const userId = 'undefined'

            expect(() => {
                logic.searchRestaurants(query, userId)
            }).toThrow(Error(`${query} is not a string`))
        })

        it('should fail on numeric query', () => {
            const query = 1123
            const userId = '123'

            expect(() => {
                logic.searchRestaurants(query, userId)
            }).toThrow(Error(`${query} is not a string`))
        })

        it('should fail on boolean query', () => {
            const query = true
            const userId = 'dddd'

            expect(() => {
                logic.searchRestaurants(query, userId)
            }).toThrow(Error(`${query} is not a string`))
        })

        it('should fail on object query', () => {
            const query = {}
            const userId = '{}'

            expect(() => {
                logic.searchRestaurants(query, userId)
            }).toThrow(Error(`${query} is not a string`))
        })

        it('should fail on array query', () => {
            const query = []
            const userId = '[]'

            expect(() => {
                logic.searchRestaurants(query, userId)
            }).toThrow(Error(`${query} is not a string`))
        })

        it('should fail on empty query', () => {
            const query = ''
            const userId = ',,aa,aasdde'

            expect(() => {
                logic.searchRestaurants(query, userId)
            }).toThrow(Error('query is empty'))
        })
    })

    
})

after(() =>
    Promise.all([
        Events.deleteMany(),
        Users.deleteMany(),
        Chats.deleteMany()
    ])
    .then(() => mongoose.disconnect())
)