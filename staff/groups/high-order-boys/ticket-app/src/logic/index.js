'use strict'
import userApi from '../user-api'
import ticketmasterApi from '../ticketmaster-api';

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

        return userApi.authenticate(email, password)
            .then((data) => {
                this.setUserId(data.id)
                this.setUserApiToken(data.token)
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
        return userApi.retrieve(this.getUserId(), this.getUserApiToken())
            .then(({ id, name, surname, username, favourites, bDate }) => ({
                id,
                name,
                surname,
                email: username,
                favourites,
                bDate: bDate
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

        return userApi.update(this.getUserId(), this.getUserApiToken(), data)
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

        return userApi.retrieve(this.getUserId(), this.getUserApiToken())
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

                return userApi.update(this.getUserId(), this.getUserApiToken(), { favourites: favourites })
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
        return userApi.retrieve(this.getUserId(), this.getUserApiToken())
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
        // ALT in parallel (cannot be applied because of API multiple requests limitation, but it works!)
        //    let array_promises =  favourites.map(favourite => {
        //         return this.retrieveEvent(favourite)
        //     }); 

        //     return Promise.all(array_promises).then(function(values) {
        //         return values
        //     });

        // ALT in series with delay on each call (to avoid API multiple calls limitation)
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

    /**
     * 
     * Retrieve Events
     * 
     * Search events passing a city name and a optional dates from start and end params
     * 
     * @param {string} query 
     * @param {string} startDate 
     * @param {string} endDate 
     * 
     * @returns {Promise} - with all events that satisfies the params 
     */

    retrieveEvents(query, startDate, endDate) {
        if (typeof query !== 'string') throw TypeError(`-->${query}<-- query introduced is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)


        if (startDate != null && typeof startDate !== 'string') throw TypeError(`-->${startDate}<-- startDate introduced is not a string`)
        if (endDate != null && typeof endDate !== 'string') throw TypeError(`-->${endDate}<-- endDate introduced is not a string`)

        return ticketmasterApi.searchEvents(query, startDate, endDate)
            .then(events => events)
    },

     /**
     * SearchEvent
     * 
     * Search for especific event using an Id and return it 
     * 
     * @param {string} id 
     * 
     * @returns {Promise} - returns a promise that conteins an event
     */

    retrieveEvent(id) {
        if (typeof id !== 'string') throw TypeError(`-->${id} <-- id introduced is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        return ticketmasterApi.searchEvent(id)
    }
}

export default logic