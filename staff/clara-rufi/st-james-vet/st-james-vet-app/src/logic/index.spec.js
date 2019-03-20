'use strict'

import expect from 'expect'
import logic from '.'
import bcrypt from 'bcrypt'

import 'isomorphic-fetch'
const { mongoose, models: { User, Pet, Appointment } } = require('st-james-vet-data')

const { env: { TEST_DB_URL, REACT_APP_API_URL } } = process

logic.url = REACT_APP_API_URL


describe('logic', () => {
    beforeAll(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Pet.deleteMany(),
            Appointment.deleteMany(),

        ])
    )

    describe('register user', () => {

        const name = 'Clara'
        const surname = 'Rufí'
        let idCard, phone, adress
        const city = `London`
        const email = `clara@gmail.com`
        const password = '123'
        const passwordConfirmation = '123'
        let idSecond

        beforeEach(async () => {

            idCard = `234-${Math.random()}`
            phone = `456348-${Math.random()}`
            adress = `London Road -${Math.random()}`
        })

        it('should succeed on valid data', async () => {
            const message = await logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)

            expect(message).toBeDefined()
            const user = await User.findOne({ email })
            expect(user.id).toBeDefined()
            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.idCard).toBe(idCard)
            expect(user.adress).toBe(adress)
            expect(user.city).toBe(city)
            expect(user.email).toBe(email)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail in existing email', async () => {
            try {
                const id = await logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)

                expect(id).toBeDefined()
                expect(typeof id).toBe('string')
                const user = await User.findOne({ email })
                expect(user.id).toBeDefined()
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.idCard).toBe(idCard)
                expect(user.adress).toBe(adress)
                expect(user.city).toBe(city)
                expect(user.email).toBe(email)
                expect(user.password).toBe(password)
                const match = await bcrypt.compare(password, user.password)
                expect(match).toBeTruthy()

                idSecond = await logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)

            } catch (error) {
                expect(error).toBeDefined()
            }
        })

        it('should fail in non-matching password and password confirmation', () => {
            const password = '123778'

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, '1238997-0099')
            }).toThrowError('passwords do not match')
        })

        it('should fail on undefined name', () => {
            const name1 = undefined

            expect(() => {
                logic.registerUser(name1, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(name1 + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name1 = 4567

            expect(() => {
                logic.registerUser(name1, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(name1 + ' is not a string'))
        })

        it('should fail on boolean name', () => {
            const name1 = true

            expect(() => {
                logic.registerUser(name1, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(name1 + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name1 = {}

            expect(() => {
                logic.registerUser(name1, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(name1 + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name1 = []

            expect(() => {
                logic.registerUser(name1, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(name1 + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name1 = ' '

            expect(() => {
                logic.registerUser(name1, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const surname1 = undefined

            expect(() => {
                logic.registerUser(name, surname1, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname1 + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const surname = 2344

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const surname1 = true

            expect(() => {
                logic.registerUser(name, surname1, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname1 + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const surname1 = {}

            expect(() => {
                logic.registerUser(name, surname1, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname1 + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const surname1 = []

            expect(() => {
                logic.registerUser(name, surname1, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(surname1 + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const surname1 = ' '

            expect(() => {
                logic.registerUser(name, surname1, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(Error('surname cannot be empty'))
        })

        it('should fail on undefined idCard', () => {
            const idCard1 = undefined

            expect(() => {
                logic.registerUser(name, surname, idCard1, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(idCard1 + ' is not a string'))
        })

        it('should fail on numeric idCard', () => {
            const idCard1 = 9908

            expect(() => {
                logic.registerUser(name, surname, idCard1, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(idCard1 + ' is not a string'))
        })

        it('should fail on boolean idCard', () => {
            const idCard1 = true

            expect(() => {
                logic.registerUser(name, surname, idCard1, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(idCard1 + ' is not a string'))
        })

        it('should fail on object idCard', () => {
            const idCard1 = {}

            expect(() => {
                logic.registerUser(name, surname, idCard1, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(idCard1 + ' is not a string'))
        })

        it('should fail on array idCard', () => {
            const idCard1 = []

            expect(() => {
                logic.registerUser(name, surname, idCard1, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(idCard1 + ' is not a string'))
        })

        it('should fail on empty idCard', () => {
            const idCard1 = ' '

            expect(() => {
                logic.registerUser(name, surname, idCard1, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(Error('idCard cannot be empty'))
        })

        it('should fail on undefined phone', () => {
            const phone1 = undefined

            expect(() => {
                logic.registerUser(name, surname, idCard, phone1, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(phone1 + ' is not a string'))
        })

        it('should fail on numeric phone', () => {
            const phone1 = 632222456

            expect(() => {
                logic.registerUser(name, surname, idCard, phone1, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(phone1 + ' is not a string'))
        })

        it('should fail on boolean phone', () => {
            const phone1 = true

            expect(() => {
                logic.registerUser(name, surname, idCard, phone1, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(phone1 + ' is not a string'))
        })

        it('should fail on object phone', () => {
            const phone1 = {}

            expect(() => {
                logic.registerUser(name, surname, idCard, phone1, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(phone1 + ' is not a string'))
        })

        it('should fail on array phone', () => {
            const phone1 = []

            expect(() => {
                logic.registerUser(name, surname, idCard, phone1, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(phone1 + ' is not a string'))
        })

        it('should fail on empty phone', () => {
            const phone1 = ' '

            expect(() => {
                logic.registerUser(name, surname, idCard, phone1, adress, city, email, password, passwordConfirmation)
            }).toThrow(Error('phone cannot be empty'))
        })

        it('should fail on undefined adress', () => {
            const adress1 = undefined

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress1, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(adress1 + ' is not a string'))
        })

        it('should fail on numeric adress', () => {
            const adress1 = 344562

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress1, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(adress1 + ' is not a string'))
        })

        it('should fail on boolean adress', () => {
            const adress1 = true

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress1, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(adress1 + ' is not a string'))
        })

        it('should fail on object adress', () => {
            const adress1 = {}

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress1, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(adress1 + ' is not a string'))
        })

        it('should fail on array adress', () => {
            const adress1 = []

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress1, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(adress1 + ' is not a string'))
        })

        it('should fail on empty adress', () => {
            const adress1 = ' '

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress1, city, email, password, passwordConfirmation)
            }).toThrow(Error('adress cannot be empty'))
        })

        it('should fail on undefined city', () => {
            const city1 = undefined

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city1, email, password, passwordConfirmation)
            }).toThrow(TypeError(city1 + ' is not a string'))
        })

        it('should fail on numeric city', () => {
            const city1 = 345623

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city1, email, password, passwordConfirmation)
            }).toThrow(TypeError(city1 + ' is not a string'))
        })

        it('should fail on boolean city', () => {
            const city1 = true


            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city1, email, password, passwordConfirmation)
            }).toThrow(TypeError(city1 + ' is not a string'))
        })

        it('should fail on object city', () => {
            const city1 = {}

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city1, email, password, passwordConfirmation)
            }).toThrow(TypeError(city1 + ' is not a string'))
        })

        it('should fail on array city', () => {
            const city1 = []

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city1, email, password, passwordConfirmation)
            }).toThrow(TypeError(city1 + ' is not a string'))
        })

        it('should fail on empty city', () => {
            const city1 = ' '

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city1, email, password, passwordConfirmation)
            }).toThrow(Error('city cannot be empty'))
        })

        it('should fail on undefined email', () => {
            const email1 = undefined

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email1, password, passwordConfirmation)
            }).toThrow(TypeError(email1 + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const email1 = 452234

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email1, password, passwordConfirmation)
            }).toThrow(TypeError(email1 + ' is not a string'))
        })

        it('should fail on boolean email', () => {
            const email1 = true

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email1, password, passwordConfirmation)
            }).toThrow(TypeError(email1 + ' is not a string'))
        })

        it('should fail on object email', () => {
            const email1 = {}

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email1, password, passwordConfirmation)
            }).toThrow(TypeError(email1 + ' is not a string'))
        })

        it('should fail on array email', () => {
            const email1 = []

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email1, password, passwordConfirmation)
            }).toThrow(TypeError(email1 + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const email1 = ' '

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email1, password, passwordConfirmation)
            }).toThrow(Error('email cannot be empty'))
        })

        it('should fail on undefined password', () => {
            const password1 = undefined

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password1, passwordConfirmation)
            }).toThrow(TypeError(password1 + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const password1 = 67834

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password1, passwordConfirmation)
            }).toThrow(TypeError(password1 + ' is not a string'))
        })

        it('should fail on boolean password', () => {
            const password1 = false

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password1, passwordConfirmation)
            }).toThrow(TypeError(password1 + ' is not a string'))
        })

        it('should fail on object password', () => {
            const password1 = {}

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password1, passwordConfirmation)
            }).toThrow(TypeError(password1 + ' is not a string'))
        })

        it('should fail on array password', () => {
            const password1 = []

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password1, passwordConfirmation)
            }).toThrow(TypeError(password1 + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const password1 = ' '

            expect(() => {
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password1, passwordConfirmation)
            }).toThrow(Error('password cannot be empty'))
        })
    })
    describe('register pet', () => {

        const name = 'Clara'
        const surname = 'Rufí'
        let idCard, phone, adress
        const city = `London`
        const email = `clara@gmail.com`
        const password = '123'
        const passwordConfirmation = '123'

        let owner
        const namePet = 'George'
        const specie = 'cat'
        let breed
        const color = 'grey'
        const gender = 'male'
        const birthdate = '02/03/2019'
        const neutered = 'yes'
        let microchip, petlicence, vaccionations, controls, details

        beforeEach(async () => {

            idCard = `234-${Math.random()}`
            phone = `456348-${Math.random()}`
            adress = `London Road -${Math.random()}`

            breed = `british-${Math.random()}`
            microchip = `44567 -${Math.random()}`
            petlicence = `99876-${Math.random()}`
            vaccionations = `vaccins-${Math.random()}`
            controls = `controls-${Math.random()}`
            details = `details-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            owner = await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation })
            await logic.logInUser(email, password)
        })

        it('should succeed on valid data', async () => {
            const message = await logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)

            expect(message).toBeDefined()
        })

        it('should fail on undefined owner', () => {
            expect(() => {
                logic.registerPet()
            }).toThrow(TypeError('undefined is not a string'))
        })

        it('should fail on numeric owner', () => {

            expect(() => {
                logic.registerPet(1234)
            }).toThrow(TypeError(1234 + ' is not a string'))
        })

        it('should fail on boolean owner', () => {

            expect(() => {
                logic.registerPet(true)
            }).toThrow(TypeError(true + ' is not a string'))
        })

        it('should fail on object owner', () => {

            expect(() => {
                logic.registerPet({})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on array owner', () => {

            expect(() => {
                logic.registerPet([])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty owner', () => {

            expect(() => {
                logic.registerPet(' ')
            }).toThrow(Error('owner cannot be empty'))
        })

        it('should fail on undefined name', () => {

            expect(() => {
                logic.registerPet(owner._id.toString())
            }).toThrow(TypeError('undefined is not a string'))
        })

        it('should fail on numeric name', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), 1234)
            }).toThrow(TypeError(1234 + ' is not a string'))
        })

        it('should fail on boolean name', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), true)
            }).toThrow(TypeError(true + ' is not a string'))
        })

        it('should fail on object name', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), {})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on array name', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty name', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), ' ')
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined specie', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet)
            }).toThrow(TypeError('undefined is not a string'))
        })

        it('should fail on numeric specie', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, 1234)
            }).toThrow(TypeError(1234 + ' is not a string'))
        })

        it('should fail on boolean specie', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, true)
            }).toThrow(TypeError(true + ' is not a string'))
        })

        it('should fail on object specie', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, {})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on array specie', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty specie', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, ' ')
            }).toThrow(TypeError('specie cannot be empty'))
        })

        it('should fail on undefined breed', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie)
            }).toThrow(TypeError('undefined is not a string'))
        })

        it('should fail on numeric breed', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, 1234)
            }).toThrow(TypeError(1234 + ' is not a string'))
        })

        it('should fail on boolean breed', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, true)
            }).toThrow(TypeError(true + ' is not a string'))
        })

        it('should fail on object breed', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, {})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on array breed', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty breed', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, ' ')
            }).toThrow(TypeError('breed cannot be empty'))
        })

        it('should fail on undefined color', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed)
            }).toThrow(Error('undefined is not a string'))
        })

        it('should fail on boolean color', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, true)
            }).toThrow(TypeError(true + ' is not a string'))
        })

        it('should fail on object color', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, {})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on array color', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty color', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, ' ')
            }).toThrow(TypeError('color cannot be empty'))
        })

        it('should fail on undefined gender', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color)
            }).toThrow(TypeError('undefined is not a string'))
        })

        it('should fail on numeric gender', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, 1234)
            }).toThrow(TypeError(1234 + ' is not a string'))
        })

        it('should fail on boolean gender', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, true)
            }).toThrow(TypeError(true + ' is not a string'))
        })

        it('should fail on object gender', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, {})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on array gender', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty gender', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, ' ')
            }).toThrow(Error('gender cannot be empty'))
        })

        it('should fail on number birthdate', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, 1234)
            }).toThrow(TypeError(1234 + ' is not a string'))
        })

        it('should fail on boolean birthdate', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, false)
            }).toThrow(TypeError(false + ' is not a string'))
        })

        it('should fail on object birthdate', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, {})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on array birthdate', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty birthdate', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, ' ')
            }).toThrow(Error('birthdate cannot be empty'))
        })

        it('should fail on undefined microchip', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate)
            }).toThrow(Error('undefined is not a string'))
        })

        it('should fail on boolean microchip', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, true)
            }).toThrow(TypeError(true + ' is not a string'))
        })

        it('should fail on object microchip', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, {})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on array microchip', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty microchip', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, ' ')
            }).toThrow(Error('microchip cannot be empty'))
        })

        it('should fail on undefined petlicence', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip)
            }).toThrow(Error('undefined is not a string'))
        })

        it('should fail on number petlicence', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, 1234)
            }).toThrow(TypeError(1234 + ' is not a string'))
        })

        it('should fail on boolean petlicence', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, false)
            }).toThrow(TypeError(false + ' is not a string'))
        })

        it('should fail on array petlicence', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on object petlicence', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, {})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on empty petlicence', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, ' ')
            }).toThrow(Error('petlicence cannot be empty'))
        })

        it('should fail on undefined vaccinations', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered)
            }).toThrow(TypeError('undefined is not a string'))
        })

        it('should fail on numeric vaccinations', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, 1234)
            }).toThrow(TypeError(1234 + ' is not a string'))
        })

        it('should fail on boolean vaccinations', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, true)
            }).toThrow(TypeError(true + ' is not a string'))
        })

        it('should fail on object vaccinations', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, {})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on array vaccinations', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty vaccinations', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, ' ')
            }).toThrow(TypeError('vaccionations cannot be empty'))
        })

        it('should fail on undefined controls', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations)
            }).toThrow(TypeError('undefined is not a string'))
        })

        it('should fail on numeric controls', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, 1234)
            }).toThrow(TypeError(1234 + ' is not a string'))
        })

        it('should fail on object controls', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, {})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on array controls', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty controls', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, ' ')
            }).toThrow(Error('controls cannot be empty'))
        })

        it('should fail on undefined details', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls)
            }).toThrow(TypeError('undefined is not a string'))
        })

        it('should fail on numeric details', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, 1234)
            }).toThrow(TypeError(1234 + ' is not a string'))
        })

        it('should fail on array details', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on object details', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, {})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on empty details', () => {

            expect(() => {
                logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, ' ')
            }).toThrow(Error('details cannot be empty'))
        })

    })

    describe('authenticate user', () => {
        const name = 'Clara'
        const surname = 'Rufí'
        let idCard, phone, adress
        const city = `London`
        const email = `clara@gmail.com`
        const password = '123'
        const passwordConfirmation = '123'

        beforeEach(async () => {
            idCard = `234-${Math.random()}`
            phone = `456348-${Math.random()}`
            adress = `London Road -${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation })
        })

        it('should succeed on wrong email', async () => {

            expect(() => {
                logic.logInUser()
                    .catch(error => expect(error).toBeDefined())
            })
        })


        it('should succeed on wrong password', async () => {
            expect(() => {
                logic.logInUser(email)
                    .catch(error => expect(error).toBeDefined())
            })
        })

        it('should fail on not found user', () => {
            expect(() => {
                logic.logInUser(`clararufi-${Math.random()}@gmail.com`, `123-${Math.random()}`)
                    .catch(error => expect(error).toBeDefined())
            })
        })

        it('should fail on undefined email', () => {
            expect(() => {
                logic.logInUser()
            }).toThrow(TypeError('undefined is not a string'))
        })

        it('should fail on numeric email', () => {
            expect(() => {
                logic.logInUser(1234)
            }).toThrow(TypeError(1234 + ' is not a string'))
        })

        it('should fail on boolean email', () => {
            expect(() => {
                logic.logInUser(true)
            }).toThrow(TypeError(true + ' is not a string'))
        })

        it('should fail on object email', () => {
            expect(() => {
                logic.logInUser({})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on array email', () => {
            expect(() => {
                logic.logInUser([])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty email', () => {
            expect(() => {
                logic.logInUser(' ')
            }).toThrow(TypeError('email cannot be empty'))
        })

        it('should fail on undefined password', () => {
            expect(() => {
                logic.logInUser(email)
            }).toThrow(TypeError('undefined is not a string'))
        })

        it('should fail on number password', () => {
            expect(() => {
                logic.logInUser(email, 1234)
            }).toThrow(TypeError(1234 + ' is not a string'))
        })

        it('should fail on array password', () => {
            expect(() => {
                logic.logInUser(email, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on object password', () => {
            expect(() => {
                logic.logInUser(email, {})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on array password', () => {
            expect(() => {
                logic.logInUser(email, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on empty password', () => {
            expect(() => {
                logic.logInUser(email, ' ')
            }).toThrow(TypeError('password cannot be empty'))
        })
    })

    describe('assignAppointment', () => {

        const name = 'Clara'
        const surname = 'Rufí'
        let idCard, phone, adress
        const city = `London`
        const email = `clara@gmail.com`
        const password = '123'
        const passwordConfirmation = '123'

        let owner, pets
        const namePet = 'George'
        const specie = 'cat'
        let breed
        const color = 'grey'
        const gender = 'male'
        const birthdate = '02/03/2019'
        const neutered = 'yes'
        let microchip, petlicence, vaccionations, controls, details
        const date = "2019-03-30 19:30"
        let token

        beforeEach(async () => {

            idCard = `234-${Math.random()}`
            phone = `456348-${Math.random()}`
            adress = `London Road -${Math.random()}`

            breed = `british-${Math.random()}`
            microchip = `44567 -${Math.random()}`
            petlicence = `99876-${Math.random()}`
            vaccionations = `vaccins-${Math.random()}`
            controls = `controls-${Math.random()}`
            details = `details-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            owner = await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation })
            token = await logic.logInUser(email, password)
            await logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
            logic.__userToken__ = token
            pets = await logic.retrievePets(owner._id.toString())
        })

        it('should succeed adding an appointment', async () => {
            expect(pets.length).toBe(1)

            const message = await logic.assignAppointment(owner._id.toString(), pets[0].id, date)
            expect(message).toBeDefined()
        })

        it('should fail on adding an appointment with repeated date', async () => {
            const appointment = await logic.assignAppointment(owner._id.toString(), pets[0].id, date)

            try {
                const appointment2 = await logic.assignAppointment(owner._id.toString(), pets[0].id, date)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`Please, select date higher than today`)
            }
        })

        it('should fail on undefined owner', () => {
            expect(() => {
                logic.assignAppointment()
            }).toThrow(TypeError('undefined is not a string'))
        })

        it('should fail on numeric owner', () => {
            expect(() => {
                logic.assignAppointment(1234)
            }).toThrow(TypeError(1234 + ' is not a string'))
        })

        it('should fail on boolean owner', () => {
            expect(() => {
                logic.assignAppointment(false)
            }).toThrow(TypeError(false + ' is not a string'))
        })

        it('should fail on array owner', () => {
            expect(() => {
                logic.assignAppointment([])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on object owner', () => {
            expect(() => {
                logic.assignAppointment({})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on empty owner', () => {
            expect(() => {
                logic.assignAppointment(' ')
            }).toThrow(TypeError('owner cannot be empty'))
        })

        it('should fail on undefined pet', () => {
            expect(() => {
                logic.assignAppointment(owner._id.toString())
            }).toThrow(TypeError('undefined is not a string'))
        })

        it('should fail on numeric pet', () => {
            expect(() => {
                logic.assignAppointment(owner._id.toString(), 1234)
            }).toThrow(TypeError(1234 + ' is not a string'))
        })

        it('should fail on array pet', () => {
            expect(() => {
                logic.assignAppointment(owner._id.toString(), [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on object pet', () => {
            expect(() => {
                logic.assignAppointment(owner._id.toString(), {})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on empty pet', () => {
            expect(() => {
                logic.assignAppointment(owner._id.toString(), ' ')
            }).toThrow(TypeError('pet cannot be empty'))
        })
    })


    describe('retrieveAppointments', () => {

        const name = 'Clara'
        const surname = 'Rufí'
        let idCard, phone, adress
        const city = `London`
        const email = `clara@gmail.com`
        const password = '123'
        const passwordConfirmation = '123'

        const year = '2019'
        const month = '03'
        let owner, pet
        const namePet = 'George'
        const specie = 'cat'
        let breed
        const color = 'grey'
        const gender = 'male'
        const birthdate = '02/03/2019'
        const neutered = 'yes'
        let microchip, petlicence, vaccionations, controls, details
        const date = "2019-03-30 19:30"
        let token, pets

        beforeEach(async () => {

            idCard = `234-${Math.random()}`
            phone = `456348-${Math.random()}`
            adress = `London Road -${Math.random()}`

            breed = `british-${Math.random()}`
            microchip = `44567 -${Math.random()}`
            petlicence = `99876-${Math.random()}`
            vaccionations = `vaccins-${Math.random()}`
            controls = `controls-${Math.random()}`
            details = `details-${Math.random()}`

            const hash = await bcrypt.hash(password, 10)
            owner = await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation })
            token = await logic.logInUser(email, password)
            await logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
            logic.__userToken__ = token
            pets = await logic.retrievePets(owner._id.toString())
            const appointment = await logic.assignAppointment(owner._id.toString(), pets[0].id, date)
        })

        it('should succeed on valid data', async () => {
            const appointment2 = await logic.retrieveAppointments(year, month)

            expect(appointment2).toBeDefined()

            })
        })

        describe('retrieve users', () => {

            const name = 'Clara'
            const surname = 'Rufí'
            let idCard, phone, adress
            const city = `London`
            const email = `clara@gmail.com`
            const password = '123'
            const passwordConfirmation = '123'
            let owner, token, owner2

            beforeEach(async () => {

                idCard = `234-${Math.random()}`
                phone = `456348-${Math.random()}`
                adress = `London Road -${Math.random()}`

                const hash = await bcrypt.hash(password, 10)
                owner = await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation })
                token = await logic.logInUser(email, password)
                logic.__userToken__ = token
            })

            it('should succeed on correct credentials', async () => {

                const response = await logic.retrieveUsers()

                expect(response).toBeDefined()
            })
        })

        describe('retrieveAppointmentsOwner', () => {

            const name = 'Clara'
            const surname = 'Rufí'
            let idCard, phone, adress
            const city = `London`
            const email = `clara@gmail.com`
            const password = '123'
            const passwordConfirmation = '123'

            let owner, pets, appointment, token
            const namePet = 'George'
            const specie = 'cat'
            let breed
            const color = 'grey'
            const gender = 'male'
            const birthdate = '02/03/2019'
            const neutered = 'yes'
            let microchip, petlicence, vaccionations, controls, details
            const date = "2019-03-30 19:30"

            beforeEach(async () => {

                idCard = `234-${Math.random()}`
                phone = `456348-${Math.random()}`
                adress = `London Road -${Math.random()}`

                breed = `british-${Math.random()}`
                microchip = `44567 -${Math.random()}`
                petlicence = `99876-${Math.random()}`
                vaccionations = `vaccins-${Math.random()}`
                controls = `controls-${Math.random()}`
                details = `details-${Math.random()}`

                const hash = await bcrypt.hash(password, 10)
                owner = await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation })
                token = await logic.logInUser(email, password)
                await logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
                logic.__userToken__ = token
                pets = await logic.retrievePets(owner._id.toString())
                appointment = await logic.assignAppointment(owner._id.toString(), pets[0].id, date)
            })

            it('should succeed on valid data', async () => {
                const appointment2 = await logic.retrieveAppointmentsOwner(owner._id.toString())

                expect(appointment2).toBeDefined()
            })
        })

        describe('retrieveAppointments', () => {

            const name = 'Clara'
            const surname = 'Rufí'
            let idCard, phone, adress
            const city = `London`
            const email = `clara@gmail.com`
            const password = '123'
            const passwordConfirmation = '123'

            const year = '2019'
            const month = '04'
            let owner, pet
            const namePet = 'George'
            const specie = 'cat'
            let breed
            const color = 'grey'
            const gender = 'male'
            const birthdate = '02/03/2019'
            const neutered = 'yes'
            let microchip, petlicence, vaccionations, controls, details, token, pets
            const date = new Date(year, month)


            beforeEach(async () => {

                idCard = `234-${Math.random()}`
                phone = `456348-${Math.random()}`
                adress = `London Road -${Math.random()}`

                breed = `british-${Math.random()}`
                microchip = `44567 -${Math.random()}`
                petlicence = `99876-${Math.random()}`
                vaccionations = `vaccins-${Math.random()}`
                controls = `controls-${Math.random()}`
                details = `details-${Math.random()}`

                const hash = await bcrypt.hash(password, 10)
                owner = await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation })
                token = await logic.logInUser(email, password)
                await logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
                logic.__userToken__ = token
                pets = await logic.retrievePets(owner._id.toString())
                const message = await logic.assignAppointment(owner._id.toString(), pets[0].id, date)
            })

            it('should succeed on valid data', async () => {
                const appointment = await logic.retrieveAppointments(year, month)
                appointment.date = new Date(appointment.date)
                expect(appointment).toBeDefined()
            })

        })

        describe('deleteAppointment', () => {

            const name = 'Clara'
            const surname = 'Rufí'
            let idCard, phone, adress
            const city = `London`
            const email = `clara@gmail.com`
            const password = '123'
            const passwordConfirmation = '123'

            let owner, pets, appointment, token
            const namePet = 'George'
            const specie = 'cat'
            let breed
            const color = 'grey'
            const gender = 'male'
            const birthdate = '02/03/2019'
            const neutered = 'yes'
            let microchip, petlicence, vaccionations, controls, details
            const date = "2019-03-30 19:30"

            beforeEach(async () => {

                idCard = `234-${Math.random()}`
                phone = `456348-${Math.random()}`
                adress = `London Road -${Math.random()}`

                breed = `british-${Math.random()}`
                microchip = `44567 -${Math.random()}`
                petlicence = `99876-${Math.random()}`
                vaccionations = `vaccins-${Math.random()}`
                controls = `controls-${Math.random()}`
                details = `details-${Math.random()}`

                const hash = await bcrypt.hash(password, 10)
                owner = await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation })
                token = await logic.logInUser(email, password)
                await logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
                logic.__userToken__ = token
                pets = await logic.retrievePets(owner._id.toString())
                appointment = await logic.assignAppointment(owner._id.toString(), pets[0].id, date)
            })

            it('should succeed on correct credentials', async () => {

                logic.deleteAppointment(appointment.id)
                expect(appointment).toBeDefined()
            })

            it('should fail on deleting an appointment withouth Id', async () => {

                expect(() => {
                    logic.deleteAppointment(' ')
                }).toThrow(Error('Id cannot be empty'))
            })

            it('should fail on deleting an appointment with undefined Id', async () => {

                expect(() => {
                    logic.deleteAppointment(234)
                }).toThrow(TypeError(234 + ' is not a string'))
            })
        })

        describe('retrieve users', () => {

            const name = 'Clara'
            const surname = 'Rufí'
            let idCard, phone, adress
            const city = `London`
            const email = `clara@gmail.com`
            const password = '123'
            const passwordConfirmation = '123'

            let owner, token

            beforeEach(async () => {

                idCard = `234-${Math.random()}`
                phone = `456348-${Math.random()}`
                adress = `London Road -${Math.random()}`

                const hash = await bcrypt.hash(password, 10)
                owner = await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation })
                token = await logic.logInUser(email, password)
                logic.__userToken__ = token
            })

            it('should succeed on correct credentials', async () => {

                const response = await logic.retrieveUsers()

                expect(response).toBeDefined()
            })
        })


        describe('retrieveUserSelected', () => {

            const name = 'Clara'
            const surname = 'Rufí'
            let idCard, phone, adress
            const city = `London`
            const email = `clara@gmail.com`
            const password = '123'
            const passwordConfirmation = '123'

            let user, token

            beforeEach(async () => {

                idCard = `234-${Math.random()}`
                phone = `456348-${Math.random()}`
                adress = `London Road -${Math.random()}`

                const hash = await bcrypt.hash(password, 10)
                user = await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation })
                token = await logic.logInUser(email, password)
                logic.__userToken__ = token
            })

            it('should succeed on correct credentials', async () => {
                const userSelected = await logic.retrieveUserSelected(user._id.toString())

                expect(userSelected).toBeDefined()
                expect(userSelected.surname).toBeDefined()
                expect(userSelected.idCard).toBeDefined()
                expect(userSelected.phone).toBeDefined()
                expect(userSelected.adress).toBeDefined()
                expect(userSelected.city).toBeDefined()
                expect(userSelected.email).toBeDefined()
            })
        })

        describe('retrieve pet', () => {

            const name = 'Clara'
            const surname = 'Rufí'
            let idCard, phone, adress
            const city = `London`
            const email = `clara@gmail.com`
            const password = '123'
            const passwordConfirmation = '123'

            let owner, pets, token
            const namePet = 'George'
            const specie = 'cat'
            let breed
            const color = 'grey'
            const gender = 'male'
            const birthdate = '02/03/2019'
            const neutered = 'yes'
            let microchip, petlicence, vaccionations, controls, details

            beforeEach(async () => {

                idCard = `234-${Math.random()}`
                phone = `456348-${Math.random()}`
                adress = `London Road -${Math.random()}`

                breed = `british-${Math.random()}`
                microchip = `44567 -${Math.random()}`
                petlicence = `99876-${Math.random()}`
                vaccionations = `vaccins-${Math.random()}`
                controls = `controls-${Math.random()}`
                details = `details-${Math.random()}`

                const hash = await bcrypt.hash(password, 10)
                owner = await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation })
                token = await logic.logInUser(email, password)
                await logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
                logic.__userToken__ = token
                pets = await logic.retrievePets(owner._id.toString())
            })

            it('should succeed on correct credentials', async () => {
                const _pet = await logic.retrievePet(pets[0].id)

                expect(_pet.name).toBeDefined()
                expect(_pet.microchip).toBeDefined()
                expect(_pet.petlicence).toBeDefined()
                expect(_pet.neutered).toBeDefined()
            })
        })

        describe('retrieve pet visit', () => {

            const name = 'Clara'
            const surname = 'Rufí'
            let idCard, phone, adress
            const city = `London`
            const email = `clara@gmail.com`
            const password = '123'
            const passwordConfirmation = '123'

            let owner, pets, appointment, token
            const namePet = 'George'
            const specie = 'cat'
            let breed
            const color = 'grey'
            const gender = 'male'
            const birthdate = '02/03/2019'
            const neutered = 'yes'
            let microchip, petlicence, vaccionations, controls, details
            const date = "2019-03-30 19:30"

            beforeEach(async () => {

                idCard = `234-${Math.random()}`
                phone = `456348-${Math.random()}`
                adress = `London Road -${Math.random()}`

                breed = `british-${Math.random()}`
                microchip = `44567 -${Math.random()}`
                petlicence = `99876-${Math.random()}`
                vaccionations = `vaccins-${Math.random()}`
                controls = `controls-${Math.random()}`
                details = `details-${Math.random()}`

                const hash = await bcrypt.hash(password, 10)
                owner = await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation })
                token = await logic.logInUser(email, password)
                await logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
                logic.__userToken__ = token
                pets = await logic.retrievePets(owner._id.toString())
                appointment = await logic.assignAppointment(owner._id.toString(), pets[0].id, date)
            })

            it('should succeed on correct credentials', async () => {
                const visit = await logic.retrievePetVisit(appointment.id)

                expect(visit).toBeDefined()
            })
        })

        describe('updateVisit', () => {

            const name = 'Clara'
            const surname = 'Rufí'
            let idCard, phone, adress
            const city = `London`
            const email = `clara@gmail.com`
            const password = '123'
            const passwordConfirmation = '123'

            let owner, pets, token, appointment
            const namePet = 'George'
            const specie = 'cat'
            let breed
            const color = 'grey'
            const gender = 'male'
            const birthdate = '02/03/2019'
            const neutered = 'yes'
            let microchip, petlicence, vaccionations, controls, details
            const date = "2019-03-30 19:30"

            beforeEach(async () => {

                idCard = `234-${Math.random()}`
                phone = `456348-${Math.random()}`
                adress = `London Road -${Math.random()}`

                breed = `british-${Math.random()}`
                microchip = `44567 -${Math.random()}`
                petlicence = `99876-${Math.random()}`
                vaccionations = `vaccins-${Math.random()}`
                controls = `controls-${Math.random()}`
                details = `details-${Math.random()}`

                const hash = await bcrypt.hash(password, 10)
                owner = await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation })
                token = await logic.logInUser(email, password)
                await logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
                logic.__userToken__ = token
                pets = await logic.retrievePets(owner._id.toString())
                appointment = await logic.assignAppointment(owner._id.toString(), pets[0].id, date)
            })

            it('should succeed updating vaccinations ', async () => {

                const vaccionations1 = 'Vaccins 456'
                const _visit = await logic.updateVisit(pets[0].id, vaccionations1, controls, details)
                expect(_visit.vaccionations).toBe(vaccionations1)
            })

            it('should succeed updating controls ', async () => {

                const controls1 = 'Controls'
                const _visit = await logic.updateVisit(pets[0].id, vaccionations, controls1, details)
                expect(_visit.controls).toBe(controls1)
            })

            it('should succeed updating controls ', async () => {

                const details1 = 'Details'
                const _visit = await logic.updateVisit(pets[0].id, vaccionations, controls, details1)
                expect(_visit.details).toBe(details1)
            })

        })

        afterAll(() =>
            Promise.all([
                User.deleteMany(),
                Pet.deleteMany(),
                Appointment.deleteMany()
            ])
                .then(() => mongoose.disconnect())
        )
    })
