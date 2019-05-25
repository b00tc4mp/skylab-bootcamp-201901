'use strict'

const { User, Game, mongoose, ObjectId } = require('freendies_data')
const bcrypt = require('bcrypt')


const logic = {

    async registerUser(username, email, password, passwordConfirmation) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)

        if (!username.trim().length) throw Error('username cannot be empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(`${passwordConfirmation} is not a string`)

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')


        let user = await User.findOne({ email })

        if (user) throw Error(`user with email ${email} already exists`)

        user = await User.findOne({ username })

        if (user) throw Error(`user with username ${username} already exists`)

        const hash = await bcrypt.hash(password, 10)

        const newUser = await User.create({ username, email, password: hash })

        return newUser.id
    },

    async authenticateUser(email, password) {

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error(`${email} cannot be empty`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw TypeError(`${password} is not a string`)


        let user = await User.findOne({ email })
        if (!user) throw Error(`User with ${email} does not exist`)

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw Error('wrong password')

        return user.id

    }




}


module.exports = logic