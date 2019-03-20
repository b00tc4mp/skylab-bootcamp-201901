'use strict'

const { models: { User, Product, Chat, Message } } = require('arshop-data')
const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')
const streamifier = require('streamifier')

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
    registerUser(name, surname, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')
        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')
        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return (async () => {
            const user = await User.findOne({ email })

            if (user) throw Error(`user with email ${email} already exists`)

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
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        // return User.findOne({ email })
        //     .then(user => {
        //         if (!user) throw Error(`user with email ${email} not found`)

        //         return bcrypt.compare(password, user.password)
        //             .then(match => {
        //                 if (!match) throw Error('wrong credentials')
        //                 const { id } = user
        //                 return id
        //             })
        //     })
        return (async () => {
            const user = await User.findOne({ email })

            if (!user) throw Error(`user with email ${email} not found`)

            const match = await bcrypt.compare(password, user.password)

            if (!match) throw Error('wrong credentials')

            return user.id
        })()
    },

    /**
     * retrieves a user by his id
     * 
     * @param {string} userId 
     */
    retrieveUser(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                user.id = user._id.toString()

                delete user._id

                return user
            })
    },

    /**
     * updates an user with his credentials
     * 
     * @param {string} userId 
     * @param {object} data 
     */
    updateUser(userId, data) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (!data) throw Error(`data should be defined`)
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return User.findByIdAndUpdate(userId, data, { runValidators: true, new: true }).select('-password -__v').lean()
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                user.id = user._id.toString()

                delete user._id

                return user
            })

    },

    // removeUser

    /**
     * 
     * add a product with user credentials
     * 
     * @param {string} userId 
     * @param {object} product 
     */
    createProduct(userId, product) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (!product) throw Error('product should be defined')
        if (product.constructor !== Object) throw TypeError(`${product} is not an object`)

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                const { tittle, description, price, category, city, sold } = product
                return Product.create({ tittle, description, price, owner: userId, category, city, sold })
                    .then((_product) => {

                        user.products.push(_product.id)

                        return user.save()
                            .then(() => _product.id)
                    })
            })
    },

    /**
     *Get all products
     *   
     */
    retrieveProducts() {
        return Product.find().select('-__v').lean()
            .then(products => {
                if (!products) throw Error('there are no products')

                products.forEach(product => {
                    product.id = product._id.toString()
                    delete product._id
                })
                return products
            })
    },

    /**
     * retrieve one product by his ID
     * 
     * @param {string} productId 
     */
    retrieveProduct(productId) {
        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return Product.findById(productId).select('-__v').lean()
            .then(product => {
                if (!product) throw Error(`cannot find product with id ${productId}`)

                product.id = product._id.toString()

                delete product._id

                return product
            })
    },

    retrieveUserProducts(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)
                return user.products
            })
            .then(idProducts => {
                return Product.find({ _id: { $in: idProducts } }).select('-__v').lean()
            })
            .then(products => {
                products.forEach(product => {
                    product.id = product._id.toString()
                    delete product._id
                })
                return products
            })
    },

    toogleFav(userId, productId) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                const index = user.favoriteProducts.findIndex(_productId => _productId == productId)

                if (index < 0) user.favoriteProducts.push(productId)
                else user.favoriteProducts.splice(index, 1)

                return user.save()
                    .then(() => {
                        if (index < 0) return true
                        else return false
                    })
            })
    },

    retrieveFavs(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)
                return user.favoriteProducts
            })
            .then(idProducts => {
                return Product.find({ _id: { $in: idProducts } }).select('-__v').lean()
            })
            .then(products => {
                products.forEach(product => {
                    product.id = product._id.toString()
                    delete product._id
                })
                return products
            })
    },

    // retrieveFavs(userId) {

    //     if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
    //     if (!userId.trim().length) throw Error('userId cannot be empty')

    //     return User.findById(userId)
    //         .then(user => {
    //             if (!user) throw Error(`user with id ${userId} not found`)

    //             return user.favoriteProducts
    //         })
    // },

    searchProductsByCategory(q) {

        if (typeof q !== 'string') throw TypeError(`${q} is not a string`)
        if (!q.trim().length) throw Error('query cannot be empty')

        return Product.find({ category: q }).select('-__v').lean()
            .then(products => {
                if (!products) throw Error('there are no products')

                products.forEach(product => {
                    product.id = product._id.toString()
                    delete product._id
                })
                return products
            })
    },

    searchProducts(q, qcategory, qcity) {

        if (q !== undefined) {
            if (typeof q !== 'string') throw TypeError(`${q} is not a string`)
            if (!q.trim().length) throw Error('query cannot be empty')
        }
        if (qcategory !== undefined) {
            if (typeof qcategory !== 'string') throw TypeError(`${qcategory} is not a string`)
            if (!qcategory.trim().length) throw Error('category cannot be empty')
        }
        if (qcity !== undefined) {
            if (typeof qcity !== 'string') throw TypeError(`${qcity} is not a string`)
            if (!qcity.trim().length) throw Error('city cannot be empty')
        }

        let criteria = {}

        if (q) criteria.$or = [{ tittle: { $regex: q, $options: 'i' } }, { description: { $regex: q, $options: 'i' } }]
        if (qcategory) criteria.category = qcategory
        if (qcity) criteria.city = qcity

        return Product.find(criteria).select('-__v').lean()
            .then(products => {
                if (!products) throw Error('there are no products')

                products.forEach(product => {
                    product.id = product._id.toString()
                    delete product._id
                })
                return products
            })
    },

    updateProduct(userId, productId, data) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')

        if (!data) throw Error(`data should be defined`)
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                const index = user.products.findIndex(_productid => _productid == productId)

                if (index < 0) throw Error(`this user do not have any product with id ${productId}`)
                else return productId
            })
            .then((productId) => {
                return Product.findByIdAndUpdate(productId, data, { runValidators: true, new: true }).select('-__v').lean()
                    .then(product => {
                        if (!product) throw Error(`user with id ${productId} not found`)

                        product.id = product._id.toString()

                        delete product._id

                        return product
                    })
            })

    },

    toogleSold(userId, productId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                const index = user.products.findIndex(_productid => _productid == productId)

                if (index < 0) throw Error(`this user do not have any product with id ${productId}`)
                else return productId
            })
            .then(productId => {
                return Product.findById(productId)
            })
            .then(_product => {
                _product.sold = !_product.sold
                return _product.save()
            })
            .then((_product) => _product.sold)

    },

    uploadProductImg(userId, productId, url) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')

        if (typeof url !== 'string') throw TypeError(`${url} is not a string`)
        if (!url.trim().length) throw Error('url is empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                const index = user.products.findIndex(_productid => _productid == productId)

                if (index < 0) throw Error(`this user do not have any product with id ${productId}`)
                else return productId
            })
            .then((productId) => {
                return Product.findByIdAndUpdate(productId, { imageUrl: url }, { runValidators: true, new: true }).select('-__v').lean()
                    .then(product => {
                        if (!product) throw Error(`user with id ${productId} not found`)

                        product.id = product._id.toString()

                        delete product._id

                        return product
                    })
            })
    },

    uploadUserImg(userId, url) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof url !== 'string') throw TypeError(`${url} is not a string`)
        if (!url.trim().length) throw Error('url is empty')

        return User.findByIdAndUpdate(userId, { imageUrl: url }, { new: true, runValidators: true }).select('-__v -password').lean()
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                user.id = user._id.toString()

                delete user._id

                return user
            })
    },

    retrieveUserFromProducts(productId) {

        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId is empty')

        return Product.findById(productId)
            .then(product => {
                if (!product) throw Error(`product with id ${productId} not found`)
                return product.owner
            })
            .then(idUser => {
                return User.find({ _id: { $in: idUser } }).select('-__v').lean()
                    .then(users => {
                        if (!users) throw Error('there are no users')

                        users.forEach(user => {
                            user.id = user._id.toString()
                            delete user._id
                        })
                        return users
                    })
            })
        // .then(user => {
        //     // user.id = user._id.toString()
        //     // delete user._id
        //     return user
        // })
    },

    retrieveUserWithId(id) {

        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        return User.findById(id).select('-__v').lean()
            .then(user => {
                if (!user) throw Error(`user with id ${id} not found`)

                user.id = user._id.toString()

                delete user._id

                return user
            })
    },

    retrieveProductsFromUserId(id) {

        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id cannot be empty')

        return User.findById(id)
            .then(user => {
                if (!user) throw Error(`user with id ${id} not found`)
                return user.products
            })
            .then(idProducts => {
                return Product.find({ _id: { $in: idProducts } }).select('-__v').lean()
            })
            .then(products => {
                products.forEach(product => {
                    product.id = product._id.toString()
                    delete product._id
                })
                return products
            })
    },

    // createChat(userId, id) {

    //     if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
    //     if (!userId.trim().length) throw Error('userid cannot be empty')

    //     if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
    //     if (!id.trim().length) throw Error('id cannot be empty')

    //     return User.findById(userId)
    //         .then(user => {
    //             if (!user) throw Error(`user with id ${userId} not found`)

    //             return Chat.create({ users: [userId, id] })
    //                 .then((chat) => {

    //                     user.chats.push(chat.id)

    //                     return user.save()
    //                         .then(() => User.findById(id)
    //                             .then(_user => {
    //                                 if (!_user) throw Error(`user with id ${id} not found`)

    //                                 _user.chats.push(chat.id)

    //                                 return _user.save()
    //                                     .then(() => chat.id)
    //                             })
    //                         )
    //                 })
    //         })
    // },

    createChat(userId, id) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userid cannot be empty')

        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                return Chat.findOne({ users: [userId, id] })
                    .then(chat => {
                        if (chat) {
                            console.log('alguien lo tiene')
                            console.log(chat.id)
                            return chat.id
                        }
                        else {
                            return Chat.findOne({ users: [id, userId] })
                                .then(_chat => {
                                    if (_chat) {
                                        console.log('alguien lo tiene')
                                        console.log(_chat.id)
                                        return _chat.id
                                    }
                                    else {
                                        return Chat.create({ users: [userId, id] })
                                            .then((__chat) => {

                                                user.chats.push(__chat.id)

                                                return user.save()
                                                    .then(() => User.findById(id)
                                                        .then(_user => {
                                                            if (!_user) throw Error(`user with id ${id} not found`)

                                                            _user.chats.push(__chat.id)

                                                            return _user.save()
                                                                .then(() => __chat.id)
                                                        })
                                                    )
                                            })
                                    }
                                })
                        }

                    })
            })
    },

    sendMessage(userId, chatId, text) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userid cannot be empty')

        if (typeof chatId !== 'string') throw TypeError(`${chatId} is not a string`)
        if (!chatId.trim().length) throw Error('chatId cannot be empty')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)
        if (!text.trim().length) throw Error('text cannot be empty')

        return Chat.findById(chatId)
            .then(chat => {
                if (!chat) throw Error(`chat with id ${chatId} not found`)

                return Message.create({ sender: userId, text: text })
                    .then(message => {
                        chat.messages.push(message)

                        return chat.save()
                    })
            })
    },

    retrieveChats(userId) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userid cannot be empty')


        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)
                return user.chats
            })
            .then(idChats => {
                return Chat.find({ _id: { $in: idChats } }).select('-__v').lean()
            })
            .then(chats => {
                chats.forEach(chat => {
                    chat.id = chat._id.toString()
                    delete chat._id
                })
                return chats
            })
    },

    retrieveMessagesFromChat(userId, chatId) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userid cannot be empty')

        if (typeof chatId !== 'string') throw TypeError(`${chatId} is not a string`)
        if (!chatId.trim().length) throw Error('chatId cannot be empty')

        return Chat.findById(chatId)
            .then(chat => {
                if (!chat) throw Error(`there are no chats with id ${chatId}`)

                return chat.messages
            })
    },

    saveObject3d(userId, productId, object3d) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userid cannot be empty')

        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')


        return (async () => {

            let objectPath = path.join(__dirname, '../../models3d')
            let pathId = path.join(objectPath, productId + '.obj')
    
            fs.writeFile(pathId, JSON.stringify(""), err => {
                if (err) throw err
            })
    
            let streamBuffer = streamifier.createReadStream(object3d);
            // let exist = fs.existsSync(pathId)
            // let rs = fs.createReadStream(object3d) //Must be a path, not an object
            let ws = fs.createWriteStream(pathId)
            // rs.on('data', (chunk) => chunk.pipe(ws))
            // rs.on('end', console.log('end'))
            streamBuffer.pipe(ws)
            
            return true
        })()
    },

    retrieveObject3d(productId) {
        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')


        return (async () => {
            let modelsPath = path.join(__dirname, '../../models3d')

            let modelsItems = await fs.readdirSync(modelsPath)
            debugger
            let modelFound = modelsItems.find(foundId => foundId == productId)
            debugger
            let resultPath = path.join(modelsPath, modelFound)
            debugger
            let rs = fs.createReadStream(resultPath)

            return rs
        })()
    }
}

module.exports = logic