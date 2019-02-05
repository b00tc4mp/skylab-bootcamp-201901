'use strict'

import pokemonApi from '../apipokemon'
import userApi from '../user-api'
/**
 * Abstraction of business logic.
 */
const logic = {
    //Pokemon Side
    retrievePokemon(query){

        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error('query is empty')

        return pokemonApi.searchPokemonByName(query)
    },

    retrieveAllPokemons(){

        if(arguments.length !== 0) throw Error('Too many args')

        return pokemonApi.searchAllPokemons()
    },


    // __userId__: null,
    // __userApiToken__: null,

    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser( email, username, password, passwordConfirmation) {
        if (typeof username !== 'string') throw TypeError(username + ' is not a string')

        if (!username.trim().length) throw Error('username cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return userApi.register(email, username, password, passwordConfirmation)
            .then(() => { })
    },

    /**
     * Logins a user by its credentials.
     * 
     * @param {string} username 
     * @param {string} password 
     */
    loginUser(user, password) {
        if (typeof user !== 'string') throw TypeError(user + ' is not a string')

        if (!user.trim().length) throw Error('user cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.authenticate(user, password)
            .then(({ id, token }) => {
                this.__userId__ = id
                this.__userApiToken__ = token
                return ({id, token, user})
            })
    },
}

export default logic