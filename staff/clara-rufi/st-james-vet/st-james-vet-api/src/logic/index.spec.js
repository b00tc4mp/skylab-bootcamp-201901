'use strict'

///////////////falta update remove  user!!!!!!!!!!!!!!!!!
require('dotenv').config()

require('isomorphic-fetch')
const { mongoose, models: { User, Pet, Appointments } } = require('st-james-vet-data')
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
            // Appointments.deleteMany(), ///////////////////////////////////////////////
        ])
    )

    //////////////////////////////////////////////////////// register user
    describe('register user', () => {

        const name ='Clara'
        const surname = 'Rufí'
        let idCard
        let phone
        let adress
        const city = 'London'
        let email
        let password
        let passwordConfirmation
        password = passwordConfirmation

        beforeEach(() => {

            idCard = `234-${Math.random()}`
            phone = `456348-${Math.random()}`
            adress = `London Road -${Math.random()}`
            email = `clararufi-${Math.random()}@gmail.com`
            password = '123'
            passwordConfirmation = '123'
        })

        it('should succeed on valid data', async () => {
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
            }).toThrow(Error(name1 + 'cannot be empty'))
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
            }).toThrow(Error(surname1 + 'cannot be empty'))
        })
    })

        ////////////////////////////////////////////////////////////////////////////////// idCard
        it('should fail on undefined idCard', () => {
            idCard1 = undefined

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
            }).toThrow(Error(idCard1 + 'cannot be empty'))
        })

        ///////////////////////////////////////////////////////////////////////////////phone
        
        it('should fail on undefined phone', () => {
            const phone1 =  undefined

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
            }).toThrow(Error(phone1 + 'cannot be empty'))
        })

            ///////////////////////////////////////////////////////////////////// adress

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
            }).toThrow(Error(adress1 + 'cannot be empty'))
        })


        ////////////////////////////////////////////////////////// register city

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
                logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
            }).toThrow(TypeError(city + ' is not a string'))
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
            }).toThrow(Error(city1 + 'cannot be empty'))
        })

                    ///////////////////////////////////////////////////////////// email
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
            }).toThrow(Error(email1 + 'cannot be empty'))
        })

        ////////////////////////////////////////////////////// register password

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
            }).toThrow(Error(password1 + 'cannot be empty'))
        })


    })

    ////////////////////////////////////////////////////////register pet














    //////////////////////////////////////////////////////////// authenticate user

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
        User.deleteMany(),
        Pet.deleteMany(),
        // Appointments.deleteMany()
    ])
        .then(() => mongoose.disconnect())
)
