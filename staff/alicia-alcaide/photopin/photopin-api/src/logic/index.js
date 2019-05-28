const { models: { User, PMap, Pin } } = require('photopin-data')
const bcrypt = require('bcrypt')
const LogicError = require('photopin-errors')
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
        debugger
        validate.email(email)

        return (async () => {
            debugger
            const user = await User.findOne({email})

            if(user) throw new LogicError(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 10)

            const newUser = await User.create({name, surname, email, password: hash})

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

            if (await bcrypt.compareSync(user.password, password)) return user.id
            else throw new LogicError('wrong credentials')
        })()
    },


    /**
     * Retrieve the complete user data (name, surname, email, avatar, language and )
     * 
     * @param {String} id The user id
     * 
     * @returns {Object} The user data
     */
    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
        ])

        return (async () => {
            const user = await User.findById(id).select('-_id name surname email avatar language favoritePublicMap').lean()

            if(!user) throw new LogicError(`user with id ${id} doesn't exists`)

            return user
        })()
    },


    updateUser(id, data) {
        //TODO
    },

    deleteUser(id) {
        //TODO
    }


}

module.exports = logic