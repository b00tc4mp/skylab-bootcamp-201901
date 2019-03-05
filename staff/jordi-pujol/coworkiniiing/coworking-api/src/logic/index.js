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

        if (typeof isAdmin !== 'string') throw TypeError(isAdmin + ' is not a boolean')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return User.findOne({ email })
            .then(user => {
                if (user) throw Error(`user with email ${email} already exists`)

                return bcrypt.hash(password, 10)
            })
            .then(hash => User.create({ name, surname, email, password: hash, isAdmin }))
            .then(({ id }) => id)
        //create or add user to workspace
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
     * Verifies provided token is correct
     * 
     * @param {string} token 
     */
    __verifyToken__(token) {
        const { sub } = jwt.verify(token, this.jwtSecret)

        if (!sub) throw Error(`user id not present in token ${token}`)

        return sub
    },

    /**
     * 
     * @param {string} token 
     */
    retrieveUser(token) {
        // TODO validate userId and token type and content
        if (typeof token !== 'string') throw TypeError(token + 'is not a string')
        if (!token.trim().length) throw Error('email cannot be empty')

        const userId = this.__verifyToken__(token)

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${id} not found`)

                delete user.password

                return user
            })
    },

    /**
     * Updates a user. Can remove, change or add user params.
     * 
     * @param {string} userId 
     * @param {string} token 
     * @param {string} data 
     */
    updateUser(token, data) {

        jwt.verify(token, this.jwtSecret, (error, decode) => {

            if (error) throw Error(error.message)
            if (decode.id !== userId) throw Error('userId does not match token')

        })

        return User.update(userId, data)
            .then(() => { })

    },

    removeUser(token, email) {

        return User.deleteOne({ email })
            .then(user => {
                if (!user) throw Error(`user with email ${email} not found`)


                jwt.verify(token, this.jwtSecret, (error, decode) => {

                    if (error) throw Error(error.message)
                    if (decode.id !== id) throw Error('userId does not match token')

                })
            })
    },

    createWorkspace(name, user) {
        debugger
        return Workspace.findOne({ name })
            .then(workspace => {
                if (workspace) throw Error(`${workspace} already exists`)
                return Workspace.create({ name, user })
            })
            .then(({ id }) => id)
            .then((workspaceId) => {
                return User.findOneAndUpdate({ id: user, $set: { workspace: workspaceId } }).then(() => workspaceId)
            })
    },

    addUserToWorkspace(name, user) {
        //not name but ID
        return Workspace.findOne({ name }).lean()
            .then(workspace => {
                if (!workspace) throw Error(`${name} does not exists`)

                for (let i = 0; i < workspace.user.length; i++) {
                    if (workspace.user[i].toString() === user) throw Error(`${user} already exists`)
                }
                return workspace
            })
            .then((workspace) => {
                workspace.user.push(user)
                // workspace.save()
                return Workspace.findOneAndUpdate({ name: name, $set: { user: workspace.user } }).lean()
                    .then((workspace) =>{ 
                        debugger
                        return workspace._id})
            }).then((workspaceId) => {
                debugger
                return User.findById(user)
                    .then((user) => {
                        debugger
                        user.workspace = workspaceId
                        return user.save()
                    })
                // return User.findOneAndUpdate({ id: user, $set: { workspace: workspaceId } }).lean()
                //     .then((result) => {
                //         debugger
                //         console.log('hello')
                //     })
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