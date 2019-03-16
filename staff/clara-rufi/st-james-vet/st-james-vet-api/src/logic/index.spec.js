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

    //////////////////////////////////////////////////////// register user
describe('register user', () => {

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
////////////////////////////////////////////////////////register pet

describe('register pet', () => {

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

    })

    it('should succeed on valid data', async () => {
        const id = await logic.registerPet(owner, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)

        // expect(id).toBeDefined()
        // expect(typeof id).toBe('string')
        const pet = await Pet.findById({ id })
        // expect(pet.id).toBeDefined()
        //expect(pet.owner).toBe(owner)
        expect(pet.name).toBe(name)
        // expect(pet.specie).toBe(specie)
        // expect(pet.breed).toBe(breed)
        // expect(pet.color).toBe(color)
        // expect(pet.gender).toBe(gender)
        // expect(pet.birthdate).toBe(birthdate)
        // expect(pet.microchip).toBe(microchip)
        // expect(pet.petlicence).toBe(petlicence)
        // expect(pet.neutered).toBe(neutered)
        // expect(pet.vaccionations).toBe(vaccionations)
        // expect(pet.controls).toBe(controls)
        // expect(pet.details).toBe(details)

    })

    // it('should fail on undefined owner', () => {
    //     owner1 = undefined

    //     expect(() => {
    //         logic.registerPet(owner1, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
    //     }).toThrow(TypeError(owner1 + ' is not a string'))
    // })

    it('should fail on numeric owner', () => {
        const owner1 = 3456

        expect(() => {
            logic.registerPet(owner1, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(TypeError(owner1 + ' is not a string'))
    })

    it('should fail on boolean owner', () => {
        const owner1 = true

        expect(() => {
            logic.registerPet(owner1, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(TypeError(owner1 + ' is not a string'))
    })

    it('should fail on object owner', () => {
        const owner1 = []

        expect(() => {
            logic.registerPet(owner1, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(TypeError(owner1 + ' is not a string'))
    })

    it('should fail on array owner', () => {
        const owner1 = []

        expect(() => {
            logic.registerPet(owner1, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(TypeError(owner1 + ' is not a string'))
    })

    it('should fail on empty owner', () => {
        const owner1 = ' '

        expect(() => {
            logic.registerPet(owner1, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(Error('owner cannot be empty'))
    })

    it('should fail on undefined name', () => {
        const name1 = undefined

        expect(() => {
            logic.registerPet(owner, name1, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(TypeError(name1 + ' is not a string'))
    })

    it('should fail on numeric name', () => {
        const name1 = 3456

        expect(() => {
            logic.registerPet(owner, name1, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(TypeError(name1 + ' is not a string'))
    })

    it('should fail on boolean name', () => {
        const name1 = false

        expect(() => {
            logic.registerPet(owner, name1, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(TypeError(name1 + ' is not a string'))
    })

    it('should fail on object name', () => {
        const name1 = false

        expect(() => {
            logic.registerPet(owner, name1, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(TypeError(name1 + ' is not a string'))
    })

    it('should fail on array name', () => {
        const name1 = []

        expect(() => {
            logic.registerPet(owner, name1, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(TypeError(name1 + ' is not a string'))
    })

    it('should fail on empty name', () => {
        const name1 = ' '

        expect(() => {
            logic.registerPet(owner, name1, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(TypeError('name cannot be empty'))
    })

    it('should fail on undefined specie', () => {
        const specie1 = undefined

        expect(() => {
            logic.registerPet(owner, name, specie1, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(TypeError(specie1 + ' is not a string'))
    })

    it('should fail on numeric specie', () => {
        const specie1 = 45677

        expect(() => {
            logic.registerPet(owner, name, specie1, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(TypeError(specie1 + ' is not a string'))
    })

    it('should fail on boolean specie', () => {
        const specie1 = true

        expect(() => {
            logic.registerPet(owner, name, specie1, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(TypeError(specie1 + ' is not a string'))
    })

    it('should fail on object specie', () => {
        const specie1 = {}

        expect(() => {
            logic.registerPet(owner, name, specie1, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(TypeError(specie1 + ' is not a string'))
    })

    it('should fail on array specie', () => {
        const specie1 = []

        expect(() => {
            logic.registerPet(owner, name, specie1, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(TypeError(specie1 + ' is not a string'))
    })

    it('should fail on empty specie', () => {
        const specie1 = ' '

        expect(() => {
            logic.registerPet(owner, name, specie1, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
        }).toThrow(TypeError('specie cannot be empty'))
    })
}),

//////////////////////////////FALTENNN!!!!!!!!!!!!!!!!!!!!!!




//////////////////////////////////////////////////////////// authenticate user

describe('authenticate user', () => {
    const name = 'Clara'
    const surname = 'Rufí'
    let idCard, phone, adress
    const city = `London`
    const email = 'clara@gmail.com'
    const password = 'clara'
 
    
    beforeEach(async() => {
        idCard = `234-${Math.random()}`
        phone = `456348-${Math.random()}`
        adress = `London Road -${Math.random()}`
        // passwordConfirmation = '123'

        // const hash = await bcrypt.hash(password, 10)
        // await User.create({ name, surname, email, password: hash, status })
        // const hash = await bcrypt.hash(password, 10)
        // await User.create({ name, surname, idCard, phone, adress, city, email, password: hash })
       
        return bcrypt.hash(password, 10)
            .then(hash => User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation: hash  }))
        })
    })

    it('should succeed on correct credentials', async() => {
        const email1 = 'clara@gmail.com'
        const password1 = 'clara'

        logic.authenticateUser(email1, password1)
            .then(id => expect(id).toBeDefined()
                // expect(user.name).toBe(name)
                // expect(user.surname).toBe(surname)
                // expect(user.email).toBe(email)
            )
    })

    

    it('should succeed on wrong credentials', async () => {
        const email = 'error@mail.com'

        try {
           const registeredUser= await logic.authenticateUser(email, 'falsePassword')
        
        }catch(error) {
            expect(error).toBeDefined()
            expect(error.message).toBe(`user with email ${email} not found`)
            }
    })
 
    it('should fail on not found user', () => {
        expect(() => {
            logic.authenticateUser(`clararufi-${Math.random()}@gmail.com`, `123-${Math.random()}` )
            .catch(error => expect(error).toBeDefined())
        })
    })

    // it('should fail on undefined email', () => {
    //     const email1 = undefined
        
    //     expect(() => {
    //         logic.authenticateUser(email1, password1)
    //     }).toThrow(TypeError(email1 + ' is not a string'))
    // })

    // it('should fail on numeric email', () => {
    //     const email1 = 87432
       
    //     expect(() => {
    //         logic.authenticateUser(email1, password1)
    //     }).toThrow(TypeError(email1 + ' is not a string'))
    // })

    // it('should fail on boolean email', () => {
    //     const email1 = true
        
    //     expect(() => {
    //         logic.authenticateUser(email1, password1)
    //     }).toThrow(TypeError(email1 + ' is not a string'))
    // })

    // it('should fail on object email', () => {
    //     const email1 = {}
       
    //     expect(() => {
    //         logic.authenticateUser(email1, password1)
    //     }).toThrow(TypeError(email1 + ' is not a string'))
    // })

    // it('should fail on array email', () => {
    //     const email1 = []

    //     expect(() => {
    //         logic.authenticateUser(email1, password)
    //     }).toThrow(TypeError(email1 + ' is not a string'))
    // })

    // it('should fail on empty email', () => {
    //     const email1 = ' '

    //     expect(() => {
    //         logic.authenticateUser(email1, password)
    //     }).toThrow(Error('email cannot be empty'))
    // })

    // it('should fail on undefined password', () => {
    //     const password1 = undefined

    //     expect(() => {
    //         logic.authenticateUser(email, password1)
    //     }).toThrow(TypeError(password1 + ' is not defined'))
    // })

    // it('should fail on numeric password', () => {
    //     const password1 = 56732

    //     expect(() => {
    //         logic.authenticateUser(email, password1)
    //     }).toThrow(TypeError(password1 + ' is not a string'))
    // })

    // it('should fail on boolean password', () => {
    //     const password1 = true

    //     expect(() => {
    //         logic.authenticateUser(email, password1)
    //     }).toThrow(TypeError(password1 + ' is not a string'))
    // })

    // it('should fail on object password', () => {
    //     const password1 = {}

    //     expect(() => {
    //         logic.authenticateUser(email, password1)
    //     }).toThrow(TypeError(password1 + ' is not a string'))
    // })

    // it('should fail on array password', () => {
    //     const password1 = []

    //     expect(() => {
    //         logic.authenticateUser(email, password1)
    //     }).toThrow(TypeError(password1 + ' is not a string'))
    // })

    // it('should fail on empty password', () => {
    //     const password1 = ' '

    //     expect(() => {
    //         logic.authenticateUser(email, password1)
    //     }).toThrow(TypeError(password1 + ' is not a string'))
    // })
}),
 ///////////////////////////////////////////////////////////////////////


describe('assignAppointment', () => {
      
    const name = 'Clara'
    const surname = 'Rufí'
    let idCard, phone, adress
    const city = `London`
    const email = `clara@gmail.com`
    const password = '123'
    const passwordConfirmation = '123'
    let appointment1, appointment2, appointment3, date1
    const owner =  '5c868087fdf5b20f0c26d09d'
    const pet = '5c868199fdf5b20f0c26d09f'
    const date =  '2019-03-25 19:30'

    beforeEach(() => {

        idCard = `234-${Math.random()}`
        phone = `456348-${Math.random()}`
        adress = `London Road -${Math.random()}`

    bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation: hash })) 
                .then(({ id }) => userId = id)
                .then(Appointment.create({owner, pet, date}))
    })

    it('should succeed adding an appointment', async () => {
      
        const appointment1 = await logic.assignAppointment({owner, pet, date})
        expect(owner).toBeDefined()
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
        }).toThrow(TypeError('pet cannot be empty'))
    })

    it('should fail on undefined date', () => {
        const date1 = undefined

        expect(() => {
            logic.assignAppointment(owner, pet, date1)
        }).toThrow(Error(date1 + ' is not type date'))
    })

    it('should fail on numeric date', () => {
        const date1 = 39292

        expect(() => {
            logic.assignAppointment(owner, pet, date1)
        }).toThrow(Error(date1 + ' is not type date'))
    })

    it('should fail on boolean date', () => {
        const date1 = true

        expect(() => {
            logic.assignAppointment(owner, pet, date1)
        }).toThrow(Error(date1 + ' is not type date'))
    })

    it('should fail on object date', () => {
        const date1 = {}

        expect(() => {
            logic.assignAppointment(owner, pet, date1)
        }).toThrow(Error(pet1 + ' is not type date'))
    })

    it('should fail on array date', () => {
        const date1 = []

        expect(() => {
            logic.assignAppointment(owner, pet, date1)
        }).toThrow(Error(date1 + ' is not type date'))
    })

    it('should fail on empty date', () => {
        const date1 = ' '

        expect(() => {
            logic.assignAppointment(owner, pet, date1)
        }).toThrow(Error(date1 + ' is not type date'))
    })
}),

////////////////////////////////////////////////////  retrieve user
describe('retrieve user', () => {
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
    
        bcrypt.hash(password, 10)
            .then(hash => User.create({ name, surname, idCard, phone, adress, city, email, password: hash }))
            .then(({ id }) => userId = id)
        })

    it('should succeed on correct credentials', async () => {
        logic.retrieveUser(userId).then(user => {
            
                // expect(user.id).toBe(userId)
                // expect(user.id).toBeEqual(_id)
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.idCard).toBe(idCard)
                expect(user.phone).toBe(phone)
                expect(user.adress).toBe(adress)
                expect(user.city).toBe(city)
                expect(user.email).toBe(email)

                // expect(user.save).toBeUndefined()
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
        }).toThrow(Error(userId1 + ' cannot be empty'))
    })

}),
    
    
 ///////////////////////////////////////////////////////////     retrieve appointments
describe('retrieveAppointments', () => {

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
 
        bcrypt.hash(password, 10)
            .then(hash => User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation: hash }))
            .then(({ id }) => userId = id)
            .then(Appointment.create({owner, pet, date}))
            .then(logic.retrieveAppointments(year, month))

        const hash = bcrypt.hash(password, 10)
        await User.create({ name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation: hash })
            .then(() => logic.authenticateUser(email, password))
    })
        
    // beforeEach(() => {
    //     logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
    // })

    it('should succeed on valid data', async () => {
        logic.retrieveAppointments(year, month)
            .then(user => {
              expect(year).toBeDefined()
                expect(month).toBeDefined()
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

describe('retrieve users', () => {
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
    
        bcrypt.hash(password, 10)
            .then(hash => User.create({ name, surname, idCard, phone, adress, city, email, password: hash }))
            .then(({ id }) => userId = id)
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

    it('should fail on not registered user', async () => {
        await User.deleteOne({ id})
        try{
            await logic.retrieveUsers(id)
        }catch (error){
            expect(error).toBeDefined()
            expect(error.message).toBe('user with userId ${id} is not found')
        }
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
})
})
