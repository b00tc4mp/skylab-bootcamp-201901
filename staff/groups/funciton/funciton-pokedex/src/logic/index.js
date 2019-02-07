

import pokemonApi from '../apipokemon'
import userApi from '../user-api'
/**
 * Abstraction of business logic.
 */
const logic = {
    //Pokemon Side

    __userId__: null,
    __userApiToken__: null,

    setUserId(id) {
        debugger
        this.___userId___ = id
    },

    getUserId() {
        return this.___userId___
    },

    setUserApiToken(token) {
        this.___userApiToken___ = token
    },

    getUserApiToken() {
        return this.___userApiToken___
    },

    set __userId__(id) {
        this.setUserId(id)
    },

    get __userId__() {
        return this.getUserId()
    },

    set __userApiToken__(token) {
        this.setUserApiToken(token)
    },

    get __userApiToken__() {
        return this.getUserApiToken()
    },

    get userLoggedIn() {
        return !!this.__userId__
    },

    logout() {
        this.__userId__ = null
        this.__userApiToken__ = null
    },

    /**
    * Retrieve data
    * 
    * @param {string} query 
    * 
    * 
    * Returns raw data from a unique pokemon from the API
    */

    retrievePokemon(query) {

        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error('query is empty')

        return pokemonApi.searchPokemonByName(query)
    },


    /**
    * Retrieve data
    * 
    * 
    * Returns basic data from all pokemons available in API.
    */
    retrieveAllPokemons() {

        if (arguments.length !== 0) throw Error('Too many args')
        return pokemonApi.searchAllPokemons()
    },




    /**
    * Registers a user.
    * 
    * @param {string} email 
    * @param {string} username 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    * 
    * Registers a user.
    */
    registerUser(email, username, password, passwordConfirmation) {
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
                return ({ id, token, user })
            })
    },

    /**
     * ToggleFavorite
     * 
     * @param {string} id 
     * @param {string} token 
     * @param {string} pokemonName 
     * 
     * Modifies the list of favorites. If the pokemonName exists previously in the array of favorites retrieved from the API,
     * this pokemonName is removed. In case it does not exist, it is added to the array in the API.
     */

    toggleFavorite(id, token, pokemonName) {

        if (typeof id !== 'string') throw TypeError(id + ' is not a string');

        if (!id.trim().length) throw Error('id cannot be empty');

        if (typeof token !== 'string') throw TypeError(token + ' is not a string');

        if (!token.trim().length) throw Error('token cannot be empty');

        if (typeof pokemonName !== 'string') throw TypeError(pokemonName + ' is not a string');

        if (!pokemonName.trim().length) throw Error('pokemonName cannot be empty');


        return userApi.retrieve(id, token)
            .then((data) => {

                let favorites = data.favorites

                if (!favorites || !favorites.length) { //Caso sin favoritos o que el usuario los haya borrado todos
                    //En este caso creamos el array de favoritos, con el primer elemento el favorito clickado
                    // favorites = JSON.parse(JSON.stringify(([pokemonName])))

                    favorites = [pokemonName]
                } else {
                    //Si favoritos existe, hay dos opciones, que exista o no
                    if (favorites.includes(pokemonName)) {
                        //Quitarlo de favoritos
                        const index = favorites.indexOf(pokemonName)
                        favorites.splice(index, 1)
                    } else {
                        favorites.push(pokemonName)
                    }
                }

                return userApi.update(id, token, { favorites })
            })
            .then(() => true)
    },
    
    /**
     * getFavorites
     * 
     * 
     * Retrieves the array of favorites from the pokemon API
     * In case there are no favorites, it returns null.
     */

    getFavorites(id, token) {

        if (typeof id !== 'string') throw TypeError(id + ' is not a string');

        if (!id.trim().length) throw Error('id cannot be empty');

        if (typeof token !== 'string') throw TypeError(token + ' is not a string');

        if (!token.trim().length) throw Error('token cannot be empty');

        return userApi.retrieve(id, token)
            .then(({ favorites }) => {
                if (!favorites || favorites.length == 0) {
                    return null
                } else {
                    return favorites //Devuelve un array de pokemons({name})
                }
            })
    },
}

export default logic