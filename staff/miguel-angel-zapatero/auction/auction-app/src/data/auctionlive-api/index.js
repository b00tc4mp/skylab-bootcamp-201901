import validate from 'auction-validate'
import call from 'auction-call'

const { REACT_APP_PORT } = process.env

const auctionLiveApi = {
    __url__: `http://localhost:${REACT_APP_PORT}/api`,
    __timeout__: 0,

    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
        ])

        validate.email(email)

        return call(`${this.__url__}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { name, surname, email, password },
            timeout: this.__timeout__
        })
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return call(`${this.__url__}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { email, password },
            timeout: this.__timeout__
        })
    },

    retrieveUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/users`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    },

    updateUser(token, data) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
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

    deleteUser(token, email, password) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
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

    createItem() {
        //TODO
    },

    placeBid(itemId, token, amount) {
        validate.arguments([
            { name: 'itemId', value: itemId, type: 'string', notEmpty: true },
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'amount', value: amount, type: 'number', notEmpty: true }
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

    retrieveItemBids(itemId, token){
        validate.arguments([
            { name: 'itemId', value: itemId, type: 'string', notEmpty: true },
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/items/${itemId}/bids`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            timeout: this.__timeout__
        })
    },

    searchItems(query) {
        validate.arguments([
            { name: 'query', value: query, type: 'object', notEmpty: true, optional: true}
        ])

        // const { query, category, city, price, startdate, endDate, startPrice, endPrice} = query

        let queryString = ''
        for(let key in query) {
            queryString += `${key}=${query[key]}` 
        }

        return call(`${this.__url__}/items?${queryString}`, {
            method: 'GET',
            header: {
                'Content-Type': 'appication/json'
            },
            timeout: this.__timeout__
        })
    },
    
    retrieveItem(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true, optional: true}
        ])

        return call(`${this.__url__}/items/${id}`, {
            method: 'GET',
            header: {
                'Content-Type': 'appication/json'
            },
            timeout: this.__timeout__
        })
    }
}

export default auctionLiveApi