import auctionLiveApi from '../data/auctionlive-api'
import normalize from '../common/normalize'
import validate from 'auction-validate'
import { LogicError } from 'auction-errors'
import jwt from 'jsonwebtoken'
import moment from 'moment'

const logic = {
    /**
     * Save the user token into the session storage
     */
    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    /**
     * Get the user token from the session storage
     */
    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    /**
     * Check if the token is valid with the expiration date
     */
    get __isTokenValid__() {
        const {exp} = jwt.decode(this.__userToken__) 
        const expDate = new Date(exp * 1000)
        
        return moment().isBefore(expDate)
    },

    /**
     * Check if the user is logged ckecking if exists the user token and if is valid
     */
    get isUserLoggedIn() {
        return !!(this.__userToken__ && this.__isTokenValid__)
    },

    /**
     * Get the user id from the token
     */
    get userId() {
        const { sub } = jwt.decode(this.__userToken__)

        return sub
    },

    /**
     * Format a number to the default given currency
     * 
     * @param {Number} number The number to format
     */
    getFormat(number) {
        const formatter = new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0
        })

        return formatter.format(number)
    },

    /**
     * Register a user
     * 
     * @param {String} name The user name
     * @param {String} surname The user surname
     * @param {String} email The user email
     * @param {String} password The user password
     * @param {String} confirmPassword ther user confirm password
     */
    registerUser(name, surname, email, password, confirmPassword) {
        validate.arguments([
            { name: 'name', value: name, type: String, notEmpty: true },
            { name: 'surname', value: surname, type: String, notEmpty: true },
            { name: 'email', value: email, type: String, notEmpty: true },
            { name: 'password', value: password, type: String, notEmpty: true },
            { name: 'confirmPassword', value: confirmPassword, type: String, notEmpty: true }
        ])

        validate.email(email)
        validate.samePassword(password, confirmPassword)

        return (async () => {
            try {
                await auctionLiveApi.registerUser(name, surname, email, password)
            } catch ({ message }) {
                throw new LogicError(message)
            }
        })()
    },

    /**
     * Login the user and save the retrieved token from the api
     * 
     * @param {String} email The user email
     * @param {String} password Teh user password
     * 
     */
    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: String, notEmpty: true },
            { name: 'password', value: password, type: String, notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            try {
                const { token } = await auctionLiveApi.authenticateUser(email, password)
                this.__userToken__ = token
            } catch ({ message }) {
                throw new LogicError(message)
            }
        })()
    },

    /**
     * Retrieve the user data
     * 
     * @returns {Object} The user data
     */
    async retrieveUser() {
        try {
            const user = await auctionLiveApi.retrieveUser(this.__userToken__)

            return user
        } catch ({ message }) {
            throw new LogicError(message)
        }
    },

    /**
     * Close the user session deleting the token from the session storage
     */
    logoutUser() {
        sessionStorage.clear()
    },

    /**
     * Update the user data
     * 
     * @param {Object} data The data to update
     * 
     * @return {Object} The updated user data
     */
    updateUser(data) {
        validate.arguments([
            { name: 'data', value: data, type: Object, notEmpty: true }
        ])

        return (async () => {
            try {
                const user = await auctionLiveApi.updateUser(this.__userToken__, data)

                return user
            } catch ({ message }) {
                throw new LogicError(message)
            }
        })()
    },

    /**
     * Delete a user with the correct credentials
     * 
     * @param {String} email The user email
     * @param {String} password The user password
     * @param {String} confirmPassword The user confrim password
     */
    deleteUser(email, password, confirmPassword) {
        validate.arguments([
            { name: 'email', value: email, type: String, notEmpty: true },
            { name: 'password', value: password, type: String, notEmpty: true },
            { name: 'confirmPassword', value: confirmPassword, type: String, notEmpty: true }
        ])

        validate.email(email)
        validate.samePassword(password, confirmPassword)

        return (async () => {
            try {
                await auctionLiveApi.deleteUser(this.__userToken__, email, password)
            } catch ({ message }) {
                throw new LogicError(message)
            }
        })()
    },

    /**
     * Retrieve the user items bidded
     * 
     * @returns {Array} The user items
     */
    async retrieveUserItemsBids() {
        try {
            const itemsBids = await auctionLiveApi.retrieveUserItemsBids(this.__userToken__)

            return itemsBids
        } catch ({ message }) {
            throw new LogicError(message)
        }
    },

    /**
     * Retrieve all the items from the query data to search
     * 
     * @param {Object} query The query data
     * 
     * @returns {Array} The finded items
     */
    searchItems(query) {
        validate.arguments([
            { name: 'query', value: query, type: Object, optional: true }
        ])

        return (async () => {
            try {
                return await auctionLiveApi.searchItems(query)
            } catch ({ message }) {
                throw new LogicError(message)
            }
        })()
    },

    /**
     * Retrieve the item from the given id item
     * 
     * @param {String} itemId The item id
     * 
     * @returns {Object} The item data
     */
    retrieveItem(itemId) {
        validate.arguments([
            { name: 'itemId', value: itemId, type: String, notEmpty: true }
        ])

        return (async () => {
            try {
                return await auctionLiveApi.retrieveItem(itemId, this.__userToken__)
            } catch ({ message }) {
                throw new LogicError(message)
            }
        })()
    },

    /**
     * Retrieve all the cities from the cities
     * 
     * @returns {Array} The cities
     */
    async retrieveCities() {
        try {
            return await auctionLiveApi.retrieveCities()
        } catch ({ message }) {
            throw new LogicError(message)
        }
    },

    /**
     * Retrieve all the categories from the categaries
     * 
     * @returns {Array} The categories
     */
    async retrieveCategories() {
        try {
            return await auctionLiveApi.retrieveCategories()
        } catch ({ message }) {
            throw new LogicError(message)
        }
    },

    /**
     * Place a bid into an item wit the given amount
     * 
     * @param {String} itemId The item id
     * @param {Number} amount The bid amount
     */
    placeBid(itemId, amount) {
        validate.arguments([
            { name: 'itemId', value: itemId, type: String, notEmpty: true },
            { name: 'amount', value: amount, type: Number, notEmpty: true }
        ])

        return (async () => {
            try {
                await auctionLiveApi.placeBid(itemId, this.__userToken__, amount)
            } catch ({ message }) {
                throw new LogicError(message)
            }
        })()
    },

    /**
     * Retrieve item bids data from the given id item
     * 
     * @param {String} itemId The item id
     * 
     * @returns {Object} The item data
     */
    retrieveItemBids(itemId) {
        validate.arguments([
            { name: 'itemId', value: itemId, type: String, notEmpty: true }
        ])

        return (async () => {
            try {
                return await auctionLiveApi.retrieveItemBids(itemId, this.__userToken__)
            } catch ({ message }) {
                throw new LogicError(message)
            }
        })()
    }
}

export default logic