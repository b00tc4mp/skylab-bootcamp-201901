'use strict'

const bcrypt = require('bcrypt')
const { models: { User, Drone, Flight } } = require('flyme-data')
const { AuthError, EmptyError, DuplicateError, MatchingError, NotFoundError } = require('flyme-errors')
const { drone } = require('drone-api')

/**
 * 
 * Abstraction of business logic
 * 
 */

const logic = {

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

        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw new EmptyError('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw new EmptyError('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw new EmptyError('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw new EmptyError('password cannot be empty')

        if (typeof passwordConfirm !== 'string') throw TypeError(passwordConfirm + ' is not a string')

        if (!passwordConfirm.trim().length) throw new EmptyError('password confirmation cannot be empty')

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
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw new EmptyError('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw new EmptyError('password cannot be empty')

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
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')

        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

                user.id = user._id.toString()

                delete user._id

                return user
            })
    },

    updateUser(userId, data) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')

        if (!(data instanceof Object)) throw new TypeError(data + ' is not an Object')

        if (data instanceof Function) throw new TypeError(data + ' is a Function')

        if (data instanceof Array) throw new TypeError(data + ' is an array')

        if (Object.keys(data).length === 0) throw new EmptyError('Data cannot be empty')

        //todo validate data is an object

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

                return User.findByIdAndUpdate(userId, data, { runValidators: true })
                    .then(user => {
                        return {
                            status: 'OK',
                            id: user._id.toString(),
                        }
                    })
            })
    },


    deleteUser(userId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')

        return User.findByIdAndDelete(userId)
            .then(() => {
                return { status: 'OK' }
            })
    },

    //END USERS CRUD

    addDrone(userId, identifier, brand, model) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')

        if (typeof identifier !== 'string') throw TypeError(identifier + ' is not a string')

        if (!identifier.trim().length) throw new EmptyError('identifier cannot be empty')

        if (typeof brand !== 'string') throw TypeError(brand + ' is not a string')

        if (!brand.trim().length) throw new EmptyError('brand cannot be empty')

        if (typeof model !== 'string') throw TypeError(model + ' is not a string')

        if (!model.trim().length) throw new EmptyError('model cannot be empty')

        return Drone.create({ owner: userId, identifier, brand, model })
            .then(drone => drone.id)
    },

    retrieveDrones() {
        return Drone.find().select('-__v').lean()
            .then(drones => drones)
    },

    retrieveDronesFromUser(userId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')

        return Drone.find({ owner: userId }).select('-__v').lean()
            .then(drones => drones)
    },

    updateDrone(userId, droneId, data) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')

        if (typeof droneId !== 'string') throw TypeError(droneId + ' is not a string')

        if (!droneId.trim().length) throw new EmptyError('droneId cannot be empty')

        if (Object.keys(data).length === 0) throw new EmptyError('Data cannot be empty')

        return Drone.findOne({ _id: droneId, owner: userId })
            .then(drone => {
                if (!drone) throw new AuthError('You dont have permissions to delete this drone')

                return Drone.findByIdAndUpdate(droneId, data, { runValidators: true })

            })
            .then(drone => {
                return { droneId: drone.id, status: 'OK' }
            })
    },

    deleteDrone(userId, droneId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')

        if (typeof droneId !== 'string') throw TypeError(droneId + ' is not a string')

        if (!droneId.trim().length) throw new EmptyError('droneId cannot be empty')

        return Drone.findOne({ _id: droneId, owner: userId })
            .then(drone => {
                if (!drone) throw new AuthError('You dont have permissions to delete this drone')

                return Drone.findByIdAndDelete(droneId)
            })
            .then(() => {
                return { status: 'OK' }
            })

    },


    sendDroneCommand(userId, command) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw new AuthError('No permissions')

                drone.init()
                drone.sendCommand(command)
                drone.turnOff()

                return { command: 'OK' }
            })
    },

    //END DRONE

    addFlight(userId, droneId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')

        if (typeof droneId !== 'string') throw TypeError(droneId + ' is not a string')

        if (!droneId.trim().length) throw new EmptyError('droneId cannot be empty')

        return Drone.findById(droneId)
            .then(drone => {
                if (!drone) throw new EmptyError(`No drone with id ${drone.id}`)

                return Flight.create({ userId, droneId })
            })
            .then(drone => drone.id)
    },

    retrieveFlights() {
        return Flight.find().select('-__v').lean()
            .then(flights => flights)
    },

    retrieveFlightsFromUser(userId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')

        return Flight.find({ userId }).select('-__v').lean()
            .then(flights => flights)
    },

    retrieveFlightsFromDrone(droneId) {
        if (typeof droneId !== 'string') throw TypeError(droneId + ' is not a string')

        if (!droneId.trim().length) throw new EmptyError('droneId cannot be empty')

        return Flight.find({ droneId }).select('-__v').lean()
            .then(flights => flights)
    },

    retrieveFlightsFromUserDrone(userId, droneId) {
        if (typeof droneId !== 'string') throw TypeError(droneId + ' is not a string')

        if (!droneId.trim().length) throw new EmptyError('droneId cannot be empty')

        return Flight.find({ userId, droneId }).select('-__v').lean()
            .then(flights => flights)
    },

    updateFlight(userId, flightId, data) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')

        if (typeof flightId !== 'string') throw TypeError(flightId + ' is not a string')

        if (!flightId.trim().length) throw new EmptyError('flightId cannot be empty')

        if (Object.keys(data).length === 0) throw new EmptyError('Data cannot be empty')

        return Flight.findOne({ _id: flightId, userId: userId })
            .then(flight => {
                if (!flight) throw new AuthError('You dont have permissions to delete this flight')

                return Flight.findByIdAndUpdate(flightId, data, { runValidators: true })

            })
            .then(flight => {
                return { flightId: flight.id, status: 'OK' }
            })
    },

    deleteFlight(userId, flightId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')

        if (typeof flightId !== 'string') throw TypeError(flightId + ' is not a string')

        if (!flightId.trim().length) throw new EmptyError('flightId cannot be empty')

        return Flight.findOne({ _id: flightId, userId: userId })
            .then(flight => {
                if (!flight) throw new AuthError('You dont have permissions to delete this flight')

                return Flight.findByIdAndDelete(flightId)
            })
            .then(() => {
                return { status: 'OK' }
            })

    }

}

module.exports = logic