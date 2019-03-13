'use strict'

const { User, Book, BookTemplate} = require('../models')
const bcrypt = require('bcrypt')
const Epub = require("epub-gen");
const ObjectID = require('mongodb').ObjectID
const { AuthError, EmptyError, DuplicateError, MatchingError, NotFoundError } = require('../errors')

/**
 * Abstraction of business logic.
 */
const logic = {
    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */

    //Tested 28-02 with Postman
    registerUser(name, surname, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw new EmptyError('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw new EmptyError('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw new EmptyError('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw new EmptyError('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw new EmptyError('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw new MatchingError('passwords do not match')

        return (async () => {
            const user = await User.findOne({ email })

            if (user) throw new DuplicateError(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 10)

            const { id } = await User.create({ name, surname, email, password: hash })

            return id
        })()
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */

    //TESTED MANUALLY 28-02 POSTMAN
    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw new EmptyError('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw new EmptyError('password cannot be empty')

        return (async () => {
                const user = await User.findOne({ email })          
                const match = await bcrypt.compare(password, user.password)
                if (!match) throw new AuthError('wrong credentials')
                
                return user.id
        })()
    },

    /**
     * Retrieves a user by userId
     * 
     * @param {String} userId 
     */
    retrieveUser(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)

        if (!userId.trim().length) throw new EmptyError('user id is empty')

        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)

                user.id = user._id.toString()
                delete user._id

                return user
            })
    },

    /**
     * Updates user-related fields in DB.
     * 
     * @param {String} name 
     * @param {String} surname 
     * @param {String} email 
     * @param {String} password 
     * @param {String} passwordConfirmation 
     */

    updateUser(name, surname, email, password, passwordConfirmation){
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        if (!name.trim().length) throw new EmptyError('name cannot be empty')
        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')
        if (!surname.trim().length) throw new EmptyError('surname cannot be empty')
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw new EmptyError('email cannot be empty')
        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw new EmptyError('password cannot be empty')
        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')
        if (!passwordConfirmation.trim().length) throw new EmptyError('password confirmation cannot be empty')
        if (password !== passwordConfirmation) throw new MatchingError('passwords do not match')

        return (async () => {
            const hash = await bcrypt.hash(password, 10)
            const user = await User.findOneAndUpdate({email}, {$set:{name, surname, 'password': hash}}, {new : true})
            return user
        })()
    },
    // TODO removeUser



















    /**
     * 
     * Abstraction of business logic for books
     * 
     * 
     */

     /**
      * Adds a book referred to a user.
      * 
      * 
      * @param {String} title 
      * @param {String} content 
      * @param {String} coverphoto 
      * @param {Array} images 
      * @param {Object} parameters 
      * @param {String} userId 
      */

    addBook (title, content, coverphoto, userId, images, parameters ){
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw new EmptyError('title  is empty')
        if (typeof content !== 'string') throw TypeError(`${content} is not a string`)
        if (!content.trim().length) throw new EmptyError('content  is empty')
        if (typeof coverphoto !== 'string') throw TypeError(`${coverphoto} is not a string`)
        if (!coverphoto.trim().length) throw new EmptyError('coverphoto  is empty')
        if (!(images instanceof Array)) throw TypeError(`${images} is not a array`)
        if (!(parameters instanceof Object)) throw TypeError(`${parameters} is not a Object`)
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new EmptyError('userId  is empty')
        
        

        return (async () => {
            //Check that book title does not exist for this user.
            // const book = await Book.find({ 'userId' : ObjectID(userId), 'title': title })
            // console.log('*******************************************')
            // console.log('book found', book)
            // console.log('lenght', book.length)
            // if (book.length) throw new DuplicateError(`title already existing`)
            
            //Check that user exists.
            const user = await User.findById(userId)
            if(!user) throw new Error('UserId does not exist')

            const id  = await Book.create({title, content, coverphoto, images, parameters, 'userId' : ObjectID(userId)})

            return id
        })()
    },

    /**
     * Deletes a book by title from a book id
     * @param {String} id
     * 
     */
    deleteBook (id){
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new EmptyError('id  is empty')
   
        return (async () => {

            //Check that book title does exist.
            const book = await Book.find({ '_id' : ObjectID(id)})
            if (!book) throw new NotFoundError(`Book  was not found`)

            const res = await Book.findOneAndDelete({ '_id' : ObjectID(id) })

            return res
        })()
    },

    /**
     * Retrieves Books from a userId, Returns Array of books.
     * @param {*} userId 
     */

    retrieveBooks (userId){
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new EmptyError('userId  is empty')

        return (async () => {

            //Check that user exists.
            const user = await User.findOne({'_id': ObjectID(userId)})
            if(!user) throw new Error(`UserId ${userId} was not found`)

            const result = await Book.find({userId})

            return result
        })()
    },

    retrieveBook(bookid){
        if (typeof bookid !== 'string') throw TypeError(`${bookid} is not a string`)
        if (!bookid.trim().length) throw new EmptyError('bookid  is empty')

        return (async () => {

            const result = await Book.findOne({'_id': ObjectID(bookid)}).lean()

            return result
        })()
    },

    /**
     * Updates book title, parameters by userId and id(book)
     * @param {String} title 
     * @param {Object} parameters 
     * @param {String} id 
     * @param {String} userId 
     */
    updateBook(title, parameters, id, userId){

        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw new EmptyError('title  is empty')
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new EmptyError('id  is empty')
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new EmptyError('userId  is empty')
        if (!(parameters instanceof Object)) throw TypeError(`${parameters} is not a Object`)


        return (async () => {

            const book = await Book.findOneAndUpdate({'_id': ObjectID(id)}, {$set:{title, parameters}})

            return book
        })()

    },

    /**
     * 
     * Adds a book to templates from a book from a user by id of book
     * 
     * @param {String} id
     * 
     */

    addBookToTemplates(id){
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new EmptyError('id  is empty')
        
        return (async () => {

            const result = await Book.findOne({'_id': ObjectID(id)})
            if(!result) throw new Error('Book not existing')
            const book = await BookTemplate.create({title: result.title, content: result.content, 
                coverphoto: result.coverphoto, parameters: result.parameters, images: result.images })
            return book
        })()

    },

    /**
     * Retrieves all templates
     */
    retrieveTemplates(){
        if(arguments.length !== 0) throw new Error('Too many args')

        return (async () => {
            const templateBooks = await BookTemplate.find({})
            return templateBooks
        })()
    },

    /**
     * 
     * @param {String} id 
     */
    retrieveTemplate(id){
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new EmptyError('id  is empty')

        return (async () => {
            const result = await BookTemplate.findOne({'_id': ObjectID(id)})
            return result
        })()
    },

    /**
     * 
     * Retrieve a Book from templates and add it to user books
     * 
     * @param {String} id 
     * @param {String} userId
     */
    addTemplateToUserBooks(id, userId){
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new EmptyError('id  is empty')
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new EmptyError('userId  is empty')

        return (async () => {

            const result = await BookTemplate.findOne({'_id': ObjectID(id)})
            if(!result) throw new Error('Book not existing')
            const book = Book.create({'title': result.title, 'content': result.content, 
                'coverphoto': result.coverphoto, 'parameters': result.parameters, 'images': result.images,
                'userId': ObjectID(userId), isTemplate: true })

            return book
        })()
    },

    


    /**
     * Generates a epub file by reading content of book's id
     * @param {String} id 
     */
    generateEpub(id){
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new EmptyError('id  is empty')

        return (async () => {
            const book = await this.retrieveBook(id)
            let text = book[0].content

            if(book[0].hasOwnProperty('parameters') && book[0].parameters.hasOwnProperty('name')) text = text.replace(/<name>/g, book[0].parameters.name)
            if(book[0].hasOwnProperty('parameters') && book[0].parameters.hasOwnProperty('place')) text = text.replace(/<place>/g, book[0].parameters.place)
            let arraychapters = text.split('<Chapter>')
            let content = []

            if(arraychapters.length == 0){
                content = [{
                    title : "CHAPTER",
                    data : text
                }]
            } else {
                let i = 0
                content = arraychapters.map(chapter => {
                    let obj = {}
                    if(i==0) obj.title =" "
                    else obj.title = "CHAPTER " + i + "."
                    chapter = chapter.replace (/^/,'<p>');
                    chapter = chapter.concat('</p>')
                    obj.data = chapter
                    i++
                    return obj
                })
            }
            const options ={
                title: book[0].title,
                author: 'Your Book Creator',
                cover: "https://storage.googleapis.com/gd-wagtail-prod-assets/original_images/evolving_google_identity_share.jpg",
                content: content
            }
            debugger
            const a = await new Epub(options, __dirname + "/file.epub")
            return 'c:/Users/Usuario/Documents/collab/skylab-bootcamp-201901/staff/carlos-calvo/bookcreator/book-api/src/logic/file.epub'
        })()
    }
}

module.exports = logic

// const option = {
//     title: "Alice's Adventures in Wonderland", // *Required, title of the book.
//     author: "Lewis Carroll", // *Required, name of the author.
//     publisher: "Macmillan & Co.", // optional
//     cover: "https://images.pexels.com/photos/1934259/pexels-photo-1934259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", // Url or File path, both ok.
//     content: [
//         {
//             title: "About the author", // Optional
//             author: "John Doe", // Optional
//             data: "<h2>Charles Lutwidge Dodgson</h2>"
//             +"<div lang=\"en\">Better known by the pen name Lewis Carroll...</div>" // pass html string
//         },
//         {
//             title: "Down the Rabbit Hole",
//             data: "<p>Alice was beginning to get very tired.12345..</p>"
//         },
//     ]
// }
