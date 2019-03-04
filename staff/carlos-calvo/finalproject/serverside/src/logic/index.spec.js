'use strict'

require('dotenv').config()

require('isomorphic-fetch')

const mongoose = require('mongoose')
const { User, Book } = require('../models')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')
const TEST_DB_URL = 'mongodb://localhost/skylab-test'



describe('logic', () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Book.deleteMany()
        ])
    )

    false && describe('register user', () => {
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
    })

    false && describe('authenticate user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
        )

        it('should succeed on correct credentials', () =>
            logic.authenticateUser(email, password)
                .then(id => expect(id).toBeDefined())
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

    false && describe('retrieve user', () => {
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

                    expect(user.save).toBeUndefined()
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
    }) 

    // TODO updateUser and removeUser








    //TESTING FROM BOOKS











    //

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

        //Pending to test optional parameters.

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
            const book = await logic.addBook('titulo1','contenido1', 'cover1', id, ['1', '2', '3'], ['url1', 'url2'] )
            expect(book).toBeDefined()
            expect(book.title).toBe('titulo1')
            expect(book.content).toBe('contenido1')
            expect(book.coverphoto).toBe('cover1')
            expect(book.images.length).toBe(3)
            expect(book.parameters.length).toBe(2)
        })

        it('should fail on title with same name to user', async () => {
            expect(async () => {
                const title1 = 'title1'
                const id = await logic.registerUser(name2, surname2, email2, password2, passwordConfirm2)
                const id1 = await logic.addBook(title1,'tit2', 'tit2', id, [], [] )
                try{
                    const id2 = await logic.addBook(title1,'tit2', 'tit2', id, [], [] )
                } catch(err) {
                    expect(err).toBeDefined()
                }
            })
        })
    })





    describe('Delete Book', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password


        it('should fail on empty title', async () => {
            expect(() => {
                logic.deleteBook('', 'userId')
            }).toThrow(Error)
        })

        it('should fail on non-string title', async () => {
            expect(() => {
                logic.deleteBook(true, 'userId')
            }).toThrow(Error)
        })

        it('should fail on empty userId', async () => {
            expect(() => {
                logic.deleteBook('title1', '')
            }).toThrow(Error)
        })

        it('should fail on non-string title', async () => {
            expect(() => {
                logic.deleteBook('title1', undefined)
            }).toThrow(Error)
        })

        it('should succeed on deleting a book', async () => {
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
            const id1 = await logic.addBook('titulodelete','titulo1', 'titulo1', [], [], id )
            const id3 = await logic.deleteBook('titulodelete', id)
            expect(id3.title).toBeDefined()
            expect(id3.title).toBe('titulodelete')
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
                logic.RetrieveBooks('')
            }).toThrow(Error)
        })
        it('should fail on non-string title', async () => {
            expect(() => {
                logic.RetrieveBooks(undefined)
            }).toThrow(Error)
        })

        it('should retreive null as there are no books', async () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = `manuelbarzi-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirm = password
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
            const bookcursor = await logic.RetrieveBooks(id)
            let next = bookcursor[0]
            expect(next).toBe(undefined)
        })

        it('should retreive a list of books', async () => {
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
            const id2 = await logic.addBook('titulo1--','titulo1', 'titulo1', [], [], id )
            const id3 = await logic.addBook('titulo2--','titulo1', 'titulo1', [], [], id )
            const id4 = await logic.addBook('titulo3--','titulo1', 'titulo1', [], [], id )
            const bookcursor = await logic.RetrieveBooks(id)
            const title1 = bookcursor[0]
            const title2 = bookcursor[1]
            const title3 = bookcursor[2]
            expect(title1.title).toBe('titulo1--')
            expect(title2.title).toBe('titulo2--')
            expect(title3.title).toBe('titulo3--')
        })
    })

    after(() =>
        Promise.all([
            User.deleteMany(),
            Book.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})