'use strict'

const env = require('dotenv').config()
const userApi = require('.')
const bookApi = require('../bookApi')
const expect = require('expect')
const logic  = require('../logic')
const fetch = require('isomorphic-fetch')

const { mongoose, User, Book, BookTemplate  } = require('book-data')
const { env: { TEST_DB_URL } } = process

describe('bookApi', () => {
    describe('add book', () => {
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
            const {token} = await logic.authenticateUser(email, password)
            const title = `Invented title-${Math.random()}`
            const content = `Invented content-${Math.random()}`
            logic.__userApiToken__ = token
            const book = await bookApi.addBook(title, content, 'url', {}, [], token)
            expect(book).toBeDefined()
            expect(book.title).toBe(title)
            expect(book.content).toBe(content)
        })

        it('should succeed on non-valid data', async () => {
            const name = 'Carlos'
            const surname = 'Calvo'
            const email = `Carlos-${Math.random()}@mail.com`
            const password = '123'
            const passwordConfirm = password
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
            expect(id).toBeDefined()
            const {token} = await logic.authenticateUser(email, password)
            expect(token).toBeDefined() //as token is taken from stateful logic
            logic.__userApiToken__= token
            const title = `Invented title-${Math.random()}`
            const content = `Invented content-${Math.random()}`
            const book = await logic.addBook(title, content, 'url', {}, [], token)
            expect(book).toBeDefined()
            expect(book.title).toBe(title)
            expect(book.content).toBe(content)
        })

        it('should fail on non-string title', () => {
            expect(() => {
                bookApi.addBook(true, content, coverphoto, userId, images, parameters)
            }).toThrow(Error)
        })
        it('should fail on empty title', () => {
            expect(() => {
                bookApi.addBook('', content, coverphoto, userId, images, parameters)
            }).toThrow(Error)
        })
        it('should fail on non-string content', () => {
            expect(() => {
                bookApi.addBook(title, true, coverphoto, userId, images, parameters)
            }).toThrow(Error)
        })
        it('should fail on empty content', () => {
            expect(() => {
                bookApi.addBook(title, '', coverphoto, userId, images, parameters)
            }).toThrow(Error)
        })

        it('should fail on non-string coverphoto', () => {
            expect(() => {
                bookApi.addBook(title, content, true, userId, images, parameters)
            }).toThrow(Error)
        })
        it('should fail on empty coverphoto', () => {
            expect(() => {
                bookApi.addBook(title, content, '', userId, images, parameters)
            }).toThrow(Error)
        })

        it('should fail on non-string userId', () => {
            expect(() => {
                bookApi.addBook(title, content, coverphoto, true, images, parameters)
            }).toThrow(Error)
        })
        it('should fail on empty userId', () => {
            expect(() => {
                bookApi.addBook(title, content, coverphoto, '', images, parameters)
            }).toThrow(Error)
        })

        it('should fail on non-array image', () => {
            expect(() => {
                bookApi.addBook(title, content, coverphoto, userId, true, parameters)
            }).toThrow(Error)
        })
        it('should fail on empty userId', () => {
            expect(() => {
                bookApi.addBook(title, content, coverphoto, userId, '', parameters)
            }).toThrow(Error)
        })
        it('should fail on non-object parameters', () => {
            expect(() => {
                bookApi.addBook(title, content, coverphoto, userId, images, true)
            }).toThrow(Error)
        })
        it('should fail on empty parameters', () => {
            expect(() => {
                bookApi.addBook(title, content, coverphoto, userId, images, '')
            }).toThrow(Error)
        })
        it('should fail on non-string token', () => {
            expect(() => {
                bookApi.addBook(title, content, coverphoto, userId, images, true)
            }).toThrow(Error)
        })
        it('should fail on empty token', () => {
            expect(() => {
                bookApi.addBook(title, content, coverphoto, userId, images, '' )
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
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
            const {token} = await logic.authenticateUser(email, password)
            logic.__userApiToken__= token
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
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
            const {token} = await logic.authenticateUser(email, password)
            logic.__userApiToken__ = token
            const book = await bookApi.addBook('title1', 'content', 'url', {}, [], token)
            const book2 = await bookApi.addBook('title2', 'content2', 'url2', {}, [], token)
            const arrayBooks = await logic.retrieveBooks()
            expect(arrayBooks).toBeDefined()
            expect(arrayBooks.length).toBe(2)
            expect(arrayBooks[0].title).toBe('title1')
            expect(arrayBooks[1].title).toBe('title2')
        })

        it('should fail on non-string token', () => {
            expect(() => {
                bookApi.retrieveBooks(true)
            }).toThrow(Error)
        })
        it('should fail on empty token', () => {
            expect(() => {
                bookApi.retrieveBooks('')
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
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
            const {token} = await logic.authenticateUser(email, password)
            logic.__userApiToken__ = token
            const book = await logic.addBook(title, 'content12', 'url12', {}, [])
            const bookretrieved = await bookApi.retrieveBook(token, book._id)
            expect(bookretrieved).toBeDefined()
            expect(bookretrieved.title).toBe(title)
        })
        it('should fail on non-string token', () => {
            expect(() => {
                bookApi.retrieveBook(true,'true')
            }).toThrow(Error)
        })

        it('should fail on empty token', () => {
            expect(() => {
                bookApi.retrieveBook('','id')
            }).toThrow(Error)
        })

        it('should fail on non-string id', () => {
            expect(() => {
                bookApi.retrieveBook('token',true)
            }).toThrow(Error)
        })

        it('should fail on empty id', () => {
            expect(() => {
                bookApi.retrieveBook('token','')
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
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
            const {token} = await logic.authenticateUser(email, password)
            logic.__userApiToken__ = token
            const book = await logic.addBook(title, 'content12', 'url12', {}, [])
            const newBook = await logic.updateBook(book._id, newTitle, {name})
            const bookretrieved = await bookApi.retrieveBook(token, book._id)
            expect(bookretrieved).toBeDefined()
            expect(bookretrieved.title).toBe(newTitle)
            expect(bookretrieved.parameters.name).toBe(name)
        })

        it('should fail on non-string bookid', () => {
            expect(() => {
                bookApi.updateBook(true, 'title', {})
            }).toThrow(Error)
        })
        it('should fail on empty bookid', () => {
            expect(() => {
                bookApi.updateBook('', 'title', {})
            }).toThrow(Error)
        })
        it('should fail on non-string title', () => {
            expect(() => {
                bookApi.updateBook('true', true, {})
            }).toThrow(Error)
        })
        it('should fail on empty title', () => {
            expect(() => {
                bookApi.updateBook('sdsds', '', {})
            }).toThrow(Error)
        })
        it('should fail on non-Object parameters', () => {
            expect(() => {
                bookApi.updateBook('true', 'true', true)
            }).toThrow(Error)
        })

        it('should fail on non-string token', () => {
            expect(() => {
                bookApi.updateBook('sdsds', 'proba', 'proba', true)
            }).toThrow(Error)
        })
        it('should fail on empty token', () => {
            expect(() => {
                bookApi.updateBook('true', 'true', 'proba', '')
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
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
            const {token} = await logic.authenticateUser(email, password)
            logic.__userApiToken__ = token
            const book = await logic.addBook(title, content, 'url12', {}, [])
            const deletedBook = await bookApi.deleteBook(token, book._id)
            expect(deletedBook).toBeDefined()
            expect(deletedBook.title).toBe(title)
            expect(deletedBook.content).toBe(content)
        })

        it('should fail on non-string bookid', () => {
            expect(() => {
                bookApi.deleteBook('token',true)
            }).toThrow(Error)
        })

        it('should fail on empty bookid', () => {
            expect(() => {
                bookApi.deleteBook('' ,'id')
            }).toThrow(Error)
        })

        it('should fail on non-string bookid', () => {
            expect(() => {
                bookApi.deleteBook(true ,'id')
            }).toThrow(Error)
        })

        it('should fail on empty bookid', () => {
            expect(() => {
                bookApi.deleteBook('token','')
            }).toThrow(Error)
        })
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
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
            const {token} = await logic.authenticateUser(email, password)
            logic.__userApiToken__ = token
            const book = await logic.addBook(title, content, 'url12', {}, [], token)
            const bookadded = await bookApi.addBookToTemplates(book._id)
            const retrievedTemplates = await logic.retrieveTemplateBooks()
            expect(retrievedTemplates).toBeDefined()
            expect(retrievedTemplates instanceof Array).toBe(true)
            expect(retrievedTemplates.length).toBeGreaterThan(0)
        })

        it('should fail on non-string bookid', () => {
            expect(() => {
                bookApi.addBookToTemplates(true)
            }).toThrow(Error)
        })
        it('should fail on empty bookid', () => {
            expect(() => {
                bookApi.addBookToTemplates('')
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
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
            const {token} = await logic.authenticateUser(email, password)
            logic.__userApiToken__ = token
            const book = await logic.addBook(title, content, 'url12', {}, [], token)
            const bookadded = await logic.addBookToTemplates(book._id, false)
            const retrievedTemplate = await bookApi.retrieveTemplateBook(bookadded._id)
            expect(retrievedTemplate).toBeDefined()
            expect(retrievedTemplate.title).toBe(title)
            expect(retrievedTemplate.content).toBe(content)
            expect(retrievedTemplate.coverphoto).toBe('url12')
        })

        it('should fail on non-string id', () => {
            expect(() => {
                bookApi.retrieveTemplateBook(true)
            }).toThrow(Error)
        }) 
        it('should fail on empty id', () => {
            expect(() => {
                bookApi.retrieveTemplateBook('')
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
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
            const {token} = await logic.authenticateUser(email, password)
            logic.__userApiToken__ = token
            const book = await logic.addBook(title, content, 'url12', {}, [], token)
            const bookadded = await logic.addBookToTemplates(book._id, false)
            const retrievedTemplates = await bookApi.retrieveTemplateBooks()
            expect(retrievedTemplates).toBeDefined()
            expect(retrievedTemplates instanceof Array).toBe(true)
            expect(retrievedTemplates.length).toBeGreaterThan(0)
        })

        it('should fail on too many args', () => {
            expect(() => {
                bookApi.retrieveTemplateBooks('arg1', 'arg2')
            }).toThrow(Error)
        }) 
    })

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
                    const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
                    const {token} = await logic.authenticateUser(email, password)
                    logic.__userApiToken__ = token
                    const book = await logic.addBook(title, content, 'url12', {}, [], token)
                    const bookadded = await logic.addBookToTemplates(book._id, false)
                    const bookcheck = await bookApi.addTemplateToUserBooks(bookadded._id, token)
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBe('Already existing template in your books')
                }
            })

            it('should fail on not-string id ', () => {
                expect(() => {
                    bookApi.addTemplateToUserBooks(true, 'token')
                }).toThrow(Error)
            }) 

            it('should fail on empty id', () => {
                expect(() => {
                    bookApi.addTemplateToUserBooks('', 'token')
                }).toThrow(Error)
            }) 

            it('should fail on not-string id ', () => {
                expect(() => {
                    bookApi.addTemplateToUserBooks('true', true)
                }).toThrow(Error)
            }) 

            it('should fail on empty id', () => {
                expect(() => {
                    bookApi.addTemplateToUserBooks('trie', '')
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
                    const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
                    const {token} = await logic.authenticateUser(email, password)
                    logic.__userApiToken__ = token
                    const book = await logic.addBook(title, content, 'url12', {}, [], token)
                    const epub = await bookApi.downloadEpub(book._id)
                    expect(epub).toBeDefined()
            })

            it('should fail on not-string id ', () => {
                expect(() => {
                    bookApi.downloadEpub(true, '1234')
                }).toThrow(Error)
            })
            it('should fail on empty id ', () => {
                expect(() => {
                    bookApi.downloadEpub('', '12345')
                }).toThrow(Error)
            })
            it('should fail on not-string id ', () => {
                expect(() => {
                    bookApi.downloadEpub('true', true)
                }).toThrow(Error)
            })
            it('should fail on empty id ', () => {
                expect(() => {
                    bookApi.downloadEpub('12345', '')
                }).toThrow(Error)
            })
        })
})