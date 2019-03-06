'use strict'

require('dotenv').config()

require('isomorphic-fetch')
const { mongoose, models: { User, Pet, Appointment } } = require('vet-data')
const expect = require('expect')
const logic = require('.')

const { env: { TEST_DB_URL } } = process
// import logic from '.'


///////////////falta update remove  user!!!!!!!!!!!!!!!!!


// const bcrypt = require('bcrypt')




// describe('logic', () => {
//     before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

//     beforeEach(() =>
//         Promise.all([
//             User.deleteMany(),
//             Pet.deleteMany(),  ////////////////////////////////////
//             Appointment.deleteMany(), ///////////////////////////////////////////////

//         ])
//     )


jest.setTimeout(10000)

describe('logic', () => {

    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Pet.deleteMany(),  ////////////////////////////////////
            Appointment.deleteMany(), ///////////////////////////////////////////////

        ])
    )

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

        it('should succeed on valid data', () =>
            logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
                .then(result => expect(result).toBeUndefined())
        )

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 4567
            const surname = 'Rufí'
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'

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

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Clara'
            const surname = undefined
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Clara'
            const surname = 2344
            const idCard = `234-${Math.random()}`
            const phone = `456348-${Math.random()}`
            const adress = `London Road -${Math.random()}`
            const city = `London`
            const email = `clararufi-${Math.random()}@gmail.com`
            const password = '123'

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

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(Error('surname cannot be empty'))
        })
    })

    //// seria email + password només, no?????????????????

    describe('log in user', () => {
        const name = 'Clara'
        const surname = 'Rufí'
        const email = `clararufi-${Math.random()}@gmail.com`
        const password = '123'
        const passwordConfirm = password

        beforeEach(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
        )

        it('should succeed on correct credentials', () =>
            logic.logInUser(email, password)
                .then(() => {
                    expect(logic.__userId__).toBeDefined()
                    expect(logic.__userApiToken__).toBeDefined()
                })
        )
    })

    describe('check user is logged in', () => {
        const name = 'Clara'
        const surname = 'Rufí'
        const email = `clararufi-${Math.random()}@gmail.com`
        const password = '123'
        const passwordConfirm = password

        beforeEach(() =>
            userApi.registerUser(name, surname, email, password, passwordConfirm)
        )

        it('should succeed on correct credentials', () =>
            logic.logInUser(email, password)
                .then(() => expect(logic.isUserLoggedIn).toBeTruthy())
        )
    })

    describe('log out user', () => {
        const name = 'Clara'
        const surname = 'Rufí'
        const email = `clararufi-${Math.random()}@gmail.com`
        const password = '123'
        const passwordConfirm = password

        beforeEach(() =>
            userApi.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.logInUser(email, password))
        )

        it('should succeed on correct credentials', () => {
            logic.logOutUser()

            expect(logic.__userId__).toBeNull()
            expect(logic.__userId__).toBeNull()
        })
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

        beforeEach(() =>
            userApi.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
                .then(() => logic.logInUser(email, password))
        )

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

    describe('update user', () => {
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
            userApi.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
                .then(() => logic.updateUser(token, data))
        )

        it('should succeed on correct credentials', () =>
        logic.retrieveUser()
            .then(user => {
                expect(user.id).toBe(logic.__userId__)
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.idCard).toBe(idCard)
                expect(user.phone).toBe(phone)
                expect(user.adress).toBe(adress)
                expect(user.city).toBe(city)
                expect(user.email).toBe(email)
                expect(user.password).toBe(password)
            })
    )
})
})
