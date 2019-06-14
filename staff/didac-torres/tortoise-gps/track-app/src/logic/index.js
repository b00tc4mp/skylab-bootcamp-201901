const { errors: { LogicError } } = require('track-utils')
const { validate, normalize } = require('track-utils')
const restApi = require('../rest-api')


const logic = {
    set __userToken__(token) {

        sessionStorage.userToken = token.token
    },

    get __userToken__() {

        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {

        return !!this.__userToken__
    },

    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: String, notEmpty: true },
            { name: 'surname', value: surname, type: String, notEmpty: true },
            { name: 'email', value: email, type: String, notEmpty: true },
            { name: 'password', value: password, type: String, notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            try {

                await restApi.registerUser(name, surname, email, password)
            }
            catch (error) {
                throw new LogicError(error.message)
            }

        })()
    },

    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: String, notEmpty: true },
            { name: 'password', value: password, type: String, notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            try {
                const token = await restApi.authenticateUser(email, password)
                this.__userToken__ = token
            }
            catch (error) {
                throw new LogicError(error.message)
            }

        })()
    },

    retrieveUser() {
        return (async () => {
            try {
                const user = await restApi.retrieveUser(this.__userToken__)
                return user
            }
            catch (error) {
                throw new LogicError(error.message)
            }

        })()
    },

    logoutUser() {
        sessionStorage.clear()
    },

    updateUser(name, surname, email) {
        return (async () => {
            try {
                const resp = await restApi.updateUser(this.__userToken__, { name, surname, email })
                return resp
            }
            catch (error) {
                throw new LogicError(error.message)
            }

        })()

    },

    deleteUser() {
        return (async () => {
            try {
                const resp = await restApi.deleteUser(this.__userToken__)
                return resp
            }
            catch (error) {
                throw new LogicError(error.message)
            }

        })()

    },

    addPOI(title, latitude, longitude, color) {
        return (async () => {
            try {
                const pois = await restApi.addPOI(this.__userToken__, title, latitude, longitude, color)
                return pois
            }
            catch (error) {
                throw new LogicError(error.message)
            }

        })()

    },

    addTracker(serialNumber, licensePlate) {
        return (async () => {
            try {
                const trackers = await restApi.addTracker(this.__userToken__, serialNumber, licensePlate)
                return trackers
            }
            catch (error) {
                throw new LogicError(error.message)
            }

        })()

    },

    deletePOI(idPOI) {
        return (async () => {
            try {
                const resp = await restApi.deletePOI(idPOI, this.__userToken__)
                return resp
            }
            catch (error) {
                throw new LogicError(error.message)
            }

        })()

    },

    deleteTracker(idTracker) {
        return (async () => {
            try {
                const resp = await restApi.deleteTracker(idTracker, this.__userToken__)
                return resp
            }
            catch (error) {
                throw new LogicError(error.message)
            }

        })()

    },

    retrieveAllPOI() {
        return (async () => {
            try {
                const pois = await restApi.retrieveAllPOI(this.__userToken__)
                return pois
            }
            catch (error) {
                throw new LogicError(error.message)
            }

        })()

    },

    retrieveTrackerBySN(trackerSN) {
        return (async () => {
            try {
                const tracker = await restApi.retrieveTrackerBySN(this.__userToken__, trackerSN)
                return tracker
            }
            catch (error) {
                throw new LogicError(error.message)
            }

        })()

    },

    retrieveTrackerByID(trackerID) {
        return (async () => {
            try {
                const tracker = await restApi.retrieveTrackerByID(this.__userToken__, trackerID)
                return tracker
            }
            catch (error) {
                throw new LogicError(error.message)
            }

        })()

    },

    retrieveAllLastTracks() {
        return (async () => {
            try {
                const tracks = await restApi.retrieveAllLastTracks(this.__userToken__)
                return await Promise.all(tracks.map(async (item) => {
                    const resp = await restApi.retrieveTrackerBySN(this.__userToken__, item.serialNumber)
                    item.licensePlate = resp.licensePlate
                    return item
                }))
            }
            catch (error) {
                throw new LogicError(error.message)
            }

        })()

    },

    retrieveRangeOfTracks(trackerID, startTime, endTime) {
        return (async () => {
            try {
                const tracksRange = await restApi.retrieveRangeOfTracks(this.__userToken__, trackerID, startTime, endTime)
                return tracksRange
            }
            catch (error) {
                throw new LogicError(error.message)
            }

        })()

    }
}

export default logic