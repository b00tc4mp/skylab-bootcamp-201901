
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const { User, Congress, Artist} = require('../models')

const logic = {

    registerUser(name, username, email, password) {

        if (typeof name != 'string') throw Error('name is not a string')
        if (!name.trim().length) throw Error('name is empty')

        if (typeof username != 'string') throw Error('username is not a string')
        if (!username.trim().length) throw Error('username is empty')

        if (typeof email != 'string') throw Error('email is not a string')
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password != 'string') throw Error('password is not a string')
        if (!password.trim().length) throw Error('password is empty')

        return User.findOne({ email })
            .then(user => {
                if (user) throw Error('user already exists')

                return bcrypt.hash(password, 10)
                    .then(hash => {
                        return User.create({ name, username, email, password: hash })
                            .then(userCreated => userCreated.id)
                    })
            })

    },

    loginUser(email, password) {

        if (typeof email != 'string') throw Error('email is not a string')
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password != 'string') throw Error('password is not a string')
        if (!password.trim().length) throw Error('password is empty')

        return User.findOne({ email })
            .then(user => {
                if (!user) throw Error('user not exists')

                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) throw Error('wrong credentials')

                        const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '2000h' })

                        const response = { id: user.id, token }

                        return response
                    })

            })

    },

    retrieveUser(userId) {

        if (typeof userId != 'string') throw Error('userId is not a string')
        if (!userId.trim().length) throw Error('userId is empty')

        return User.findById(userId).lean()
            .then(user => {
                if (!user) throw Error('user not exists')

                delete user.password

                return user
            })
    },

    updateUser(userId, userData) {

        if (typeof userId !== 'string') throw Error(`userId is not a string`)
        if (!userId.trim().length) throw Error(`userId is empty`)

        if (userData.constructor !== Object) throw TypeError(`userData is not an object`)

        return User.findByIdAndUpdate(userId, userData, { new: true })

            .then(user => {

                if (!user) throw Error('user not found')

                const response = { message: `user whith ID ${user.id} modify` }
                return response
            })

    },

    // *****   me da errores en el postman

    deleteUser(userId) {

        if (typeof userId !== 'string') throw Error(`userId is not a string`)

        if (!userId.trim().length) throw Error(`userId is empty`)

        return User.deleteOne(userId).lean()
 
            .then(user => {

                if (!user) throw Error('user not found')

                const response = { message: `user with ID ${user._id} deleted sgsdfgsd` }

                return response
            })
    },



    
    createCongress(congressData) {

        if (congressData.constructor !== Object) throw TypeError(`congressData is not an object`)

        const { name, description, address, city, price } = congressData  

        if (typeof name !== 'string') throw Error(`name is not a string`)
        if (!name.trim().length) throw Error(`name is empty`)
    
        if (typeof description !== 'string') throw Error(`description is not a string`)
        if (!description.trim().length) throw Error(`description is empty`)

        if (typeof address !== 'string') throw Error(`address is not a string`)
        if (!address.trim().length) throw Error(`address is empty`)

        if (typeof city !== 'string') throw Error(`city is not a string`)
        if (!city.trim().length) throw Error(`city is empty`)

        if (isNaN(parseInt(price))) throw Error(`price is not a number`)


        return Congress.create(congressData)
            .then(response => response)
    },

    retrieveCongress(congressId) {

        if (typeof congressId != 'string') throw Error('congressId is not a string')
        if (!congressId.trim().length) throw Error('congressId is empty')

        return Congress.findById(congressId).lean()
            .then(congress => {
                if (!congress) throw Error('congress not exists')

                return congress
            })
    },

    updateCongress(congressId, congressData) {

        if (typeof congressId !== 'string') throw Error(`congressId is not a string`)
        if (!congressId.trim().length) throw Error(`congressId is empty`)

        if (congressData.constructor !== Object) throw TypeError(`congressData is not an object`)

        return User.findByIdAndUpdate(congressId, congressData, { new: true })

            .then(congress => {

                if (!congress) throw Error('congress not found')

                const response = { message: `congress whith ID ${congress.id} modify` }
                return response
            })

    },

    listCongress() {

        return Congress.find()
            .then(congresses => {
                return { results: congresses }
            })
    },

    deleteCongress(id) {

        return Congress.deleteOne(id)
            .then(congresses => {
                return { results: congresses }
            })
    },

    createArtist(artistData) {

        return Artist.create(artistData)
        .then(response => response)

    }


}

module.exports = logic


















