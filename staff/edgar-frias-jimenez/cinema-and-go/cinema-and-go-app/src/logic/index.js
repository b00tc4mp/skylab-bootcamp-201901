import normalize from '../components/Normalize'
const validate = require('../components/Validate')
const { LogicError } = require('../components/Errors')
const cinemaApi = require('../services')

const appLogic = {
    __userToken__ : null,

    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {
        return !!this.__userToken__
    },

    registerUser(name, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            try {
                await cinemaApi.registerUser(name, email, password)
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            try {
                const res = await cinemaApi.authenticateUser(email, password)
                this.__userToken__ = res.token
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    logoutUser() {
        sessionStorage.clear()
    },

    retrieveUser() {
        return (async () => {
            try {
                return await cinemaApi.retrieveUser(this.__userToken__)
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    updateUser(data) {
        validate.arguments([
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return (async () => {
            try {
                await cinemaApi.updateUser(this.__userToken__, data)
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    removeUser() {
        return (async () => {
            try {
                await cinemaApi.removeUser(this.__userToken__)
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    },

    handleInitialLocation() {
        if (navigator.geolocation) {
            try {
                const geoLocation = new Promise((resolve, reject) => {
                    var options = {
                        timeout: 10000,
                        enableHighAccuracy: true,
                        maximumAge: Infinity
                    }

                    const success = pos => {
                      const crd = pos.coords
                      const locationCoords = [crd.longitude, crd.latitude]
                      resolve(locationCoords)
                    }

                    const error = err => {
                      reject(`ERROR(${err.code}): ${err.message}`)
                    }

                    setInterval (
                        navigator.geolocation.watchPosition(success, error, options)
                    , 3000)
                })

                return geoLocation.then(locationCoords => locationCoords)
            } catch (error) {
                console.error(`Error: The Geolocation service failed. ${error}`)
            }
        } else {
            console.error('Error: Your browser doesn\'t support geolocation.')
        }
    },

    retrieveNearestCinemas(userPosition, dist) {
        return (async () => {
            try {
                return await cinemaApi.retrieveNearestCinemas(this.__userToken__, userPosition, dist)
            } catch (error) {
                throw new LogicError(error)
            }
        })()
    }
}

export default appLogic
