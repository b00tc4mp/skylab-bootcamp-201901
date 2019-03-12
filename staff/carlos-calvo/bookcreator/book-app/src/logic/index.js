/**
 * Abstraction of business logic.
 */

import userApi from '../userApi'
import bookApi from '../bookApi';


const logic = {

    __userApiToken__: null,

    get isUserLoggedIn() {
        return !!this.__userApiToken__
    },

    get getToken() {
        return this.__userApiToken__
    },

    logOutUser() {
        this.__userApiToken__ = null
        sessionStorage.clear()
    },


    /**
     * Logs in the user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.authenticateUser(email, password)
            .then(( token ) => {
                this.__userApiToken__ = token
                return ({ token })
            })
    },

    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
   registerUser(name, surname, email, password, passwordConfirmation) {
    if (typeof name !== 'string') throw TypeError(name + ' is not a string')

    if (!name.trim().length) throw Error('name cannot be empty')

    if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

    if (!surname.trim().length) throw Error('surname cannot be empty')

    if (typeof email !== 'string') throw TypeError(email + ' is not a string')

    if (!email.trim().length) throw Error('email cannot be empty')

    if (typeof password !== 'string') throw TypeError(password + ' is not a string')

    if (!password.trim().length) throw Error('password cannot be empty')

    if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

    if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

    if (password !== passwordConfirmation) throw Error('passwords do not match')

    return userApi.registerUser(name, surname, email, password, passwordConfirmation)
        .then(() => { })
    },

    retrieveUser () {
        return userApi.retrieveUser( this.__userApiToken__)
            .then(user => user)
    },


    /**
     * Updates user-registration fields
     * @param {String} name 
     * @param {String} surname 
     * @param {String} email 
     * @param {String} password 
     * @param {String} passwordConfirmation 
     */
    updateUser(name, surname, email, password, passwordConfirmation){
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        if (!name.trim().length) throw Error('name cannot be empty')
        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')
        if (!surname.trim().length) throw Error('surname cannot be empty')
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')
        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')
        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')
        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')
        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return userApi.updateUser(name, surname, email, password, passwordConfirmation)
            .then(user => user)
    },














    /// BOOK LOGIC

    /**
     * 
     * Add a book to the current user
     * 
     * @param {String} title 
     * @param {String} content 
     * @param {File} coverphoto 
     * @param {Array} images 
     * @param {Object} parameters 
     * 
     */
    addBook(title, content, coverphoto, parameters = {}, images = []){
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw new Error('title  is empty')
        if (typeof content !== 'string') throw TypeError(`${content} is not a string`)
        if (!content.trim().length) throw new Error('content  is empty')
        if (!(images instanceof Array)) throw TypeError(`${images} is not a array`)
        if (!(parameters instanceof Object)) throw TypeError(`${parameters} is not a Object`)

        return (async () => {


            const book = await bookApi.addBook(title, content, coverphoto, parameters, images, this.getToken)

            return book
        })()
    },


    /**
     * retrieve all books from current user
     */
    retrieveBooks(){
        if(arguments.length != 0) throw new Error('Too Many args')

        return ( async () => {

            const books = await bookApi.retrieveBooks(this.getToken)

            return books

        })()
    },

    /**
     * 
     * Retrieve book by bookid, validating by token
     * @param {String} bookid
     * 
     */
    retrieveBook(bookid){
        if (typeof bookid !== 'string') throw TypeError(`${bookid} is not a string`)
        if (!bookid.trim().length) throw new Error('bookid  is empty')

        return ( async () => {
            const book = await bookApi.retrieveBook(this.getToken, bookid)
            return book
        })()
    },


    /**
     * 
     * Updates book title and parameters (v1 only name and place) by bookId
     * 
     * @param {String} bookid 
     * @param {String} title 
     * @param {Object} parameters 
     */
    updateBook(bookid, title, parameters){
        if (typeof bookid !== 'string') throw TypeError(`${bookid} is not a string`)
        if (!bookid.trim().length) throw new Error('bookid  is empty')
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw new Error('title  is empty')
        if (!(parameters instanceof Object)) throw TypeError(`${parameters} is not a array`)

        bookApi.updateBook(bookid, title, parameters, this.getToken)
    },



    /**
     * 
     * Deletes a book by id
     * @param {String} id 
     */
    deleteBook(id){
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new Error('id  is empty')

        return (async () => {
            const book = await bookApi.deleteBook(this.getToken, id)
            return book
        })()

    },

    /**
     * Retrieves template boos
     */
    retrieveTemplateBooks(){

        if(arguments.length !== 0) throw new Error ('Too many args')

        return (async () => {
            const books = await bookApi.retrieveTemplateBooks()
            return books
        })()
    },
    
    /**
     * Adds a book to template books by id
     * @param {String} id 
     */
    addBookToTemplates(id, isTemplate){
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new Error('id  is empty')
        if(isTemplate) throw new Error('Can not add a template to templates!!')
        return (async () => {
            const book = await bookApi.addBookToTemplates(id)
            return book
        })()
        
    },

    addTemplateToUserBooks(id){
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new Error('id  is empty')
        return (async () => {
            const book = await bookApi.addTemplateToUserBooks(id, this.getToken)
            return book
        })()
        
    },


    /**
     * Calls API by Id to download Book
     * @param {String} id 
     */
    downloadEpub(id){
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new Error('id  is empty')

        return (async () => {
            const book = await bookApi.downloadEpub(id, this.getToken)
            return book
        })()
    }




}


export default logic