'use strict'

const { User, Book} = require('../models')
const bcrypt = require('bcrypt')
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

        // return User.findOne({ email })
        //     .then(user => {
        //         if (user) throw Error(`user with email ${email} already exists`)

        //         return bcrypt.hash(password, 10)
        //     })
        //     .then(hash => User.create({ name, surname, email, password: hash }))
        //     .then(({ id }) => id)

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
                
                if (!user) throw new NotFoundError(`user with email ${email} not found`)
                
                const match = await bcrypt.compare(password, user.password)
                
                if (!match) throw new AuthError('wrong credentials')
                
                return user.id
        })()
    },

    // TODO doc
    retrieveUser(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)

        if (!userId.trim().length) throw new EmptyError('user id is empty')

        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)

                // delete user.password
                // delete user.__v

                user.id = user._id.toString()

                delete user._id

                return user
            })
    },
    // TODO updateUser and removeUser



















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
      * @param {Array} parameters 
      * @param {String} userId 
      */

    addBook (title, content, coverphoto, images =[], parameters =[], userId){
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw new EmptyError('title  is empty')

        if (typeof content !== 'string') throw TypeError(`${content} is not a string`)
        if (!content.trim().length) throw new EmptyError('content  is empty')

        if (typeof coverphoto !== 'string') throw TypeError(`${coverphoto} is not a string`)
        if (!coverphoto.trim().length) throw new EmptyError('coverphoto  is empty')

        if (!(images instanceof Array)) throw TypeError(`${images} is not a array`)

        if (!(parameters instanceof Array)) throw TypeError(`${parameters} is not a array`)

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new EmptyError('userId  is empty')

        return (async () => {

            //Check that book title does not exist for this user.
            const book = await Book.find({ 'userId' : ObjectID(userId), 'title': title })
            // console.log('*******************************************')
            // console.log('book found', book)
            // console.log('lenght', book.length)
            if (book.length) throw new DuplicateError(`title already existing`)
            
            //Check that user exists.
            const user = await User.findById(userId)
            if(!user) throw new Error('UserId does not exist')

            const { id } = await Book.create({title, content, coverphoto, images, parameters, userId})
            // console.log(id)
            return id
        })()
    },

    /**
     * Deletes a book by title from a userId 
     * @param {String} title 
     * @param {String} userId 
     */
    deleteBook (title, userId){
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw new EmptyError('title  is empty')

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new EmptyError('userId  is empty')

        return (async () => {

            //Check that book title does exist.
            const book = await Book.find({ 'userId' : ObjectID(userId), 'title': title })
            if (!book) throw new NotFoundError(`Book with ${title} was not found`)

            const id = await Book.findOneAndDelete({ 'userId' : ObjectID(userId), 'title': title })

            return id
        })()
    },

    /**
     * Retrieves Books from a userId, Returns cursor of books.
     * @param {*} userId 
     */

    RetrieveBooks (userId){
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new EmptyError('userId  is empty')

        return (async () => {

            //Check that user exists.
            const user = await User.findOne({'_id': ObjectID(userId)})
            if(!user) throw new Error(`UserId ${userId} was not found`)

            const cursor = await Book.find({userId}).cursor()
            // Be careful when treating cursor as it is async
            return cursor
        })()
    }
}

module.exports = logic