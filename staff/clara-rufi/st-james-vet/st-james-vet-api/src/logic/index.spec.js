'use strict'

///////////////falta update remove  user!!!!!!!!!!!!!!!!!
require('dotenv').config()

require('isomorphic-fetch')

const { mongoose, models: { User, Pet, Appointments } } = require('vet-data')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')


const { env: { TEST_DB_URL } } = process


describe('logic', () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Pet.deleteMany(),  ////////////////////////////////////
            Appointment.deleteMany(), ///////////////////////////////////////////////
        ])
    )

    //////////////////////////////////////////////////////// register user
   describe('register user', () => {
        const name = 'Clara'
        const surname = 'Rufí'
        const idCard = `234-${Math.random()}`
        const phone = `456348-${Math.random()}`
        const adress = `London Road -${Math.random()}`
        const city = `London`
        const email = `clararufi-${Math.random()}@gmail.com`
        const password = '123'
        const passwordConfirmation = password

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            const user = await User.findOne({ email })

            expect(user.id).toBe(userId)
            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.idCard).toBe(idCard)
            expect(user.adress).toBe(adress)
            expect(user.city).toBe(city)
            expect(user.email).toBe(email)
            expect(user.password).toBe(password)  ////////////////7

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

           it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 5678
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(Error('name cannot be empty'))
        })

        //////////////////////////////////////////////////////   register surname
        it('should fail on undefined surname', () => {
            const name = 'Clara'
            const surname = undefined
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Clara'
            const surname = 234
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password
            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on boolean surname', () => {
            const name = 'Clara'
            const surname = true
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Clara'
            const surname = {}
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
             const name = 'Clara'
            const surname = []
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Clara'
            const surname = ''
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(Error('surname cannot be empty'))
        })



        it('should fail on undefined idCard', () => {
            const name = 'Clara'
            const surname = undefined
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Clara'
            const surname = 678
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password
            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'Clara'
            const surname = true
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password = `257-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Clara'
            const surname = {}
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password = `257-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Clara'
            const surname = []
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Clara'
            const surname = ''
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(Error('surname cannot be empty'))
        })

        ////////////////////////////////////////////////////////// register idcard

        it('should fail on undefined city', () => {
            const name = 'Clara'
            const surname = 'Rufí'
            const idCard = undefined
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(idCard + ' is not a string'))
        })

        it('should fail on numeric idCard', () => {
            const name = 'Clara'
            const surname = 'Rufí'
            const idCard = 4567
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password
            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(idCard + ' is not a string'))
        })

        it('should fail on boolean idCard', () => {
            const name = 'Clara'
            const surname = 'Rufí'
            const idCard = true
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Clara'
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Clara'
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Clara'
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(Error('surname cannot be empty'))
        })



        it('should fail on undefined idCard', () => {
            const name = 'Clara'
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Clara'
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password
            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'Clara'
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Clara'
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password
            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Clara'
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password
            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Clara'
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'
            const passwordConfirmation = password

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(Error('surname cannot be empty'))
        })

        ////////////////////////////////////////////////////// register phone
    })



















































    describe('authenticate user', () => {
        const name = 'Clara'
        const surname = 'Rufí'
        const idCard = `234-${Math.random()}`
        const phone = `456348-${Math.random()}`
        const adress = `London Road -${Math.random()}`
        const city = `London`
        const email = `clararufi-${Math.random()}@gmail.com`
        const password = '123'
        const passwordConfirmation = password

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, idCard, phone, adress, city, email, password: hash }))
        )

        it('should succeed on correct credentials', () =>
            logic.authenticateUser(email, password)
                .then(id => expect(id).toBeDefined())
        )
    })

    describe('retrieve user', () => {
        const name = 'Clara'
        const surname = 'Rufí'
        const idCard = `234-${Math.random()}`
        const phone = `456348-${Math.random()}`
        const adress = `London Road -${Math.random()}`
        const city = `London`
        const email = `clararufi-${Math.random()}@gmail.com`
        const password = '123'
        const passwordConfirmation = password

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, idCard, phone, adress, city, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on correct credentials', () =>
            logic.retrieveUser(userId)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.idCard).toBe(idCard)
                    expect(user.adress).toBe(adress)
                    expect(user.city).toBe(city)
                    expect(user.email).toBe(email)

                    expect(user.save).toBeUndefined()
                })
        )
    })
    
    after(() =>
    Promise.all([
        Comment.deleteMany(),
        User.deleteMany()
    ])
        .then(() => mongoose.disconnect())
)
})