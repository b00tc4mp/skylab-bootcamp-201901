import flymeApi from '../flyme-api'
const validate = require('flyme-validation')

const logic = {
    __userApiToken__: null,

    registerUser(name, surname, email, password, passwordConfirmation) {
        validate([{ key: 'name', value: name, type: String }, { key: 'surname', value: surname, type: String }, { key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }, { key: 'passwordConfirmation', value: passwordConfirmation, type: String }])
        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return flymeApi.registerUser(name, surname, email, password, passwordConfirmation)
            .then(({ id, error }) => {
                if (error) throw Error(error)

                if (id) return { status: 'OK' }
            })
    },

    /**
     * logs user to the App
     */
    logInUser(email, password) {
        validate([{ key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }])

        return flymeApi.authenticateUser(email, password)
            .then(({ token, error }) => {
                if (error) throw Error(error)

                this.__userApiToken__ = token
            })
    },

    /**
     * retrieve user
     */
    retrieveUser() {
        return flymeApi.retrieveUser(this.__userApiToken__)
            .then(res => {
                if (res.error) throw Error(res.error)

                return res
            })
    },


    /**
     * Update user
     * 
     * @param {Object} data 
     */
    updateUser(data) {
        validate([{ key: 'data', value: data, type: Object }])

        return flymeApi.updateUser(this.__userApiToken__, data)
            .then(res => {
                if (res.error) throw Error(res.error)

                return res
            })
    },

    /**
     * upload user Image
     * 
     * @param {Object} image 
     */
    uploadUserImage(image) {
        if (!image) throw Error('image is empty')

        return flymeApi.updateUserImage(this.__userApiToken__, image)
            .then(res => {
                if (res.error) throw Error(res.error)

                return res
            })
    },

    /**
     * Checks user is logged in.
     */
    get isUserLoggedIn() {
        return !!this.__userApiToken__
    },

    /**
     * Logs out the user.
     */
    logOutUser() {
        this.__userApiToken__ = null
    },

    //TODO DRONE ID
    startDrone(droneId) {
        validate([{ key: 'droneId', value: droneId, type: String }])

        return flymeApi.startDrone(this.__userApiToken__, droneId)
            .then(res => res)
    },

    stopDrone(droneId) {
        validate([{ key: 'droneId', value: droneId, type: String }])

        return flymeApi.stopDrone(this.__userApiToken__, droneId)
            .then(res => res)
    },

    // historyDrone() {
    //     return flymeApi.getHistory(this.__userApiToken__)
    //         .then(res => res)
    // },

    sendDroneCommand(command, droneId) {
        validate([{ key: 'command', value: command, type: String }, { key: 'droneId', value: droneId, type: String }])

        return flymeApi.sendCommand(this.__userApiToken__, command, droneId)
            .then(res => res)
    },

    addDrone(brand, model, host, port) {
        validate([{ key: 'brand', value: brand, type: String }, { key: 'model', value: model, type: String }, { key: 'host', value: host, type: String }, { key: 'port', value: port, type: Number }])

        return flymeApi.addDrone(this.__userApiToken__, { brand, model, host, port })
            .then(res => res)
    },

    updateDrone(droneId, brand, model, host, port) {
        validate([{ key: 'droneId', value: droneId, type: String }, { key: 'brand', value: brand, type: String }, { key: 'model', value: model, type: String }, { key: 'host', value: host, type: String }, { key: 'port', value: port, type: Number }])

        return flymeApi.updateDrone(this.__userApiToken__, { id: droneId, brand, model, host, port })
            .then(res => res)
    },

    deleteDrone(droneId) {
        validate([{ key: 'droneId', value: droneId, type: String }])

        return flymeApi.deleteDrone(this.__userApiToken__, droneId)
            .then(res => res)
    },

    retrieveDrone(droneId) {
        validate([{ key: 'droneId', value: droneId, type: String }])

        return flymeApi.retrieveDrone(this.__userApiToken__, droneId)
            .then(res => res)
    },

    retrieveDrones(userId) {
        validate([{ key: 'userId', value: userId, type: String }])

        return flymeApi.retrieveDronesFromUser(this.__userApiToken__, userId)
            .then(res => res)
    },

    createProgram(name, orders) {
        validate([{ key: 'name', value: name, type: String }])

        if (orders.length === 0) throw Error('orders are emtpy')

        return flymeApi.createProgram(this.__userApiToken__, name, orders)
            .then(res => res)
    },

    retrieveFlights(userId = null) {
        if (userId) {
            return flymeApi.retrieveFlightsFromUser(this.__userApiToken__, userId)
        } else {
            return flymeApi.retrieveAllFlights(this.__userApiToken__, null)
                .then(res => res)
        }

    },

    retrieveFlight(flightId) {
        validate([{ key: 'flightId', value: flightId, type: String }])

        return flymeApi.retrieveFlight(this.__userApiToken__, flightId)
            .then(res => res)
    },

    deleteFlight(flightId) {
        validate([{ key: 'flightId', value: flightId, type: String }])


        return flymeApi.deleteFlight(this.__userApiToken__, flightId)
            .then(res => res)
    },

    retrievePrograms(userId = null) {
        if (userId) {
            return flymeApi.retrieveUserPrograms(this.__userApiToken__, userId)
        } else {
            return flymeApi.retrieveAllPrograms(this.__userApiToken__, null)
                .then(res => res)
        }
    },

    retrieveProgram(programId) {
        validate([{ key: 'programId', value: programId, type: String }])

        return flymeApi.retrieveProgram(this.__userApiToken__, programId)
            .then(res => res)
    },

    playProgram(droneId, orders) {
        validate([{ key: 'droneId', value: droneId, type: String }])

        return flymeApi.playProgram(this.__userApiToken__, droneId, orders)
            .then(res => res)
    },

    deleteProgram(programId) {
        validate([{ key: 'programId', value: programId, type: String }])

        return flymeApi.deleteProgram(this.__userApiToken__, programId)
            .then(res => res)
    },

    sendReport(data) {
        validate([{ key: 'data', value: data, type: Object }])

        data.type = 'report'
        return flymeApi.sendEmail(this.__userApiToken__, data)
            .then(res => res)
    }
}

export default logic