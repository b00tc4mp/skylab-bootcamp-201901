'use strict'

///////////////falta update remove  user!!!!!!!!!!!!!!!!!
require('dotenv').config()

require('isomorphic-fetch')
const { mongoose, models: { User, Pet, Appointment } } = require('st-james-vet-data')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')


const { env: { TEST_DB_URL } } = process


describe('logic', () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Pet.deleteMany(),
            Appointment.deleteMany(),
        ])
    )

false && describe('register user', () => {

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
    })

    it('should succeed on valid data', async () => {
        const id = await logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)

        expect(id).toBeDefined()
        // expect(typeof id).toBe('string')
        const user = await User.findOne({ email })
        expect(user.id).toBeDefined()
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.idCard).toBe(idCard)
        expect(user.adress).toBe(adress)
        expect(user.city).toBe(city)
        expect(user.email).toBe(email)
        // expect(user.password).toBe(password)

        const match = await bcrypt.compare(password, user.password)

        expect(match).toBeTruthy()
    })

    it('should fail in existing email', async () => {
        try{
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
            
            const idSecond = await logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
        
        } catch (error){
            expect(error).toBeDefined()
        }
    })

    it ('should fail in non-matching password and password confirmation', () =>{  
        const password = '123778'
        // const passwordConfirmation = '1238997'

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
        }).toThrow(Error(' city cannot be empty'))
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
        }).toThrow(Error(' email cannot be empty'))
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
        }).toThrow(Error(' password cannot be empty'))
    })
}),

false && describe('register pet', () => {

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
        await logic.authenticateUser(email, password)      
    })

    it('should succeed on valid data', async () => {
        const pet = await logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)

        expect(pet.specie).toBe(specie)
        expect(pet.breed).toBe(breed)
        expect(pet.color).toBe(color)
        expect(pet.gender).toBe(gender)
        expect(pet.birthdate).toBe(birthdate)
        expect(pet.microchip).toBe(microchip)
        expect(pet.petlicence).toBe(petlicence)
        expect(pet.neutered).toBe(neutered)
        expect(pet.vaccionations).toBe(vaccionations)
        expect(pet.controls).toBe(controls)
        expect(pet.details).toBe(details)

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
            logic.registerPet([] )
        }).toThrow(TypeError([]+ ' is not a string'))
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
            logic.registerPet(owner._id.toString(),' ' )
        }).toThrow(Error('name cannot be empty'))
    })

    it('should fail on undefined specie', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(),namePet, )
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
            logic.registerPet(owner._id.toString(), namePet, specie, )
        }).toThrow(TypeError('undefined is not a string'))
    })

    it('should fail on numeric breed', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, 1234)
        }).toThrow(TypeError(1234 + ' is not a string'))
    })

    it('should fail on boolean breed', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, true )
        }).toThrow(TypeError(true + ' is not a string'))
    })

    it('should fail on object breed', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, {} )
        }).toThrow(TypeError({} + ' is not a string'))
    })

    it('should fail on array breed', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, [] )
        }).toThrow(TypeError([] + ' is not a string'))
    })

    it('should fail on empty breed', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, ' ' )
        }).toThrow(TypeError('breed cannot be empty'))
    })

      it('should fail on undefined color', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, )
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
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, )
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
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, )
        }).toThrow(Error('undefined is not a string'))
    })

    it('should fail on boolean microchip', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, true )
        }).toThrow(TypeError(true + ' is not a string'))
    })

    it('should fail on object microchip', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate,{} )
        }).toThrow(TypeError({} + ' is not a string'))
    })

    it('should fail on array microchip', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate,[] )
        }).toThrow(TypeError([] + ' is not a string'))
    })

    it('should fail on empty microchip', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate,' ' )
        }).toThrow(Error('microchip cannot be empty'))
    })

    it('should fail on undefined petlicence', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, )
        }).toThrow(Error('undefined is not a string'))
    })

    it('should fail on number petlicence', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, 1234 )
        }).toThrow(TypeError(1234 + ' is not a string'))
    })

    it('should fail on boolean petlicence', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, false )
        }).toThrow(TypeError(false + ' is not a string'))
    })

    it('should fail on array petlicence', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, [] )
        }).toThrow(TypeError([] + ' is not a string'))
    })

    it('should fail on object petlicence', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, {} )
        }).toThrow(TypeError({} + ' is not a string'))
    })

    it('should fail on empty petlicence', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, ' ' )
        }).toThrow(Error('petlicence cannot be empty'))
    })

    it('should fail on undefined neutered', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence )
        }).toThrow(TypeError('undefined is not a string'))
    })

    it('should fail on number neutered', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, 1234 )
        }).toThrow(TypeError(1234 + ' is not a string'))
    })

    it('should fail on object neutered', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, {} )
        }).toThrow(TypeError({} + ' is not a string'))
    })

    it('should fail on array neutered', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, [] )
        }).toThrow(TypeError([] + ' is not a string'))
    })

    it('should fail on empty neutered', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, ' ' )
        }).toThrow(TypeError('neutered cannot be empty'))
    })

    it('should fail on undefined vaccinations', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered,  )
        }).toThrow(TypeError('undefined is not a string'))
    })

    it('should fail on numeric vaccinations', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, 1234  )
        }).toThrow(TypeError(1234 + ' is not a string'))
    })

    it('should fail on boolean vaccinations', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, true )
        }).toThrow(TypeError(true + ' is not a string'))
    })

    it('should fail on object vaccinations', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, {} )
        }).toThrow(TypeError({} + ' is not a string'))
    })

    it('should fail on array vaccinations', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, [] )
        }).toThrow(TypeError([] + ' is not a string'))
    })

    it('should fail on empty vaccinations', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, ' ' )
        }).toThrow(TypeError('vaccionations cannot be empty'))
    })

    it('should fail on undefined controls', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations,  )
        }).toThrow(TypeError('undefined is not a string'))
    })

    it('should fail on numeric controls', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, 1234 )
        }).toThrow(TypeError(1234 + ' is not a string'))
    })

   it('should fail on object controls', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, {} )
        }).toThrow(TypeError({} + ' is not a string'))
    })

    it('should fail on array controls', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, [] )
        }).toThrow(TypeError([] + ' is not a string'))
    })

    it('should fail on empty controls', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, ' ' )
        }).toThrow(Error('controls cannot be empty'))
    })

    it('should fail on undefined details', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, )
        }).toThrow(TypeError('undefined is not a string'))
    })

    it('should fail on numeric details', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, 1234 )
        }).toThrow(TypeError(1234 + ' is not a string'))
    })

    it('should fail on array details', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, [] )
        }).toThrow(TypeError([] + ' is not a string'))
    })

    it('should fail on object details', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, {} )
        }).toThrow(TypeError({} + ' is not a string'))
    })
    
    it('should fail on empty details', () => {

        expect(() => {
            logic.registerPet(owner._id.toString(), namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, ' ' )
        }).toThrow(Error('details cannot be empty'))
    })
    
}),

describe('authenticate user', () => {
    const name = 'Clara'
    const surname = 'Rufí'
    let idCard, phone, adress
    const city = `London`
    const email = `clara@gmail.com`
    const password = '123'
    const passwordConfirmation = '123'

    beforeEach(async() => {
        idCard = `234-${Math.random()}`
        phone = `456348-${Math.random()}`
        adress = `London Road -${Math.random()}`

        const hash = await bcrypt.hash(password, 10)
        owner = await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation })
    })

    it('should succeed on correct credentials', async() => {

        const _user = logic.authenticateUser(email, password).then(user => {
            // expect(user.id).toBe(id)
            expect(_user.name).toBe(name)
            expect(_user.surname).toBe(surname)
            expect(_user.email).toBe(email)
            expect(_user.token).toBe(token)
            expect(_user.role).toBe(role)
        })
    })

//     it('should succeed on wrong email', async () => {
//         const email1 = 'error@mail.com'

//         try {
//            const registeredUser= await logic.authenticateUser(email1, password)
        
//         }catch(error) {
//             expect(error).toBeDefined()
//             expect(error.message).toBe(`user with email ${email1} not found`)
//             }
//     })

//     it('should succeed on wrong password', async () => {
//         const password1 = 'wrong'

//         try {
//            const registeredUser= await logic.authenticateUser(email, password1)
        
//         }catch(error) {
//             expect(error).toBeDefined()
//             expect(error.message).toBe(`wrong credentials`)
//             }
//     })
 
//     // it('should fail on not found user', () => {
//     //     expect(() => {
//     //         logic.authenticateUser(`clararufi-${Math.random()}@gmail.com`, `123-${Math.random()}` )
//     //         .catch(error => expect(error).toBeDefined())
//     //     })
//     // })

/////////////////////

    it('should fail on undefined email', () => {
        expect(() => {
            logic.authenticateUser()
        }).toThrow(TypeError('undefined is not a string'))
    })

    it('should fail on numeric email', () => {
        expect(() => {
            logic.authenticateUser(1234)
        }).toThrow(TypeError(1234 + ' is not a string'))
    })

    it('should fail on boolean email', () => {
        expect(() => {
            logic.authenticateUser(true)
        }).toThrow(TypeError(true + ' is not a string'))
    })

    it('should fail on object email', () => {
        expect(() => {
            logic.authenticateUser({})
        }).toThrow(TypeError({} + ' is not a string'))
    })

    it('should fail on array email', () => {
        expect(() => {
            logic.authenticateUser([])
        }).toThrow(TypeError([] + ' is not a string'))
    })

    it('should fail on empty email', () => {
        expect(() => {
            logic.authenticateUser(' ')
        }).toThrow(TypeError('empty is not a string'))
    })

    it('should fail on undefined password', () => {
        expect(() => {
            logic.authenticateUser(email, )
        }).toThrow(TypeError('undefined is not a string'))
    })

    it('should fail on number password', () => {
        expect(() => {
            logic.authenticateUser(email, 1234)
        }).toThrow(TypeError(1234 + ' is not a string'))
    })

    it('should fail on array password', () => {
        expect(() => {
            logic.authenticateUser(email, [])
        }).toThrow(TypeError([] + ' is not a string'))
    })

    it('should fail on object password', () => {
        expect(() => {
            logic.authenticateUser(email, {})
        }).toThrow(TypeError({} + ' is not a string'))
    })

    it('should fail on array password', () => {
        expect(() => {
            logic.authenticateUser(email, [])
        }).toThrow(TypeError([] + ' is not a string'))
    })

    it('should fail on empty password', () => {
        expect(() => {
            logic.authenticateUser(email, ' ')
        }).toThrow(TypeError('password cannot be empty'))
    })
}),

false && describe('assignAppointment', () => {
      
    const name = 'Clara'
    const surname = 'Rufí'
    let idCard, phone, adress
    const city = `London`
    const email = `clara@gmail.com`
    const password = '123'
    let appointment1, appointment2, appointment3, date1
    const owner =  '5c868087fdf5b20f0c26d09d'
    const pet = '5c868199fdf5b20f0c26d09f'


    ///////////////
    const date= 'Sat May 01 2027 00:00:00 GMT+0200 (hora de verano de Europa central)'

    beforeEach(async () => {
        
        idCard = `234-${Math.random()}`
        phone = `456348-${Math.random()}`
        adress = `London Road -${Math.random()}`

    bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, idCard, phone, adress, city, email, password: hash })) 
                .then(({ id }) => userId = id)
                .then(Appointment.create({owner, pet, date}))
    })

    it('should succeed adding an appointment', async () => {
      
        const appointment1 = await logic.assignAppointment({owner, pet, date})
        // expect(owner).toBeDefined()
        expect(pet).toBeDefined()
        // expect(date).toBeDefined()
    })

    it('should fail on adding an appointment with repeated date', async () => {
        const date =  '2019-03-25 19:30'
        const date1 =  '2019-03-25 19:30'
        const appointment2 = await logic.assignAppointment({owner, pet, date})
       
 
        try { 
            const appointment3 = await logic.assignAppointment({owner, pet, date1})
        } catch (error) {
            expect(error).toBeDefined()
            expect(error.message).toBe(`This date & hour has been selected. Please, select another one`) 
        }
   
    })

    it('should fail on undefined owner', () => {
        const owner1 = undefined

        expect(() => {
            logic.assignAppointment(owner1, pet, date)
        }).toThrow(TypeError(owner1 + ' is not a string'))
    })

    it('should fail on numeric owner', () => {
        const owner1 = 23345

        expect(() => {
            logic.assignAppointment(owner1, pet, date)
        }).toThrow(TypeError(owner1 + ' is not a string'))
    })

    it('should fail on boolean owner', () => {
        const owner1 = true

        expect(() => {
            logic.assignAppointment(owner1, pet, date)
        }).toThrow(TypeError(owner1 + ' is not a string'))
    })

    it('should fail on object owner', () => {
        const owner1 = {}

        expect(() => {
            logic.assignAppointment(owner1, pet, date)
        }).toThrow(TypeError(owner1 + ' is not a string'))
    })

    it('should fail on array owner', () => {
        const owner1 = []

        expect(() => {
            logic.assignAppointment(owner1, pet, date)
        }).toThrow(TypeError(owner1 + ' is not a string'))
    })

    it('should fail on empty owner', () => {
        const owner1 = ' '

        expect(() => {
            logic.assignAppointment(owner1, pet, date)
        }).toThrow(TypeError('owner cannot be empty'))
    })

    it('should fail on undefined pet', () => {
        const pet1 = undefined

        expect(() => {
            logic.assignAppointment(owner, pet1, date)
        }).toThrow(Error(pet1 + ' is not a string'))
    })

    it('should fail on numeric pet', () => {
        const pet1 = 84920

        expect(() => {
            logic.assignAppointment(owner, pet1, date)
        }).toThrow(TypeError(pet1 + ' is not a string'))
    })

    it('should fail on boolean pet', () => {
        const pet1 = true

        expect(() => {
            logic.assignAppointment(owner, pet1, date)
        }).toThrow(TypeError(pet1 + ' is not a string'))
    })

    it('should fail on object pet', () => {
        const pet1 = {}

        expect(() => {
            logic.assignAppointment(owner, pet1, date)
        }).toThrow(TypeError(pet1 + ' is not a string'))
    })

    it('should fail on array pet', () => {
        const pet1 = []

        expect(() => {
            logic.assignAppointment(owner, pet1, date)
        }).toThrow(TypeError(pet1 + ' is not a string'))
    })

    it('should fail on empty pet', () => {
        const pet1 = ' '

        expect(() => {
            logic.assignAppointment(owner, pet1, date)
        }).toThrow(Error('pet cannot be empty'))
    })

    it('should fail on undefined date', () => {
        const date1 = undefined

        expect(() => {
            logic.assignAppointment(owner, pet, date1)
        }).toThrow(TypeError('date is not an object'))
    })

    it('should fail on numeric date', () => {
        const date1 = 39292

        expect(() => {
            logic.assignAppointment(owner, pet, date1)
        }).toThrow(TypeError('date is not an object'))
    })

    it('should fail on boolean date', () => {
        const date1 = true

        expect(() => {
            logic.assignAppointment(owner, pet, date1)
        }).toThrow(TypeError('date is not an object'))
    })

    it('should fail on string date', () => {
        const date1 = ''

        expect(() => {
            logic.assignAppointment(owner, pet, date1)
        }).toThrow(TypeError('date is not an object'))
    })

    it('should fail on array date', () => {
        const date1 = []

        expect(() => {
            logic.assignAppointment(owner, pet, date1)
        }).toThrow(TypeError('date is not an object'))
    })

    it('should fail on empty date', () => {
        const date1 = ' '

        expect(() => {
            logic.assignAppointment(owner, pet, date1)
        }).toThrow(TypeError('date is not an object'))
    })
}),

////////////////////////////////////////////////////  retrieve user
false && describe('retrieve user', () => {
    const name = 'Clara'
    const surname = 'Rufí'
    let idCard, phone, adress
    const city = `London`
    const email = `clara@gmail.com`
    const password = '123'

    beforeEach(async () => {

        idCard = `234-${Math.random()}`
        phone = `456348-${Math.random()}`
        adress = `London Road -${Math.random()}`
    
        bcrypt.hash(password, 10)
            .then(hash => User.create({ name, surname, idCard, phone, adress, city, email, password: hash }))
            .then(() => logic.authenticateUser(email, password))
        })

    it('should succeed on correct credentials', async () => {

        const user =logic.retrieveUser().then(user => {
            
                // expect(user.id).toBe(userId)
                expect(user._id).toBeEqual(id)
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.idCard).toBe(idCard)
                expect(user.phone).toBe(phone)
                expect(user.adress).toBe(adress)
                expect(user.city).toBe(city)
                expect(user.email).toBe(email)

                // expect(user.save).toBeUndefined()
        })
    })

    it('should fail on not registered user', async () => {
        await User.deleteOne({ id})
        try{
            await logic.retrieveUser(id)
        }catch (error){
            expect(error).toBeDefined()
            expect(error.message).toBe('user with userId ${id} is not found')
        }
    })

    it('should fail on undefined userId', () => {
        const userId1 = undefined

        expect(() => {
            logic.retrieveUser(userId1)
        }).toThrow(TypeError(userId1 + ' is not a string'))
    })

    it('should fail on numeric userId', () => {
        const userId1 = 567

        expect(() => {
            logic.retrieveUser(userId1)
        }).toThrow(TypeError(userId1 + ' is not a string'))
    })

    it('should fail on boolean userId', () => {
        const userId1 = true

        expect(() => {
            logic.retrieveUser(userId1)
        }).toThrow(TypeError(userId1 + ' is not a string'))
    })

    it('should fail on object userId', () => {
        const userId1 = {}

        expect(() => {
            logic.retrieveUser(userId1)
        }).toThrow(TypeError(userId1 + ' is not a string'))
    })

    it('should fail on array userId', () => {
        const userId1 = []

        expect(() => {
            logic.retrieveUser(userId1)
        }).toThrow(TypeError(userId1 + ' is not a string'))
    })

    it('should fail on empty userId', () => {
        const userId1 = ' '

        expect(() => {
            logic.retrieveUser(userId1)
        }).toThrow(Error('userId cannot be empty'))
    })

}),
    
    
 ///////////////////////////////////////////////////////////     retrieve appointments
false && describe('retrieveAppointments', () => {

    const name = 'Clara'
    const surname = 'Rufí'
    let idCard, phone, adress
    const city = `London`
    const email = `clara@gmail.com`
    const password = '123'
    const passwordConfirmation = '123'
    const owner =  '5c868087fdf5b20f0c26d09d'
    const pet = '5c868199fdf5b20f0c26d09f'
    const date =  '2019-03-25 19:30'
    const year = '2019'
    const month = '04'    
        
    beforeEach(async () => {

        idCard = `234-${Math.random()}`
        phone = `456348-${Math.random()}`
        adress = `London Road -${Math.random()}`
 
        const hash = bcrypt.hash(password, 10)
            await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation: hash })
            .then(() => logic.authenticateUser(email, password))
            .then(Appointment.create({owner, pet, date}))
            .then(logic.retrieveAppointments())        
    })
        

    it('should succeed on valid data', async () => {
        logic.retrieveAppointments(year, month)
            .then(user => {
              expect(year).toBeDefined()
                expect(month).toBeDefined()
            })
    })

    it('should fail on undefined year', () => {
        const year1 = undefined

        expect(() => {
            logic.retrieveAppointments(year, month)
        }).toThrow(TypeError(year1 + ' is not a string'))
    })

    it('should fail on numeric year', () => {
        const year1 = 678

        expect(() => {
            logic.retrieveAppointments(year, month)
        }).toThrow(TypeError(year1 + ' is not a string'))
    })

    it('should fail on boolean year', () => {
        const year1 = true

        expect(() => {
            logic.retrieveAppointments(year, month)
        }).toThrow(TypeError(year1 + ' is not a string'))
    })

    it('should fail on object year', () => {
        const year1 = {}

        expect(() => {
            logic.retrieveAppointments(year, month)
        }).toThrow(TypeError(year1 + ' is not a string'))
    })

    it('should fail on array year', () => {
        const year1 = []

        expect(() => {
            logic.retrieveAppointments(year, month)
        }).toThrow(TypeError(year1 + ' is not a string'))
    })

    it('should fail on empty year', () => {
        const year1 = ' '

        expect(() => {
            logic.retrieveAppointments(year, month)
        }).toThrow(TypeError(year1 + ' is not a string'))
    })

    it('should fail on undefined month', () => {
        const month1 = undefined

        expect(() => {
            logic.retrieveAppointments(year, month)
        }).toThrow(TypeError(month1 + ' is not a string'))
    })

    it('should fail on numeric month', () => {
        const month1 = 4532

        expect(() => {
            logic.retrieveAppointments(year, month)
        }).toThrow(TypeError(month1 + ' is not a string'))
    })

    it('should fail on boolean month', () => {
        const month1 = true

        expect(() => {
            logic.retrieveAppointments(year, month)
        }).toThrow(TypeError(month1 + ' is not a string'))
    })

    it('should fail on object month', () => {
        const month1 = {}

        expect(() => {
            logic.retrieveAppointments(year, month)
        }).toThrow(TypeError(month1 + ' is not a string'))
    })

    it('should fail on array month', () => {
        const month1 = []

        expect(() => {
            logic.retrieveAppointments(year, month)
        }).toThrow(TypeError(month1 + ' is not a string'))
    })

    it('should fail on empty month', () => {
        const month1 = ' '

        expect(() => {
            logic.retrieveAppointments(year, month)
        }).toThrow(TypeError(month1 + ' is not a string'))
    })
}),

false && describe('retrieve users', () => {
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
    
      
    const hash = bcrypt.hash(password, 10)
        await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation: hash })
        .then(() => logic.authenticateUser(email, password))
        .then(logic.retrieveUsers())       
    })

    it('should succeed on correct credentials', async () => {
        logic.retrieveUsers().then(user => {
            
                // expect(user.id).toBe(userId)
                // expect(user.id).toBeEqual(_id)
                expect(user.name).toBe(name)
                expect(user.id).toBe(id)
                expect(user.email).toBe(email)

                // expect(user.save).toBeUndefined()
        })
    })

    it('should fail on not registered user', async () => {
        await User.deleteOne({ id})
        try{
            await logic.retrieveUsers(id)
        }catch (error){
            expect(error).toBeDefined()
            expect(error.message).toBe('user with userId ${id} is not found')
        }
    })
}),

false && describe('retrieve pets', () => {
    const name = 'Clara'
    const surname = 'Rufí'
    let idCard, phone, adress
    const city = `London`
    const email = `clara@gmail.com`
    const password = '123'

    const owner = '5c80df3816440c252c9d26dc'
    const namePet = 'George'
    const specie = 'cat'
    let breed
    const color = 'grey'
    const gender = 'male'
    const birthdate = '02/03/2019'
    const neutered = 'yes'
    let microchip, petlicence, vaccionations, controls, details
    const ownerId = '5c75c810e67d3ca972bb0da5bff'
    beforeEach(async () => {
        
        breed = `british-${Math.random()}`
        microchip = `44567 -${Math.random()}`
        petlicence = `99876-${Math.random()}`
        vaccionations = `vaccins-${Math.random()}`
        controls = `controls-${Math.random()}`
        details = `details-${Math.random()}`

        const hash = bcrypt.hash(password, 10)
        await User.create({ name, surname, idCard, phone, adress, city, email, password: hash})
            .then(() => logic.authenticateUser(email, password))
            .then(() => logic.registerPet({owner, namePet, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details})) 
    })
     
    it('should succeed on correct credentials', async () => {
        const pet = await logic.retrievePets().then(pet => {
            
                // expect(user.id).toBe(userId)
                // expect(user.id).toBeEqual(_id)
                expect(pet.owner).toBe(owner)
                expect(pet.name).toBe(name)
                expect(pet.microchip).toBe(microchip)
                expect(pet.petlicence).toBe(petlicence)
                expect(pet.neutered).toBe(neutered)
                expect(pet.id).toBe(id)
                // expect(user.save).toBeUndefined()
        })
    })
}),   

false && describe('retrieve pet', () => {

    const owner = '5c80df3816440c252c9d26dc'
    const name = 'George'
    const specie = 'cat'
    let breed
    const color = 'grey'
    const gender = 'male'
    const birthdate = '02/03/2019'
    const neutered = 'yes'
    let microchip, petlicence, vaccionations, controls, details
    
    beforeEach(async () => {
        
        breed = `british-${Math.random()}`
        microchip = `44567 -${Math.random()}`
        petlicence = `99876-${Math.random()}`
        vaccionations = `vaccins-${Math.random()}`
        controls = `controls-${Math.random()}`
        details = `details-${Math.random()}`

        await Pet.create({owner, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details})
            .then(() => logic.authenticateUser(email, password))
    })

    it('should succeed on correct credentials', async () => {
        const pet = await logic.retrievePet().then(pet => {
            
                // expect(user.id).toBe(userId)
                // expect(user.id).toBeEqual(_id)
                
                expect(pet.name).toBe(name)
                expect(pet.microchip).toBe(microchip)
                expect(pet.petlicence).toBe(petlicence)
                expect(pet.neutered).toBe(neutered)
        })
    })
}),   
    
false && describe('retrieveVisit', () => {

    const owner = '5c80df3816440c252c9d26dc'
    const name = 'George'
    const specie = 'cat'
    let breed
    const color = 'grey'
    const gender = 'male'
    const birthdate = '02/03/2019'
    const neutered = 'yes'
    let microchip, petlicence, vaccionations, controls, details
    
    beforeEach(async () => {
        
        breed = `british-${Math.random()}`
        microchip = `44567 -${Math.random()}`
        petlicence = `99876-${Math.random()}`
        vaccionations = `vaccins-${Math.random()}`
        controls = `controls-${Math.random()}`
        details = `details-${Math.random()}`

        await Pet.create({owner, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details})
    })

    it('should succeed on correct credentials', async () => {
        const pet = await logic.retrievePets().then(pet => {
            
                // expect(user.id).toBe(userId)
                // expect(user.id).toBeEqual(_id)
                expect(pet.vaccionations).toBe(vaccionations)
                expect(pet.controls).toBe(controls)
                expect(pet.details).toBe(details)
                // expect(user.save).toBeUndefined()
        })
    })
}),   
    
false && describe('updateUser', () => {

    const name = 'Clara'
    const surname = 'Rufí'
    let idCard, phone, adress
    const city = `London`
    const email = `clara@gmail.com`
    const password = '123'

    beforeEach(async () => {

        idCard = `234-${Math.random()}`
        phone = `456348-${Math.random()}`
        adress = `London Road -${Math.random()}`
    
        const hash = bcrypt.hash(password, 10)
        await User.create({ name, surname, idCard, phone, adress, city, email, password: hash })
            .then(() => logic.authenticateUser(email, password))
            .then(()=> logic.updateUser(name, surname, idCard, phone, adress , 'Barcelona'))
    })

    it('should fail on numeric name', () => {
        const name1 = 45622

        expect(() => {
            logic.updateUser(name1, surname, idCard, phone, adress, city,email)
        }).toThrow(TypeError(name1 + ' is not a string'))
    })

    it('should fail on boolean name', () => {
        const name1 = true

        expect(() => {
            logic.updateUser(name1, surname, idCard, phone, adress, city,email)
        }).toThrow(TypeError(name1 + ' is not a string'))
    })

    it('should fail on object name', () => {
        const name1 = {}

        expect(() => {
            logic.updateUser(name1, surname, idCard, phone, adress, city,email)
        }).toThrow(TypeError(name1 + ' is not a string'))
    })

    it('should fail on array name', () => {
        const name1 = []

        expect(() => {
            logic.updateUser(name1, surname, idCard, phone, adress, city,email)
        }).toThrow(TypeError(name1 + ' is not a string'))
    })

    it('should fail on numeric surname', () => {
        const surname1 = 8432

        expect(() => {
            logic.updateUser(name, surname1, idCard, phone, adress, city,email)
        }).toThrow(TypeError(surname1 + ' is not a string'))
    })

    it('should fail on boolean surname', () => {
        const surname1 = true

        expect(() => {
            logic.updateUser(name, surname1, idCard, phone, adress, city,email)
        }).toThrow(TypeError(surname1 + ' is not a string'))
    })

    it('should fail on object surname', () => {
        const surname1 = {}

        expect(() => {
            logic.updateUser(name, surname1, idCard, phone, adress, city,email)
        }).toThrow(TypeError(surname1 + ' is not a string'))
    })

    it('should fail on array surname', () => {
        const surname1 = []

        expect(() => {
            logic.updateUser(name, surname1, idCard, phone, adress, city,email)
        }).toThrow(TypeError(surname1 + ' is not a string'))
    })

    it('should fail on empty surname', () => {
        const surname1 = ' '

        expect(() => {
            logic.updateUser(name, surname1, idCard, phone, adress, city,email)
        }).toThrow(TypeError(surname1 + ' is not a string'))
    })

    it('should fail on numeric idCard', () => {
        const idCard1 = 43222

        expect(() => {
            logic.updateUser(name, surname, idCard1, phone, adress, city,email)
        }).toThrow(TypeError(idCard1 + ' is not a string'))
    })

    it('should fail on boolean idCard', () => {
        const idCard1 = true

        expect(() => {
            logic.updateUser(name, surname, idCard1, phone, adress, city,email)
        }).toThrow(TypeError(idCard1 + ' is not a string'))
    })

    it('should fail on boolean idCard', () => {
        const idCard1 = true

        expect(() => {
            logic.updateUser(name, surname, idCard1, phone, adress, city,email)
        }).toThrow(TypeError(idCard1 + ' is not a string'))
    })

    it('should fail on object idCard', () => {
        const idCard1 = {}

        expect(() => {
            logic.updateUser(name, surname, idCard1, phone, adress, city,email)
        }).toThrow(TypeError(idCard1 + ' is not a string'))
    })

    it('should fail on array idCard', () => {
        const idCard1 = []

        expect(() => {
            logic.updateUser(name, surname, idCard1, phone, adress, city,email)
        }).toThrow(TypeError(idCard1 + ' is not a string'))
    })

    it('should fail on empty idCard', () => {
        const idCard1 = ' '

        expect(() => {
            logic.updateUser(name, surname, idCard1, phone, adress, city,email)
        }).toThrow(TypeError(idCard1 + ' is not a string'))
    })
}),   

false && describe('updateVisit', () => {

    const name = 'Clara'
    const surname = 'Rufí'
    let idCard, phone, adress
    const city = `London`
    const email = `clara@gmail.com`
    const password = '123'
    const passwordConfirmation = '123'
    const owner =  '5c868087fdf5b20f0c26d09d'
    const pet = '5c868199fdf5b20f0c26d09f'
    
    beforeEach(async () => {
        
        idCard = `234-${Math.random()}`
        phone = `456348-${Math.random()}`
        adress = `London Road -${Math.random()}`
        date = `2019-${Math.random()}`
    
        const hash = bcrypt.hash(password, 10)
        await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation: hash })
            .then(() => logic.authenticateUser(email, password))
            .then(Appointment.create({owner, pet, date}))
            .then(logic.updateVisit())
        })

    it('should succeed on correct credentials', async () => {
        const visit = await logic.retrievePets().then(pet => {
            
                // expect(user.id).toBe(userId)
                // expect(user.id).toBeEqual(_id)
                expect(pet.vaccionations).toBe(vaccionations)
                expect(pet.controls).toBe(controls)
                expect(pet.details).toBe(details)
                // expect(user.save).toBeUndefined()
        })
    })

    it('should fail on numeric petsId', () => {
        const petsId1 = 43222

        expect(() => {
            logic.updateVisit(petsId1, vaccionations, controls, details)
        }).toThrow(TypeError(petsId1 + ' is not a string'))
    })

    it('should fail on boolean petsId', () => {
        const petsId1 = true

        expect(() => {
            logic.updateVisit(petsId1, vaccionations, controls, details)
        }).toThrow(TypeError(petsId1 + ' is not a string'))
    })

    it('should fail on object petsId', () => {
        const petsId1 = []

        expect(() => {
            logic.updateVisit(petsId1, vaccionations, controls, details)
        }).toThrow(TypeError(petsId1 + ' is not a string'))
    })

    it('should fail on array petsId', () => {
        const petsId1 = []

        expect(() => {
            logic.updateVisit(petsId1, vaccionations, controls, details)
        }).toThrow(TypeError(petsId1 + ' is not a string'))
    })

    it('should fail on empty petsId', () => {
        const petsId1 = ' '

        expect(() => {
            logic.updateVisit(petsId1, vaccionations, controls, details)
        }).toThrow(TypeError(petsId1 + ' is not a string'))
    })

    it('should fail on numeric vaccionations', () => {
        const vaccionations1 = 43222

        expect(() => {
            logic.updateVisit(petsId, vaccionations1, controls, details)
        }).toThrow(TypeError( vaccionations1 + ' is not a string'))
    })

    it('should fail on boolean vaccionations', () => {
        const vaccionations1 = false

        expect(() => {
            logic.updateVisit(petsId, vaccionations1, controls, details)
        }).toThrow(TypeError( vaccionations1 + ' is not a string'))
    })

    it('should fail on object vaccionations', () => {
        const vaccionations1 = {}

        expect(() => {
            logic.updateVisit(petsId, vaccionations1, controls, details)
        }).toThrow(TypeError( vaccionations1 + ' is not a string'))
    })

    it('should fail on array vaccionations', () => {
        const vaccionations1 = []

        expect(() => {
            logic.updateVisit(petsId, vaccionations1, controls, details)
        }).toThrow(TypeError( vaccionations1 + ' is not a string'))
    })

    it('should fail on empty vaccionations', () => {
        const vaccionations1 = ' '

        expect(() => {
            logic.updateVisit(petsId, vaccionations1, controls, details)
        }).toThrow(TypeError( vaccionations1 + ' is not a string'))
    })
}),   

false && describe('deleteAppointment', () => {

    const name = 'Clara'
    const surname = 'Rufí'
    let idCard, phone, adress
    const city = `London`
    const email = `clara@gmail.com`
    const password = '123'
    const passwordConfirmation = '123'
    const owner =  '5c868087fdf5b20f0c26d09d'
    const pet = '5c868199fdf5b20f0c26d09f'
    const Id= '5c88daecc58e1e636c795983'
    let date
    
    beforeEach(async () => {
        
        idCard = `234-${Math.random()}`
        phone = `456348-${Math.random()}`
        adress = `London Road -${Math.random()}`
        date = `2019-${Math.random()}`
    
        const hash = bcrypt.hash(password, 10)
        await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation: hash })
            .then(() => logic.authenticateUser(email, password))
            .then(Appointment.create({owner, pet, date}))
            .then(logic.deleteAppointment())
        })


    it('should fail on deleting an appointment withouth Id', async () => {
        try {
            const deleteAppointment1= await logic.deleteAppointment( ' ')
         
         }catch(error) {
             expect(error).toBeDefined()
             expect(error.message).toBe(`appointment with id ${appointmentId} succesfully deleted`)
             }
     })

     it('should fail on undefined Id', () => {
        const Id1 = undefined

        expect(() => {
            logic.deleteAppointment(Id)
        }).toThrow(TypeError( Id1+ ' is not a string'))
    })

    it('should fail on number Id', () => {
        const Id1 = 23345

        expect(() => {
            logic.deleteAppointment(Id)
        }).toThrow(TypeError( Id1+ ' is not a string'))
    })

    it('should fail on boolean Id', () => {
        const Id1 = true

        expect(() => {
            logic.deleteAppointment(Id)
        }).toThrow(TypeError( Id1+ ' is not a string'))
    })

    it('should fail on object Id', () => {
        const Id1 = {}

        expect(() => {
            logic.deleteAppointment(Id)
        }).toThrow(TypeError( Id1+ ' is not a string'))
    })

    it('should fail on array Id', () => {
        const Id1 = []

        expect(() => {
            logic.deleteAppointment(Id)
        }).toThrow(TypeError( Id1+ ' is not a string'))
    })

    it('should fail on empty Id', () => {
        const Id1 = ' '

        expect(() => {
            logic.deleteAppointment(Id)
        }).toThrow(TypeError( Id1+ ' is not a string'))
    })
}),

false && describe('retrieveUserSelected', () => {

    const name = 'Clara'
    const surname = 'Rufí'
    let idCard, phone, adress
    const city = `London`
    const email = `clara@gmail.com`
    const password = '123'

    let userId
    
    beforeEach(async () => {
        
        idCard = `234-${Math.random()}`
        phone = `456348-${Math.random()}`
        adress = `London Road -${Math.random()}`
    
        const hash = bcrypt.hash(password, 10)
        await User.create({ name, surname, idCard, phone, adress, city, email, password: hash })
            .then(() => logic.authenticateUser(email, password))
            .then(({id})=> userId = id)
            // .then(()=> logic.retrieveUserSelected(name, surname, idCard, phone, adress , city, email))
        })

    it('should succeed on correct credentials', async () => {
        const userSelected = await logic.retrieveUserSelected(userId).then(user => {
            
                expect(userSelected.id).toBe(userId)
                // expect(user.id).toBeEqual(_id)
                expect(userSelected.name).toBe(name)
                expect(userSelected.surname).toBe(surname)
                expect(userSelected.idCard).toBe(idCard)
                expect(userSelected.phone).toBe(phone)
                expect(userSelected.adress).toBe(adress)
                expect(userSelected.city).toBe(city)
                expect(userSelected.email).toBe(email)
                // expect(user.save).toBeUndefined()
        })
    })

})
    
    after(() =>
        Promise.all([
            User.deleteMany(),
            Pet.deleteMany(),
            Appointment.deleteMany(),
            // Appointments.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})