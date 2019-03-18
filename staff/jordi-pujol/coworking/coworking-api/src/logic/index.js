'use strict'

const tokenHelper = require('../token-helper')
const { createToken } = tokenHelper
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const { models: { User, Workspace, Service } } = require('coworking-data')
const validate = require('coworking-validation')

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
    registerUser(name, surname, userName, email, password, passwordConfirmation) {
        validate([{ key: 'name', value: name, type: String },
        { key: 'surname', value: surname, type: String },
        { key: 'userName', value: userName, type: String },
        { key: 'email', value: email, type: String },
        { key: 'password', value: password, type: String },
        { key: 'passwordConfirmation', value: passwordConfirmation, type: String }])

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return User.findOne({ email })
            .then(user => {
                if (user) throw Error(`user with email ${email} already exists`)

                return bcrypt.hash(password, 10)
            })
            .then(hash => User.create({ name, surname, email, password: hash, userName }))
            .then(({ id }) => id)
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    authenticateUser(email, password) {
        validate([{ key: 'email', value: email, type: String },
        { key: 'password', value: password, type: String }])

        let isAdmin

        return User.findOne({ email })
            .then(user => {
                if (!user) throw Error(`user with email ${email} not found`)

                isAdmin = user.isAdmin

                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) throw Error('wrong credentials')

                        const { id } = user

                        return createToken(id)
                    })
            })
            .then(token => {
                return { token, isAdmin }
            })
    },

    /**
     * Retrieves user by it's Id
     * 
     * @param {string} userId 
     */
    retrieveUser(userId) {
        validate([{ key: 'userId', value: userId, type: String }])

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
        validate([{ key: 'userId', value: userId, type: String }])
        if (!data) throw TypeError('data should be defined')
        if (data.constructor !== Object) throw Error(`${data} is not an object`)
        
        let _data = data.data[0]


        return User.findOneAndUpdate({ _id: userId }, { $set: _data })
    },

    /**
     * 
     * Removes a user from a workspace
     * 
     * @param {string} userId 
     * @param {string} email 
     */
    removeUser(userId, email) {
        validate([{ key: 'userId', value: userId, type: String },
        { key: 'email', value: email, type: String }])

        let workspaceId
        let _userId

        return User.findOne({ _id: userId })
            .then(user => {
                if (!user.isAdmin) throw Error(`cannot delete if not admin`)

                workspaceId = user.workspace.toString()
            })
            .then(() => {
                return User.findOneAndUpdate({ email }, { $unset: { workspace: '' } })
            })
            .then(({ _id }) => {

                _userId = _id

                return Workspace.findById(workspaceId)
            })
            .then(workspace => {
                const index = workspace.user.findIndex(id => id === _userId)

                workspace.user.splice(index, 1)

                workspace.save()
            })
    },

    /**
     * Retrieves user by it's Id
     * 
     * @param {string} userId 
     */
    retrieveUserProfile(userId, username) {
        validate([{ key: 'userId', value: userId, type: String },
        { key: 'username', value: username, type: String }])

        return User.findOne({ userName: username }).select('-password -__v').lean()
            .then(user => {
                if (!user) throw Error(`user with username ${username} not found`)

                user.id = user._id.toString()

                delete user._id

                return user
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
        validate([{ key: 'name', value: name, type: String },
        { key: 'userId', value: userId, type: String }])

        let workspaceId

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error('user does not exist')
                if (user.workspace) throw Error('cannot be in more than one workspace with same email')

                user.isAdmin = true

                return user.save()
            })
            .then(() => Workspace.findOne({ name }))
            .then(workspace => {
                if (workspace) throw Error(`${workspace.name} already exists`)

                return Workspace.create({ name, user: userId })
            })
            .then(({ _id }) => {

                workspaceId = _id.toString()

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
        validate([{ key: 'workId', value: workId, type: String },
        { key: 'userId', value: userId, type: String }])


        return User.findById(userId)
            .then(user => {
                if (user.workspace == true) throw Error('user is already in a workspace')
            })
            .then(() => Workspace.findOne({ _id: workId }))
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
        validate([{ key: 'userId', value: userId, type: String }])

        let workspaceId = ''

        return User.findById({ _id: userId })
            .then(user => {
                if (!user) throw Error(`${userId} does not exists`)

                if (!user.isAdmin) throw Error(`${userId} has no permissions for creating a new link`)

                workspaceId = user.workspace

                return bcrypt.hash(uuid(), 10)
            })
            .then(hash => {
                let _hash = hash.replace(/\//g, '').toString()

                return Workspace.findById(workspaceId)
                    .then(workspace => {
                        workspace.hash.push(_hash)
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
        validate([{ key: 'userId', value: userId, type: String },
        { key: 'link', value: link, type: String }])

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
    createService(userId, title, description, maxUsers, place, time) {

        validate([{ key: 'userId', value: userId, type: String },
        { key: 'title', value: title, type: String },
        { key: 'description', value: description, type: String },
        { key: 'maxUsers', value: maxUsers, type: Number },
        { key: 'place', value: place, type: String },
        { key: 'time', value: time, type: Number }])

        let workspaceId
        let serviceId

        return User.findById({ _id: userId })
            .then(user => {
                if (!user) throw Error(`${userId} does not exists`)

                workspaceId = user.workspace
            })
            .then(() => Service.create({ title, description, user: userId, maxUsers, place, time })).then(({ id }) => serviceId = id)
            .then(() => Workspace.findById(workspaceId))
            .then(workspace => {
                workspace.service.push(serviceId)
                return workspace.save()
            })
            .then(() => {

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
        validate([{ key: 'userId', value: userId, type: String },
        { key: 'serviceId', value: serviceId, type: String }])

        let _service
        return Service.findById(serviceId).select('-password -__v').lean()
            .then(service => {

                service.id = service._id.toString()
                delete service._id

                _service = service
                return service
            })
            .then((service) => User.findById(service.user))
            .then(user => {
                _service.user = user.name
                return _service
            })

    },

    retrieveUserServices(userId) {
        validate([{ key: 'userId', value: userId, type: String }])

        let _services = []

        return User.findById(userId)
            .then((user) => {
                if (!user) throw Error('user does not exists')

                return Workspace.findOne({ _id: user.workspace }).populate('service').lean()
            })
            .then(({ service }) => {

                service.map(_service => {
                    if (_service.user.toString() == userId) {
                        _service.id = _service._id
                        delete _service._id
                        delete _service.__v
                        _services.push(_service)
                    }
                })

                return _services
            })
    },

    retrieveUserSubmitedEvents(userId) {
        validate([{ key: 'userId', value: userId, type: String }])

        let _services = []

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error('User does not exists')
                return Workspace.findOne({ _id: user.workspace }).populate('service user').lean()
            })
            .then(({ service, user }) => {

                service.map(_service => {

                    _service.submitedUsers.map(sub => {
                        if (sub.toString() == userId) {
                            _service.id = _service._id
                            delete _service._id
                            delete _service.__v

                            user.map(_user => {
                                if (_user._id.toString() == _service.user) {
                                    _service.user = _user.name
                                    _service.userName = _user.username
                                }
                            })

                            _services.push(_service)
                        }
                    })
                })

                return _services
            })
    },

    retrieveWorkspaceServices(userId, workspaceId) {
        validate([{ key: 'userId', value: userId, type: String },
        { key: 'workspaceId', value: workspaceId, type: String }])

        let services
        let user
        let userName

        return Workspace.findById(workspaceId).populate('service user').lean()
            .then(workspace => {

                if (!workspace) throw Error('workspace not found')

                services = workspace.service.map(service => {
                    service.id = service._id
                    delete service._id
                    delete service.__v

                    user = workspace.user.map(_user => {
                        if (_user._id.toString() == service.user) {
                            return _user.name
                        }
                    })

                    userName = workspace.user.map(_user => {
                        if (_user._id.toString() == service.user) {
                            return _user.username
                        }
                    })

                    const index = user.findIndex(_user => _user !== undefined)

                    service.user = user.splice(index, 1)
                    service.user = service.user.toString()

                    const index2 = userName.findIndex(_user => _user !== undefined)

                    service.userName = userName.splice(index2, 1)
                    service.userName = service.userName.toString()

                    return service
                })
                return services
            })
    },

    searchServices(userId, query) {
        validate([{ key: 'userId', value: userId, type: String },
        { key: 'query', value: query, type: String }])

        let services
        let _services
        let user
        let userName

        return User.findById(userId)
            .then(({ workspace }) => Workspace.findById(workspace).populate('service user').lean())
            .then(workspace => {

                if (!workspace) throw Error('workspace not found')

                services = workspace.service.map(service => {
                    service.id = service._id
                    delete service._id
                    delete service.__v

                    user = workspace.user.map(_user => {
                        if (_user._id.toString() == service.user) {
                            return _user.name
                        }
                    })

                    userName = workspace.user.map(_user => {
                        if (_user._id.toString() == service.user) {
                            return _user.username
                        }
                    })

                    const index = user.findIndex(_user => _user !== undefined)

                    service.user = user.splice(index, 1)
                    service.user = service.user.toString()

                    const index2 = userName.findIndex(_user => _user !== undefined)

                    service.userName = userName.splice(index2, 1)
                    service.userName = service.userName.toString()

                    return service
                })

                _services = services.map(_service => {
                    if(_service.title.toLowerCase().includes(query.toLowerCase()))
                    return _service
                })

                const index3 = _services.findIndex(_service => _service !== undefined)

                _services = _services.splice(index3, 1)
                
                return _services
            })
    },

    /**
     * 
     * @param {string} userId 
     * @param {string} serviceId 
     * @param {Object} data 
     */
    updateService(userId, serviceId, data) {
        validate([{ key: 'userId', value: userId, type: String },
        { key: 'serviceId', value: serviceId, type: String }])

        if (!data) throw TypeError('data should be defined')
        if (data.constructor !== Object) throw Error(`${data} is not an object`)

        return Service.findById(serviceId)
            .then(service => {
                if (service.user.toString() !== userId) throw Error('this user cannot update this service')
            })
            .then(() => Service.findOneAndUpdate({ id: serviceId, $set: data }))
    },

    addUserToService(userId, serviceId) {
        validate([{ key: 'userId', value: userId, type: String },
        { key: 'serviceId', value: serviceId, type: String }])

        return User.findById(userId)
            .then(user => {
                if (Number(user.time) <= -120) throw Error('you cannot ask for more services, please create a service to gain more time')
            })
            .then(() => Service.findById(serviceId))
            .then(service => {

                if (service.submitedUsers.length >= service.maxUsers) throw Error('max submited users achieved, you cannot submit to this event')

                service.submitedUsers.map(user => {

                    if (user == userId) throw Error('user is already submited to this service')
                })
                if (service.user.toString() === userId) throw Error('user cannot apply to his own service')

                if (service.submitedUsers.length + 1 >= service.maxUsers) {
                    service.active = false
                }

                service.submitedUsers.push(userId)
                return service.save()
            })
    },

    closeService(serviceId) {

        let _time
        let _provider
        let _submitedUsers

        return Service.findById(serviceId)
            .then(service => {

                if (!service) throw Error('service not found')

                _time = service.time
                _provider = service.user
                _submitedUsers = service.submitedUsers

                service.closed = true
                return service.save()
            })
            .then((service) => User.find({ _id: service.submitedUsers }))
            .then(users => {
                users.map(user => {
                    user.time -= Math.round(_time / _submitedUsers.length)
                    return user.save()
                })
            })
            .then(() => User.findById(_provider))
            .then(user => {
                user.time += _time
                return user.save()
            })
    },

    /**
     * 
     * @param {string} userId 
     * @param {string} serviceId 
     */
    deleteService(userId, serviceId) {
        validate([{ key: 'userId', value: userId, type: String },
        { key: 'serviceId', value: serviceId, type: String }])


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
                return workspace.save()
            })
    },

    createComment(userId, serviceId, text) {
        validate([{ key: 'userId', value: userId, type: String },
        { key: 'serviceId', value: serviceId, type: String },
        { key: 'text', value: text, type: String }])

        return Service.findOneAndUpdate({ _id: serviceId }, { $push: { comments: { text, user: userId } } })
            .then(({ _id }) => Service.findById({ _id }))
            .then(service => service.comments[service.comments.length - 1]._id)
    },

    retrieveServiceComments(serviceId) {
        validate([{ key: 'serviceId', value: serviceId, type: String }])

        let comments = []
        return Service.findById(serviceId).lean()
            .then(service => {

                if (!service) throw Error('service not found')

                comments = service.comments.map(_service => {
                    _service.id = _service._id
                    delete _service._id

                    return _service
                })

                return comments
            })
    },

    removeComment(serviceId, commentId) {
        validate([{ key: 'serviceId', value: serviceId, type: String },
        { key: 'commentId', value: commentId, type: String }])

        return Service.findById(serviceId)
            .then(service => {

                if (!service) throw Error('service not found')

                const index = service.comments.findIndex(comment => comment._id == commentId)

                if (index < 0) throw Error('comment not found')

                service.comments.splice(index, 1)
                return service.save()
            })
    }
}

module.exports = logic