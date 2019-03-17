'use strict'

const bcrypt = require('bcrypt')
const { models: { User, Drone, Flight, Program } } = require('flyme-data')
const { AuthError, EmptyError, DuplicateError, MatchingError, NotFoundError } = require('flyme-errors')
const DroneApi = require('drone-api')
const validate = require('flyme-validation')
const mail_transporter = require('../mail')

/**
 * 
 * Abstraction of business logic
 * 
 */

const logic = {
    activeDrones: new Map,
    activeFLight: new Map,

    /**
     * 
     * User Register
     * 
     * Function that register a new user to the application.
     * 
     * @param {String} name 
     * @param {String} surname 
     * @param {String} email 
     * @param {String} password 
     * @param {String} passwordConfirm 
     * 
     * @return Object with the Id of the new User
     */
    registerUser(name, surname, email, password, passwordConfirm) {

        validate([{ key: 'name', value: name, type: String }, { key: 'surname', value: surname, type: String }, { key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }, { key: 'passwordConfirm', value: passwordConfirm, type: String }])

        if (password !== passwordConfirm) throw new MatchingError('passwords do not match')

        return User.findOne({ email })
            .then(user => {

                if (user) throw new DuplicateError(`This email: ${email} is already used it`)

                return bcrypt.hash(password, 10)
            })
            .then(hash => User.create({ name, surname, email, password: hash }))
            .then(user => user.id)
    },

    /**
     * Authenticat User
     * 
     * Function to authenticate an user with  credentials
     * 
     * @param {String} email 
     * @param {String} password
     * 
     * @return {Object} Object with the User Token 
     */
    authenticateUser(email, password) {
        validate([{ key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }])

        return User.findOne({ email })
            .then(user => {

                if (!user) throw new NotFoundError(`There is no User with this email: ${email}`)

                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) throw new AuthError('wrong credentials')

                        return { id: user.id }
                    })
            })
    },


    retrieveUser(userId) {
        validate([{ key: 'userId', value: userId, type: String }])

        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

                user.id = user._id.toString()

                delete user._id

                return user
            })
    },

    updateUser(userId, data) {
        validate([{ key: 'userId', value: userId, type: String }, { key: 'data', value: data, type: Object }])

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

                return User.findByIdAndUpdate(userId, data, { runValidators: true })
                    .then(user => {
                        return {
                            status: 'OK',
                            id: user._id.toString(),
                        }
                    })
            })
    },

    updateUserPhoto(userId, url) {
        validate([{ key: 'userId', value: userId, type: String }, { key: 'url', value: url, type: String }])

        return User.findByIdAndUpdate(userId, { image: url }, { new: true, runValidators: true }).select('-__v -password').lean()
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                user.id = user._id.toString()
                delete user._id

                return {
                    status: 'OK',
                    user: user,
                }
            })

    },

    deleteUser(userId) {
        validate([{ key: 'userId', value: userId, type: String }])

        return User.findByIdAndDelete(userId)
            .then(() => {
                return { status: 'OK' }
            })
    },

    //END USERS CRUD

    addDrone(userId, brand, model, host, port) {
        validate([{ key: 'userId', value: userId, type: String }, { key: 'brand', value: brand, type: String }, { key: 'model', value: model, type: String }, { key: 'host', value: host, type: String }, { key: 'port', value: port, type: Number }])

        return Drone.create({ owner: userId, brand, model, host, port })
            .then(drone => drone.id)
    },

    retrieveDroneFromId(userId, droneId) {
        validate([{ key: 'userId', value: userId, type: String }, { key: 'droneId', value: droneId, type: String }])

        return Drone.findById(droneId).select('-__v').lean()
            .then(drone => {
                drone.id = drone._id.toString()

                delete drone._id

                return drone
            })
    },

    retrieveDrones() {
        return Drone.find().select('-__v').lean()
            .then(drones => drones)
    },

    retrieveDronesFromUser(userId) {
        validate([{ key: 'userId', value: userId, type: String }])

        return Drone.find({ owner: userId }).select('-__v').lean()
            .then(drones => drones)
    },

    updateDrone(userId, droneId, data) {
        validate([{ key: 'userId', value: userId, type: String }, { key: 'droneId', value: droneId, type: String }, { key: 'data', value: data, type: Object }])

        return Drone.findOne({ _id: droneId, owner: userId })
            .then(drone => {
                if (!drone) throw new AuthError('You dont have permissions to update this drone')

                return Drone.findByIdAndUpdate(droneId, data, { runValidators: true })
            })
            .then(drone => {
                return { droneId: drone.id, status: 'OK' }
            })
    },

    deleteDrone(userId, droneId) {
        validate([{ key: 'userId', value: userId, type: String }, { key: 'droneId', value: droneId, type: String }])

        return Drone.findOne({ _id: droneId, owner: userId })
            .then(drone => {
                if (!drone) throw new AuthError('You dont have permissions to delete this drone')

                return Drone.findByIdAndDelete(droneId)
            })
            .then(() => {
                return { status: 'OK' }
            })

    },

    startDrone(userId, droneId) {

        let drone = this.activeDrones.get(droneId)

        if (drone) throw Error(`drone ${droneId} already started`)

        return Drone.findById(droneId)
            .then(({ host, port }) => {

                if (!host && !port) throw Error('drone not found it')

                return Flight.create({ userId, droneId })
                    .then(flight => {

                        if (this.activeFLight.get(flight.id)) throw Error(`Flight ${flightId} already exist`)

                        drone = new DroneApi(host, port)

                        drone.history = []

                        drone.start()

                        const onDroneMessage = new Promise(function (resolve, reject) {
                            drone.onMessage(message => resolve(message))
                        })

                        drone.sendCommand('command', function (err) {
                            if (err) throw Error(err)

                            drone.history.push({ command: 'command', date: new Date })
                        })

                        this.activeDrones.set(droneId, { machine: drone, history: drone.history, flightId: flight.id })

                        return onDroneMessage.then(message => {
                            if (drone.history.length > 0) drone.history[drone.history.length - 1].response = message.toString()

                            return { start: 'OK', history: drone.history }
                        })

                    })
            })
            .catch(({ message }) => {
                throw Error(message)
            })

    },


    getDroneHistory(userId, droneId) {
        return User.findById(userId)
            .then(user => {
                if (!user) throw Error('You don\'t have permissions')

                let drone = this.activeDrones.get(droneId)

                if (!drone) throw Error(`drone ${droneId} has been stopped`)

                return { status: 'OK', history: drone.history }
            })
    },

    stopDrone(userId, droneId) {
        const drone = this.activeDrones.get(droneId)

        if (!drone) throw Error(`drone ${droneId} already stopped`)

        this.activeDrones.delete(droneId)

        return Drone.findById(droneId)
            .then(droneRes => {

                if (!droneRes) throw Error('drone not found it')

                const onDroneMessage = new Promise(function (resolve, reject) {
                    drone.machine.onMessage(message => resolve(message))
                })

                drone.machine.sendCommand('land', function (err) {
                    if (err) throw new DroneError(err)

                    drone.history.push({ command: 'land', date: new Date })
                })

                return onDroneMessage.then(message => {
                    if (drone.history.length > 0) drone.history[drone.history.length - 1].response = message.toString()

                    drone.machine.stop()

                    const history = drone.history

                    drone.history = []

                    console.log('history')

                    return Flight.findByIdAndUpdate(drone.flightId, { end: new Date, history })
                        .then(res => {
                            console.log('hello world')

                            if (!res) throw Error('impossible to update the flight')

                            return { stop: 'OK', history }
                        })
                })
            })
    },

    sendDroneCommand(userId, droneId, command) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw new AuthError('No permissions')

                const drone = this.activeDrones.get(droneId)

                if (!drone) throw Error(`the drone with id ${droneId} is not active`)

                const onDroneMessage = new Promise(function (resolve, reject) {
                    drone.machine.onMessage(message => resolve(message))
                })

                drone.machine.sendCommand(command, function (err) {
                    if (err) throw new DroneError(err)

                    drone.history.push({ command, date: new Date })
                })

                return onDroneMessage.then(message => {
                    if (drone.history.length > 0) drone.history[drone.history.length - 1].response = message.toString()

                    return { command: 'OK', history: drone.history }
                })
            })
    },

    //END DRONE

    addFlight(userId, droneId) {
        validate([{ key: 'userId', value: userId, type: String }, { key: 'droneId', value: droneId, type: String }])

        return Drone.findById(droneId)
            .then(drone => {
                if (!drone) throw new EmptyError(`No drone with id ${droneId}`)

                return Flight.create({ userId, droneId })
            })
            .then(flight => flight.id)
    },

    retrieveFlights() {
        return Flight.find().populate('userId').populate('droneId').select('-__v').lean()
            .then(flights => flights)
    },

    retrieveFlight(userId, flightId) {
        validate([{ key: 'userId', value: userId, type: String }, { key: 'flightId', value: flightId, type: String }])

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error('no authentication user')

                return Flight.findById(flightId)
            })
            .then(flight => flight)
    },

    retrieveFlightsFromUser(userId) {
        validate([{ key: 'userId', value: userId, type: String }])

        return Flight.find({ userId }).select('-__v').lean()
            .then(flights => flights)
    },

    retrieveFlightsFromDrone(droneId) {
        validate([{ key: 'droneId', value: droneId, type: String }])

        return Flight.find({ droneId }).select('-__v').lean()
            .then(flights => flights)
    },

    retrieveFlightsFromUserDrone(userId, droneId) {
        validate([{ key: 'userId', value: userId, type: String }, { key: 'droneId', value: droneId, type: String }])

        return Flight.find({ userId, droneId }).select('-__v').lean()
            .then(flights => flights)
    },

    updateFlight(userId, flightId, data) {
        validate([{ key: 'userId', value: userId, type: String }, { key: 'flightId', value: flightId, type: String }, { key: 'data', value: data, type: Object }])

        return Flight.findOne({ _id: flightId, userId: userId })
            .then(flight => {
                if (!flight) throw new AuthError('You dont have permissions to update this flight')

                return Flight.findByIdAndUpdate(flightId, data, { runValidators: true })

            })
            .then(flight => {
                return { flightId: flight.id, status: 'OK' }
            })
    },

    deleteFlight(userId, flightId) {
        validate([{ key: 'userId', value: userId, type: String }, { key: 'flightId', value: flightId, type: String }])

        return Flight.findOne({ _id: flightId, userId: userId })
            .then(flight => {
                if (!flight) throw new AuthError('You dont have permissions to delete this flight')

                return Flight.findByIdAndDelete(flightId)
            })
            .then(() => {
                return { status: 'OK' }
            })

    },


    // END FLIGHT CRUD

    sendMail(userId, data) {
        validate([{ key: 'userId', value: userId, type: String }, { key: 'data', value: data, type: Object }])

        return User.findById(userId)
            .then(user => {
                if (!user) throw new AuthError('Bad user authentication')

                const mailOptions = {
                    from: user.email,
                    to: 'appflyme@gmail.com',
                    subject: `REPORT: ${data.subject}`,
                    html: `<h1>Report BUG</h1>
                    <p>User ${user.name}, id(${user.id}) with email ${user.email} reports:</p>
                    <p>${data.message}</p>
                    <p>Flyme app</p>
                `
                }


                mail_transporter.sendMail(mailOptions, function (err, res) {
                    if (err) throw Error('The email could not be sent')
                })

                return { status: 'OK' }
            })
    },

    //END  MAILING

    addProgram(userId, name, orders) {
        let seconds = 0
        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} is not defined`)


                if (orders.length !== 0) {
                    seconds = orders.reduce((a, b) => ({ timeOut: a.timeOut + b.timeOut }))
                    seconds = seconds.timeOut / 1000
                }

                return Program.create({ name, userId, orders, seconds })
                    .then(program => program.id)
            })
    },

    retrieveProgramsByUser(userId) {
        return Program.find({ userId }).select('-__v').lean()
            .then(programs => programs)
    },

    retrievePrograms() {
        return Program.find().select('-__v').lean()
            .then(programs => programs)
    },

    updateProgram(userId, programId, name, orders) {
        return User.findById(userId)
            .then(user => {
                if (!user) throw Error('auth permissions denied')

                return Program.findByIdAndUpdate(programId, { userId, name, orders }, { runValidators: true })
                    .then(program => {
                        if (!program) throw Error('update error')

                        return { status: 'OK', programId: program.id }
                    })
            })
    },

    deleteProgram(userId, programId) {
        return User.findById(userId)
            .then(user => {
                if (!user) throw Error('auth permissions denied')

                return Program.findByIdAndDelete(programId)
            })
            .then(() => {
                return { status: 'OK' }
            })
    }
}

module.exports = logic