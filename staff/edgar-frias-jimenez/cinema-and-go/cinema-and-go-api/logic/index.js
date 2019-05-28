const models = require('../cinema-and-go-data/models')
const bcrypt = require('bcrypt')
const LogicError = require('../common/errors')
const validate = require('../common/validate')

const { User } = models

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

            let hash = bcrypt.genSalt(10, (err, salt) => {
                if(err) return next(err)

                bcrypt.hash(password, salt, null, (err, hash) => {
                    if(err) return next(err)

                    return hash
                })
                console.log('HASH --->', hash)
            })

            return User.create({ name, email, password: hash })
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

            if (await bcrypt.compare(user.password, password)) return user.id
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
}

module.exports = logic
