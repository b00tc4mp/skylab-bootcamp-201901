/**
 * Abstraction of business logic.
 */

import userApi from '../userApi'

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


    
}


export default logic