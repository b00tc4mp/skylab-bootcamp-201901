const validate = require('../components/Validate')
const call = require('../components/Call')

const port = process.env.REACT_APP_PORT

const cinemaApi = {
    __url__: `http://localhost:${port}/api`,
    __timeout__: 0,

    registerUser(name, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { name, email, password }
        })
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { email, password }
        })
    },

    retrieveUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/users`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    updateUser(token, data) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return call(`${this.__url__}/users`, {
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

        return call(`${this.__url__}/users`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    },

    retrieveAllCinemas(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/cinemas`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    retrieveCinema(token, cinemaId) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'cinemaId', value: cinemaId, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/cinema/${cinemaId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    retrieveAllSessions(token, sessionId) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'sessionId', value: sessionId, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/cinema/sessions/${sessionId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    retrieveTimeToArrive(token, defaultPos, cinemaLocation, MAPS_KEY) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'defaultPos', value: defaultPos, type: 'string', notEmpty: true },
            { name: 'cinemaLocation', value: cinemaLocation, type: 'string', notEmpty: true },
            { name: 'MAPS_KEY', value: MAPS_KEY, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user/distance/cinema?origin=${defaultPos}&destination=${cinemaLocation}&key=${MAPS_KEY}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    retrieveNearestCinemas(token, userPosition, dist) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'userPosition', value: userPosition, type: 'object', notEmpty: true },
            { name: 'dist', value: dist, type: 'number', notEmpty: true }
        ])

        return call(`${this.__url__}/cinemas/near?lng=${userPosition.lng}&lat=${userPosition.lat}&dist=${dist}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    populateDb(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/cinemas/scrapper`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    }
}

module.exports = cinemaApi
