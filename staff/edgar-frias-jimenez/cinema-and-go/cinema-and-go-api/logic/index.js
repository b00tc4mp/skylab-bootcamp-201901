const bcrypt = require('bcrypt')
const LogicError = require('../common/errors')
const validate = require('../common/validate')
const models = require('cinema-and-go-data')

const { User, Movie } = models

const logic = {
    registerUser(name, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const user = await User.findOne({'email': email})
            if (user) throw new LogicError(`user with email "${email}" already exists`)

            let hash = await bcrypt.hash(password, 10)

            return await User.create({ name, email, password: hash })
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const user = await User.findOne({email})
            if (!user) throw new LogicError(`user with email "${email}" does not exist`)

            if (await bcrypt.compare(password, user.password)) return user.id
            else throw new LogicError('wrong credentials')
        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await User.findById(id)
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)

            const { name, email } = user

            return { name, email }
        })()
    },

    registerMovie(name, img, info, cast) {
        return (async () => {
            return await Movie.create({ name, img, info, cast })
        })()
    },
}

module.exports = logic
