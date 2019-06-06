const bcrypt = require('bcrypt')
const tokenHelper = require('../routes/middleware/token-helper')
const { User, Congress, Artist } = require('../models')

const logic = {

    // USERS

    /**
     * register an user
     * 
     * @param {String} name 
     * @param {String} username 
     * @param {String} email 
     * @param {String} password 
     * @throws {Error} - on non valid input parameters
     * 
     * @return {Promise} - resolve with the user id after create it
     */
    registerUser(name, username, email, password) {

        if (typeof name !== 'string') throw Error(`name is not a string`)
        if (!name.trim().length) throw Error(`name is empty`)

        if (typeof username !== 'string') throw Error(`username is not a string`)
        if (!username.trim().length) throw Error(`username is empty`)

        if (typeof email !== 'string') throw Error(`email is not a string`)
        if (!email.trim().length) throw Error(`email is empty`)

        if (typeof password !== 'string') throw Error(`password is not a string`)
        if (!password.trim().length) throw Error(`password is empty`)


        return User.findOne({ email })
            .then(user => {
                if (user) throw Error(`user already exists`)

                return bcrypt.hash(password, 10)
                    .then(hash => {
                        return User.create({ name, username, email, password: hash })
                            .then(userCreated => userCreated.id)
                    })
            })
    },

    /**
     * login user
     * 
     * @param {String} email 
     * @param {String} password 
     * @throws {Error} - on non valid input parameters
     * 
     * @return {Promise} - 
     */
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

                        // const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '3200h' })

                        const token = tokenHelper.createToken(user.id)

                        const response = { token }

                        return response
                    })
            })
    },

    /**
     * return user object profile
     * 
     * @param {String} userId 
     * @throws {Error} - on non valid input parameters
     * 
     * @param {Promise} - object with user data
     */
    retrieveUser(userId) {
        if (typeof userId !== 'string') throw Error(`userId is not a string`)
        if (!userId.trim().length) throw Error(`userId is empty`)

        return User.findById(userId).lean()
            .populate('createdCongresses')
            .populate('createdArtists', '-__v')
            .populate('favartists', '-__v')
            .select('-password -__v')
            .then(user => {
                if (!user) throw Error(`user not exists`)

                // delete user.password
                // delete user.__v
                return user
            })

    },


    /**
     * 
     * 
     * @param {String} userId 
     * @param {Object} userData 
     * @throws {Error} - on non valid input parameters
     * 
     * @param {Promise}
     */
    updateUser(userId, userData) {

        if (typeof userId !== 'string') throw Error(`userId is not a string`)
        if (!userId.trim().length) throw Error(`userId is empty`)

        if (userData.constructor !== Object) throw TypeError(`userData is not an object`)

        // error en los test => (node:31342) DeprecationWarning: Mongoose: `findOneAndU...
        return User.findByIdAndUpdate(userId, { $set: userData }, { useFindAndModify: false })

            .then(user => {

                if (!user) throw Error('user not found')

                const response = { message: `user whith ID ${user.id} modify` }
                return response
            })

    },

    // CONGRESS

    /**
     * 
     * @param {Object} congressData 
     * @param {String} userId
     * @throws {Error} - on non valid input parameters
     * 
     * @param {Promise}
     */
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

   /**
    * 
    * @param {String} congressId 
    * @throws {Error} - on non valid input parameters
    * @param {Promise}
    */

    retrieveCongress(congressId) {
        
        if (typeof congressId !== 'string') throw Error(`congressId is not a string`)
        if (!congressId.trim().length) throw Error(`congressId is empty`)

        return Congress.findById(congressId).populate('artists').lean()

            .then(congress => {
                if (!congress) throw Error(`congress not exists`)
                return congress
            })
    },

    /**
     * 
     * @param {String} congressId 
     * @param {Object} congressData 
     * 
     *  @param {Promise}
     */
    updateCongress(congressId, congressData) {

        if (typeof congressId !== 'string') throw Error(`congressId is not a string`)
        if (!congressId.trim().length) throw Error(`congressId is empty`)

        if (congressData.constructor !== Object) throw TypeError(`congressData is not an object`)

        return Congress.findByIdAndUpdate(congressId, congressData, { new: true }).select('-__v')

            .then(congress => {

                if (!congress) throw Error('congress not found')

                const response = { message: `congress whith ID ${congress.id} modify` }
                return response
            })
    },


    /**
     * 
     * @param {String} congressId
     * 
     * @param {Promise}
     */
    deleteCongress(congressId) {

        if (typeof congressId !== 'string') throw Error(`congressId is not a string`)
        if (!congressId.trim().length) throw Error(`congressId is empty`)

        return Congress.findOneAndDelete(congressId).lean()
            .then(congress => {
                if (!congress) throw Error('congress not found')

                const response = { message: `congress with ID ${congress._id} deleted` }
                return response
            })
    },

    /**
     * 
     * @param {String} query
     * 
     * @param {Promise}
     */
    searchItems(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return Artist.find({ 'name': new RegExp(query, 'i')})
            .then(artists => {

                return Congress.find({ 'name': new RegExp(query, 'i')})
                    .then(congresses => {

                        const response = {}
                        response.artists = artists
                        // response.push({ congresses })
                        response.congresses = congresses

                        return response

                    })


            })
    },

    /**
     * 
     * @param {String} query 
     * 
     * @param {Promise}
     */
    searchCongresses(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return Congress.find({ name: query })
            .then(congresses => {

                return congresses
            })

    },

    /**
     * 
     * @param {String} query 
     * 
     * @param {Promise}
     */
    searchArtists(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return Artist.find({})
            .then(artists => artists)

    },

    listCongresses() {
        return Congress.find().populate('owner').populate('artists')
            .then(congresses => {
                return { results: congresses }
            })
    },

    listArtists() {
        return Artist.find()
            .then(artists => artists)
    },

    /**
     * 
     * @param {Object} artistData 
     * @param {String} userId 
     * 
     * @param {Promise}
     */
    createArtist(artistData, userId) {

        if (artistData.constructor !== Object) throw TypeError(`artistData is not an object`)

        if (typeof userId !== 'string') throw Error(`userId is not a string`)
        if (!userId.trim().length) throw Error(`userId is empty`)

        
        return Artist.create({ ...artistData, owner: userId })
        
            .then(artist => {
            
                return  User.findById(userId)
                .then(user => {
                    user.createdArtists.push(artist.id)
                    user.save()

                    return artist
                })

            })
    },

    /**
     * 
     * @param {String} artistId 
     * 
     * @param {Promise}
     */
    retrieveArtist(artistId) {

        if (typeof artistId !== 'string') throw Error(`artistId is not a string`)
        if (!artistId.trim().length) throw Error(`artistId is empty`)

        return Artist.findById(artistId).populate('owner').lean()
            .then(artist => {
                if (!artist) throw Error(`artist not exists`)
                return artist
            })
    },

    favArtist(artistId, userId) {
        // todo
        return User.findById(userId)
            .then(user => {
                if (!user) throw Error('user not exist')

                const results = user.favartists

                const index = results.indexOf(artistId)

                if (index < 0 ) results.push(artistId)
                else results.splice(index, 1)

                user.favartists = results

                user.save()

                return
            })

    }


}

module.exports = logic