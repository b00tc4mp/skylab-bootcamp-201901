const { LogicError } = require('../common/errors')
const { ObjectId } = require('mongodb')
const { User } = require('../data/models')
const ow = require('ow')
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const logic = {
    registerUser(nickname, age, email, password) {

        ow(nickname, ow.string.not.empty)
        ow(age, ow.number.is(x => x > 13))
        ow(email, ow.string.not.empty)
        ow(password, ow.string.is(x => re.test(String(x))))


        return (async () => {
            const results = await User.findOne({ email })

            if (!results) await User.create({ nickname, age, email, password })
            else throw new LogicError(`User with ${email} already exist`)
        })()
    },

    authenticateUser(nicknameOEmail, password) {
        
        return (async () => {
            const user = await User.findOne({ email, password })

            if (user) {
                const { _id: id } = user
                return id

            } else throw new LogicError(`user with username \"${email}\" does not exist`)
        })()
    },

    retrieveUser(_id) {

        return (async () => {

            const response = await User.findById(ObjectId(_id))

            if (response._id.toString() === _id) {
                const { name, surname, email } = response

                const user = { name, surname, email }

                return user
            } else throw new LogicError("No User for that id")

        })()
    },
}

module.exports = logic