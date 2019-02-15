
import ombdApi from '../ombd-api'
import userApi from '../user-api'

/**
 * Abstraction of business logic.
 */
const logic = {

    setUserId(id) {
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

    /**
    * Registers a user.
    * 
    * @param {string} name - name user
    * @param {string} surname - surname user
    * @param {string} email - email user
    * @param {string} password - password user
    * @param {string} passwordConfirmation - confirmation to password
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
     * @param {string} email - email user   
     * @param {string} password - password user
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */

    loginUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.authenticate(email, password)
            .then(({ id, token }) => {
                this.__userId__ = id
                this.__userApiToken__ = token
            })
    },

    /**
     * Store user 
     */
    
    get userLoggedIn() {
        return !!this.__userId__
        
    },
    
    /**
   * Logout user 
   */

    logout() {
        this.__userId__ = null
        this.__userApiToken__ = null
    },


       /**
     *@returns {Promise} - returns the user's parameters

     */

    retrieveUser() {
        return userApi.retrieve(this.__userId__, this.__userApiToken__)
            .then(({ id, name, surname, username, favorites }) => ({
                id,
                name,
                surname,
                email: username,
                favorites
            }))
    },

    /**
     * 
     * modify the user's parameters
     * 
     * @param {Array} email - email user 
     *   
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */


    updateUser(favorites){
        if (typeof favorites !== 'object') throw TypeError(favorites + ' is not an object')

        return userApi.update(this.__userId__, this.__userApiToken__, favorites)
    },

     /**
     * 
     * @param {string} -  id the user's name.

     * @retuns {Promise} - shows the user's parameters and then modifies them
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */

    toggleFavorties(id){
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')

        if (!id.trim().length) throw Error('id cannot be empty')

        return this.retrieveUser().then(user => {
            if (user.favorites.includes(id)) {
                user.favorites = user.favorites.filter(fav => fav !== id)
            } else {
                user.favorites.push(id)
            }
            return this.updateUser(user).then(() => this.retrieveUser().then(user => user))
        })

    },


    // TODO updateUser and removeUser

    /**
     * Retrieve detail from movie or serie.
     * 
     * @param {string} query - The movie query
     * @returns {Promise} - Resolves with movies & series, otherwise rejects with error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     * 
     * // http://www.omdbapi.com/?apikey=ef8a2f56&i=tt1632708
     * 
     **/


    searchVideos(query, count) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')

        return ombdApi.searchItems(query, count)
    },

    /**
     * Retrieve detail from movie or serie.
     * 
     * @param {string} videoId - The movie query
     * @returns {Promise} - Resolves with movies & series, otherwise rejects with error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     * 
     * // http://www.omdbapi.com/?apikey=ef8a2f56&i=tt1632708
     * 
     **/


    retrieveVideo(videoId) {
        if (typeof videoId !== 'string') throw TypeError(`${videoId} is not a string`)

        if (!videoId.trim().length) throw Error('videoId is empty')
        
        return ombdApi.retrieveItem(videoId) 
        
    }
    
}

export default logic