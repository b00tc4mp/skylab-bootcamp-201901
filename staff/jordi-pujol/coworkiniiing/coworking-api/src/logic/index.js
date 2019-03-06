'use strict'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const { User, Workspace } = require('../models')

const logic = {

    jwtSecret: 'onepiece',

    /**
        * Registers a user.
        * 
        * @param {string} name 
        * @param {string} surname 
        * @param {string} email 
        * @param {string} password 
        * @param {string} passwordConfirmation 
        */
    registerUser(name, surname, email, password, passwordConfirmation, isAdmin) {
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

        if (typeof isAdmin !== 'string') throw TypeError(isAdmin + ' is not a string')

        if (!isAdmin.trim().length) throw Error('isAdmin cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return User.findOne({ email })
            .then(user => {
                if (user) throw Error(`user with email ${email} already exists`)

                return bcrypt.hash(password, 10)
            })
            .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
            .then(({ id }) => id)
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return User.findOne({ email })
            .then(user => {
                if (!user) throw Error(`user with email ${email} not found`)

                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) throw Error('wrong credentials')

                        const { id } = user

                        const token = jwt.sign({ sub: id }, this.jwtSecret, { expiresIn: '4h' })

                        return token
                    })
            })
    },

    /**
     * Retrieves user by it's Id
     * 
     * @param {string} userId 
     */
    retrieveUser(userId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw Error(`user with id ${id} not found`)

                user.id = user._id.toString()

                delete user._id

                return user
            })
    },

    /**
     * Updates a user. Can remove, change or add user params.
     * 
     * @param {string} userId 
     * @param {string} data 
     */
    // updateUser(userId, data) {
    //     if (typeof userId !== 'string') throw TypeError(userId + 'is not a string')
    //     if (!userId.trim().length) throw Error('userId cannot be empty')

    //     if (typeof data !== 'string') throw TypeError(data + 'is not a string')
    //     if (!data.trim().length) throw Error('data cannot be empty')

    //     return User.update(userId, data)
    //         .then(() => { })

    // },

    // removeUser(token, email) {

    //     return User.deleteOne({ email })
    //         .then(user => {
    //             if (!user) throw Error(`user with email ${email} not found`)


    //             jwt.verify(token, this.jwtSecret, (error, decode) => {

    //                 if (error) throw Error(error.message)
    //                 if (decode.id !== id) throw Error('userId does not match token')

    //             })
    //         })
    // },

    createWorkspace(name, userId) {

        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error('user does not exist')
                if (user.workspace) throw Error('cannot create more than one workspace with same email')

                return Workspace.findOne({ name })
            })
            .then(workspace => {
                if (workspace) throw Error(`${workspace} already exists`)

                return Workspace.create({ name, user: userId })
            })
            .then(({ id }) => id)
            .then((workspaceId) => {
                return User.findOneAndUpdate({ id: userId, $set: { workspace: workspaceId } }).then(() => workspaceId)
            })
    },

    addUserToWorkspace(workId, userId) {
        if (typeof workId !== 'string') throw TypeError(workId + ' is not a string')
        if (!workId.trim().length) throw Error('workspaceId cannot be empty')

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return Workspace.findOne({ _id: workId }).lean()
            .then(workspace => {
                if (!workspace) throw Error(`workspace does not exists`)

                for (let i = 0; i < workspace.user.length; i++) {
                    if (workspace.user[i].toString() === userId) throw Error(`${userId} already exists`)
                }
                return workspace
            })
            .then((workspace) => {
                workspace.user.push(userId)
                // workspace.save()
                return Workspace.findOneAndUpdate({ _id: workId, $set: { user: workspace.user } }).lean()
                    .then(() => workspace._id)

            }).then((workspaceId) => {
                return User.findById(userId)
                    .then(user => {
                        user.workspace = workspaceId
                        return user.save()
                    })
            })
    },

    createNewUserLink(userId) {

        return User.findById({ userId }).lean()
            .then(user => {
                if (!user) throw Error(`${userId} does not exists`)

                if (!user.isAdmin) throw Error(`${userId} has no permissions for creating a new link`)

                return uuid()
            })
    }

    /// updateuser should ony recieve the token
}

module.exports = logic