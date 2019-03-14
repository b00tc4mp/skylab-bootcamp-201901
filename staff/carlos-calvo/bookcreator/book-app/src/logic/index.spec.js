'use strict'

const sasaa = require('dotenv').config()
const userApi = require('../userApi')
const bookApi = require('../bookApi')
const expect = require('expect')
const logic  = require('.')
const fetch = require('isomorphic-fetch')

const { mongoose, User, Book, BookTemplate  } = require('book-data')
const { env: { TEST_DB_URL } } = process

describe('logic', () => {

    /*

    USER

    */

    describe('register user', () => {
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', () =>{
            return logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(result => {
                    expect(result).toBeDefined()})
                .catch(err => expect(err).toBeUndefined())
        })

        it('should fail on non-string name', () => {
            const name = true
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on non-string surname', () => {
            const name = 'true'
            const surname = true
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'true'
            const surname = ''
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('surname cannot be empty'))
        })


        it('should fail on non-string email', () => {
            const name = 'true'
            const surname = 'true'
            const email = true
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const name = 'true'
            const surname = 'true'
            const email = ''
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('email cannot be empty'))
        })

        it('should fail on non-string password', () => {
            const name = 'true'
            const surname = 'true'
            const email = 'true@true.com'
            const password = undefined

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const name = 'true'
            const surname = 'asas'
            const email = 'manuelbarzi@mail.com'
            const password = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('password cannot be empty'))
        })

        it('should fail on non-string password Confirm', () => {
            const name = 'true'
            const surname = 'true'
            const email = 'true@true.com'
            const password = 'undefined'
            const passwordConfirm = true

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm + ' is not a string'))
        })

        it('should fail on empty password confirm', () => {
            const name = 'true'
            const surname = ''
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error('surname cannot be empty'))
        })
    })

    describe('authenticate user', () => {
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            const id = await userApi.registerUser(name, surname, email, password, passwordConfirm)
            expect(id).toBeDefined()
            const result = await logic.authenticateUser(email, password)
            expect(result).toBeDefined()
            expect(result.token).toBeDefined()
        })

        it('should fail on non-string email', () => {
            const email = true
            const password = '123'

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const email = ''
            const password = '123'

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error)
        })

        it('should fail on empty password', () => {
            const email = 'Carlosan@mail.com'
            const password = ''

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error)
        })

        it('should fail on non-string password', () => {
            const email = 'Carlosan@mail.com'
            const password = true

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error)
        })
    })

    describe('retrieve user', () => {
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            const id = await userApi.registerUser(name, surname, email, password, passwordConfirm)
            expect(id).toBeDefined()
            const result = await logic.retrieveUser()
            expect(result).toBeDefined() //as token is taken from stateful logic
        })

        it('should fail on non-string password', () => {
            const email = 'Carlosan@mail.com'
            const password = true

            expect(() => {
                logic.retrieveUser('true')
            }).toThrow(Error)
        })
    })

    describe('Update user', () => {
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            let newPassword = '12345'
            const id = await userApi.registerUser(name, surname, email, password, password)
            expect(id).toBeDefined()
            const updation = await logic.updateUser('Carlos123', 'Calvo123', email, newPassword, newPassword)
            const result = await userApi.authenticateUser(email, newPassword)
            console.log(result)
            expect(result).toBeDefined()
        })

        it('should fail on non-string name', () => {
            expect(() => {
                logic.updateUser(true, surname, email, password, passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on empty name', () => {
            expect(() => {
                logic.updateUser('', surname, email, password, passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on non-string surname', () => {
            expect(() => {
                logic.updateUser(name, true, email, password, passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on empty surname', () => {
            expect(() => {
                logic.updateUser(name, '', email, password, passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on non-string email', () => {
            expect(() => {
                logic.updateUser(name, surname, {}, password, passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on empty email', () => {
            expect(() => {
                logic.updateUser(name, surname, '', password, passwordConfirm)
            }).toThrow(Error)
        })

        it('should fail on non-string password', () => {
            expect(() => {
                logic.updateUser(name, surname, email, {} , passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on empty password', () => {
            expect(() => {
                logic.updateUser(name, surname, email, '', passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on non-string passwordConfirm', () => {
            expect(() => {
                logic.updateUser(name, surname, email, password , true)
            }).toThrow(Error)
        })
        it('should fail on empty password', () => {
            expect(() => {
                logic.updateUser(name, surname, email, password, '')
            }).toThrow(Error)
        })

        it('should fail on non-matching passwords', () => {
            expect(() => {
                logic.updateUser(name, surname, email, password, '--invented---password')
            }).toThrow(Error)
        })
    })


    /*





    BOOK






    */

    describe('add book', () => {
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            const id = await userApi.registerUser(name, surname, email, password, passwordConfirm)
            const token = await userApi.authenticateUser(email, password)
            const book = await logic.addBook('title1', 'content', 'url', {}, [])
            expect(book).toBeDefined()
            expect(book.title).toBe('title1')
            expect(book.content).toBe('content')
        })

        it('should succeed on non-valid data', async () => {
            const name = 'Carlos'
            const surname = 'Calvo'
            const email = `Carlos-${Math.random()}@mail.com`
            const password = '123'
            const passwordConfirm = password
            const id = await userApi.registerUser(name, surname, email, password, passwordConfirm)
            expect(id).toBeDefined()
            const token = await userApi.authenticateUser(email, password)
            expect(token).toBeDefined() //as token is taken from stateful logic
            const book = await logic.addBook('title1', 'content', 'url', {}, [])
            expect(book).toBeDefined()
        })

        it('should fail on non-string title', () => {
            expect(() => {
                logic.addBook(true, content, coverphoto, userId, images, parameters)
            }).toThrow(Error)
        })
        it('should fail on empty title', () => {
            expect(() => {
                logic.addBook('', content, coverphoto, userId, images, parameters)
            }).toThrow(Error)
        })
        it('should fail on non-string content', () => {
            expect(() => {
                logic.addBook(title, true, coverphoto, userId, images, parameters)
            }).toThrow(Error)
        })
        it('should fail on empty content', () => {
            expect(() => {
                logic.addBook(title, '', coverphoto, userId, images, parameters)
            }).toThrow(Error)
        })

        it('should fail on non-string coverphoto', () => {
            expect(() => {
                logic.addBook(title, content, true, userId, images, parameters)
            }).toThrow(Error)
        })
        it('should fail on empty coverphoto', () => {
            expect(() => {
                logic.addBook(title, content, '', userId, images, parameters)
            }).toThrow(Error)
        })

        it('should fail on non-string userId', () => {
            expect(() => {
                logic.addBook(title, content, coverphoto, true, images, parameters)
            }).toThrow(Error)
        })
        it('should fail on empty userId', () => {
            expect(() => {
                logic.addBook(title, content, coverphoto, '', images, parameters)
            }).toThrow(Error)
        })

        it('should fail on non-array image', () => {
            expect(() => {
                logic.addBook(title, content, coverphoto, userId, true, parameters)
            }).toThrow(Error)
        })
        it('should fail on empty userId', () => {
            expect(() => {
                logic.addBook(title, content, coverphoto, userId, '', parameters)
            }).toThrow(Error)
        })
        it('should fail on non-object parameters', () => {
            expect(() => {
                logic.addBook(title, content, coverphoto, userId, images, true)
            }).toThrow(Error)
        })
        it('should fail on empty parameters', () => {
            expect(() => {
                logic.addBook(title, content, coverphoto, userId, images, '')
            }).toThrow(Error)
        })
    })


    describe('Retrieve books', () => {
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            const id = await userApi.registerUser(name, surname, email, password, passwordConfirm)
            const token = await userApi.authenticateUser(email, password)
            const book = await bookApi.addBook('title1', 'content', 'url', {}, [], token)
            const arrayBooks = await logic.retrieveBooks()
            console.log(arrayBooks)
            expect(arrayBooks).toBeDefined()
            expect(arrayBooks.length).toBe(1)
            expect(arrayBooks[0].title).toBe('title1')
        })

        it('should succeed on valid data', async () => {
            const name = 'Carlos'
            const surname = 'Calvo'
            const email = `Carlos-${Math.random()}@mail.com`
            const password = '123'
            const passwordConfirm = password
            const id = await userApi.registerUser(name, surname, email, password, passwordConfirm)
            const token = await userApi.authenticateUser(email, password)
            const book = await bookApi.addBook('title1', 'content', 'url', {}, [], token)
            const book2 = await bookApi.addBook('title2', 'content2', 'url2', {}, [], token)
            const arrayBooks = await logic.retrieveBooks()
            expect(arrayBooks).toBeDefined()
            expect(arrayBooks.length).toBe(2)
            expect(arrayBooks[0].title).toBe('title1')
            expect(arrayBooks[1].title).toBe('title2')
        })

    })
})
