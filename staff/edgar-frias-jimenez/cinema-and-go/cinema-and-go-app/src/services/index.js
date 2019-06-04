const validate = require('../components/Validate')
const call = require('../components/Call')

const port = process.env.REACT_APP_PORT

const cinemaApi = {

    __url__: `http://localhost:${port}/api`,
    __timeout__: 0,

    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { name, surname, email, password }
        })
    },

    authenticateUser(email, password) {

        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { email, password }
        })
    },

    retrieveUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    updateUser(token, data) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return call(`${this.__url__}/user`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data
        })
    },

    removeUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    },

    // //--------------------------------------------------------------

    // retrieveUserMaps(token) {
    //     validate.arguments([
    //         { name: 'token', value: token, type: 'string', notEmpty: true }
    //     ])

    //     return call(`${this.__url__}/user/maps`, {
    //         headers: { Authorization: `Bearer ${token}` }
    //     })
    // },

    // retrieveUserMap(token, mapId) {
    //     validate.arguments([
    //         { name: 'token', value: token, type: 'string', notEmpty: true },
    //         { name: 'mapId', value: mapId, type: 'string', notEmpty: true }
    //     ])

    //     return call(`${this.__url__}/map/${mapId}`, {
    //         headers: { Authorization: `Bearer ${token}` }
    //     })
    // },

    // updateMap(token, mapId, data) {
    //     validate.arguments([
    //         { name: 'token', value: token, type: 'string', notEmpty: true },
    //         { name: 'mapId', value: mapId, type: 'string', notEmpty: true },
    //         { name: 'data', value: data, type: 'object', notEmpty: true }
    //     ])

    //     return call(`${this.__url__}/map/${mapId}`, {
    //         method: 'PUT',
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             'Content-Type': 'application/json'
    //         },
    //         data
    //     })
    // }
}

module.exports = cinemaApi
