'use strict'
import userApi from '../user-api'
import userStorage from '../localstorage'
import ticketmasterApi from '../ticketmaster-api';

/**
 * Abstraction of business logic.
 */
const logic = {
    __userId__: null,
    __userApiToken__: null,

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

        return userApi.register(name, surname, email, password)
            .then(() => { })
    },

    /**
     * Logins a user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    loginUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.authenticate(email, password)
            .then((data) => {
                this.__userId__ = data.id
                this.__userApiToken__ = data.token

                
                return data
            })
    },

    retrieveUser() {
        return userApi.retrieve(this.__userId__, this.__userApiToken__)
        .then(({ id, name, surname, username }) => ({
            id,
            name,
            surname,
            email: username
        }))
        .then(user => userStorage.saveUserToken(user))
    },

    retrieveEvents(query, startDate, endDate) {
        if (typeof query !== 'string') throw TypeError(`${query} instroduced is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)


        if (startDate != null && typeof startDate !== 'string') throw TypeError(`${startDate} instroduced is not a string`)
        if (endDate != null && typeof endDate !== 'string') throw TypeError(`${endDate} instroduced is not a string`)

        return ticketmasterApi.searchEvents(query, startDate, endDate)
            .then(events => console.log(events))
    }
}

export default logic