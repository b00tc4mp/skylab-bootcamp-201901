'use strict'

const tokenHelper = require('../token-helper')
const { createToken } = tokenHelper
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const { User, Workspace, Service } = require('../models')

const logic = {

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

                        return createToken(id)
                    })
            })
        // .then(() => user.id)
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

    /// updateuser should ony recieve the token


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

        debugger
        return Workspace.findOne({ _id: workId })
            .then(workspace => {
                if (!workspace) throw Error(`workspace does not exists`)

                for (let i = 0; i < workspace.user.length; i++) {
                    if (workspace.user[i].toString() === userId) throw Error(`${userId} already exists`)
                }

                // afegir validacio
                return workspace
            })
            .then((workspace) => {
                workspace.user.push(userId)
                return workspace.save()
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
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        let workspaceId = ''

        return User.findById({ _id: userId })
            .then(user => {
                if (!user) throw Error(`${userId} does not exists`)

                if (!user.isAdmin) throw Error(`${userId} has no permissions for creating a new link`)

                workspaceId = user.workspace

                return bcrypt.hash(uuid(), 10)
            })
            .then(hash => {
                let _hash = hash

                return Workspace.findById(workspaceId)
                    .then(workspace => {
                        console.log(workspace)
                        workspace.hash.push(hash)
                        return workspace.save()
                    })
                    .then(() => {
                        return _hash
                    })
            })
    },

    verifyNewUserLink(userId, link) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof link !== 'string') throw TypeError(link + ' is not a string')
        if (!link.trim().length) throw Error('link cannot be empty')

        return User.findById({ _id: userId })
            .then(user => {
                if (!user) throw Error(`${userId} does not exists`)

            })
            .then(() => {
                return Workspace.findOne({ hash: link })
            })
            .then(workspace => {
                if (!workspace) throw Error('link validation failed')

                const index = workspace.hash.findIndex(invitations => invitations === link)

                workspace.hash.splice(index, 1)
                return workspace.save()
            })
    },

    createService(userId, title, description) {
        
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof title !== 'string') throw TypeError(title + ' is not a string')
        if (!title.trim().length) throw Error('title cannot be empty')

        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        if (!description.trim().length) throw Error('description cannot be empty')

        let serviceId

        return User.findById({ _id: userId })
            .then(user => {
                if (!user) throw Error(`${userId} does not exists`)

                return user.workspace
            })
            .then(workspaceId => {
                return Workspace.findById(workspaceId)

                    .then(workspace => {
                        workspace.service.push()
                    })
                    .then(() => {
                        return Service.create({ title, description, user: userId })
                    })
                    .then(({ id }) => id)

            })
    },

    retrieveService(userId, serviceId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof serviceId !== 'string') throw TypeError(serviceId + ' is not a string')
        if (!serviceId.trim().length) throw Error('serviceId cannot be empty')

        return Service.findById(serviceId).select('-password -__v').lean()
            .then(service => {
                if (service.user.toString() !== userId) throw Error('this user cannot retrieve this service')

                service.id = service._id.toString()

                delete service._id

                return service
            })
    },

    updateService(userId, serviceId, data) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof serviceId !== 'string') throw TypeError(serviceId + ' is not a string')
        if (!serviceId.trim().length) throw Error('serviceId cannot be empty')

        // if (typeof data !== 'string') throw TypeError(data + ' is not a string')
        // if (!data.trim().length) throw Error('data cannot be empty')

        return Service.findById(serviceId)
            .then(service => {
                if (service.user.toString() !== userId) throw Error('this user cannot update this service')
            })
            .then(() => {
                return Service.findOneAndUpdate({ id: serviceId, $set: data })
            })
    },

    deleteService(userId, serviceId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof serviceId !== 'string') throw TypeError(serviceId + ' is not a string')
        if (!serviceId.trim().length) throw Error('serviceId cannot be empty')

        return Service.findById(serviceId)
            .then(service => {
                if (service.user.toString() !== userId) throw Error('this user cannot delete this service')
            })
            .then(() => {
                return Service.deleteOne({ _id: serviceId })
            })

    }


}

module.exports = logic