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

    },


    async retrieveUser(userId) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error(`${userId} cannot be empty`)

        const user = await User.findById(userId).select('-password -__v').lean()
        if (!user) throw Error(`user with Id:${userId} not found`)

        user.id = user._id.toString()

        delete user._id

        return user
    },


    async updateUser(userId, data) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error(`${userId} cannot be empty`)

        const user = await User.findOneAndUpdate(userId, data, { runValidators: true, new: true }).select('-password -__v').lean()

        if (!user) throw Error(`user with id ${userId} was not found`)

        user.id = user._id.toString()

        delete user._id

        return user
    },


    async uploadGame(ownerId, title, genre, description, images, gameFile) {
        if (typeof ownerId !== 'string') throw TypeError(`${ownerId} is not a string`)
        if (!ownerId.trim().length) throw Error(`${ownerId} cannot be empty`)
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw Error(`${title} cannot be empty`)
        if (typeof genre !== 'string') throw TypeError(`${genre} is not a string`)
        if (!genre.trim().length) throw Error(`${genre}cannot be empty`)
        if (typeof description !== 'string') throw TypeError(`${description} is not a string`)
        if (!description.trim().length) throw Error(`${description} cannot be empty`)
        if (typeof images !== 'string') throw TypeError(`${images} is not a string`)
        if (!images.trim().length) throw Error(`${images} cannot be empty`)
        if (typeof gameFile !== 'string') throw TypeError(`${gameFile} is not a string`)
        if (!gameFile.trim().length) throw Error(`${gameFile} cannot be empty`)

        const newGame = await Game.create({ ownerId, title, genre, description, images, gameFile })

        const ownerUser = await User.findById(ownerId)

        ownerUser.uploads.push(newGame.id)

        ownerUser.save()

        return newGame
    }


}



module.exports = logic