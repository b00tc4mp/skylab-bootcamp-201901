import validate from 'auction-validate'
import call from 'auction-call'

const { REACT_APP_HEROKU_URL, REACT_APP_PORT } = process.env

const auctionLiveApi = {
    __url__: `http://localhost:${REACT_APP_PORT}/api`,
    // __url__: REACT_APP_HEROKU_URL,
    __timeout__: 0,

    /**
     * Call the api to register a user
     * 
     * @param {String} name The user name
     * @param {String} surname The user surname
     * @param {String} email The user email
     * @param {String} password The user password
     * 
     * @returns {Object} the response from the api
     */
    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: String, notEmpty: true },
            { name: 'surname', value: surname, type: String, notEmpty: true },
            { name: 'email', value: email, type: String, notEmpty: true },
            { name: 'password', value: password, type: String, notEmpty: true },
        ])

        validate.email(email)

        return call(`${this.__url__}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { name, surname, email, password },
            timeout: this.__timeout__
        })
    },

    /**
     * Call the api to authenticate the user credentials and retrieve a token if the user exists.
     * 
     * @param {String} email The user email
     * @param {String} password The user password
     * 
     * @returns {Object} the user token
     */
    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: String, notEmpty: true },
            { name: 'password', value: password, type: String, notEmpty: true }
        ])

        validate.email(email)

        return call(`${this.__url__}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { email, password },
            timeout: this.__timeout__
        })
    },

    /**
     * Call the api to retrieve the user data with the correct user token 
     * 
     * @param {String} token The user token
     * 
     * @returns {Object} The user data
     */
    retrieveUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/users`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    },

    /**
     * Call the api to update the user data with the correct user token
     * 
     * @param {String} token The user token
     * @param {Object} data The user data to update
     * 
     * @returns {Object} The user updated data
     */
    updateUser(token, data) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true },
            { name: 'data', value: data, type: Object, notEmpty: true }
        ])

        return call(`${this.__url__}/users/update`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: data,
            timeout: this.__timeout__
        })
    },

    /**
     * Call the api to delete the user with the correct user token and user credentials 
     * 
     * @param {String} token The user token
     * @param {String} email The user email
     * @param {String} password The user password
     * 
     * @return {Object} The response from the api
     */
    deleteUser(token, email, password) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true },
            { name: 'email', value: email, type: String, notEmpty: true },
            { name: 'password', value: password, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/users/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: { email, password },
            timeout: this.__timeout__
        })
    },

    /**
     * Call the api to retrieve the user items that the user bidded
     * 
     * @param {String} token The user token
     * 
     * @returns {Array} The user bidded items
     */
    retrieveUserItemsBids(token) {
        validate.arguments([
            { name: 'token', value: token, type: String, notEmpty: true }
        ])
        debugger
        return call(`${this.__url__}/users/items/bids`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            timeout: this.__timeout__
        })
    },

    /**
     * Call the api to place an amount bid on the item id given with the correct user token
     * 
     * @param {String} itemId The item id
     * @param {String} token The user token
     * @param {Number} amount The amount
     * 
     * @returns {Object} The message response from the api 
     */
    placeBid(itemId, token, amount) {
        validate.arguments([
            { name: 'itemId', value: itemId, type: String, notEmpty: true },
            { name: 'token', value: token, type: String, notEmpty: true },
            { name: 'amount', value: amount, type: Number, notEmpty: true }
        ])

        return call(`${this.__url__}/items/${itemId}/bids`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: { amount },
            timeout: this.__timeout__
        })
    },

    /**
     * Call the api to retrieve the all the actual item bids from the given id on the correct user token
     * 
     * @param {String} itemId The item id
     * @param {String} token The user token
     * 
     * @returns {Object} The item data
     */
    retrieveItemBids(itemId, token){
        validate.arguments([
            { name: 'itemId', value: itemId, type: String, notEmpty: true },
            { name: 'token', value: token, type: String, notEmpty: true }
        ])

        return call(`${this.__url__}/items/${itemId}/bids`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            timeout: this.__timeout__
        })
    },

    /**
     * Call the api to retrieve all the items with the given query data
     * 
     * @param {Object} data The query to serach items
     * 
     * @return {Array} The items finded 
     */
    searchItems(data) {
        validate.arguments([
            { name: 'data', value: data, type: Object, optional: true}
        ])

        const {query, city, category, startDate, endDate, startPrice, endPrice} = data

        let queryString = ''
        if(query) queryString += `query=${query}`
        if(city) queryString += `&city=${city}`
        if(category) queryString += `&category=${category}`
        if(startDate && endDate) queryString += `&startDate=${startDate}&endDate=${endDate}`
        if(startPrice && endPrice) queryString += `&startPrice=${startPrice}&endPrice=${endPrice}`
        
        return call(`${this.__url__}/items?${queryString}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: this.__timeout__
        })
    },
    
    /**
     * Call the Api to retrieve an item with the given id item and correct user token
     * 
     * @param {String} itemId The item id
     * @param {String} token The user token
     * 
     * @returns {Object} The item data 
     */
    retrieveItem(itemId, token) {
        validate.arguments([
            { name: 'itemId', value: itemId, type: String, notEmpty: true},
            { name: 'token', value: token, type: String, notEmpty: true }
        ])
        
        return call(`${this.__url__}/items/${itemId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            timeout: this.__timeout__
        })
    },

    /**
     * Call the api to retrieve all the cities from the items
     */
    retrieveCities() {
        return call(`${this.__url__}/cities`, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: this.__timeout__
        })
    },

    /**
     * Call the api to retrieve all the categories from the items
     */
    retrieveCategories() {
        return call(`${this.__url__}/categories`, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: this.__timeout__
        })
    }
}

export default auctionLiveApi