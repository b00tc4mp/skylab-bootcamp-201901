import flymeApi from '../flyme-api'

const logic = {
    __userApiToken__: null,

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
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

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
        // if (image.constructor !== Object) throw TypeError(`${image} is not an object`)

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
    startDrone() {
        return flymeApi.startDrone(this.__userApiToken__)
            .then(res => res)
    },

    stopDrone() {
        return flymeApi.stopDrone(this.__userApiToken__)
            .then(res => res)
    },

    historyDrone() {
        return flymeApi.getHistory(this.__userApiToken__)
            .then(res => res)
    },

    sendDroneCommand(command) {
        if (typeof command !== 'string') throw TypeError(command + ' is not a string')

        if (!command.trim().length) throw Error('command cannot be empty')

        return flymeApi.sendCommand(this.__userApiToken__, command)
            .then(res => res)
    },

    sendReport(data) {
        //check data

        data.type = 'report'
        return flymeApi.sendEmail(this.__userApiToken__, data)
            .then(res => res)
    }
}

export default logic