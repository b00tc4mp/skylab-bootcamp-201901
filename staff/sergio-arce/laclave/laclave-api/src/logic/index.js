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
     * 
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
     * 
     * @throws {Error} - on non valid input parameters
     * 
     * @return {Promise} - resolve with the token the user
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
     * 
     * @throws {Error} - on non valid userId parameters
     * 
     * @param {Promise} - solve with user data
     */
    retrieveUser(userId) {
        if (typeof userId !== 'string') throw Error(`userId is not a string`)
        if (!userId.trim().length) throw Error(`userId is empty`)

        return User.findById(userId).lean()
            .populate('favorites')
            .populate('createdCongresses')
            .populate('createdArtists', '-__v')
            .select('-password -__v')
            .then(user => {
                if (!user) throw Error(`user not exists`)
                return user
            })

    },


    /**
     * update user through his userId
     * 
     * @param {String} userId 
     * @param {Object} userData 
     * 
     * @throws {Error} - on non valid input parameters
     * @throws {TypeError} - on non valid input parameters
     * 
     * @param {Promise}- results with an updated user message
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
     * create a congress with the user's credentials
     * 
     * @param {Object} congressData 
     * @param {String} userId
     * 
     * @throws {TypeError} - on non valid congressData parameters
    * @throws {Error} - on non valid congressId parameters
     * 
     * @param {Promise} - results with a congress object created
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
    * retrieve one congress by his ID
    * 
    * @param {String} congressId 
    * 
    * @throws {Error} - on non valid congressId parameters
    * 
    * @param {Promise} - object the congress
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
     * update congress through his congressId
     * 
     * @param {String} congressId 
     * @param {Object} congressData 
     * 
     * @throws {Error} - on non valid congressId parameters
     * @throws {TypeError} - on non valid congressData parameters
     * 
     *  @param {Promise} - solved with the message of the modified congress
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
     * deleted congress through his congressId
     * 
     * @param {String} congressId
     * 
     * @throws {Error} - when the parameters of the congressId are invalid
     * 
     * @param {Promise} - solved with the message of the deleted congress
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
     * look for congresses or artists
     * 
     * @param {String} query
     * 
     * @throws {Error} - when the query is not correct
     * 
     * @param {Promise} - returns the query search
     */
    searchItems(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return Artist.find({ 'name': new RegExp(query, 'i')}).lean()
            .then(artists => {

                return Congress.find({ 'name': new RegExp(query, 'i')}).lean()
                    .then(congresses => {

                        const response = {}
                           
                        response.artists = artists.map(e => {
                            const obj = {...e, resultsType: 'artist'
                            }
                            return obj
                        })
                        console.log()
                        response.congresses = congresses.map(e => {
                            const obj = {...e, resultsType: 'congress'}
                            return obj
                        })

                        return response
                    })
            })
    },

    /**
     * look for congresses
     * 
     * @param {String} query 
     * 
     * @throws {Error} - when the query is not correct
     * 
     * @param {Promise} - resolved with the congress found
     */
    searchCongresses(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return Congress.find({ name: query })
            .then(congresses => congresses)
    },

    /**
     * look for artist
     * 
     * @param {String} query 
     * 
     * @throws {Error} - when the query is not correct
     * 
     * @param {Promise} - resolved with the artists found
     */
    searchArtists(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return Artist.find({})
            .then(artists => artists)

    },

    /**
     * congresses list
     * 
     * @param {Promise} - resolved with the list of congresses
     */
    listCongresses() {
        return Congress.find().populate('owner').populate('artists')
            .then(congresses => {
                return { results: congresses }
            })
    },

     /**
     * artist list
     * 
     * @param {Promise} - resolved with the list of artist
     */
    listArtists() {
        return Artist.find()
            .then(artists => artists)
            
    },

    /**
     * create a artist with the user's credentials
     * 
     * @param {Object} artistData 
     * @param {String} userId
     * 
     * @throws {TypeError} - on non valid artistData parameters
     * @throws {Error} - on non valid userId parameters
     * 
     * @param {Promise} - results with a artist object created
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
    * retrieve one aritist by his ID
    * 
    * @param {String} aritistId 
    * 
    * @throws {Error} - on non valid aritistId parameters
    * 
    * @param {Promise} - object the aritist
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

    /**
    * Add or remove favorite artists
    * 
    * @param {String} artistId 
    * @param {String} userId 
    * 
    * @throws {Error} - when the invalid aritistId and userId parameters
    * 
    * @param {Promise} - resolved with undefined
    * 
    */ 
   toggleFav(userId, itemId) {
       
        if (typeof itemId !== 'string') throw Error(`itemId is not a string`)
        if (!itemId.trim().length) throw Error(`itemId is empty`)
    
        if (typeof userId !== 'string') throw Error(`userId is not a string`)
        if (!userId.trim().length) throw Error(`userId is empty`)
        
        return User.findById(userId)
            .then(user => {
                
                if (!user) throw Error('user not exist')

                const results = user.favorites

                const index = results.indexOf(itemId)

                if (index < 0 ) results.push(itemId)
                else results.splice(index, 1)

                user.favorites = results

                user.save()

                return 
            })
    },


    /**
     * look for the detail of artist or congress by the id
     * 
     * @param {String} id 
     * 
     * @throws {Error} - on non valid id parameters
     * 
     * @param {Promise} - resolved with the object of the artist or congress
     */
    itemDetail(id) {

        if (typeof id !== 'string') throw Error(`id is not a string`)
        if (!id.trim().length) throw Error(`id is empty`)

        return Artist.findById(id)
            .then(artist => { 
                return Congress.findById(id)
                    .then(congress => {

                            if (artist) return artist
                            if (congress) return congress
                    
                    })
            })
    }
}

module.exports = logic

