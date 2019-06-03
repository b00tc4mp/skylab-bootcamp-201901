const validate = require('wotcontrol-validate')
const call = require('wotcontrol-call')
require('dotenv').config()

const { env: { URL_SERVER: url}} = process


const restApi = {

    __url__ : url,
    __timeout__ : 0,

    registerUser(name, surname, email, password, isAdmin) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'isAdmin', value: isAdmin, type: 'boolean', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {

            const response = await call(`${this.__url__}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { name, surname, email, password }
            })

            return response
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const response = await call(`${this.__url__}/users/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { email, password }
            })
            return response
        })()
    },

    retrieveUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const response = await call(`${this.__url__}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response
        })()
    },

    updateUser(token, data) { // TODO refactor
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return (async () => {
            const response = await call(`${this.__url__}/user/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                timeout: this.__timeout__
            })
            response.json()
        })()
    },

    deleteUser(token){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true}
        ])

        return (async () => {
            await call(`${this.__url__}/users`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            })
        })()
    },

}

module.exports = restApi