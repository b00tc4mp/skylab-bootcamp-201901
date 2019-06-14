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

        it('should fail on too many args', () => {
            expect(() => {
                logic.retrieveBooks(true)
            }).toThrow(Error)
        })
    })


    describe('RetrieveBook by id', () => {
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            const title = `Title-${Math.random()}`
            const id = await userApi.registerUser(name, surname, email, password, passwordConfirm)
            const token = await userApi.authenticateUser(email, password)
            const book = await bookApi.addBook(title, 'content12', 'url12', {}, [], token)
            logic.__userApiToken__ = token
            const bookretrieved = await logic.retrieveBook(book._id)
            expect(bookretrieved).toBeDefined()
            expect(bookretrieved.title).toBe(title)
        })

        it('should fail on non-string id', () => {
            expect(() => {
                logic.retrieveBook(true)
            }).toThrow(Error)
        })

        it('should fail on empty id', () => {
            expect(() => {
                logic.retrieveBook('')
            }).toThrow(Error)
        })
    })

    describe('UpdateBook', () => {

        //updateBook(bookid, title, parameters)
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            const title = `Title-${Math.random()}`
            const newTitle = `Title-${Math.random()}`
            const id = await userApi.registerUser(name, surname, email, password, passwordConfirm)
            const token = await userApi.authenticateUser(email, password)
            logic.__userApiToken__ = token
            const book = await bookApi.addBook(title, 'content12', 'url12', {}, [], token)
            const newBook = await logic.updateBook(book._id, newTitle, {name})
            const bookretrieved = await bookApi.retrieveBook(token, book._id)
            expect(bookretrieved).toBeDefined()
            expect(bookretrieved.title).toBe(newTitle)
            expect(bookretrieved.parameters.name).toBe(name)
        })

        it('should fail on non-string bookid', () => {
            expect(() => {
                logic.updateBook(true, 'title', {})
            }).toThrow(Error)
        })
        it('should fail on empty bookid', () => {
            expect(() => {
                logic.updateBook('', 'title', {})
            }).toThrow(Error)
        })
        it('should fail on non-string title', () => {
            expect(() => {
                logic.updateBook('true', true, {})
            }).toThrow(Error)
        })
        it('should fail on empty title', () => {
            expect(() => {
                logic.updateBook('sdsds', '', {})
            }).toThrow(Error)
        })
        it('should fail on non-Object parameters', () => {
            expect(() => {
                logic.updateBook('true', 'true', true)
            }).toThrow(Error)
        })
    })

    describe('DeleteBook', () => {

        //updateBook(bookid, title, parameters)
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on deleting data', async () => {
            const title = `Title-${Math.random()}`
            const content = `Content-${Math.random()}`
            const id = await userApi.registerUser(name, surname, email, password, passwordConfirm)
            const token = await userApi.authenticateUser(email, password)
            logic.__userApiToken__ = token
            const book = await bookApi.addBook(title, content, 'url12', {}, [], token)
            const deletedBook = await logic.deleteBook(book._id)
            expect(deletedBook).toBeDefined()
            expect(deletedBook.title).toBe(title)
            expect(deletedBook.content).toBe(content)
        })

        it('should fail on non-string bookid', () => {
            expect(() => {
                logic.deleteBook(true)
            }).toThrow(Error)
        })

        it('should fail on empty bookid', () => {
            expect(() => {
                logic.deleteBook('')
            }).toThrow(Error)
        })

        //retrieveTemplateBook
    })

    describe('Add Book to Templates', () => {
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on adding to templates a book', async () => {
            const title = `Title-${Math.random()}`
            const content = `Content-${Math.random()}`
            const id = await userApi.registerUser(name, surname, email, password, passwordConfirm)
            const token = await userApi.authenticateUser(email, password)
            logic.__userApiToken__ = token
            const book = await bookApi.addBook(title, content, 'url12', {}, [], token)
            const bookadded = await logic.addBookToTemplates(book._id, false)
            const retrievedTemplates = await bookApi.retrieveTemplateBooks()
            expect(retrievedTemplates).toBeDefined()
            expect(retrievedTemplates instanceof Array).toBe(true)
            expect(retrievedTemplates.length).toBeGreaterThan(0)
        })

        it('should fail on non-string bookid', () => {
            expect(() => {
                logic.addBookToTemplates(true, false)
            }).toThrow(Error)
        })

        it('should fail on empty bookid', () => {
            expect(() => {
                logic.addBookToTemplates('', false)
            }).toThrow(Error)
        }) 

        it('should fail on is a template=true', () => {
            expect(() => {
                logic.addBookToTemplates('true', true)
            }).toThrow(Error)
        })

        it('should fail on non-boolean', () => {
            expect(() => {
                logic.addBookToTemplates('dfdfdf', 0)
            }).toThrow(Error)
        }) 
    })

    describe('RetrieveTemplateBook', () => {
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on retrieving a template book', async () => {
            const title = `Title-${Math.random()}`
            const content = `Content-${Math.random()}`
            const id = await userApi.registerUser(name, surname, email, password, passwordConfirm)
            const token = await userApi.authenticateUser(email, password)
            logic.__userApiToken__ = token
            const book = await bookApi.addBook(title, content, 'url12', {}, [], token)
            const bookadded = await bookApi.addBookToTemplates(book._id)
            const retrievedTemplate = await logic.retrieveTemplateBook(bookadded._id)
            expect(retrievedTemplate).toBeDefined()
            expect(retrievedTemplate.title).toBe(title)
            expect(retrievedTemplate.content).toBe(content)
            expect(retrievedTemplate.coverphoto).toBe('url12')
        })

        it('should fail on too many args', () => {
            expect(() => {
                logic.addBookToTemplates('arg1', 'arg2')
            }).toThrow(Error)
        }) 
    })

    describe('RetrieveTemplateBooks', () => {
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on adding to templates a book', async () => {
            const title = `Title-${Math.random()}`
            const content = `Content-${Math.random()}`
            const id = await userApi.registerUser(name, surname, email, password, passwordConfirm)
            const token = await userApi.authenticateUser(email, password)
            logic.__userApiToken__ = token
            const book = await bookApi.addBook(title, content, 'url12', {}, [], token)
            const bookadded = await bookApi.addBookToTemplates(book._id)
            const retrievedTemplates = await logic.retrieveTemplateBooks()
            expect(retrievedTemplates).toBeDefined()
            expect(retrievedTemplates instanceof Array).toBe(true)
            expect(retrievedTemplates.length).toBeGreaterThan(0)
        })

        it('should fail on too many args', () => {
            expect(() => {
                logic.retrieveTemplateBooks('arg1', 'arg2')
            }).toThrow(Error)
        }) 
    })

    //addTemplateToUserBooks(id){
        describe('Add Template to User Books', () => {
            const name = 'Carlos'
            const surname = 'Calvo'
            const email = `Carlos-${Math.random()}@mail.com`
            const password = '123'
            const passwordConfirm = password

            const name2 = 'Cesc'
            const surname2 = 'Caballero'
            const email2 = `Carlos-${Math.random()}@mail.com`
    
            it('should succeed on adding a template to user books', async () => {
                try {
                    const title = `Title-${Math.random()}`
                    const content = `Content-${Math.random()}`
                    const id = await userApi.registerUser(name, surname, email, password, passwordConfirm)
                    const token = await userApi.authenticateUser(email, password)
                    logic.__userApiToken__ = token
                    const book = await bookApi.addBook(title, content, 'url12', {}, [], token)
                    const bookadded = await bookApi.addBookToTemplates(book._id)
                    const bookcheck = await logic.addTemplateToUserBooks(bookadded._id)
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBe('Already existing template in your books')
                }
            })

            it('should fail on not-string id ', () => {
                expect(() => {
                    logic.addTemplateToUserBooks(true)
                }).toThrow(Error)
            }) 

            it('should fail on empty id', () => {
                expect(() => {
                    logic.addTemplateToUserBooks('')
                }).toThrow(Error)
            }) 
    
        })

        describe('Download epub', () => {
            const name = 'Carlos'
            const surname = 'Calvo'
            const email = `Carlos-${Math.random()}@mail.com`
            const password = '123'
            const passwordConfirm = password

            const name2 = 'Cesc'
            const surname2 = 'Caballero'
            const email2 = `Carlos-${Math.random()}@mail.com`
    
            it('should not throw error on downloading epub', async () => {
                    const title = `Title-${Math.random()}`
                    const content = `Content-${Math.random()}`
                    const id = await userApi.registerUser(name, surname, email, password, passwordConfirm)
                    const token = await userApi.authenticateUser(email, password)
                    logic.__userApiToken__ = token
                    const book = await bookApi.addBook(title, content, 'url12', {}, [], token)
                    const epub = await logic.downloadEpub(book._id)
                    expect(epub).toBeDefined()
            })

            it('should fail on not-string id ', () => {
                expect(() => {
                    logic.downloadEpub(true)
                }).toThrow(Error)
            })
            it('should fail on empty id ', () => {
                expect(() => {
                    logic.downloadEpub('')
                }).toThrow(Error)
            })
        })
})
