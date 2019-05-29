const { models: { User, PMap, Pin } } = require('photopin-data')
const bcrypt = require('bcrypt')
const {LogicError} = require('photopin-errors')
const validate = require('photopin-validate')


const logic = {


    /**
     * Register an user into the database
     * 
     * @param {String} name The user name
     * @param {String} surname The user surname
     * @param {String} email The user email 
     * @param {String} password The user password 
     * 
     * @throws {TypeError, RequirementError, ValueError, FormatError} if a validation error happens
     * @throws {LogicError} if the use is already registered
     * 
     * @returns {String} id 
     */
    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            
            const user = await User.findOne({email})

            if(user) throw new LogicError(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 10)

            let newUser
            try {
                newUser = await User.create({name, surname, email, password : hash})
            } catch (error) {
                throw new LogicError(error.message)
            }
            
            return newUser.id
        })()
    },

    /**
     * Authenticate an user to retrieve the id or throw an error if an email doesn't exists or the password not match.
     * 
     * @param {String} email The user email to authenticate
     * @param {String} password The user email to match
     * 
     * @returns {String} The user id
     */
    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const user = await User.findOne({email})

            if(!user) throw new LogicError(`user with email ${email} doesn't exists`)

            if (await bcrypt.compare(password, user.password)) return user.id
            else throw new LogicError('wrong credentials')
        })()
    },


    /**
     * Retrieve the complete user data (name, surname, email, avatar, language and )
     * 
     * @param {String} userId The user id
     * 
     * @returns {Object} The user data
     */
    retrieveUser(userId) {
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
        ])

        return (async () => {
            const user = await User.findById(userId).select('-_id name surname email avatar language favoritePublicMap').lean()

            if(!user) throw new LogicError(`user with id ${userId} doesn't exists`)

            delete user.password

            return user
        })()
    },

    /**
     * Update the user with new data
     * 
     * @param {string} userId 
     * @param {Object} data 
     * 
     * @throws {Error} if user not found
     * @return {Object} user data before update
     */
    updateUser(userId, data) {

        validate.arguments([
            { name: 'id', value: userId, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return (async () => {

            try {
                let result = await User.findByIdAndUpdate(userId, { $set: data }).select('-__v  -password').lean()
                
                result.id = result._id.toString()
                delete result._id
                
                return result

            } catch (error) {
                throw new LogicError(`user with id ${userId} doesn't exists`)
            }

        })()
    },


    /**
     * Delete user, also delete all the pins and maps that the user is the author
     * 
     * @param {String} id The user id
     * @param {String} password The user password 
     * 
     * @return {Object} user deleted
     */
    removeUser(userId) {

        validate.arguments([
            { name: 'id', value: userId, type: 'string', notEmpty: true }
        ])

        return (async () => {

            const user = await User.findById(userId)
            if(!user) throw new LogicError(`user with id ${userId} doesn't exists`)
            
            await Pin.deleteMany({author: userId})

            await PMap.deleteMany({author: userId})
            //TODO: Al borrar mapas se han de eliminar sus referencias en los favoritos de usuarios !!!

            return await User.findByIdAndDelete(userId)

        })()
    }



}

module.exports = logic