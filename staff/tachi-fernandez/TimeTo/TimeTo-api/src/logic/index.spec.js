'use strict'

require('dotenv').config()

require('isomorphic-fetch')

const {
    SchemaTypes:{ObjectId}
} = require("mongoose");

const {
    User,
    Events,
    Comments
} = require("../models");

const mongoose = require('mongoose')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { env: { MONGO_URL, JWT_SECRET } } = process

logic.jwtSecret = JWT_SECRET

describe('logic', () => {

    before(() => mongoose.connect(MONGO_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Events.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(name, surname,age ,description,email, password, passwordConfirm)

            expect(id).toBeDefined()
            expect(typeof id).toBe('object')

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
            const age = 22
            const description = 'holaaaa'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                logic.registerUser(name, surname,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError(name + ' is not a string'))
        })
        
        it('should fail on undefined surname', () => {
            const name = 'tachi'
            const surname = undefined
            const age = 22
            const description = 'holaaaa'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                logic.registerUser(name, surname,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on undefined age', () => {
            const name = 'tachi'
            const surname = 'Fernandez'
            const age = undefined
            const description = 'holaaaa'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                logic.registerUser(name, surname,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError(age + ' is not a number'))
        })

        it('should fail on undefined description', () => {
            const name = 'tachi'
            const surname = 'fernandez'
            const age = 22
            const description = undefined
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                logic.registerUser(name, surname,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError(description + ' is not a string'))
        })

        it('should fail on undefined email', () => {
            const name = 'tachi'
            const surname = 'fernandez'
            const age = 22
            const description = 'hola'
            const email = undefined
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                logic.registerUser(name, surname,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on undefined password', () => {
            const name = 'tachi'
            const surname = 'fernandez'
            const age = 22
            const description = 'hola'
            const email = 'TachiFernandez@mail.com'
            const password = undefined
            const passwordConfirm = password


            expect(() => {
                logic.registerUser(name, surname,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'fernandez'
            const age = 22
            const description = 'hola'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                logic.registerUser(name, surname,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError('name cannot be empty'))
        })

        it('should fail on empty surname', () => {
            const name = 'tachi'
            const surname = ''
            const age = 22
            const description = 'hola'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                logic.registerUser(name, surname,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError('surname cannot be empty'))
        })

        it('should fail on negative age', () => {
            const name = 'tachi'
            const surname = 'Fernandez'
            const age = -22
            const description = 'hola'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                logic.registerUser(name, surname,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError("age cannot is posible"))
        })

        
        it('should fail on empty description', () => {
            const name = 'tachi'
            const surname = 'fernandez'
            const age = 22
            const description = ''
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                logic.registerUser(name, surname,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError('description cannot be empty'))
        })

        it('should fail on empty email', () => {
            const name = 'tachi'
            const surname = 'fernandez'
            const age = 22
            const description = 'hola'
            const email = ''
            const password = `123-${Math.random()}`
            const passwordConfirm = password


            expect(() => {
                logic.registerUser(name, surname,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError('email cannot be empty'))
        })

        it('should fail on empty password', () => {
            const name = 'tachi'
            const surname = 'fernandez'
            const age = 22
            const description = 'hola'
            const email = 'TachiFernandez@mail.com'
            const password = ''
            const passwordConfirm = password


            expect(() => {
                logic.registerUser(name, surname,age,description, email, password, passwordConfirm)
            }).toThrow(TypeError('password cannot be empty'))
        })
        

        
    })

    describe('authenticate user', () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname,age, email,description, password: hash }))
        )

        it('should succeed on correct credentials', () => 
            logic.authenticateUser(email, password)
                .then( id  => {
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

        it('should fail on undefined password', () => {
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = undefined


            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })


        it('should fail on empty password', () => {
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = ''


            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError('password cannot be empty'))
        })

        it('should fail on empty email', () => {
            const email = ''
            const password = `123-${Math.random()}`


            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(TypeError('email cannot be empty'))
        })
    })

    describe('retrieve user', () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname,age,description, email, password: hash }))
                .then(({id}) => userId = id)
        )

        it('should succeed on correct credentials', () =>
            logic.retrieveUser(userId)
                .then(user => {
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.age).toBe(age)
                    expect(user.description).toBe(description)
                    expect(user.email).toBe(email)

                    expect(user.save).toBeUndefined()


                })
        )

        it('should fail on undefined userId', () => {
            const userId = undefined


            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ''


            expect(() => {
                logic.retrieveUser(userId)
            }).toThrow(TypeError('userId cannot be empty'))
        })




    })

    describe("delete user" , () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId , _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname,age, email,description, password: hash }))
                .then(({id}) => {
                    userId = id
                })
        )

        it('should succed on correct data' ,() => {
            logic.deleteUser(userId)
            .then(user => {
                expect(user.userId).toBeUndefined()
            })
        })

        it('should fail on undefined userId', () => {
            const userId = undefined


            expect(() => {
                logic.deleteUser(userId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ''


            expect(() => {
                logic.deleteUser(userId)
            }).toThrow(TypeError('userId cannot be empty'))
        })
    })

    describe("create events" , () => {

        const name = 'Tachi'
        const surname = 'Fernandez'
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId 

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname,age, email,description, password: hash }))
                .then(({id}) => {
                    userId = id
                })
        )
        it('should succed on correct data' , () => {
            const title = "Fiesta pagana"
            const description = "lo peta"
            const date = "11/04/2019"
            const ubicacion = "pau piferrer 6"
            const category = "5c7e95f564f6cfa555e483d6"

            logic.createEvents(userId,title,description,date,ubicacion,category)
                .then(({eventId}) => {
                expect(eventId).toBeDefined()
            })
        })

        it('should fail on undefined userId', () => {
            const userId = undefined
            const title = "Fiesta pagana"
            const description = "lo peta"
            const date = "11/04/2019"
            const ubicacion = "pau piferrer 6"
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                logic.createEvents(userId,title,description,date,ubicacion,category)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on undefined userId', () => {
            const title = undefined
            const description = "lo peta"
            const date = "11/04/2019"
            const ubicacion = "pau piferrer 6"
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                logic.createEvents(userId,title,description,date,ubicacion,category)
            }).toThrow(TypeError(title + ' is not a string'))
        })


        it('should fail on undefined description', () => {
            const title = 'hola'
            const description = undefined
            const date = "11/04/2019"
            const ubicacion = "pau piferrer 6"
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                logic.createEvents(userId,title,description,date,ubicacion,category)
            }).toThrow(TypeError(description + ' is not a string'))
        })


        it('should fail on undefined date', () => {
            const title = 'hola'
            const description = 'muy buenas'
            const date = undefined
            const ubicacion = "pau piferrer 6"
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                logic.createEvents(userId,title,description,date,ubicacion,category)
            }).toThrow(TypeError(date + ' is not a string'))
        })

        it('should fail on undefined ubication', () => {
            const title = 'hola'
            const description = 'muy buenas'
            const date = '11/04/2020'
            const ubication = undefined
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                logic.createEvents(userId,title,description,date,ubication,category)
            }).toThrow(TypeError(ubication + ' is not a string'))
        })

        it('should fail on undefined category', () => {
            const title = 'hola'
            const description = 'muy buenas'
            const date = '11/04/2020'
            const ubicacion = 'pau piferrer'
            const category = undefined

            expect(() => {
                logic.createEvents(userId,title,description,date,ubicacion,category)
            }).toThrow(TypeError(category + ' is not a string'))
        })

        it('should fail on empty title', () => {
            const title = ''
            const description = 'muy buenas'
            const date = '11/04/2020'
            const ubicacion = 'pau piferrer'
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                logic.createEvents(userId,title,description,date,ubicacion,category)
            }).toThrow(TypeError('title cannot be empty'))
        })

        it('should fail on empty userId', () => {
            const userId = ''
            const title = 'hola'
            const description = 'muy buenas'
            const date = '11/04/2020'
            const ubicacion = 'pau piferrer'
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                logic.createEvents(userId,title,description,date,ubicacion,category)
            }).toThrow(TypeError('userId cannot be empty'))
        })

        it('should fail on empty description', () => {
            const title = 'hola'
            const description = ''
            const date = '11/04/2020'
            const ubicacion = 'pau piferrer'
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                logic.createEvents(userId,title,description,date,ubicacion,category)
            }).toThrow(TypeError('description cannot be empty'))
        })


        it('should fail on empty date', () => {
            const title = 'hola'
            const description = 'holaaa'
            const date = ''
            const ubicacion = 'pau piferrer'
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                logic.createEvents(userId,title,description,date,ubicacion,category)
            }).toThrow(TypeError('date cannot be empty'))
        })

        it('should fail on empty ubication', () => {
            const title = 'hola'
            const description = 'holaaa'
            const date = '22/10/2012'
            const ubication = ''
            const category = "5c7e95f564f6cfa555e483d6"

            expect(() => {
                logic.createEvents(userId,title,description,date,ubication,category)
            }).toThrow(TypeError('ubication cannot be empty'))
        })

        it('should fail on empty category', () => {
            const title = 'hola'
            const description = 'holaaa'
            const date = '22/10/2012'
            const ubication = 'pau piferrer'
            const category = ''

            expect(() => {
                logic.createEvents(userId,title,description,date,ubication,category)
            }).toThrow(TypeError('category cannot be empty'))
        })


    })

    describe("list event by id" , () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId  , eventId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname,age, email,description, password: hash }))
                .then(({id}) => {
                    userId = id
        
                    const title = "Fiesta pagana"
                    const description = "lo peta"
                    const date = "11/04/2019"
                    const ubication = "pau piferrer 6"
                    const category = "5c7e95f564f6cfa555e483d6"

                    return Events.create({author: userId,title,description,date,ubication,category})
                }).then(({_id}) =>{
                    eventId = _id.toString()
                }
            )   
        )
        it('should succed on correct data' , () => {
          return logic.listEventsById(userId,eventId)
            .then(events => {
                expect(events.title).toBeDefined()
                expect(events.description).toBeDefined()
                expect(events.date).toBeDefined()
                expect(events.ubication).toBeDefined()
                expect(events.category).toBeDefined()
            })
        })

        it('should fail on undefined userId', () => {
            const userId = undefined
            

            expect(() => {
                logic.listEventsById(userId,eventId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on undefined eventId', () => {
            const eventId = undefined
            

            expect(() => {
                logic.listEventsById(userId,eventId)
            }).toThrow(TypeError(eventId + ' is not a string'))
        })

        it('should fail on empty eventId', () => {
            const eventId = ''
            

            expect(() => {
                logic.listEventsById(userId,eventId)
            }).toThrow(TypeError('eventId cannot be empty'))
        })

        it('should fail on empty userId', () => {
            const userId = ''
            

            expect(() => {
                logic.listEventsById(userId,eventId)
            }).toThrow(TypeError('userId cannot be empty'))
        })

    })

    describe("list event by category" , () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId  ,eventId ,categoryId 

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname,age, email,description, password: hash }))
                .then(({id}) => {
                    userId = id
        
                    const title = "Fiesta pagana"
                    const description = "lo peta"
                    const date = "11/04/2019"
                    const ubication = "pau piferrer 6"
                    const category = "5c7e95f564f6cfa555e483d6"

                    return Events.create({author: userId,title,description,date,ubication,category})
                }).then(userEvent =>{
                    categoryId = userEvent.category.toString()
                }
            )   
        )
        it('should succed on correct data' , () => {
          return logic.listEvents(userId,categoryId)
            .then(response => {
                expect(response).toBeDefined()
                expect(response.length > 0 ).toBeTruthy()


            })

        })

        it('should fail on undefined userId', () => {
            const userId = undefined
            

            expect(() => {
                logic.listEvents(userId,categoryId)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on undefined categoryId', () => {
            const categoryId = undefined
            

            expect(() => {
                logic.listEvents(userId,categoryId)
            }).toThrow(TypeError(categoryId + ' is not a string'))
        })

        it('should fail on empty eventId', () => {
            const userId = ''
            

            expect(() => {
                logic.listEvents(userId,categoryId)
            }).toThrow(TypeError('userId cannot be empty'))
        })

        it('should fail on empty categoryId', () => {
            const categoryId = ''
            

            expect(() => {
                logic.listEvents(userId,categoryId)
            }).toThrow(TypeError('categoryId cannot be empty'))
        })

    
    })

    describe("list event by query" , () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId  
        let query = 'fiesta'

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname,age, email,description, password: hash }))
                .then(({id}) => {
                    userId = id
        
                    const title = "Fiesta pagana"
                    const description = "lo peta"
                    const date = "11/04/2019"
                    const ubication = "pau piferrer 6"
                    const category = "5c7e95f564f6cfa555e483d6"

                    return Events.create({author: userId,title,description,date,ubication,category})
                }).then(userEvent => userEvent)
        )
        it('should succed on correct data' , () => {
          return logic.listEventsByQuery(userId,query)
            .then(response => {
                expect(response).toBeDefined()

            })

        })

        it('should fail on undefined userId', () => {
            const userId = undefined
            

            expect(() => {
                logic.listEventsByQuery(userId,query)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on undefined query', () => {
            const query = undefined
            

            expect(() => {
                logic.listEventsByQuery(userId,query)
            }).toThrow(TypeError(query + ' is not a string'))
        })

        it('should fail on empty eventId', () => {
            const userId = ''
            

            expect(() => {
                logic.listEventsByQuery(userId,query)
            }).toThrow(TypeError('userId cannot be empty'))
        })

        it('should fail on empty query', () => {
            const query = ''
            

            expect(() => {
                logic.listEventsByQuery(userId,query)
            }).toThrow(TypeError('query cannot be empty'))
        })
    })

    describe("add comment" , () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId  , eventId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname,age, email,description, password: hash }))
                .then(({id}) => {
                    userId = id
        
                    const title = "Fiesta pagana"
                    const description = "lo peta"
                    const date = "11/04/2019"
                    const ubication = "pau piferrer 6"
                    const category = "5c7e95f564f6cfa555e483d6"

                    return Events.create({author: userId,title,description,date,ubication,category})
                }).then(({_id}) =>{
                    eventId = _id.toString()
                })   
        )
        it('should succed on correct data' , () => {
            const text = 'HOLOOOOO'
            debugger
            return logic.addComment(userId, eventId,text)
            .then(comment => {
                expect(comment.text).toBeDefined()
                expect(comment.date).toBeDefined()
            })

        })

        it('should fail on undefined userId', () => {
            const userId = undefined
            const text = 'hola'

            expect(() => {
                logic.addComment(userId,eventId,text)
            }).toThrow(TypeError(userId + ' is not a string'))
        })

        it('should fail on undefined eventId', () => {
            const eventId = undefined
            const text = 'hola'

            expect(() => {
                logic.addComment(userId,eventId,text)
            }).toThrow(TypeError(eventId + ' is not a string'))
        })

        it('should fail on undefined text', () => {
            const text = undefined            

            expect(() => {
                logic.addComment(userId,eventId,text)
            }).toThrow(TypeError(text + ' is not a string'))
        })

        it('should fail on empty userId', () => {
            const userId = ''            
            const text = 'holaaa'            

            expect(() => {
                logic.addComment(userId,eventId,text)
            }).toThrow(TypeError('userId cannot be empty'))
        })

        it('should fail on empty eventId', () => {
            const eventId = ''
            const text = 'holaaa'            

            expect(() => {
                logic.addComment(userId,eventId,text)
            }).toThrow(TypeError('eventId cannot be empty'))
        })
        
        it('should fail on empty text', () => {
            const text = ''            

            expect(() => {
                logic.addComment(userId,eventId,text)
            }).toThrow(TypeError('text cannot be empty'))
        })

    })

    describe("list comment" , () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId  
        let eventId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname,age, email,description, password: hash }))
                .then(({id}) => {
                    userId = id
        
                    const title = "Fiesta pagana"
                    const description = "lo peta"
                    const date = "11/04/2019"
                    const ubication = "pau piferrer 6"
                    const category = "5c7e95f564f6cfa555e483d6"

                    return Events.create({author: userId,title,description,date,ubication,category})
                }).then(({_id}) =>{
                    eventId = _id.toString()

                    const text = 'HOLOOOO'
                    debugger
                    return Comments.create({commentAuthor : userId , commentEvent : eventId , text})
                }).then(comment => comment))

                it('should succed on correct data' , () => {
                    return logic.listComments(userId,eventId)
                    .then(comments => {
                        debugger
                        expect(comments).toBeDefined()
                    })
                })  
    })

    describe("delete comment" , () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const age = 22
        const description = 'Hola muy buenas'
        const email = `Tachiii-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId  
        let eventId
        let commentId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname,age, email,description, password: hash }))
                .then(({id}) => {
                    userId = id
        
                    const title = "Fiesta pagana"
                    const description = "lo peta"
                    const date = "11/04/2019"
                    const ubication = "pau piferrer 6"
                    const category = "5c7e95f564f6cfa555e483d6"

                    return Events.create({author: userId,title,description,date,ubication,category})
                }).then(({_id}) =>{
                    eventId = _id.toString()

                    const text = 'HOLOOOO'
                    return Comments.create({commentAuthor : userId , commentEvent : eventId , text})
                }).then(comment => {
                    commentId = comment._id.toString()
                }))

                it('should succed on correct data' , () => {
                    return logic.deleteComment(userId,eventId,commentId)
                    .then(response => {
                        console.log(response.noComment)
                        expect(response.commentId).toBeUndefined()
                    })
                })  
    })

    


    after(() =>
    Promise.all([
        User.deleteMany(),
        Events.deleteMany(),
        Comments.deleteMany()
    ])
        .then(() => mongoose.disconnect())
)
})