'use strict'
import homeSwappApi from '../api'

/**
 * Abstraction of business logic.
 */
const logic = {

    __userId__: null,
    __userApiToken__: null,

    setUserId(id) {
        this.__userId__ = id
    },

    getUserId() {
        return this.__userId__
    },

    setUserApiToken(token) {
        this.__userApiToken__ = token
    },

    getUserApiToken() {
        return this.__userApiToken__
    },

    get userLoggedIn() {
        return !!this.getUserId()
    },

    /**
    * Registers a user.
    * 
    * Register a user in the application
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    * 
    * @returns {promise} - returns a empty promise
    */
    registerUser(username, email, password, passwordConfirmation) {
        if (typeof username !== 'string') throw TypeError(username + ' is not a string')

        if (!username.trim().length) throw Error('username cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return homeSwappApi.register(username, email, password,passwordConfirmation)
            .then(() => { })
    },

    /**
     * 
     * Login User
     * 
     * Logins a user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {promise} - sets in sessioin storage the token and the id of the user
     */
    loginUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return homeSwappApi.authenticate(email, password)
            .then((data) => {
                // this.setUserId(data.id)
                this.setUserApiToken(data)
                console.log('succeed')
                return data
            })
    },

    /**
     * Retrieve user
     * 
     * retrieve the information of the logged user
     * 
     * 
     * @returns {promise} - returns the infromation of a user in object format
     * 
     */

    retrieveUser() {
        return homeSwappApi.retrieve(this.getUserApiToken())
            .then(({ id, myHouses, username, email }) => ({
                id,
                username,
                email,
                myHouses,
                
                
            }))
    },

    /**
     * 
     * update user
     * 
     * updates an user with new information
     * 
     * @param {Object} data 
     * 
     * @returns {promise}
     */

    updateUser(data) {
        if (data.constructor !== Object) throw TypeError(data + 'is not an Object')

        return homeSwappApi.update(this.getUserId(), this.getUserApiToken(), data)
    },


    /**
     * 
     * Toggle Favourite
     * 
     * Insert or delete an id of the favourites array
     * 
     * @param {string} favouriteId 
     * 
     * @returns {promise} - returns a promise with a boolean that indicates if the favourite id is favourite or none
     */

    toggleFavourite(favouriteId) {
        let isFav = false

        return homeSwappApi.retrieve(this.getUserId(), this.getUserApiToken())
            .then(({ favourites }) => {

                const hasFav = favourites.some(function (fav) {
                    return fav === favouriteId;
                })

                if (hasFav) {
                    const index = favourites.indexOf(favouriteId);
                    if (index > -1) {
                        favourites.splice(index, 1);
                    }
                } else {
                    isFav = true
                    favourites.push(favouriteId)
                }

                return homeSwappApi.update(this.getUserId(), this.getUserApiToken(), { favourites: favourites })
                    .then(() => isFav)

            })
    },

    /**
     * 
     * check favoruite
     * 
     * checks if the id favourite given is inside of the favourites array of the logged in user
     * 
     * @param {string} favouriteId 
     * 
     * @returns {promise} - a promise with a boolean that indicates if the favourite id is favourite or none
     */

    checkFavourite(favouriteId) {
        return homeSwappApi.retrieve(this.getUserId(), this.getUserApiToken())
            .then(({ favourites }) => {
                return favourites.some(function (fav) {
                    return fav === favouriteId;
                })
            })
    },

    /**
     * 
     * Get favourites
     * 
     * Retrieve all the favoruites events of an user
     * 
     * @param {Array} favourites 
     * 
     * @returns {promise} - returns a promise with a result an array of event objects
     */

    getFavourites(favourites) {
        let chain = Promise.resolve()
        const favs = []

        favourites.forEach(favourite => {
            chain = chain
                .then(() =>
                    new Promise((resolve, reject) => {
                        setTimeout(() =>
                            this.retrieveEvent(favourite)
                                .then(resolve)
                                .catch(reject),
                            1000
                        )
                    })
                )
                .then(values => favs.push(values))
        })

        return chain.then(() => favs)
    },


}

export default logic