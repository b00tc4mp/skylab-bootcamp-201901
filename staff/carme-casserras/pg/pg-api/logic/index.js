const validate = require('pg-validate')
const { LogicError } = require('pg-errors')
const { models } = require('pg-data')
const bcrypt = require('bcrypt')
const streamifier = require('streamifier')
const cloudinary = require('cloudinary').v2
const { CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY, CLOUDINARY_NAME } = require('../config')
const { UserData, Thing } = models

const logic = {

    /**
     * Register user
     * 
     * @param {string} name 
     * @param {string} email 
     * @param {string} password 
     * 
     */

    registerUser(name, email, password) {

        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const users = await UserData.find({ email })

            if (users.length) throw new LogicError(`user with email ${email} already exists`)

            const encryptPassword = await bcrypt.hash(password, 5)


            await UserData.create({ name, email, password: encryptPassword })
        })()
    },

    /**
     * Verify if is the correct user
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {string} user id
     */

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {

            // el findOne et retorna un objecte
            const user = await UserData.findOne({ email })

            if (!user) throw new LogicError(`user with email ${email} does not exist`)

            if (!await bcrypt.compare(password, user.password)) throw new LogicError('wrong credentials')

            return user.id
        })()
    },

    /**
     * Returns some information of user
     * 
     * @param {string} id user
     * 
     * @returns {object} userid, name, email
     * 
     */


    retrieveUser(id) {

        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {

            const user = await UserData.findById(id).select('name email').lean()
            if (!user) throw new LogicError(`user with id ${id} does not exist`)
            return user

        })()
    },

    /**
     * Add an item to container
     * 
     * @param {object} buffer 
     * @param {string} category 
     * @param {string} description 
     * @param {string} userId 
     * @param {string} locId 
     * 
     */

    addPublicThing(buffer, category, description, userId, locId) {

        validate.arguments([
            { name: 'buffer', value: buffer, type: 'object', notEmpty: true },
            { name: 'category', value: category, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
            { name: 'locId', value: locId, type: 'string', notEmpty: true },
        ])

        return (async () => {
            cloudinary.config({
                cloud_name: CLOUDINARY_NAME,
                api_key: CLOUDINARY_API_KEY,
                api_secret: CLOUDINARY_SECRET_KEY
            })
    
            const image = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream((err, image) => {
                    if (err) throw new LogicError('Image could not be uploaded')
                    resolve(image)
                })
                streamifier.createReadStream(buffer).pipe(uploadStream)    
            })

            await Thing.create({ image: image.secure_url, category, description, owner: userId, loc: locId })
            
        })()
    },

    /**
     * Update if the item is or not in the container
     * 
     * @param {string} userId 
     * @param {string} id 
     * @param {number} status 
     * 
     */

    updatePublicThing(userId, id, status) {
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'status', value: status, type: 'number' }
        ])

        return (async () => {

            try {
                const thing = await Thing.findByIdAndUpdate(id, { status })
                if (!thing) throw new LogicError(`thing with id ${id} does not exist`)
                return thing
            }
            catch (err) {throw new LogicError(err)}
        })()
    },

    /**
     * Seach all the items by category
     * 
     * @param {string} userId 
     * @param {string} category 
     * 
     * @returns {array} for each item returns: status, image, category, description, location, address 
     * 
     */

    searchByCategory(userId, category) {
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
            { name: 'category', value: category, type: 'string', notEmpty: true }
        ])
    
        return (async () => {
            try {

                return await Thing.find({ category }).populate('loc', 'name address -_id').select('status image category description loc').lean()
            }
            catch (err) {throw new LogicError(err)}
        })()
    },

    /**
     * Seach all the items by location
     * 
     * @param {string} location 
     * 
     * @returns {array} for each item returns: status, image, category, description, location, address 
     * 
     */

    searchByLocation(location) {
        validate.arguments([

            { name: 'location', value: location, type: 'string', notEmpty: true }
        ])

        return (async () => {

            const all = await Thing.find().populate('loc', 'name address -_id').select('-__v -owner')

            const locationThings = all.filter(thing => thing.loc.name === location)

            return locationThings

        })()

    },

    /**
     * Retrieve all the items's user
     * 
     * @param {string} userId 
     * 
     * @returns {array} for each item returns: image, category, description, location
     * 
     */

    retrivePrivateThings(userId) {
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
        ])

        return (async () => {

            return await Thing.find({ 'owner': userId }).populate('owner', '-_id -password -__v -email').populate('loc name', '-_id').select('-_id -__v').lean()

        })()
    },

    /**
     * Retrieve all the information on an item
     * 
     * @param {string} thingId 
     * 
     * @returns {array} image, category, description, location, address 
     */
    
    retrieveThing(thingId) {

        validate.arguments([

            { name: 'thingId', value: thingId, type: 'string', notEmpty: true },
        ])

        return (async () => {

            return await Thing.findById(thingId).populate('loc', 'name address -_id').select('-owner -__v -_id').lean()
        })()
    }
}

module.exports = logic