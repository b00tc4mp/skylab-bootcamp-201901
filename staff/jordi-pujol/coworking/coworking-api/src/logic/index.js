'use strict'

const tokenHelper = require('../token-helper')
const { createToken } = tokenHelper
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const { models: { User, Workspace, Service } } = require('coworking-data')

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

        // if (typeof isAdmin !== 'string') throw TypeError(isAdmin + ' is not a string')

        // if (!isAdmin.trim().length) throw Error('isAdmin cannot be empty')

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
     * Updates a user. Can change user params.
     * 
     * @param {string} userId 
     * @param {string} data 
     */
    updateUser(userId, data) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (!data) throw TypeError('data should be defined')
        if (data.constructor !== Object) throw Error(`${data} is not an object`)

        return User.findOneAndUpdate({ id: userId, $set: data })
    },

    /**
     * 
     * Removes a user from a workspace
     * 
     * @param {string} userId 
     * @param {string} email 
     */
    removeUser(userId, email) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        let workspaceId
        let _userId

        return User.findOne({ _id: userId })
            .then(user => {
                if (!user.isAdmin) throw Error(`cannot delete if not admin`)
                debugger
                // workspaceId = user.workspace
                workspaceId = user.workspace.toString()
            })
            .then(() => {
                return User.findOneAndUpdate({ email }, { $unset: { workspace: '' } })
            })
            .then(({ _id }) => {

                _userId = _id
                debugger
                return Workspace.findById(workspaceId)
            })
            .then(workspace => {
                const index = workspace.user.findIndex(id => id === _userId)

                workspace.user.splice(index, 1)

                workspace.save()
            })
    },

    /**
     * 
     * Creates a new workspace. Only admins can do it
     * 
     * @param {string} name 
     * @param {string} userId 
     */
    createWorkspace(name, userId) {

        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        let workspaceId

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error('user does not exist')
                if (user.workspace) throw Error('cannot create more than one workspace with same email')

                user.isAdmin = 'true'

                return user.save()
            })
            .then(() => Workspace.findOne({ name }))
            .then(workspace => {
                if (workspace) throw Error(`${workspace} already exists`)

                return Workspace.create({ name, user: userId })
            })
            .then(({ _id }) => {

                workspaceId = _id

                return User.findById(userId)
            })
            .then(user => {
                user.workspace = workspaceId
                user.save()
            })
            .then(() => workspaceId)
    },

    /**
     * 
     * Adds a user to an existing workspace.
     * 
     * @param {string} workId 
     * @param {string} userId 
     */
    addUserToWorkspace(workId, userId) {
        if (typeof workId !== 'string') throw TypeError(workId + ' is not a string')
        if (!workId.trim().length) throw Error('workspaceId cannot be empty')

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return Workspace.findOne({ _id: workId })
            .then(workspace => {
                if (!workspace) throw Error(`workspace does not exists`)

                for (let i = 0; i < workspace.user.length; i++) {
                    if (workspace.user[i].toString() === userId) throw Error(`${userId} already exists`)
                }

                // add valiation
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

    /**
     * 
     * Create a link that will allow new users be added to a workspace
     * 
     * @param {string} userId 
     */
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
                let _hash = hash.replace(/\//g, '')

                return Workspace.findById(workspaceId)
                    .then(workspace => {
                        workspace.hash.push(hash)
                        return workspace.save()
                    })
                    .then(() => {
                        return _hash
                    })
            })
    },

    /**
     * 
     * Verifies the link provided to the user is correct and can be added to a workspace.
     * 
     * @param {srting} userId 
     * @param {string} link 
     */
    verifyNewUserLink(userId, link) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof link !== 'string') throw TypeError(link + ' is not a string')
        if (!link.trim().length) throw Error('link cannot be empty')

        let workspaceId

        return User.findById({ _id: userId })
            .then(user => {
                if (!user) throw Error(`${userId} does not exists`)
            })
            .then(() => Workspace.findOne({ hash: link }))
            .then(workspace => {
                if (!workspace) throw Error('link validation failed')

                const index = workspace.hash.findIndex(invitations => invitations === link)

                workspaceId = workspace._id.toString()

                workspace.hash.splice(index, 1)
                return workspace.save()
            })
            .then(() => workspaceId)
    },

    /**
     * 
     * Creates a service.
     * 
     * @param {string} userId 
     * @param {string} title 
     * @param {string} description 
     */
    createService(userId, title, description) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof title !== 'string') throw TypeError(title + ' is not a string')
        if (!title.trim().length) throw Error('title cannot be empty')

        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        if (!description.trim().length) throw Error('description cannot be empty')

        let workspaceId
        let serviceId

        return User.findById({ _id: userId })
            .then(user => {
                if (!user) throw Error(`${userId} does not exists`)
                debugger
                workspaceId = user.workspace
            })
            .then(() => Service.create({ title, description, user: userId })).then(({ id }) => serviceId = id)
            .then(() => Workspace.findById(workspaceId))
            .then(workspace => {
                workspace.service.push(serviceId)
                return workspace.save()
            })
            .then(() => {
                debugger
                return serviceId
            })
    },

    /**
     * 
     * Retrieves a service
     * 
     * @param {string} userId 
     * @param {string} serviceId 
     */
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

    retrieveWorkspaceServices(userId, workspaceId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof workspaceId !== 'string') throw TypeError(workspaceId + ' is not a string')
        if (!workspaceId.trim().length) throw Error('workspaceId cannot be empty')

        let services

        return Workspace.findById(workspaceId).populate('service').lean()
            .then(workspace => {

                services = workspace.service.map(service => {
                    service.id = service._id
                    delete service._id
                    delete service.__v

                    return service
                })
                return services
            })
    },

    //TODO retrieve all services

    /**
     * 
     * @param {string} userId 
     * @param {string} serviceId 
     * @param {Object} data 
     */
    updateService(userId, serviceId, data) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof serviceId !== 'string') throw TypeError(serviceId + ' is not a string')
        if (!serviceId.trim().length) throw Error('serviceId cannot be empty')

        if (!data) throw TypeError('data should be defined')
        if (data.constructor !== Object) throw Error(`${data} is not an object`)

        return Service.findById(serviceId)
            .then(service => {
                if (service.user.toString() !== userId) throw Error('this user cannot update this service')
            })
            .then(() => Service.findOneAndUpdate({ id: serviceId, $set: data }))
    },

    /**
     * 
     * @param {string} userId 
     * @param {string} serviceId 
     */
    deleteService(userId, serviceId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof serviceId !== 'string') throw TypeError(serviceId + ' is not a string')
        if (!serviceId.trim().length) throw Error('serviceId cannot be empty')


        return Service.findById(serviceId)
            .then(service => {
                if (service.user.toString() !== userId) throw Error('this user cannot delete this service')
            })
            .then(() => Service.deleteOne({ _id: serviceId }))
            .then(() => User.findById(userId))
            .then(({ workspace }) => Workspace.findById(workspace))
            .then(workspace => {

                const index = workspace.service.findIndex(service => service === serviceId)

                workspace.service.splice(index, 1)
                workspace.save()
            })
    }


}

module.exports = logic