const { mongoose: {Types: { ObjectId }}, models: { User, Item, Bid }} = require('auction-data')
const { LogicError } = require('auction-errors') 
const validate = require('auction-validate')
const bcrypt = require('bcrypt')
const moment = require('moment')

const logic = {

    /**
     * Register an user into database
     * 
     * @param {String} name The user name
     * @param {String} surname The user surname
     * @param {String} email The user email 
     * @param {String} password The user password 
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
            const user = await User.findOne({email})
            
            if(user) throw new LogicError(`user with email ${email} already exists`)
            
            return await User.create({name, surname, email, password: encryptPass})
        })()
    },

    /**
     * Authenticate an user to retrieve the id or throw an error if an email doesn't exists or the password not match.
     * 
     * @param {String} email The user email to authenticate
     * @param {String} password The user email to match
     * 
     * @returns {String} The user id
     */
    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const user = await User.findOne({email})
            
            if(!user) throw new LogicError(`user with email ${email} doesn't exists`)
            
            const pass = bcrypt.compareSync(password, user.password)
            
            if(!pass) throw new LogicError('wrong credentials')

            return user.id
        })()
    },

    /**
     * Retrieve the user data (name, surname and email)
     * 
     * @param {String} id The user id
     * 
     * @returns {Object} The user data
     */
    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
        ])

        return (async () => {
            const user = await User.findById(id).select('-_id name surname email').lean()
    
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

    /**
     * Add a bid into the item selected
     * 
     * @param {String} itemId The item id to make a bid
     * @param {String} userId The user id that make the bid
     * @param {Number} amount The price of the bid
     */
    placeBid(itemId, userId, amount) {
        validate.arguments([
            { name: 'itemId', value: itemId, type: 'string', notEmpty: true },
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
            { name: 'amount', value: amount, type: 'number', notEmpty: true }
        ])

        return (async () => {
            const user = await User.findById(userId)
            if(!user) throw new LogicError(`user with id ${id} doesn't exists`)

            const item = await Item.findById(itemId)
            if(!item) throw new LogicError(`item with id ${id} doesn't exists`)

            let bid = item.winningBid()
            if(bid && bid.amount >= amount) throw new LogicError(`sorry, the bid is lower than the current amount`)

            userId = ObjectId(userId)            
            bid = await Bid.create({userId, amount})
            
            this._addBiddedItem(user, itemId)

            item.bids.push(bid)
            await item.save()
        })()
    },

    /**
     * Add a bidded item into the user historial
     * 
     * @param {Object} user The data user
     * @param {String} itemId The item id
     */
    async _addBiddedItem(user, itemId) {
        const index = user.items.findIndex(item => item.toString() === itemId)
        
        if (index < 0) {
            user.items.push(itemId)
            await user.save()
        }
    },

    /**
     * Search all the documents with the given query
     * 
     * @param {Object} query The query data to search items
     * 
     * @returns {Array} An array with the items found
     */
    searchItems(query) {
        validate.arguments([
            { name: 'query', value: query, type: 'object'},
        ])
        
        const parseQuery = this._queryParser(query)

        return (async () => {
            return await Item.find(query).lean()
        })()
    },
    //ACABAR CON LA FUNCIÓN SEARCH
    _queryParser(dataQuery) {
        
        const result = 'hola'
    },

    /**
     * Retrieve an item with the given item id
     * 
     * @param {String} id The item id 
     * 
     * @returns {Object} An item with the given id
     */
    retrieveItem(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
        ])

        return (async () => {
            return await Item.findById(id).lean()
        })()
    },

    // /**
    //  * Retrieve the bids on the given item id
    //  * 
    //  * @param {String} id The item id
    //  * 
    //  * @returns {Array} The item bids 
    //  */
    // retrieveItemBids(id) {
    //     validate.arguments([
    //         { name: 'id', value: id, type: 'string', notEmpty: true },
    //     ])
    //     //SE PUEDE HACER HACIENDO LINK EN BIDS
    //     return (async () => {
    //         const bids = await Item.findById(id)
    //             .populate({
    //                 path: 'bids',
    //                 model: 'Bid',
    //                 populate: {
    //                     path: 'userId',
    //                     model: 'User'
    //                 }
    //             }).lean()
    //         debugger 
    //         return bids.bids
    //     })()
    // },

    //LIKE ADD TO FAVOURITES
    addToCalendar(userId, auctionId) {
        //TODO
    },

    /**
     * Create an item into the database
     * 
     * @param {String} title The item title
     * @param {String} description The item description
     * @param {Number} startPrice The start price for the item
     * @param {String} startDate The date when start the item auction
     * @param {String} finishDate The date when finish the item auction 
     * @param {Number} reservedPrice The price if the item is reserved 
     * @param {String} images The item images
     * @param {String} category The item category
     * @param {String} city The city where the item auction is showing
     */
    createItem(title, description, startPrice, startDate, finishDate, reservedPrice, images, category, city) {
        validate.arguments([
            { name: 'title', value: title, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'startPrice', value: startPrice, type: 'number', notEmpty: true },
            { name: 'startDate', value: startDate, type: 'string', notEmpty: true },
            { name: 'finishDate', value: finishDate, type: 'string', notEmpty: true },
            { name: 'reservedPrice', value: reservedPrice, type: 'number', optional: true},
            { name: 'images', value: images, type: 'string', optional: true },
            { name: 'category', value: category, type: 'string', notEmpty: true },
            { name: 'city', value: city, type: 'string', notEmpty: true }
        ])

        return (async () => {
            startDate = moment(startDate, 'DD-MM-YYYY', true).format()
            finishDate = moment(finishDate, 'DD-MM-YYYY', true).format()

            await Item.create({title, description, startPrice, startDate, finishDate, reservedPrice, images, category, city})
        })()
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