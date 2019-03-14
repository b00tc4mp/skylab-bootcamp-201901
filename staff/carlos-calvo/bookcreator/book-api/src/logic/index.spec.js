'use strict'

require('dotenv').config()
require('isomorphic-fetch')

const mongoose = require('mongoose')
const { User, Book, BookTemplate } = require('../models')
const ObjectID = require('mongodb').ObjectID
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')
const TEST_DB_URL = 'mongodb://localhost/skylab-test'



describe('logic', () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Book.deleteMany(),
            BookTemplate.deleteMany(),
        ])
    )

    describe('register user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
            expect(id).toBeDefined()
            expect(typeof id).toBe('string')
            const user = await User.findOne({ email })
            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)
            const match = await bcrypt.compare(password, user.password)
            expect(match).toBeTruthy()
        })

        it('should fail on already existing email', async () => {
            try {
                const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
                expect(id).toBeDefined()
                expect(typeof id).toBe('string')
                const user = await User.findOne({ email })
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)
                const match = await bcrypt.compare(password, user.password)
                expect(match).toBeTruthy()
                const id2 = await logic.registerUser(name, surname, email, password, passwordConfirm)
            } catch (error) {
                expect(error).toBeDefined()
            }
        })

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Manuel'
            const surname = undefined
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Manuel'
            const surname = 10
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'Manuel'
            const surname = false
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Manuel'
            const surname = {}
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Manuel'
            const surname = []
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Manuel'
            const surname = ''
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('surname cannot be empty'))
        })

        it('should fail on empty email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = ''
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error)
        })

        it('should fail on non-string email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error)
        })

        it('should fail on empty password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manue@mail.com'
            const password = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, 'password')
            }).toThrow(Error)
        })

        it('should fail on non-string password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manue@mail.com'
            const password = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error)
        })

        it('should fail on non-matching password and password confirmation', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manue@mail.com'
            const password = '1234567-invented'

            expect(() => {
                logic.registerUser(name, surname, email, password, 'password')
            }).toThrow(Error)
        })
    })

    describe('authenticate user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
        )

        it('should fail on wrong credentials', () => {
            (async () => {
                return await logic.authenticateUser(email, 'inventedpassword')
            })()
                .catch(error => {
                    expect(error).toBeDefined()
                })
        })

        it('should succeed on correct credentials', () =>
            logic.authenticateUser(email, password)
                .then(id => {
                    return User.findById(id)
                    .then(user => {
                        expect(user.id).toBe(id)
                        expect(id).toBeDefined()
                        expect(user.name).toBe(name)
                        expect(user.surname).toBe(surname)
                        expect(user.email).toBe(email)
                    })
                })           
        )

        it('should fail on non-found user', () =>
            expect(() => {
                logic.authenticateUser(`manuelbarzi-${Math.random()}@mail.com`, `123-${Math.random()}`)
                .catch(error => expect(error).toBeDefined())
            })
        )

        it('should throw Error on empty user', () =>
            expect(() => {
                logic.authenticateUser('', password)
            }).toThrow(Error)
        )

        it('should throw Error on non-string user', () =>
            expect(() => {
                logic.authenticateUser(true, password)
            }).toThrow(Error)
        )


        it('should throw Error on empty password', () =>
            expect(() => {
                logic.authenticateUser(email, '')
            }).toThrow(Error)
        )


        it('should throw Error on non-string password', () =>
            expect(() => {
                logic.authenticateUser(email, true)
            }).toThrow(Error)
        )
   
    
    })

    describe('retrieve user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        let userId
        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )
        it('should succeed on correct credentials', () =>
            logic.retrieveUser(userId)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        )
        it('should throw Error on non-string userId', () =>
            expect(() => {
                logic.retrieveUser(true)
            }).toThrow(Error)
        )

        it('should throw Error on empty userId', () =>
            expect(() => {
                logic.retrieveUser('')
            }).toThrow(Error)
        )

        describe('update user', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = `manuelbarzi-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            let userId

            it('should succeed on correct credentials', () =>{
                bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(() => {
                    let newPassword = 'abc'
                    logic.updateUser('Carlos', 'Calvo', email,newPassword, newPassword )
                        .then(user => {
                            expect(user.name).toBe('Carlos')
                            expect(user.surname).toBe('Calvo')
                            expect(user.email).toBe(email)
                        })
                })
            })

            it('should fail on empty name', () =>{
                expect(() => {
                    let name1 = ''
                    let surname1 = 'Calvo'
                    let email1 = 'carlos@mail.com'
                    let password1 = '12345abc'
                    logic.updateUser(name1, surname1, email1, password1, password1)
                }).toThrow(Error)
            })
            it('should fail on non-string name', () =>{
                expect(() => {
                    let name1 = true
                    let surname1 = 'Calvo'
                    let email1 = 'carlos@mail.com'
                    let password1 = '12345abc'
                    logic.updateUser(name1, surname1, email1, password1, password1)
                }).toThrow(Error)
            })

            it('should fail on empty surname', () =>{
                expect(() => {
                    let name1 = 'Carlos'
                    let surname1 = ''
                    let email1 = 'carlos@mail.com'
                    let password1 = '12345abc'
                    logic.updateUser(name1, surname1, email1, password1, password1)
                }).toThrow(Error)
            })
            it('should fail on non-string surname', () =>{
                expect(() => {
                    let name1 = 'Carlos'
                    let surname1 = {}
                    let email1 = 'carlos@mail.com'
                    let password1 = '12345abc'
                    logic.updateUser(name1, surname1, email1, password1, password1)
                }).toThrow(Error)
            })

            it('should fail on empty email', () =>{
                expect(() => {
                    let name1 = 'Carlos'
                    let surname1 = 'Calvo'
                    let email1 = ''
                    let password1 = '12345abc'
                    logic.updateUser(name1, surname1, email1, password1, password1)
                }).toThrow(Error)
            })
            it('should fail on non-string email', () =>{
                expect(() => {
                    let name1 = 'Carlos'
                    let surname1 = 'Calvo'
                    let email1 = {}
                    let password1 = '12345abc'
                    logic.updateUser(name1, surname1, email1, password1, password1)
                }).toThrow(Error)
            })

            it('should fail on empty password', () =>{
                expect(() => {
                    let name1 = 'Carlos'
                    let surname1 = 'Calvo'
                    let email1 = 'carlos@mail.com'
                    let password1 = ''
                    logic.updateUser(name1, surname1, email1, password1, password1)
                }).toThrow(Error)
            })

            it('should fail on non-string password', () =>{
                expect(() => {
                    let name1 = 'Carlos'
                    let surname1 = 'Calvo'
                    let email1 = 'carlos@mail.com'
                    let password1 = {}
                    logic.updateUser(name1, surname1, email1, password1, password1)
                }).toThrow(Error)
            })

            it('should fail on non-matching passwords', () =>{
                expect(() => {
                    let name1 = 'Carlos'
                    let surname1 = 'Calvo'
                    let email1 = 'carlos@mail.com'
                    let password1 = '12345abc'
                    logic.updateUser(name1, surname1, email1, password1, 'password1')
                }).toThrow(Error)
            })
        })
    }) 

    // TODO removeUser








    //TESTING FROM BOOKS

    describe('Add Book', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        const name2 = 'Manuel'
        const surname2 = 'Barzi'
        const email2 = `manuelbarzi-${Math.random()}@mail.com`
        const password2 = `123-${Math.random()}`
        const passwordConfirm2 = password2


        it('should fail on empty title', async () => {
            expect(() => {
                logic.addBook('', 'content', 'url1', [] , [] , 'userId')
            }).toThrow(Error)
        }),
        it('should fail on non-string title', async () => {

            expect(() => {
                logic.addBook(true, 'content', 'url1', [] , [] , 'userId')
            }).toThrow(Error)
        }),


        it('should fail on empty content', async () => {

            expect(() => {
                logic.addBook('title', '', 'url1', [] , [] , 'userId')
            }).toThrow(Error)
        }),
        it('should fail on non-string content', async () => {

            expect(() => {
                logic.addBook('title', undefined, 'url1', [] , [] , 'userId')
            }).toThrow(Error)
        }),

        it('should fail on empty coverphoto', async () => {

            expect(() => {
                logic.addBook('title', 'content', '', [] , [] , 'userId')
            }).toThrow(Error)
        }),
        it('should fail on non-string coverphoto', async () => {

            expect(() => {
                logic.addBook('title', 'content', true, [] , [] , 'userId')
            }).toThrow(Error)
        }),


        it('should succeed on valid data', async () => {
            const hash = await bcrypt.hash(password, 10)
            const user  = await User.create({ name, surname, email, password })
            const book = await logic.addBook('titulo1','contenido1', 'cover1', user._id.toString(), ['1', '2', '3'], ['url1', 'url2'] )
            expect(book).toBeDefined()
            expect(book.title).toBe('titulo1')
            expect(book.content).toBe('contenido1')
            expect(book.coverphoto).toBe('cover1')
            expect(book.images.length).toBe(3)
            expect(book.parameters.length).toBe(2)
        })
    })





    describe('Delete Book', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should fail on empty id', async () => {
            expect(() => {
                logic.deleteBook('')
            }).toThrow(Error)
        })

        it('should fail on non-string id', async () => {
            expect(() => {
                logic.deleteBook(true, 'userId')
            }).toThrow(Error)
        })

        it('should succeed on deleting a book', async () => {
            const user  = await User.create({ name, surname, email, password })
            const book  = await Book.create({title: 'titulodelete', content:'content', coverphoto: 'co','userId' : ObjectID(user._id.toString()), images: [], parameters: {} })
            const id3 = await logic.deleteBook(book._id.toString())
            expect(id3.title).toBeDefined()
            expect(id3.title).toBe('titulodelete')
            expect(id3.content).toBe('content')
            expect(id3.coverphoto).toBe('co')
        })   
    })


    describe('Retrieve Books', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should fail on empty title', async () => {
            expect(() => {
                logic.retrieveBooks('')
            }).toThrow(Error)
        })
        it('should fail on non-string title', async () => {
            expect(() => {
                logic.retrieveBooks(undefined)
            }).toThrow(Error)
        })

        it('should fail on non-existing user', async () => {
            try {
                logic.retrieveBooks('-invented-string-')
            } catch (error) {
                expect(error).toBeDefined()
            }
        })

        it('should retreive null as there are no books', async () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = `manuelbarzi-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirm = password
            const userId  = await User.create({ name, surname, email, password })
            const bookcursor = await logic.retrieveBooks(userId._id.toString())
            expect(bookcursor.length).toBe(0)
        })

        it('should retreive a list of books', async () => {
            const user  = await User.create({ name, surname, email, password })
            const book1  = await Book.create({title: 'titulo1', content:'content', coverphoto: 'co','userId' : ObjectID(user._id.toString()), images: [], parameters: {} })
            const book2  = await Book.create({title: 'titulo2', content:'content', coverphoto: 'co','userId' : ObjectID(user._id.toString()), images: [], parameters: {} })
            const book3  = await Book.create({title: 'titulo3', content:'content', coverphoto: 'co','userId' : ObjectID(user._id.toString()), images: [], parameters: {} })
            const bookcursor = await logic.retrieveBooks(user._id.toString())
            const bookretrieved1 = bookcursor[0]
            const bookretrieved2 = bookcursor[1]
            const bookretrieved3 = bookcursor[2]
            expect(bookretrieved1.title).toBe('titulo1')
            expect(bookretrieved2.title).toBe('titulo2')
            expect(bookretrieved3.title).toBe('titulo3')
        })
    })

    describe('Retrieve Book', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on retrieving a book', async () => {
            const user  = await User.create({ name, surname, email, password })
            const book1  = await Book.create({title: 'titulo1', content:'content', coverphoto: 'co','userId' : ObjectID(user._id.toString()), images: [], parameters: {} })
            const book2 = await logic.retrieveBook(book1._id.toString())
            expect(book2.title).toBe('titulo1')
            expect(book2.content).toBe('content')
            expect(book2.coverphoto).toBe('co')
        })

        it('should fail on non-string id', async () => {
            expect(() => {
                logic.retrieveBook(true)
            }).toThrow(Error)
        })

        it('should fail on empty id', async () => {
            expect(() => {
                logic.retrieveBook('')
            }).toThrow(Error)
        })
    })

    describe('Update Book', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should fail on empty title', async () => {
            expect(() => {
                title=''
                parameters = {}
                id = '1234'
                userId = '12356'
                logic.updateBook(title, parameters, id, userId)
            }).toThrow(Error)
        })
        it('should fail on non-string title', async () => {
            expect(() => {
                title=true
                parameters = {}
                id = '1234'
                userId = '12356'
                logic.updateBook(title, parameters, id, userId)
            }).toThrow(Error)
        })

        it('should fail on non-Object parameters', async () => {
            expect(() => {
                title='asfdgdfd'
                parameters = '{}'
                id = '1234'
                userId = '12356'
                logic.updateBook(title, parameters, id, userId)
            }).toThrow(Error)
        })

        it('should fail on empty id', async () => {
            expect(() => {
                title='abcdefg'
                parameters = {}
                id = ''
                userId = '12356'
                logic.updateBook(title, parameters, id, userId)
            }).toThrow(Error)
        })
        it('should fail on non-string id', async () => {
            expect(() => {
                title='1234567'
                parameters = {}
                id = true
                userId = '12356'
                logic.updateBook(title, parameters, id, userId)
            }).toThrow(Error)
        })

        it('should fail on empty userId', async () => {
            expect(() => {
                title='abcdefg'
                parameters = {}
                id = 'asdfghj'
                userId = ''
                logic.updateBook(title, parameters, id, userId)
            }).toThrow(Error)
        })
        it('should fail on non-string userId', async () => {
            expect(() => {
                title='1234567'
                parameters = {}
                id = 'asgysjf'
                userId = {}
                logic.updateBook(title, parameters, id, userId)
            }).toThrow(Error)
        })
        it('should succesfully update a book', async () => {
            const user  = await User.create({ name, surname, email, password })
            const book1  = await Book.create({title: 'tituloupdate1', content:'content', coverphoto: 'co','userId' : ObjectID(user._id.toString()), images: [], parameters: {} })
            const book2 = await logic.updateBook('newTitle', {name: '12345'}, book1._id.toString() ,user._id.toString())
            const newBook = await Book.findOne({'_id': ObjectID(book2._id.toString())})
            expect(newBook.title).toBeDefined()
            expect(newBook.title).toBe('newTitle')
            expect(newBook.parameters.name).toBe('12345')
        })
    })

    describe('RetrieveTemplate', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on retrieving a template', async () => {
            const user  = await User.create({ name, surname, email, password })
            const book1  = await Book.create({title: 'titulo1', content:'content', coverphoto: 'co','userId' : ObjectID(user._id.toString()), images: [], parameters: {} })
            const book2 = await logic.addBookToTemplates(book1._id.toString())
            const book3 = await logic.retrieveTemplate(book2._id.toString())
            expect(book3.title).toBe('titulo1')
            expect(book3.content).toBe('content')
            expect(book3.coverphoto).toBe('co')
        })

        it('should fail on non-string id', async () => {
            expect(() => {
                logic.retrieveTemplate({})
            }).toThrow(Error)
        })

        it('should fail on empty id', async () => {
            expect(() => {
                logic.retrieveTemplate('')
            }).toThrow(Error)
        })
    })

    describe('AddBookToTemplates', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on adding a book', async () => {
            const user  = await User.create({ name, surname, email, password })
            const book1  = await Book.create({title: 'titulo1', content:'content', coverphoto: 'co','userId' : ObjectID(user._id.toString()), images: [], parameters: {} })
            const book2 = await logic.addBookToTemplates(book1._id.toString())
            const book3 = await BookTemplate.findOne({title: 'titulo1'})
            expect(book3.title).toBe('titulo1')
            expect(book3.content).toBe('content')
            expect(book3.coverphoto).toBe('co')
        })

        it('should fail on adding a book to template when repeated', async () => {
            const user  = await User.create({ name, surname, email, password })
            const book1  = await Book.create({title: 'titulo1', content:'content', coverphoto: 'co','userId' : ObjectID(user._id.toString()), images: [], parameters: {} })
            const book2 = await logic.addBookToTemplates(book1._id.toString())
            const book3 = await BookTemplate.findOne({title: 'titulo1'})
            expect(book3.title).toBe('titulo1')
            expect(book3.content).toBe('content')
            expect(book3.coverphoto).toBe('co')
            try { 
                const book4 = await logic.addBookToTemplates(book1._id.toString())
            } catch (error) {
                expect(error).toBeDefined()  
            }
        })

        it('should fail on adding a book', async () => {
            const user  = await User.create({ name, surname, email, password })
            const book1  = await Book.create({title: 'titulo1', content:'content', coverphoto: 'co','userId' : ObjectID(user._id.toString()), images: [], parameters: {} })
            try {
                const book2 = await logic.addBookToTemplates('123456abcdef')
            } catch (error) {
                expect(error).toBeDefined()
            }
            
        })

        it('should fail on non-string id', async () => {
            expect(() => {
                logic.addBookToTemplates({})
            }).toThrow(Error)
        })

        it('should fail on empty id', async () => {
            expect(() => {
                logic.addBookToTemplates('')
            }).toThrow(Error)
        })
    })


    describe('Retrieve Templates', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on retrieving a book', async () => {
            const user  = await User.create({ name, surname, email, password })
            const result  = await Book.create({title: 'titulo1', content:'content', coverphoto: 'co','userId' : ObjectID(user._id.toString()), images: [], parameters: {} })
            const book = await BookTemplate.create({title: result.title, content: result.content, 
                coverphoto: result.coverphoto, parameters: result.parameters, images: result.images })
            const result1  = await Book.create({title: 'titulo2', content:'content2', coverphoto: 'co2','userId' : ObjectID(user._id.toString()), images: [], parameters: {} })
            const book2 = await BookTemplate.create({title: result1.title, content: result1.content, 
                coverphoto: result1.coverphoto, parameters: result1.parameters, images: result1.images })
            const retrievedTemplates = await logic.retrieveTemplates()
            expect(retrievedTemplates).toBeDefined()
            expect(retrievedTemplates.length).toBe(2)
            expect(retrievedTemplates[0].title).toBe('titulo1')
            expect(retrievedTemplates[1].title).toBe('titulo2')
        })

        it('should fail on toomany args', async () => {
            expect(() => {
                logic.retrieveTemplates([])
            }).toThrow(Error)
        })
    })

    describe('addTemplateToUserBooks', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const name2 = 'Manuel2'
        const surname2 = 'Barzi2'
        const email2 = `manuelbarzi-${Math.random()}@mail.com`
        const password2 = `123-${Math.random()}`


        it('should succeed on adding a book from templates', async () => {
            const user  = await User.create({ name, surname, email, password })
            const btemplate = await BookTemplate.create({title: 'title', content: 'content', 
                coverphoto: 'coverphoto', parameters: {}, images: [] })
            const book = await logic.addTemplateToUserBooks(btemplate._id.toString(), user._id.toString())
            const result2 = await Book.findOne({userId: user._id.toString()})
            expect(result2).toBeDefined()
            expect(result2.title).toBe('title')
            expect(result2.content).toBe('content')
            expect(result2.coverphoto).toBe('coverphoto')
            expect(result2.isTemplate).toBe(true)
        })

        it('should succeed on non - adding a book from templates when repeated', async () => {
            const user  = await User.create({ name, surname, email, password })
            const btemplate = await BookTemplate.create({title: 'title', content: 'content', 
                coverphoto: 'coverphoto', parameters: {}, images: [] })
            const book = await logic.addTemplateToUserBooks(btemplate._id.toString(), user._id.toString())
            const result2 = await Book.findOne({userId: user._id.toString()})
            expect(result2).toBeDefined()
            expect(result2.title).toBe('title')
            expect(result2.content).toBe('content')
            expect(result2.coverphoto).toBe('coverphoto')
            expect(result2.isTemplate).toBe(true)

            try{
                const book2 = await logic.addTemplateToUserBooks(btemplate._id.toString(), user._id.toString())
            } catch(error){
                expect(error).toBeDefined()
            }
        })

        it('should fail on non-existing id', async () => {
            let id = '--invented--id--12345'
            let userId = '--invented--userid--1234567890'
            try {
                logic.addTemplateToUserBooks(id, userId)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`UserId ${userId} was not found`)
            }
        })

        it('should fail on empty id', async () => {
            let id = ''
            let userId = '-invented-123456789' 
            expect(() => {
                logic.addTemplateToUserBooks(id, userId)
            }).toThrow(Error)
        })
        it('should fail on non-string id', async () => {
            let id = true
            let userId = '-invented-123456789' 
            expect(() => {
                logic.addTemplateToUserBooks(id, userId)
            }).toThrow(Error)
        })

        it('should fail on userId', async () => {
            let id = '-invented-string'
            let userId = '' 
            expect(() => {
                logic.addTemplateToUserBooks(id, userId)
            }).toThrow(Error)
        })
        it('should fail on non-string id', async () => {
            let id = '-invented-string'
            let userId = {} 
            expect(() => {
                logic.addTemplateToUserBooks(id, userId)
            }).toThrow(Error)
        })
    })

    describe('Generate Epub', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on correct two params', async () => {
            const user  = await User.create({ name, surname, email, password })
            const result  = await Book.create({title: 'titulo1', content:'content', coverphoto: 'co','userId' : ObjectID(user._id.toString()), images: [], parameters: {name:'Carlos', place:'Bcn'} })
            const route = logic.generateEpub(result._id.toString())
            expect(route).toBeDefined()
        })
        it('should succeed on correct 0 params', async () => {
            const user  = await User.create({ name, surname, email, password })
            const result  = await Book.create({title: 'titulo1', content:'content', coverphoto: 'co','userId' : ObjectID(user._id.toString()), images: [], parameters: {} })
            const route = logic.generateEpub(result._id.toString())
            expect(route).toBeDefined()
        })

        it('should succeed on correct 1 params', async () => {
            const user  = await User.create({ name, surname, email, password })
            const result  = await Book.create({title: 'titulo1', content:'content', coverphoto: 'co','userId' : ObjectID(user._id.toString()), images: [], parameters: {name: 'Carlos'} })
            const route = logic.generateEpub(result._id.toString())
            expect(route).toBeDefined()
        })

        it('should succeed on correct various chapters', async () => {
            const user  = await User.create({ name, surname, email, password })
            const result  = await Book.create({title: 'titulo1', content:'content <chapter> content <chapter> content <chapter>', coverphoto: 'co','userId' : ObjectID(user._id.toString()), images: [], parameters: {} })
            const route = logic.generateEpub(result._id.toString())
            expect(route).toBeDefined()
        })

        it('should fail on non-string id', async () => {
            expect(() => {
                logic.generateEpub(true)
            }).toThrow(Error)
        })

        it('should fail on empty id', async () => {
            expect(() => {
                logic.generateEpub('')
            }).toThrow(Error)
        })
    })


    after(() =>
        Promise.all([
            User.deleteMany(),
            Book.deleteMany(),
            BookTemplate.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})