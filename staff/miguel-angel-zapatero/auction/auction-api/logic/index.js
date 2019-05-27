const { Users, Items, Bids } = require('../data/models')
const { LogicError } = require('../common/errors')
const validate = require('../common/validate')
const bcrypt = require('bcrypt')
const { Types: { ObjectId } } = require('mongoose')

const logic = {

    /**
     * Register an user into database
     * 
     * @param {String} name The user's name
     * @param {String} surname The user's surname
     * @param {String} email The user's email 
     * @param {String} password The user's password 
     * 
     * @returns {Object} The new user object created
     */
    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        const encryptPass = bcrypt.hashSync(password, 10)
        
        return (async () => {
            const user = await Users.findOne({email})
            
            if(user) throw new LogicError(`user with email ${email} already exists`)
            
            return await Users.create({name, surname, email, password: encryptPass})
        })()
    },

    /**
     * Authenticate an user to retrieve the id or throw an error if an email doesn't exists or the password not match.
     * 
     * @param {String} email The user's email to authenticate
     * @param {String} password The user's email to match
     * 
     * @returns {String} The user's id
     */
    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const user = await Users.findOne({email})
            
            if(!user) throw new LogicError(`user with email ${email} doesn't exists`)
            
            const pass = bcrypt.compareSync(password, user.password)
            
            if(!pass) throw new LogicError('wrong credentials')

            return user.id
        })()
    },

    /**
     * Retrieve the user data (name, surname and email)
     * 
     * @param {String} id The user's id
     * 
     * @returns {Object} The user data
     */
    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
        ])

        return (async () => {
            const user = await Users.findById(id).select('-_id name surname email').lean()
    
            if(!user) throw new LogicError(`user with id ${id} doesn't exists`)

            return user
        })()
    },

    updateUser(id, data) {
        //TODO
    },

    deleteUser(id) {
        //TODO
    },

    placeBid(itemId, userId, amount) {
        validate.arguments([
            { name: 'itemId', value: itemId, type: 'string', notEmpty: true },
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
            { name: 'amount', value: amount, type: 'number', notEmpty: true }
        ])

        return (async () => {
            const user = await Users.findById(userId)
            if(!user) throw new LogicError(`user with id ${id} doesn't exists`)

            const item = await Items.findById(itemId)
            if(!item) throw new LogicError(`item with id ${id} doesn't exists`)

            userId = ObjectId(userId)            
            const bid = await Bids.create({userId, amount})
            
            //---start add to addItem?¿
            const index = user.items.findIndex(item => item.toString() === itemId)
            if (index < 0) {
                user.items.push(itemId)
                await user.save()
            }
            //--- end add to addItem?¿

            item.bids.push(bid)
            await item.save()
        })()
    },

    retrieveItem(id) {
        //TODO
    },

    listItems() {
        //TODO
    },

    //LIKE ADD TO FAVOURITES
    addItem(userId, itemId) {
        //TODO
    },

    //LIKE ADD TO FAVOURITES
    addToCalendar(userId, auctionId) {
        //TODO
    },

    createItem(title, description, startPrice, startDate, finishDate, reservedPrice) {
        //TODO
    },

    registerToAuction(userId, auctionId) {
        //TODO
    },

    createAuction(title, overview, image, type, category, finishDate) {
        //TODO
    },

    retrieveAuction(id) {
        //TODO
    },

    listAuctions() {
        //TODO
    },

    createCategory(title, description) {
        //TODO
    },

    retrieveCategory(id) {
        //TODO
    },

    listCategories() {
        //TODO
    }
}

module.exports = logic