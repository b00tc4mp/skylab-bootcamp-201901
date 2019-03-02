'use strict';

/**
 * Abstraction of business logic.
 */

import userApi from '../userApi'

var logic = {

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


    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.authenticateUser(email, password)
            .then(( token ) => {
                console.log('logic',token)
                this.__userApiToken__ = token
                return ({ token })
            })
    },

}


export default logic;