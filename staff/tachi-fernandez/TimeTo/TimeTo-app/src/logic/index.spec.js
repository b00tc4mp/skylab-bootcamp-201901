import logic from '.'
import userApi from '../Time-To-api'
const { 
    mongoose,
    models:{
        User,
        Events,
        Comments,
        Categories
      }
  } = require('TimeTo-data');

require('dotenv').config()

const { env: { MONGO_URL } } = process


describe('logic' , () => {

    beforeAll(() => mongoose.connect(MONGO_URL, { useNewUrlParser: true }))
    
    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Events.deleteMany()
        ])
    )

        describe('register' , () => {
            const name = 'Tachi'
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'Hola muy buenas'
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password
            
            it('should succed on correct data' , () => {
                logic.registerUser(name,surname,userName,age,description,email,password,passwordConfirmation)
                .then(response =>{
                    expect(response).toBeDefined()
                })
            }) 

            it('should fail on undefined name' , () => {
                let name = undefined
    
                expect(() => logic.registerUser(name,surname,userName,age,description,email,password,passwordConfirmation)).toThrowError(`${name} is not a string`)
            }) 

            it('should fail on undefined surname' , () => {
                let surname = undefined
    
                expect(() => logic.registerUser(name,surname,userName,age,description,email,password,passwordConfirmation)).toThrowError(`${surname} is not a string`)
            }) 

            it('should fail on undefined age' , () => {
                let age = undefined
    
                expect(() => logic.registerUser(name,surname,userName,age,description,email,password,passwordConfirmation)).toThrowError(`${age} is not a number`)
            }) 

            it('should fail on undefined description' , () => {
                let description = undefined
    
                expect(() => logic.registerUser(name,surname,userName,age,description,email,password,passwordConfirmation)).toThrowError(`${description} is not a string`)
            }) 

            it('should fail on undefined email' , () => {
                let email = undefined
    
                expect(() => logic.registerUser(name,surname,userName,age,description,email,password,passwordConfirmation)).toThrowError(`${email} is not a string`)
            })
            
            it('should fail on undefined password' , () => {
                let password = undefined
    
                expect(() => logic.registerUser(name,surname,userName,age,description,email,password,passwordConfirmation)).toThrowError(`${password} is not a string`)
            }) 

            it('should fail on undefined passwordConfirmation' , () => {
                let passwordConfirmation = undefined
    
                expect(() => logic.registerUser(name,surname,userName,age,description,email,password,passwordConfirmation)).toThrowError(`${passwordConfirmation} is not a string`)
            })

            it('should fail on empty name' , () => {
                let name = ''
    
                expect(() => logic.registerUser(name,surname,userName,age,description,email,password,passwordConfirmation)).toThrowError('name cannot be empty')
            }) 

            it('should fail on empty surname' , () => {
                let surname = ''
    
                expect(() => logic.registerUser(name,surname,userName,age,description,email,password,passwordConfirmation)).toThrowError('surname cannot be empty')
            }) 


            it('should fail on empty description' , () => {
                let description = ''
    
                expect(() => logic.registerUser(name,surname,userName,age,description,email,password,passwordConfirmation)).toThrowError('description cannot be empty')
            }) 

            it('should fail on empty email' , () => {
                let email = ''
    
                expect(() => logic.registerUser(name,surname,userName,age,description,email,password,passwordConfirmation)).toThrowError('email cannot be empty')
            }) 

            it('should fail on empty password' , () => {
                let password = ''
    
                expect(() => logic.registerUser(name,surname,userName,age,description,email,password,passwordConfirmation)).toThrowError('password cannot be empty')
            }) 

            it('should fail on empty passwordConfirmation' , () => {
                let passwordConfirmation = ''
    
                expect(() => logic.registerUser(name,surname,userName,age,description,email,password,passwordConfirmation)).toThrowError('password confirmation cannot be empty')
            }) 
            
        })

        describe('login user' , () => {
            const name = 'Tachi'
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'Hola muy buenas'
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password
            beforeEach(() =>
                userApi.register(name,surname,userName,age,description,email,password,passwordConfirmation)
            )
                it('should succed on correct data' , () => {
                    logic.logInUser(email,password)
                    .then(token => {
                        expect(token).toBeDefined()
                    })
                })

                it('should fail on empty email' , () => {
                    let email = ''
        
                    expect(() => logic.logInUser(email,password)).toThrowError('email cannot be empty')
                }) 
    
                it('should fail on empty password' , () => {
                    let password = ''
        
                    expect(() => logic.logInUser(email,password)).toThrowError('password cannot be empty')
                }) 

                it('should fail on undefined email' , () => {
                    let email = undefined
        
                    expect(() => logic.logInUser(email,password)).toThrowError(email + ' is not a string')
                }) 
    
                it('should fail on undefined password' , () => {
                    let password = undefined
        
                    expect(() => logic.logInUser(email,password)).toThrowError(password + ' is not a string')
                }) 

        })

        describe('retrieve user' , () => {
            const name = 'Tachi'
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'Hola muy buenas'
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password

            beforeEach(() =>
                userApi.register(name,surname,userName,age,description,email,password,passwordConfirmation)
            .then(({id}) => {
              return userApi.authenticate(email,password)
                .then(token => logic.__userApiToken__ = token)
            })
            )
        
            it('should succed on correct data' , () => {
                logic.retrieveUser()
                .then(({name,surname,age,description,email}) => {
                    expect(name).toBe(name)
                    expect(surname).toBe(surname)
                    expect(age).toBe(age)
                    expect(description).toBe(description)
                    expect(email).toBe(email)

                })
            })
        })

        describe('is user logged in?' , () => {
            const name = 'Tachi'
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'Hola muy buenas'
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password

            beforeEach(() =>
                userApi.register(name,surname,userName,age,description,email,password,passwordConfirmation)
            .then(({id}) => {
              return userApi.authenticate(email,password)
                .then(token => logic.__userApiToken__ = token)
            })
            )

            it('should succed on correct data' , () => {
                logic.isUserLoggedIn()
                expect((!!__userApiToken__))
            })
        })


        // describe('retrieve user by id' , () => {
        //     const name = 'Tachi'
        //     const surname = 'Fernandez'
        //     const userName = `Tachi1010-${Math.random()}`
        //     const age = 22
        //     const description = 'Hola muy buenas'
        //     const email = `Tachiii-${Math.random()}@mail.com`
        //     const password = `123-${Math.random()}`
        //     const passwordConfirmation = password
        //     let userName,token

        //     beforeEach(() =>
        //         userApi.register(name,surname,userName,age,description,email,password,passwordConfirmation)
        //     .then(({id}) => {
        //       return userApi.authenticate(email,password)
        //         .then(_token =>{

        //             logic.__userApiToken__ = _token
        //             token = _token
                    
        //             userApi.retrieveUser(token)
        //             .then(user => {
        //                 userName = user.userName
        //                 })
        //             })
                
        //         })
        //     )

        //     it('should succed on correct data' , () => {
        //         logic.retrieveUserById(userName)
        //         .then(({name,surname,userName,age,description,email}) => {
        //             expect(name).toBe(name)
        //             expect(surname).toBe(surname)
        //             expect(userName).toBe(userName)
        //             expect(age).toBe(age)
        //             expect(description).toBe(description)
        //             expect(email).toBe(email)
        //         })
        //     })
        // })

        describe('uptade user' , () => {
            const name = 'Tachi'
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'Hola muy buenas'
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password

            beforeEach(() =>
                userApi.register(name,surname,userName,age,description,email,password,passwordConfirmation)
            .then(({id}) => {
              return userApi.authenticate(email,password)
                .then(token => logic.__userApiToken__ = token)
            })
            )

            it('should succed on correct data' , () => {
                logic.updateUser(name,userName,age,description)
                .then(response => {
                    expect(response).toBeDefined()
                })
            })
        })

        describe('create event' , () => {
            const name = 'Tachi'
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'Hola muy buenas'
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password

            beforeEach(() =>
                userApi.register(name,surname,userName,age,description,email,password,passwordConfirmation)
            .then(({id}) => {
              return userApi.authenticate(email,password)
                .then(token => logic.__userApiToken__ = token)
            })
            )

            it('should succed on correct data' , () => {
                const title = "Fiesta pagana"
                const description = "lo peta"
                const date = "11/04/2019"
                const city = "Barcelona"
                const address = 'Roc Boronat 35'
                const category = "5c7e95f564f6cfa555e483d6"

                logic.createEvent(title,description, date, city, address, category)
                .then(response => {
                    expect(response).toBeDefined()
                })
            })

            it('should fail on undefined title' , () => {
                const title = undefined
                const description = "lo peta"
                const date = "11/04/2019"
                const city = "Barcelona"
                const address = 'Roc Boronat 35'
                const category = "5c7e95f564f6cfa555e483d6"
    
                expect(() => logic.createEvent(title,description,date,city,address,category)).toThrowError(`${title} is not a string`)
            }) 

            it('should fail on undefined description' , () => {
                const title = 'Fiesta pagana'
                const description = undefined
                const date = "11/04/2019"
                const city = "Barcelona"
                const address = 'Roc Boronat 35'
                const category = "5c7e95f564f6cfa555e483d6"
    
                expect(() => logic.createEvent(title,description,date,city,address,category)).toThrowError(`${description} is not a string`)
            }) 

            it('should fail on undefined date' , () => {
                const title = 'Fiesta pagana'
                const description = 'lo peta'
                const date = undefined
                const city = "Barcelona"
                const address = 'Roc Boronat 35'
                const category = "5c7e95f564f6cfa555e483d6"
    
                expect(() => logic.createEvent(title,description,date,city,address,category)).toThrowError(`${date} is not a string`)
            }) 

            it('should fail on undefined city' , () => {
                const title = 'Fiesta pagana'
                const description = 'lo peta'
                const date = "11/04/2019"
                const city = undefined
                const address = 'Roc Boronat 35'
                const category = "5c7e95f564f6cfa555e483d6"
    
                expect(() => logic.createEvent(title,description,date,city,address,category)).toThrowError(`${city} is not a string`)
            }) 

            it('should fail on undefined address' , () => {
                const title = 'Fiesta pagana'
                const description = 'lo peta'
                const date = "11/04/2019"
                const city = "Barcelona"
                const address = undefined
                const category = "5c7e95f564f6cfa555e483d6"
    
                expect(() => logic.createEvent(title,description,date,city,address,category)).toThrowError(`${address} is not a string`)
            }) 

            it('should fail on undefined category' , () => {
                const title = 'Fiesta pagana'
                const description = 'lo peta'
                const date = "11/04/2019"
                const city = "Barcelona"
                const address = 'Roc Boronat 35'
                const category = undefined
    
                expect(() => logic.createEvent(title,description,date,city,address,category)).toThrowError(`${category} is not a string`)
            }) 

            it('should fail on empty title' , () => {
                const title = ''
                const description = 'lo peta'
                const date = "11/04/2019"
                const city = "Barcelona"
                const address = 'Roc Boronat 35'
                const category = "5c7e95f564f6cfa555e483d6"
    
                expect(() => logic.createEvent(title,description,date,city,address,category)).toThrowError('title cannot be empty')
            }) 

            it('should fail on empty description' , () => {
                const title = 'Fiesta pagana'
                const description = ''
                const date = "11/04/2019"
                const city = "Barcelona"
                const address = 'Roc Boronat 35'
                const category = "5c7e95f564f6cfa555e483d6"
    
                expect(() => logic.createEvent(title,description,date,city,address,category)).toThrowError('description cannot be empty')
            }) 

            it('should fail on empty date' , () => {
                const title = 'Fiesta pagana'
                const description = 'lo peta'
                const date = ''
                const city = "Barcelona"
                const address = 'Roc Boronat 35'
                const category = "5c7e95f564f6cfa555e483d6"
    
                expect(() => logic.createEvent(title,description,date,city,address,category)).toThrowError('date cannot be empty')
            }) 

            it('should fail on empty city' , () => {
                const title = 'Fiesta pagana'
                const description = 'lo peta'
                const date = "11/04/2019"
                const city = ''
                const address = 'Roc Boronat 35'
                const category = "5c7e95f564f6cfa555e483d6"
    
                expect(() => logic.createEvent(title,description,date,city,address,category)).toThrowError('city cannot be empty')
            })
            
            it('should fail on empty address' , () => {
                const title = 'Fiesta pagana'
                const description = 'lo peta'
                const date = "11/04/2019"
                const city = "Barcelona"
                const address = ''
                const category = "5c7e95f564f6cfa555e483d6"
    
                expect(() => logic.createEvent(title,description,date,city,address,category)).toThrowError('address cannot be empty')
            })

            it('should fail on empty category' , () => {
                const title = 'Fiesta pagana'
                const description = 'lo peta'
                const date = "11/04/2019"
                const city = "Barcelona"
                const address = 'Roc Boronat 35'
                const category = ""
    
                expect(() => logic.createEvent(title,description,date,city,address,category)).toThrowError('category cannot be empty')
            })
            
        })

        describe('list events by query' , () => {
            const name = 'Tachi'
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'Hola muy buenas'
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password
            let id, eventId,token
            beforeEach(() =>
                userApi.register(name,surname,userName,age,description,email,password,passwordConfirmation)
            .then(({_id}) => {
                id = _id
             return userApi.authenticate(email,password)
            }).then(_token => {
                logic.__userApiToken__ = _token

                token = _token

                const title = "Fiesta pagana"
                const description = "lo peta"
                const date = "11/04/2019"
                const city = "Barcelona"
                const address = 'Roc Boronat 35'
                const category = "5c7e95f564f6cfa555e483d6"

                return userApi.createEventUser(title,description,date,city,address,category,token)
                
            }).then(response => {
                eventId = response._id
            })
            )
            it('should succed on correct data' , () => {
                let query = "pagana"
                logic.listEventsByQuery(query)
                .then(response =>{
                    expect(response).toBeDefined()
                })
            })


        })

        describe('list events by category', () => {
            const name = 'Tachi'
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'Hola muy buenas'
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password
            let id, categoryId,token
            beforeEach(() =>
                userApi.register(name,surname,userName,age,description,email,password,passwordConfirmation)
            .then(({_id}) => {
                id = _id
             return userApi.authenticate(email,password)
            }).then(_token => {
                logic.__userApiToken__ = _token

                token = _token

                const title = "Fiesta pagana"
                const description = "lo peta"
                const date = "11/04/2019"
                const city = "Barcelona"
                const address = 'Roc Boronat 35'
                const category = "5c7e95f564f6cfa555e483d6"

                return userApi.createEventUser(title,description,date,city,address,category,token)
                
            }).then(response => {
                categoryId = response.category.toString()
            })
            )

            it('should succed on correct data' , () => {
                logic.listEventsByCategory(categoryId)
                .then(response =>{
                    expect(response).toBeDefined()
                })
            })
        })

        describe('list event by id' , () => {
            const name = 'Tachi'
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'Hola muy buenas'
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password
            let id, eventId,token
            beforeEach(() =>
                userApi.register(name,surname,userName,age,description,email,password,passwordConfirmation)
            .then(({_id}) => {
                id = _id
             return userApi.authenticate(email,password)
            }).then(_token => {
                logic.__userApiToken__ = _token

                token = _token

                const title = "Fiesta pagana"
                const description = "lo peta"
                const date = "11/04/2019"
                const city = "Barcelona"
                const address = 'Roc Boronat 35'
                const category = "5c7e95f564f6cfa555e483d6"

                return userApi.createEventUser(title,description,date,city,address,category,token)
                
            }).then(response => {
                eventId = response._id.toString()
                
            })
            )

            it('should succed on correct data' , () => {
                logic.listEventById(eventId)
                .then(response =>{
                    expect(response).toBeDefined()
                })
            })
        })

        describe('create comment' , () => {
            const name = 'Tachi'
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'Hola muy buenas'
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password
            let id, eventId,token
            beforeEach(() =>
                userApi.register(name,surname,userName,age,description,email,password,passwordConfirmation)
            .then(({_id}) => {
                id = _id
             return userApi.authenticate(email,password)
            }).then(_token => {
                logic.__userApiToken__ = _token

                token = _token

                const title = "Fiesta pagana"
                const description = "lo peta"
                const date = "11/04/2019"
                const city = "Barcelona"
                const address = 'Roc Boronat 35'
                const category = "5c7e95f564f6cfa555e483d6"

                return userApi.createEventUser(title,description,date,city,address,category,token)
                
            }).then(response => {
                eventId = response._id.toString()
                
            })
            )

            it('should succed on correct data' , () => {
                const text = 'pam pam'
                logic.createComment(eventId,text)
                .then(response =>{
                    expect(response).toBeDefined()
                })
            })


            it('should fail on undefined text' , () => {
                let text = undefined
    
                expect(() => logic.createComment(eventId,text)).toThrowError(text + ' is not a string')
            }) 

            it('should fail on empty text' , () => {
                let text = ''
    
                expect(() => logic.createComment(eventId,text)).toThrowError('text cannot be empty')
            })
            
            it('should fail on empty eventId' , () => {
                let eventId = ''
                const text = 'pam pam'

    
                expect(() => logic.createComment(eventId,text)).toThrowError('eventId cannot be empty')
            })

            it('should fail on undefined eventId' , () => {
                let eventId = undefined
                const text = 'pam pam'

    
                expect(() => logic.createComment(eventId,text)).toThrowError(eventId + ' is not a string')
            }) 

        })

        describe('list comments' , () => {
            const name = 'Tachi'
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'Hola muy buenas'
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password
            let id, eventId,token,commentId
            beforeEach(() =>
                userApi.register(name,surname,userName,age,description,email,password,passwordConfirmation)
            .then(({_id}) => {
                id = _id
             return userApi.authenticate(email,password)
            }).then(_token => {
                logic.__userApiToken__ = _token

                token = _token

                const title = "Fiesta pagana"
                const description = "lo peta"
                const date = "11/04/2019"
                const city = "Barcelona"
                const address = 'Roc Boronat 35'
                const category = "5c7e95f564f6cfa555e483d6"

                return userApi.createEventUser(title,description,date,city,address,category,token)
                
            }).then(response => {
                eventId = response._id.toString()

                const text = 'pam pam'

                return userApi.createComment(eventId,text,token)
                
            }).then(response => {
                response
            })
            )

            it('should succed on correct data' , () => {
                logic.listComments(eventId)
                .then(response =>{
                    expect(response).toBeDefined()
                })
            })

            it('should fail on empty eventId' , () => {
                let eventId = ''

                expect(() => logic.listComments(eventId)).toThrowError('eventId cannot be empty')
            })

            it('should fail on undefined eventId' , () => {
                let eventId = undefined
    
                expect(() => logic.listComments(eventId)).toThrowError(eventId + ' is not a string')
            }) 
        })

        describe('delete comments' , () => {
            const name = 'Tachi'
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'Hola muy buenas'
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password
            let id, eventId,token,commentId
            beforeEach(() =>
                userApi.register(name,surname,userName,age,description,email,password,passwordConfirmation)
            .then(({_id}) => {
                id = _id
             return userApi.authenticate(email,password)
            }).then(_token => {
                logic.__userApiToken__ = _token

                token = _token

                const title = "Fiesta pagana"
                const description = "lo peta"
                const date = "11/04/2019"
                const city = "Barcelona"
                const address = 'Roc Boronat 35'
                const category = "5c7e95f564f6cfa555e483d6"

                return userApi.createEventUser(title,description,date,city,address,category,token)
                
            }).then(response => {
                eventId = response._id.toString()

                const text = 'pam pam'

                return userApi.createComment(eventId,text,token)
                
            }).then(response => {
                console.log(response)
                console.log(response.id.toString())
                commentId = response.id

            })
            )

            it('should succed on correct data' , () => {
                logic.deleteComment(eventId, commentId)
                .then(response =>{
                    expect(response).toBeDefined()
                })
            })

            it('should fail on empty eventId' , () => {
                let eventId = ''

                expect(() => logic.deleteComment(eventId,commentId)).toThrowError('eventId cannot be empty')
            })

            it('should fail on undefined eventId' , () => {
                let eventId = undefined
    
                expect(() => logic.deleteComment(eventId,commentId)).toThrowError(eventId + ' is not a string')
            }) 

            it('should fail on empty commentId' , () => {
                let commentId = ''

                expect(() => logic.deleteComment(eventId,commentId)).toThrowError('commentId cannot be empty')
            })

            it('should fail on undefined commentId' , () => {
                let commentId = undefined
    
                expect(() => logic.deleteComment(eventId,commentId)).toThrowError(commentId + ' is not a string')
            }) 

            

        })

        describe('toogle event' , () => {
            const name = 'Tachi'
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'Hola muy buenas'
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password
            let id, eventId,token
            beforeEach(() =>
                userApi.register(name,surname,userName,age,description,email,password,passwordConfirmation)
            .then(({_id}) => {
                id = _id
             return userApi.authenticate(email,password)
            }).then(_token => {
                logic.__userApiToken__ = _token

                token = _token

                const title = "Fiesta pagana"
                const description = "lo peta"
                const date = "11/04/2019"
                const city = "Barcelona"
                const address = 'Roc Boronat 35'
                const category = "5c7e95f564f6cfa555e483d6"

                return userApi.createEventUser(title,description,date,city,address,category,token)
                
            }).then(response => {
                eventId = response._id.toString()
                
            })
            )

            it('should succed on correct data' , () => {
                logic.toogleEvent(eventId)
                .then(response =>{
                    expect(response).toBeDefined()
                })
            })

            it('should fail on empty eventId' , () => {
                let eventId = ''

                expect(() => logic.toogleEvent(eventId)).toThrowError('eventId cannot be empty')
            })

            it('should fail on undefined eventId' , () => {
                let eventId = undefined
    
                expect(() => logic.toogleEvent(eventId)).toThrowError(eventId + ' is not a string')
            }) 
        })

        describe('update image' , () => {
            const name = 'Tachi'
            const surname = 'Fernandez'
            const userName = `Tachi1010-${Math.random()}`
            const age = 22
            const description = 'Hola muy buenas'
            const email = `Tachiii-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirmation = password

            beforeEach(() =>
                userApi.register(name,surname,userName,age,description,email,password,passwordConfirmation)
            .then(({id}) => {
              return userApi.authenticate(email,password)
                .then(token => logic.__userApiToken__ = token)
            })
            )

            it('should succed on correct data' , () => {
                const image =  "https://res.cloudinary.com/dj6yymmpj/image/upload/v1552478235/avatar.png"
                logic.updateImage(image)
                .then(response =>{
                    expect(response).toBeDefined()
                })
            })

            // it('should fail on empty image' , () => {
            //     let image = ''
    
            //     expect(() => logic.updateImage(image)).toThrowError('image cannot be empty')
            // }) 

            // it('should fail on undefined image' , () => {
            //     let image = undefined
    
            //     expect(() => logic.updateImage(image)).toThrowError(image +  ' is not a string')
            // }) 

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