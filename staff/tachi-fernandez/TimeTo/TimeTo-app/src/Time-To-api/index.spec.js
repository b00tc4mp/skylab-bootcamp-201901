'use strict'

import userApi from '.'

require('dotenv').config()

const { 
    mongoose,
    models:{
      User,
      Events,
      Comments,
      Categories
    }
  } = require('TimeTo-data');

const bcrypt = require('bcrypt')

const { env: { MONGO_URL } } = process

describe('user api' , () => {
    beforeAll(() => mongoose.connect(MONGO_URL, { useNewUrlParser: true }))
    
    
    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Events.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const userName = `Tachi1010-${Math.random()}`
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            const id = await userApi.register(name, surname,userName,age ,description,email, password, passwordConfirm)

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            const user = await User.findOne({ email })

            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.age).toBe(age)
            expect(user.description).toBe(description)
            expect(user.email).toBe(email)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'holaaaa'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                userApi.register(name, surname,userName,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError(name + ' is not a string'))
        })
        
        it('should fail on undefined surname', () => {
            const name = 'tachi'
            const surname = undefined
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'holaaaa'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                userApi.register(name, surname,userName,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on undefined age', () => {
            const name = 'tachi'
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = undefined
            const description = 'holaaaa'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                userApi.register(name, surname,userName,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError(age + ' is not a number'))
        })

        it('should fail on undefined description', () => {
            const name = 'tachi'
            const surname = 'fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = undefined
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                userApi.register(name, surname,userName,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError(description + ' is not a string'))
        })

        it('should fail on undefined email', () => {
            const name = 'tachi'
            const surname = 'fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'hola'
            const email = undefined
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                userApi.register(name, surname,userName,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on undefined password', () => {
            const name = 'tachi'
            const surname = 'fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'hola'
            const email = 'TachiFernandez@mail.com'
            const password = undefined
            const passwordConfirm = password


            expect(() => {
                userApi.register(name, surname,userName,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'hola'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                userApi.register(name, surname,userName,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError('name cannot be empty'))
        })

        it('should fail on empty surname', () => {
            const name = 'tachi'
            const surname = ''
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'hola'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                userApi.register(name, surname,userName,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError('surname cannot be empty'))
        })

        it('should fail on negative age', () => {
            const name = 'tachi'
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = -22
            const description = 'hola'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                userApi.register(name, surname,userName,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError("age cannot is posible"))
        })

        
        it('should fail on empty description', () => {
            const name = 'tachi'
            const surname = 'fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = ''
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                userApi.register(name, surname,userName,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError('description cannot be empty'))
        })

        it('should fail on empty email', () => {
            const name = 'tachi'
            const surname = 'fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'hola'
            const email = ''
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                userApi.register(name, surname,userName,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError('email cannot be empty'))
        })

        it('should fail on empty password', () => {
            const name = 'tachi'
            const surname = 'fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'hola'
            const email = 'TachiFernandez@mail.com'
            const password = ''
            const passwordConfirm = password


            expect(() => {
                userApi.register(name, surname,userName,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError('password cannot be empty'))
        })

    })

    describe('authenticate user', () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const userName = `Tachi1010-${Math.random()}`
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname,userName,age, email,description, password: hash }))
        )

        it('should succeed on correct credentials', () => 
            userApi.authenticate(email, password)
                .then( id  => {
                    expect(id).toBeDefined()
                })
        )

        it('should fail on undefined email', () => {
            const email = undefined
            const password = `123-${Math.random()}`


            expect(() => {
                userApi.authenticate(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on undefined password', () => {
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = undefined


            expect(() => {
                userApi.authenticate(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })


        it('should fail on empty password', () => {
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = ''


            expect(() => {
                userApi.authenticate(email, password)
            }).toThrow(TypeError('password cannot be empty'))
        })

        it('should fail on empty email', () => {
            const email = ''
            const password = `123-${Math.random()}`


            expect(() => {
                userApi.authenticate(email, password)
            }).toThrow(TypeError('email cannot be empty'))
        })
    })

    describe('retrieve user', () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const userName = `Tachi1010-${Math.random()}`
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname,userName,age,description, email, password: hash }))
                .then(() => 
                    userApi.authenticate(email,password)
                )
                .then(token => _token = token
                ))          

        it('should succeed on correct credentials', () =>
                 userApi.retrieveUser(_token)
                .then(user => {
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.age).toBe(age)
                    expect(user.description).toBe(description)
                    expect(user.email).toBe(email)

                    expect(user.save).toBeUndefined()


                })
        )

        it('should fail on undefined token', () => {
            const token = undefined


            expect(() => {
                userApi.retrieveUser(token)
            }).toThrow(TypeError(token + ' is not a string'))
        })

        it('should fail on empty token', () => {
            const token = ''


            expect(() => {
                userApi.retrieveUser(token)
            }).toThrow(TypeError('token cannot be empty'))
        })
    })

    describe('retrieve user by id' , () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const userName = `Tachi1010-${Math.random()}`
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname,userName,age,description, email, password: hash }))
                .then(() => 
                    userApi.authenticate(email,password)
                )
                .then(token => _token = token
                ))  

        it('should succed on correct data' , () => {
            return userApi.retireveUserById(userName,_token)
            .then(response => {
                expect(response.name).toBe(name)
                expect(response.surname).toBe(surname)
                expect(response.age).toBe(age)
                expect(response.description).toBe(description)
                expect(response.email).toBe(email)

                expect(response.save).toBeUndefined()


            })
            
        })

        it('should fail on empty _token', () => {
            const _token = ''

            expect(() => {
                userApi.retireveUserById(userName,_token)
            }).toThrow(TypeError('token cannot be empty'))
        })

        it('should fail on empty userName', () => {
            const userName = ''

            expect(() => {
                userApi.retireveUserById(userName,_token)
            }).toThrow(TypeError('userName cannot be empty'))
        })

        it('should fail on undefined userName', () => {
            const userName = undefined

            expect(() => {
                userApi.retireveUserById(userName,_token)
            }).toThrow(TypeError(userName + " is not a string"))
        })

        it('should fail on undefined _token', () => {
            const _token = undefined

            expect(() => {
                userApi.retireveUserById(userName,_token)
            }).toThrow(TypeError(_token + " is not a string"))
        })
    })

    describe('update user' , () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const userName = `Tachi1010-${Math.random()}`
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let _token
        
        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname,userName,age, email,description, password: hash }))
                .then(() => 
                userApi.authenticate(email,password)
            )
            .then(token => _token = token
            )) 
        it('should succed on correct data' , () => {
            let name = 'Tachi'
            let surname = 'Fernandez'
            let age = 22
            let description = 'Hola muy buenas'

            userApi.updateUser(name,surname,age,description,_token)
            .then(user => {
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.age).toBe(age)
                expect(user.description).toBe(description)
            })

        })

        it('should fail on undefined name' , () => {
            let name = undefined
            let surname = 'Fernandez'
            let age = 22
            let description = 'Hola muy buenas'

            expect(() => {
                userApi.updateUser(name,surname,age,description,_token)
            }).toThrow(TypeError(name + " is not a string"))
            
        }) 

        it('should fail on undefined surname' , () => {
            let name = 'Tachi'
            let surname = undefined
            let age = 22
            let description = 'Hola muy buenas'

            expect(() => {
                userApi.updateUser(name,surname,age,description,_token)
            }).toThrow(TypeError(surname + " is not a string"))
            
        }) 

        it('should fail on undefined age' , () => {
            let name = 'Tachi'
            let surname = 'Fernandez'
            let age = undefined
            let description = 'Hola muy buenas'

            expect(() => {
                userApi.updateUser(name,surname,age,description,_token)
            }).toThrow(TypeError(age + " is not a number"))
            
        }) 

        it('should fail on undefined description' , () => {
            let name = 'Tachi'
            let surname = 'Fernandez'
            let age = 22
            let description = undefined

            expect(() => {
                userApi.updateUser(name,surname,age,description,_token)
            }).toThrow(TypeError(description + " is not a string"))
            
        }) 

        it('should fail on empty name' , () => {
            let name = ''
            let surname = 'Fernandez'
            let age = 22
            let description = 'Hola muy buenas'

            expect(() => {
                userApi.updateUser(name,surname,age,description,_token)
            }).toThrow(TypeError('name cannot be empty'))
            
        }) 

        it('should fail on empty surname' , () => {
            let name = 'Tachi'
            let surname = ''
            let age = 22
            let description = 'Hola muy buenas'

            expect(() => {
                userApi.updateUser(name,surname,age,description,_token)
            }).toThrow(TypeError('surname cannot be empty'))
            
        }) 

        it('should fail on empty description' , () => {
            let name = 'Tachi'
            let surname = 'Fernandez'
            let age = 22
            let description = ''

            expect(() => {
                userApi.updateUser(name,surname,age,description,_token)
            }).toThrow(TypeError('description cannot be empty'))
            
        }) 

        it('should fail on empty description' , () => {
            let name = 'Tachi'
            let surname = 'Fernandez'
            let age = 22
            let description = 'Hola muy buenas'
            let _token = ''

            expect(() => {
                userApi.updateUser(name,surname,age,description,_token)
            }).toThrow(TypeError('token cannot be empty'))
            
        }) 

        it('should fail on empty description' , () => {
            let name = 'Tachi'
            let surname = 'Fernandez'
            let age = 22
            let description = 'Hola muy buenas'
            let _token = undefined

            expect(() => {
                userApi.updateUser(name,surname,age,description,_token)
            }).toThrow(TypeError(_token + " is not a string"))
            
        }) 


    })

    describe("create events" , () => {

        const name = 'Tachi'
        const surname = 'Fernandez'
        const userName = `Tachi1010-${Math.random()}`
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let _token 

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname,userName,age, email,description, password: hash }))
                .then(() => 
                userApi.authenticate(email,password)
            )
            .then(token => _token = token
            )
        )
        it('should succed on correct data' , () => {
            const title = "Fiesta pagana"
            const description = "lo peta"
            const date = "11/04/2019"
            const city = "Barcelona"
            const address = 'Roc Boronat 35'
            const category = "5c7e95f564f6cfa555e483d6"

            userApi.createEventUser(title,description,date,city,address,category,_token)
                .then(({eventId}) => {
                expect(eventId).toBeDefined()
            })
        })

        it('should fail on undefined _token', () => {
            const _token = undefined
            const title = "Fiesta pagana"
            const description = "lo peta"
            const date = "11/04/2019"
            const city = "Barcelona"
            const address = 'Roc Boronat 35'            
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                userApi.createEventUser(title,description,date,city,address,category,_token)
            }).toThrow(TypeError(_token + ' is not a string'))
        })

       it('should fail on undefined title', () => {
            const title = undefined
            const description = "lo peta"
            const date = "11/04/2019"
            const city = "Barcelona"
            const address = 'Roc Boronat 35'             
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                userApi.createEventUser(title,description,date,city,address,category,_token)
            }).toThrow(TypeError(title + ' is not a string'))
        })


        it('should fail on undefined description', () => {
            const title = 'hola'
            const description = undefined
            const date = "11/04/2019"
            const city = "Barcelona"
            const address = 'Roc Boronat 35'             
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                userApi.createEventUser(title,description,date,city,address,category,_token)
            }).toThrow(TypeError(description + ' is not a string'))
        })


        it('should fail on undefined date', () => {
            const title = 'hola'
            const description = 'muy buenas'
            const date = undefined
            const city = "Barcelona"
            const address = 'Roc Boronat 35'  
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                userApi.createEventUser(title,description,date,city,address,category,_token)
            }).toThrow(TypeError(date + ' is not a string'))
        })

        it('should fail on undefined city', () => {
            const title = 'hola'
            const description = 'muy buenas'
            const date = '11/04/2020'
            const city = undefined
            const address = 'Roc Boronat 35'  
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                userApi.createEventUser(title,description,date,city,address,category,_token)
            }).toThrow(TypeError(city + ' is not a string'))
        })

        it('should fail on undefined address', () => {
            const title = 'hola'
            const description = 'muy buenas'
            const date = '11/04/2020'
            const city = "Barcelona"
            const address = undefined  
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                userApi.createEventUser(title,description,date,city,address,category,_token)
            }).toThrow(TypeError(address + ' is not a string'))
        })

        it('should fail on undefined category', () => {
            const title = 'hola'
            const description = 'muy buenas'
            const date = '11/04/2020'
            const city = "Barcelona"
            const address = 'Roc Boronat 35'  
            const category = undefined

            expect(() => {
                userApi.createEventUser(title,description,date,city,address,category,_token)
            }).toThrow(TypeError(category + ' is not a string'))
        })

        it('should fail on empty title', () => {
            const title = ''
            const description = 'muy buenas'
            const date = '11/04/2020'
            const city = "Barcelona"
            const address = 'Roc Boronat 35'  
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                userApi.createEventUser(title,description,date,city,address,category,_token)
            }).toThrow(Error('title cannot be empty'))
        })

        it('should fail on empty _token', () => {
            const _token = ''
            const title = 'hola'
            const description = 'muy buenas'
            const date = '11/04/2020'
            const city = "Barcelona"
            const address = 'Roc Boronat 35'
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                userApi.createEventUser(title,description,date,city,address,category,_token)
            }).toThrow(Error('token cannot be empty'))
        })

        it('should fail on empty description', () => {
            const title = 'hola'
            const description = ''
            const date = '11/04/2020'
            const city = "Barcelona"
            const address = 'Roc Boronat 35'            
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                userApi.createEventUser(title,description,date,city,address,category,_token)
            }).toThrow(Error('description cannot be empty'))
        })


        it('should fail on empty date', () => {
            const title = 'hola'
            const description = 'holaaa'
            const date = ''
            const city = "Barcelona"
            const address = 'Roc Boronat 35'
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                userApi.createEventUser(title,description,date,city,address,category,_token)
            }).toThrow(Error('date cannot be empty'))
        })

        it('should fail on empty city', () => {
            const title = 'hola'
            const description = 'holaaa'
            const date = '22/10/2012'
            const city = ''
            const address = 'Roc Boronat 35'
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                userApi.createEventUser(title,description,date,city,address,category,_token)
            }).toThrow(Error('city cannot be empty'))
        })

        it('should fail on empty address', () => {
            const title = 'hola'
            const description = 'holaaa'
            const date = '22/10/2012'
            const city = 'Barcelona'
            const address = ''
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                userApi.createEventUser(title,description,date,city,address,category,_token)
            }).toThrow(Error('address cannot be empty'))
        })

        it('should fail on empty category', () => {
            const title = 'hola'
            const description = 'holaaa'
            const date = '22/10/2012'
            const city = "Barcelona"
            const address = 'Roc Boronat 35'
            const category = ''

            expect(() => {
                userApi.createEventUser(title,description,date,city,address,category,_token)
            }).toThrow(Error('category cannot be empty'))
        })


    })

    describe("list event by id" , () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const userName = `Tachi1010-${Math.random()}`
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let _token  , eventId , userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
            .then(hash => User.create({ name, surname,userName,age,description, email, password: hash }))
            .then(({id}) => {
                userId = id
                return userApi.authenticate(email,password)
            })
            .then(token => { 
                    _token = token
        
                    const title = "Fiesta pagana"
                    const description = "lo peta"
                    const date = "11/04/2019"
                    const city = "Barcelona"
                    const address = 'Roc Boronat 35'                    
                    const category = "5c7e95f564f6cfa555e483d6"

                    return Events.create({title,description,date,city,address,category,author: userId})
                }).then(response =>{
                    eventId = response.id
                })
               
        )
        it('should succed on correct data' , () => {
          return userApi.listEventById(eventId,_token)
            .then(response => {
                expect(response.title).toBe(title)
                expect(response.description).toBe(description)
                expect(response.date).toBe(date)
                expect(response.category).toBe(category)
            })
        })

        it('should fail on undefined _token', () => {
            const _token = undefined
            

            expect(() => {
                userApi.listEventById(eventId,_token)
            }).toThrow(TypeError(_token + ' is not a string'))
        })

        it('should fail on undefined eventId', () => {
            const eventId = undefined
            

            expect(() => {
                userApi.listEventById(eventId,_token)
            }).toThrow(TypeError(eventId + ' is not a string'))
        })

        it('should fail on empty eventId', () => {
            const eventId = ''
            

            expect(() => {
                userApi.listEventById(eventId,_token)
            }).toThrow(TypeError('eventId cannot be empty'))
        })

        it('should fail on empty _token', () => {
            const _token = ''
            

            expect(() => {
                userApi.listEventById(eventId,_token)
            }).toThrow(Error('token cannot be empty'))
        })

    })

    describe("list event by category" , () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const userName = `Tachi1010-${Math.random()}`
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId  ,_token ,categoryId 

        beforeEach(() =>
            bcrypt.hash(password, 10)
            .then(hash => User.create({ name, surname,userName,age,description, email, password: hash }))
            .then(({id}) => {
                userId = id
                return userApi.authenticate(email,password)
            })
            .then(token => { 
                    _token = token
        
                    const title = "Fiesta pagana"
                    const description = "lo peta"
                    const date = "11/04/2019"
                    const city = "Barcelona"
                    const address = 'Roc Boronat 35'
                    const category = "5c7e95f564f6cfa555e483d6"

                    return Events.create({author: userId,title,description,date,city,address,category,_token})
                }).then(userEvent =>{
                    categoryId = userEvent.category.toString()
                }
            )   
        )
        it('should succed on correct data' , () => {
          return userApi.listEventsByCategory(categoryId,_token)
            .then(response => {
                expect(response).toBeDefined()
                expect(response.length > 0 ).toBeTruthy()


            })

        })

        it('should fail on undefined userId', () => {
            const _token = undefined
            

            expect(() => {
                userApi.listEventsByCategory(categoryId,_token)
            }).toThrow(TypeError(_token + ' is not a string'))
        })

        it('should fail on undefined categoryId', () => {
            const categoryId = undefined
            

            expect(() => {
                userApi.listEventsByCategory(category,Id_token)
            }).toThrow(TypeError(categoryId + ' is not a string'))
        })

        it('should fail on empty eventId', () => {
            const _token = ''
            

            expect(() => {
                userApi.listEventsByCategory(categoryId,_token)
            }).toThrow(TypeError('token cannot be empty'))
        })

        it('should fail on empty categoryId', () => {
            const categoryId = ''
            

            expect(() => {
                userApi.listEventsByCategory(categoryId,_token)
            }).toThrow(TypeError('categoryId cannot be empty'))
        })

    
    })

    describe("list event by query" , () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const userName = `Tachi1010-${Math.random()}`
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId  
        let query = 'fiesta'
        let _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
            .then(hash => User.create({ name, surname,userName,age,description, email, password: hash }))
            .then(({id}) => {
                userId = id
                return userApi.authenticate(email,password)
            })
            .then(token => { 
                    _token = token
        
                    const title = "Fiesta pagana"
                    const description = "lo peta"
                    const date = "11/04/2019"
                    const city = "Barcelona"
                    const address = 'Roc Boronat 35'                    
                    const category = "5c7e95f564f6cfa555e483d6"

                    return Events.create({author: userId,title,description,date,city,address,category,_token})
                }).then(userEvent => userEvent)
        )
        it('should succed on correct data' , () => {
          return userApi.listEventsByQuery(query,_token)
            .then(response => {
                expect(response).toBeDefined()

            })

        })

        it('should fail on token undefined ', () => {
            const _token = undefined
            

            expect(() => {
                userApi.listEventsByQuery(query,_token)
            }).toThrow(TypeError( _token + ' is not a string'))
        })

        it('should fail on undefined query', () => {
            const query = undefined
            

            expect(() => {
                userApi.listEventsByQuery(query,_token)
            }).toThrow(TypeError(query + ' is not a string'))
        })

        it('should fail on empty eventId', () => {
            const _token = ''
            

            expect(() => {
                userApi.listEventsByQuery(query,_token)
            }).toThrow(TypeError('token cannot be empty'))
        })

        it('should fail on empty query', () => {
            const query = ''
            

            expect(() => {
                userApi.listEventsByQuery(query,_token)
            }).toThrow(TypeError('query cannot be empty'))
        })
    })

    describe("add comment" , () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const userName = `Tachi1010-${Math.random()}`
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId  , eventId, _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
            .then(hash => User.create({ name, surname,userName,age,description, email, password: hash }))
            .then(({id}) => {
                userId = id
                return userApi.authenticate(email,password)
            })
            .then(token => { 
                    _token = token
        
                    const title = "Fiesta pagana"
                    const description = "lo peta"
                    const date = "11/04/2019"
                    const city = "Barcelona"
                    const address = 'Roc Boronat 35'                    
                    const category = "5c7e95f564f6cfa555e483d6"

                    return Events.create({author: userId,title,description,date,city,address,category,_token})
                }).then(({_id}) =>{
                    eventId = _id.toString()
                })   
        )
        it('should succed on correct data' , () => {
            const text = 'HOLOOOOO'
            return userApi.createComment(eventId,text,_token)
            .then(comment => {
                expect(comment.text).toBeDefined()
                expect(comment.date).toBeDefined()
            })

        })

        it('should fail on undefined userId', () => {
            const _token = undefined
            const text = 'hola'

            expect(() => {
                userApi.createComment(eventId,text,_token)
            }).toThrow(TypeError(_token + ' is not a string'))
        })

        it('should fail on undefined eventId', () => {
            const eventId = undefined
            const text = 'hola'

            expect(() => {
                userApi.createComment(eventId,text,_token)
            }).toThrow(TypeError(eventId + ' is not a string'))
        })

        it('should fail on undefined text', () => {
            const text = undefined            

            expect(() => {
                userApi.createComment(eventId,text,_token)
            }).toThrow(TypeError(text + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const _token = ''            
            const text = 'holaaa'            

            expect(() => {
                userApi.createComment(eventId,text,_token)
            }).toThrow(TypeError('token cannot be empty'))
        })

        it('should fail on empty eventId', () => {
            const eventId = ''
            const text = 'holaaa'            

            expect(() => {
                userApi.createComment(eventId,text,_token)
            }).toThrow(TypeError('eventId cannot be empty'))
        })
        
        it('should fail on empty text', () => {
            const text = ''            

            expect(() => {
                userApi.createComment(eventId,text,_token)
            }).toThrow(TypeError('text cannot be empty'))
        })

    })

    describe("list comment" , () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const userName = `Tachi1010-${Math.random()}`
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId  
        let eventId
        let _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
            .then(hash => User.create({ name, surname,userName,age,description, email, password: hash }))
            .then(({id}) => {
                userId = id
                return userApi.authenticate(email,password)
            })
            .then(token => { 
                    _token = token

                    const title = "Fiesta pagana"
                    const description = "lo peta"
                    const date = "11/04/2019"
                    const city = "Barcelona"
                    const address = 'Roc Boronat 35'
                    const category = "5c7e95f564f6cfa555e483d6"

                    return Events.create({author: userId,title,description,date,city,address,category,_token})
                }).then(({_id}) =>{
                    eventId = _id.toString()

                    const text = 'HOLOOOO'
                    
                    return Comments.create({commentAuthor : userId , commentEvent : eventId , text,_token})
                }).then(comment => comment))

                it('should succed on correct data' , () => {
                    return userApi.listComments(eventId,_token)
                    .then(comments => {
                        
                        expect(comments).toBeDefined()
                    })
                })  

                it('should fail on empty userId', () => {
                    const _token = ''            
        
                    expect(() => {
                        userApi.listComments(eventId,_token)
                    }).toThrow(TypeError('token cannot be empty'))
                })

                it('should fail on empty eventId', () => {
                    const eventId = ''            
        
                    expect(() => {
                        userApi.listComments(eventId,_token)
                    }).toThrow(TypeError('eventId cannot be empty'))
                })

                

                it('should fail on undefined userId', () => {
                    const _token = undefined            
        
                    expect(() => {
                        userApi.listComments(eventId,_token)
                    }).toThrow(TypeError(_token + ' is not a string'))
                })
    })

    describe("delete comment" , () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const userName = `Tachi1010-${Math.random()}`
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId  
        let eventId
        let commentId
        let _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
            .then(hash => User.create({ name, surname,userName,age,description, email, password: hash }))
            .then(({id}) => {
                userId = id
                return userApi.authenticate(email,password)
            })
            .then(token => { 
                    _token = token
        
                    const title = "Fiesta pagana"
                    const description = "lo peta"
                    const date = "11/04/2019"
                    const city = "Barcelona"
                    const address = 'Roc Boronat 35'                    
                    const category = "5c7e95f564f6cfa555e483d6"

                    return Events.create({author: userId,title,description,date,city,address,category,_token})
                }).then(({_id}) =>{
                    eventId = _id.toString()

                    const text = 'HOLOOOO'
                    return Comments.create({commentAuthor : userId , commentEvent : eventId , text,_token})
                }).then(comment => {
                    commentId = comment._id.toString()
                }))

                it('should succed on correct data' , () => {
                    return userApi.deleteComment(eventId,commentId,_token)
                    .then(response => {
                        expect(response.commentId).toBeUndefined()
                    })
                })  
    })


    afterAll(() =>
    Promise.all([
        User.deleteMany(),
        Events.deleteMany(),
        Comments.deleteMany()
    ])
        .then(() => mongoose.disconnect())
    )
})

