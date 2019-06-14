'use strict'

const { User, House, mongoose, ObjectId } = require('homeSwapp-data')
const bcrypt = require('bcrypt')


/**
 * Abstraction of business logic.
 */
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
    registerUser(username, email, password, passwordConfirmation) {
        if (typeof username !== 'string') throw TypeError(username + ' is not a string')

        if (!username.trim().length) throw Error('username cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        
        return (async () => {
            let user = await User.findOne({ email })

            if (user) throw Error(`user with email ${email} already exists`)

            user = await User.findOne({ username })

            if (user) throw Error(`user with username ${username} already exists`)


            const hash = await bcrypt.hash(password, 10)

            const newUser = await User.create({ username, email, password: hash })

           
            return newUser.id
        })()
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

        return (async () => {
            const user = await User.findOne({ email })

            if (!user) throw Error(`user with email ${email} not found`)

            const match = await bcrypt.compare(password, user.password)

            if (!match) throw Error('wrong credentials')

            return user.id
        })()
    },

    // TODO doc
    retrieveUser(userId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')


        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)


                user.id = user._id.toString()

                delete user._id

                return user
            })
    },

    retrieveUserPublicInfo (userId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')


        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                return user.username
            })
    },

    updateUser(userId, data) {


        return User.findByIdAndUpdate(userId, data, { runValidators: true, new: true }).select('-password -__v').lean()
            .then(user => {

                if (!user) throw Error(`user with id ${userId} not found`)

                user.id = user._id.toString()

                delete user._id

                return user


            })

    },



    createHouse(ownerId, images, description, info, adress) {

        if (typeof ownerId !== 'string') throw Error(`${ownerId} is not a valid id`)
        if (typeof images !== 'object') throw Error(`${images} is not an array`)
        if (images.length == 0) throw Error('There must be at least one image')
        if (typeof description !== 'string') throw Error(`${description} is not a string`)
        if (typeof info !== 'object') throw Error(`${info} is not an object`)
        if (typeof adress !== 'object') throw Error(`${adress} is not an object`)

        return House.create({ ownerId, images, description, info, adress })
            .then(house => {


                return User.findById(ownerId)
                    .then(user => {
                        user.myHouses.push(house._id)
                        return user.save()
                            .then(() => {

                                return house

                            })


                    })

            })
    },

    updateHouse(houseId, images, description, info, adress) {

        if (typeof houseId !== 'string') throw Error(`${houseId} is not a valid id`)
        if (typeof images !== 'object') throw Error(`${images} is not an array`)
        if (images.length == 0) throw Error('There must be at least one image')
        if (typeof description !== 'string') throw Error(`${description} is not a string`)
        if (typeof info !== 'object') throw Error(`${info} is not an object`)
        if (typeof adress !== 'object') throw Error(`${adress} is not an object`)

        return House.findByIdAndUpdate(houseId, { images, description, info, adress }, { new: true })

            .then(house => {

                if (!house) throw Error(`house with id ${houseId} not found`)


                house.id = house._id.toString()

                delete house._id

                return house
            })


    },

    retrieveHouse(houseId) {
        if (typeof houseId !== 'string') throw Error(`${houseId} is not a valid id`)

        return House.findById(houseId).lean()

            .then(house => {

                if (!house) throw Error(`house with id ${houseId} not found`)


                return User.findById(house.ownerId).lean()
                    .then(user => {

                        house.id = house._id.toString()
                        delete house._id

                        house.owner = user.username

                        return house

                    })
            })

    },

    deleteHouse(houseId, ownerId) {

        if (typeof houseId !== 'string') throw Error(`${houseId} is not a valid id`)
        if (typeof ownerId !== 'string') throw Error(`${ownerId} is not a valid id`)


        return House.findByIdAndDelete(houseId)
            .then(() => {

                return User.findById(ownerId)
                    .then(user => {
                        let index = user.myHouses.indexOf(houseId)
                        user.myHouses.splice(index, 1)
                        return user.save()

                    })


            })

    },

    retrieveMyHouses(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)
                return user.myHouses
            })
            .then(houseId => {
                return House.find({ _id: { $in: houseId } }).select('-__v').lean()
            })
            .then(houses => {
                houses.forEach(house => {
                    house.id = house._id.toString()
                    delete house._id
                })
                return houses
            })
    },


    toggleFavorites(userId, houseId) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')
        if (typeof houseId !== 'string') throw TypeError(`${houseId} is not a string`)
        if (!houseId.trim().length) throw Error('houseId cannot be empty')

        return User.findById(userId)
            .then((user) => {

                let index = user.favorites.indexOf(houseId)

                if (index < 0) user.favorites.push(houseId)
                else user.favorites.splice(index, 1)

                return user.save()



            })


    },


    retrieveMyFavorites(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)
                return user.favorites
            })
            .then(houseId => {
                return House.find({ _id: { $in: houseId } }).select('-__v').lean()
            })
            .then(houses => {
                houses.forEach(house => {
                    house.id = house._id.toString()
                    delete house._id
                })
                return houses
            })
    },


    retrieveHousesByQuery(query) {

        query = query.toLowerCase()

        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        return House.find({ $or: [{ "adress.city": query }, { "adress.country": query }] }).select('-__v').lean()
            .then(houses => {
                houses.forEach(house => {
                    house.id = house._id.toString()
                    delete house._id
                    return house
                })
                return houses
            })
    },

    sendMessage(userId, id, text) {


        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (typeof text !== 'string') throw Error(`${text} is not a string`)


        return User.findById(userId)
            .then((user) => {


                var index = user.conversations.findIndex(conver => conver.interlocutor == id)

                if (index < 0) {

                    let conversation = {
                        
                        interlocutor: id,
                        messages: [{

                            sent: true,
                            text: text

                        }]
                    }

                    user.conversations.push(conversation)
                    return user.save()
                        .then(() => {

                            return User.findById(id)
                                .then((user) => {

                                    let conversation = {

                                        interlocutor: userId,
                                        messages: [{

                                            text: text

                                        }]
                                    }

                                    user.conversations.push(conversation)
                                    return user.save()

                                })
                        })
                } else {

                    let message = {

                        sent: true,
                        text: text
                    }
                    user.conversations[index].messages.push(message)
                    return user.save()
                        .then(() => {
                            return User.findById(id)
                                .then(user => {

                                    var index = user.conversations.findIndex(conver => conver.interlocutor == userId)

                                    let message = {

                                        text: text
                                    }

                                    user.conversations[index].messages.push(message)
                                    return user.save()

                                })
                        })
                }
            })
    }


}

module.exports = logic