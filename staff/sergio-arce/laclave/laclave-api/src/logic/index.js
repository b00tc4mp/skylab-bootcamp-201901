const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User, Congress, Artist } = require('../models')

const logic = {

    // USERS

    /**
     * register an user
     * 
     * @param {String} name 
     * @param {*} username 
     * @param {*} email 
     * @param {*} password 
     * @param {*} favartists 
     * @param {*} congresses 
     * @throws {Error} - on non valid input parameters
     * 
     * @return {Promise} - resolve with the user id after create it
     */
    registerUser(name, username, email, password, favartists, congresses) {

        if (typeof name !== 'string') throw Error(`name is not a string`)
        if (!name.trim().length) throw Error(`name is empty`)

        if (typeof username !== 'string') throw Error(`username is not a string`)
        if (!username.trim().length) throw Error(`username is empty`)

        if (typeof email !== 'string') throw Error(`email is not a string`)
        if (!email.trim().length) throw Error(`email is empty`)

        if (typeof password !== 'string') throw Error(`password is not a string`)
        if (!password.trim().length) throw Error(`password is empty`)

        //todo congresses arrya type

        return User.findOne({ email })
            .then(user => {
                if (user) throw Error(`user already exists`)

                return bcrypt.hash(password, 10)
                    .then(hash => {
                        return User.create({ name, username, email, password: hash, congresses, favartists })
                            .then(userCreated => userCreated.id)
                    })
            })
    },

    loginUser(email, password) {

        if (typeof email !== 'string') throw Error(`email is not a string`)
        if (!email.trim().length) throw Error(`email is empty`)

        if (typeof password !== 'string') throw Error(`password is not a string`)
        if (!password.trim().length) throw Error(`password is empty`)

        return User.findOne({ email })
            .then(user => {
                if (!user) throw Error(`user not exists`)

                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) throw Error('wrong credentials')

                        const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '232200h' })

                        const response = { id: user.id, token }

                        return response
                    })
            })
    },




    retrieveUser(userId) {
        if (typeof userId !== 'string') throw Error(`userId is not a string`)
        if (!userId.trim().length) throw Error(`userId is empty`)

        return User.findById(userId).populate('createdCongresses').populate('createdArtists').lean()
            .then(user => {
                if (!user) throw Error(`user not exists`)

                delete user.password

                return user
            })

    },

    updateUser(userId, userData) {
        if (typeof userId !== 'string') throw Error(`userId is not a string`)
        if (!userId.trim().length) throw Error(`userId is empty`)

        if (userData.constructor !== Object) throw TypeError(`userData is not an object`)

        return User.findByIdAndUpdate(userId, { $set: userData }, { useFindAndModify: false })

            .then(user => {

                if (!user) throw Error('user not found')

                const response = { message: `user whith ID ${user.id} modify` }
                return response
            })

    },

    // deleteUser(userId) {
    //     if (typeof userId !== 'string') throw Error(`userId is not a string`)
    //     if (!userId.trim().length) throw Error(`userId is empty`)

    //     return User.findByIdAndDelete(userId)

    //         .then(user => {

    //             if (!user) throw Error('user not found')

    //             // el id me muestra como undefined
    //             const response = { message: `user deleted ` }
    //             return response
    //         })
    // },  

    // CONGRESS

    createCongress(congressData, userId) {

         if (congressData.constructor !== Object) throw TypeError(`congressData is not an object`)

         if (typeof userId !== 'string') throw Error(`userId is not a string`)
         if (!userId.trim().length) throw Error(`userId is empty`)

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user not exists`)

                return Congress.create({...congressData, owner: userId} )
                    .then(congress => {
                        
                        return User.findById(userId)
                                .then(user => {
                                    user.createdCongresses.push(congress.id)
                                    user.save()
                                    return congress
                                })
                
            })
        })
    },

    retrieveCongress(congressId, userId) {

        //TODO VERIFIY USERID
        
        if (typeof congressId !== 'string') throw Error(`congressId is not a string`)
        if (!congressId.trim().length) throw Error(`congressId is empty`)

        if (typeof userId !== 'string') throw Error(`userId is not a string`)
        if (!userId.trim().length) throw Error(`userId is empty`)

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user not exists`)

                return Congress.findById(congressId).lean()
                    .then(congress => {
                        debugger
                        if (!congress) throw Error(`congress does not exists`)
                        return congress
                    })
            })
    },

    // updateCongress

    updateCongress(congressId, congressData) {

        if (typeof congressId !== 'string') throw Error(`congressId is not a string`)
        if (!congressId.trim().length) throw Error(`congressId is empty`)

        if (congressData.constructor !== Object) throw TypeError(`congressData is not an object`)

        // .select('-__v') te limpia y te elimina los campos de respuesta
        return Congress.findByIdAndUpdate(congressId, congressData, { new: true }).select('-__v')

            .then(congress => {

                if (!congress) throw Error('congress not found')

                const response = { message: `congress whith ID ${congress.id} modify` }
                return response
            })
    },

    // deleteCongress
    deleteCongress(congressId) {

        if (typeof congressId !== 'string') throw Error(`congressId is not a string`)
        if (!congressId.trim().length) throw Error(`congressId is empty`)

        return Congress.findOneAndDelete(congressId).lean()
            .then(congress => {
                // ** 1 cambiar todos los métodos para que comprueben esto
                // findByIdAndUpdate, findOneAndDelete....
                if (!congress) throw Error('congress not found')

                const response = { message: `congress with ID ${congress._id} deleted` }
                return response
            })
    },

    searchCongresses(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)


        return Congress.find({ name: query })
            .then(congresses => {
                return congresses
            })

    },

    listCongresses() {

        return Congress.find()
            .then(congresses => {
                return { results: congresses }
            })
    },


    // ARTIST

    listArtists() {

        return Artist.find()
            .then(artists => artists)
    },

    createArtist(artistData, userId) {

        if (artistData.constructor !== Object) throw TypeError(`artistData is not an object`)

        if (typeof userId !== 'string') throw Error(`userId is not a string`)
        if (!userId.trim().length) throw Error(`userId is empty`)

        
        return Artist.create({ ...artistData, owner: userId }) //rest operator
        
            .then(artist => {
            
                return  User.findById(userId)
                .then(user => { // user conectado a la base de datos aun 
                    user.createdArtists.push(artist.id)
                    user.save()
                    return artist
                })

            })
    },

    retrieveArtist(artistId) {

        if (typeof artistId !== 'string') throw Error(`artistId is not a string`)
        if (!artistId.trim().length) throw Error(`artistId is empty`)

        return Artist.findById(artistId).lean()
            .then(artist => {
                if (!artist) throw Error(`artist not exists`)
                return artist
            })

    },

    searchArtists(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return Artist.find({ name: query })
            .then(artists => artists)

    },

    searchItems(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return Artist.find({ name: query })
            .then(artist => {

                return Congress.find({ name: query })
                    .then(congress => {

                        const response = []
                        response.push(artist)
                        response.push(congress)
                        return response
                    })


            })
    }

}

module.exports = logic
