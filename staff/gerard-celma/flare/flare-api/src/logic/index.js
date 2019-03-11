'use strict'

const { models: { User, Message } } = require('datify')
const validate = require('flare-validation')
const bcrypt = require('bcrypt')
const { AuthError, EmptyError, DuplicateError, MatchingError, NotFoundError } = require('errorify')



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
    registerUser(name, surname, email, password, passwordConfirmation) {
        validate([{ key: 'name', value: name, type: String }, { key: 'surname', value: surname, type: String }, { key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }, { key: 'passwordConfirmation', value: passwordConfirmation, type: String }])
        
        if (password !== passwordConfirmation) throw new MatchingError('passwords do not match')

        return (async () => {
            const user = await User.findOne({ email })

            if (user) throw new DuplicateError(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 10)

            const { id } = await User.create({ name, surname, email, password: hash })

            return id
        })()
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    authenticateUser(email, password) {
        validate([{ key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }])

        return (async () => {
            const user = await User.findOne({ email })

            if (!user) throw new NotFoundError(`user with email ${email} not found`)

            const match = await bcrypt.compare(password, user.password)

            if (!match) throw new AuthError('wrong credentials')

            return user.id
        })()
    },

    // /**
    //  * Retrieves user by its userId.
    //  * 
    //  * @param {string} userId
    //  */
    retrieveUser(userId) {
        validate([{ key: 'userId', value: userId, type: String }])

        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)

                // delete user.password
                // delete user.__v

                user.id = user._id.toString()

                delete user._id

                return user
            })
    },

    // /**
    //  * Retrieves user by its userId.
    //  * 
    //  * @param {string} userId
    //  */
    retrieveUsers(userId) {
        validate([{ key: 'userId', value: userId, type: String }])

        return User.findById(userId).select('-password -__v').lean()
                .then(user => {
                    if (!user) throw new NotFoundError(`user with id ${userId} not found, no permission to perform query`)
        
                    return User.find().select('-password -__v').lean()
                            .then(users => {
                                users.map(user => {
                                    user.id = user._id.toString()
                                    delete user._id
                                })

                                return users
                            })
                })
    },

    updateUser(userId, _name, _surname, _email) {
        validate([{ key: 'userId', value: userId, type: String }, { key: 'name', value: _name, type: String }, { key: 'surname', value: _surname, type: String }, { key: 'email', value: _email, type: String }])
        
        return User.findOneAndUpdate({ _id: userId }, { name: _name, surname: _surname, email: _email }, {runValidators: true, new: true}).select('-password -__v').lean()
            .then((user) => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                user.id = user._id.toString()

                delete user._id
                return user
            })
    },

    removeUser(userId) {
        validate([{ key: 'userId', value: userId, type: String }])

        return User.findOneAndRemove({ _id: userId })
            .then((user) => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                
                return user
            })
    },

    createMessage(userIdFrom, userIdTo, launchDate, position, text) {
        validate([{ key: 'userIdFrom', value: userIdFrom, type: String }, { key: 'userIdTo', value: userIdTo, type: String }, { key: 'launchDate', value: launchDate, type: String }, { key: 'position', value: position, type: Array }, { key: 'text', value: text, type: String }])

        return Message.create({userIdFrom, userIdTo, launchDate, position, text})
            .then(message => {
                User.findById(userIdFrom)
                    .then(user => {
                        user.msgSent.push(message._id)
                        return user.save()
                    })
                User.findById(userIdTo)
                    .then(user => {
                        user.msgReceived.push(message._id)
                        return user.save()
                    }) 
                return message    
            })
    },

    messageRead(userIdTo, msgId) {
        validate([{ key: 'userIdTo', value: userIdTo, type: String }, { key: 'msgId', value: msgId, type: String }])

        return User.findById(userIdTo)
                .then(user => {
                    let msg = user.msgReceived.filter(m => m.toString() !== msgId)
                    user.msgReceived = msg
                    user.save()
                    return {status: 'OK'}
                })
    },
  
    messageDelete(userId, msgId){
        validate([{ key: 'userIdTo', value: userIdTo, type: String }, { key: 'msgId', value: msgId, type: String }])

        return Promise.all([
            User.findById(userId)
                .then(user => {
                    let msg = user.msgSent.filter(m => m.toString() !== msgId)
                    user.msgSent = msg
                    user.save() 
                    return user
                }),
            Message.findById(msgId)
                .then(message => {
                    User.findById(message.userIdTo)
                    .then(user => {
                        let msg = user.msgReceived.filter(m => m.toString() !== msgId)
                        user.msgReceived = msg
                        user.save()
                    })
                    return message
                }),
            Message.findByIdAndDelete(msgId)
                .then(message => message)       
        ]).then(values => values)
    },
    
    retrieveReceivedMessages(userId) {
        validate([{ key: 'userId', value: userId, type: String }])

        return User.findById(userId).populate('msgReceived')
                .then(user => user)
    }
}

module.exports = logic


